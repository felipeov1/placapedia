import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import admin from '@/firebase/firebaseAdmin';

// API de consulta da AnyCar veiculos estaduais

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        if (!body) {
            return NextResponse.json({ error: 'No body found!' }, { status: 400 });
        }

        if (!body.placa) {
            return NextResponse.json({ error: 'No placa found!' }, { status: 400 });
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

        const anyCar = await axios.post('https://api-v2.anycar.com.br/integracao/consultar', {
            apiKey: process.env.NEXT_PUBLIC_TOKEN_2!,
            tipo: "estadual",
            placa: `${body.placa}`
        });

        if (!anyCar.data) {
            return NextResponse.json({ error: 'No data found' }, { status: 400 });
        }

        const data = anyCar.data;

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        // Log do erro completo
        console.error('Error:', error);
        return NextResponse.json({ error: 'Erro on server', msg: error }, { status: 500 });
    }
}
