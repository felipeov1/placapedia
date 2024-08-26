import axios from "axios";
import admin from "@/firebase/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    if (!body) {
        return NextResponse.json({ error: 'No body found!' }, { status: 400 });
    }

    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    try {
        const anyCarRes = await axios.post('https://api-v2.anycar.com.br/integracao/consultar', {
            apiKey: process.env.NEXT_PUBLIC_TOKEN_2,
            tipo: 'agregados-propria',
            placa: body.placa
        });

        if (!anyCarRes.data) {
            return NextResponse.json({ error: 'No data found!' }, { status: 404 });
        }

        if (anyCarRes.data.status == false) {
            return NextResponse.json({ error: 'No data found!' }, { status: 404 });
        }

        const formatedRes = {
            MARCA: anyCarRes.data.dados?.fabricante,
            MODELO: anyCarRes.data.dados?.modelo,
            ano: anyCarRes.data.dados?.ano_fabricacao
        };

        return NextResponse.json({ formatedRes, datos: anyCarRes.data.dados }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Erro on server', msg: error }, { status: 500 });
    }
}