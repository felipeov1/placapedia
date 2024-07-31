
import axios from "axios";
import fs from 'fs';
import path from "path";
import https from 'https';
import { NextRequest, NextResponse } from "next/server";

// CRIAR QRCODE DO PIX E FAZER LOGIN NO GERENCIANET

export async function GET(req: NextRequest) { // FAZER LOGIN

    const { searchParams } = new URL(req.url);
    const txid = searchParams.get('txid');

    if (!txid) {
        return NextResponse.json({ error: 'txid is required' }, { status: 400 });
    }

    const certPath = path.resolve(process.cwd(), 'public/producao-572657-PlacaPedia.p12');
    const credentials = Buffer.from(`${process.env.GN_CLIENT_ID}:${process.env.GN_SECRET_KEY}`).toString('base64');
    try {
        // Configurando certificando de segurança
        const cert = fs.readFileSync(certPath);
        const agent = new https.Agent({
            pfx: cert,
            passphrase: ''
        });

        // Pegando o token de acesso para o api do gerencianet
        const authentication = await axios({
            method: 'POST',
            url: `${process.env.GN_ENDPOINT}/oauth/token`,
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            httpsAgent: agent,
            data: {
                grant_type: 'client_credentials'
            }
        });

        // Configurando todos os dados e valores
        const acessToken = authentication.data?.access_token;

        // Get the dates
        const today = new Date();
        const nextHour = new Date();
        today.setHours(today.getHours() - 1);
        nextHour.setHours(nextHour.getHours() + 1);

        const todayToISOString = today.toISOString();
        const nextHourToISOString = nextHour.toISOString();

        const endPointGetAllPixs = `${process.env.GN_ENDPOINT}/v2/pix?inicio=${todayToISOString}&fim=${nextHourToISOString}`;
        const config = {
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${acessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const pixs = await axios.get(endPointGetAllPixs, config);

        const findByTxid = (txid: string) => {
            return pixs.data.pix.find((item: any) => item.txid === txid);
        }

        const pix = findByTxid(txid);

        if (!pix) {
            return NextResponse.json({ pix: [], status: false }, { status: 200 });
        }

        return NextResponse.json({ pix, status: true }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error on Server' }, { status: 500 });
    }
};

export async function POST(req: NextRequest) { // CRIANDO QRCODE PIX

    const body = await req.json();
    const certPath = path.resolve(process.cwd(), 'public/producao-572657-PlacaPedia.p12');
    const credentials = Buffer.from(`${process.env.GN_CLIENT_ID}:${process.env.GN_SECRET_KEY}`).toString('base64');

    try {
        // Configurando certificando de segurança
        const cert = fs.readFileSync(certPath);
        const agent = new https.Agent({
            pfx: cert,
            passphrase: ''
        });

        // Pegando o token de acesso para o api do gerencianet
        const authentication = await axios({
            method: 'POST',
            url: `${process.env.GN_ENDPOINT}/oauth/token`,
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json'
            },
            httpsAgent: agent,
            data: {
                grant_type: 'client_credentials'
            }
        });

        // Configurando todos os dados e valores
        const acessToken = authentication.data?.access_token;
        const endPointCreateCob = `${process.env.GN_ENDPOINT}/v2/cob`;
        const dataCob = {
            calendario: {
                expiracao: 3600
            },
            valor: {
                original: `${body.price}`
            },
            chave: "placapedia@placapedia.com", // Trocar chave pix para a do dono da conta
            solicitacaoPagador: "Cobrança dos serviços prestados."
        };
        const config = {
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${acessToken}`,
                'Content-Type': 'application/json'
            }
        };

        // Criando a cobrança de pagamento pix
        const cob = await axios.post(endPointCreateCob, dataCob, config);

        // Pegando o qrcode gerado pela própria gerencianet
        const endPointGetQRCode = `${process.env.GN_ENDPOINT}/v2/loc/${cob.data.loc.id}/qrcode`;
        const qrCode = await axios.get(endPointGetQRCode, config);

        return NextResponse.json({ cobranca: cob.data, qrcode: qrCode.data });

    } catch (error) {
        console.error('Error on Server: ', error);
        return NextResponse.json({ error: 'Error on Server', msg: error }, { status: 500 });
    }
};