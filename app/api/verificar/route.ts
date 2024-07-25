import Stripe from 'stripe';
import { NextRequest, NextResponse } from "next/server";

// Verificar se ouve pagamento com o stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
});

export async function POST(req: NextRequest) {

    const { sessionId } = await req.json();

    try {
        // Consultar a sessão de checkout na Stripe para verificar o status do pagamento
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // O pagamento foi concluído com sucesso
            return NextResponse.json({ status: 'paid' }, { status: 200 });
        }

        // O pagamento não foi concluído
        return NextResponse.json({ status: 'not_paid' }, { status: 404 });

    } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        return NextResponse.json({ error: 'Erro ao verificar pagamento', msg: error }, { status: 500 });
    }
}