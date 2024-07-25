import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Criar pagamento com os stripe com as informações passadas pelo body

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
});
// const endpointScrete = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    const { dynamicParam, name, description, price } = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: name, // Dinamico,
                            description: description, // Dinamico
                        },
                        unit_amount: Number(price), // EX: R$ 3,50 devo colocar 350
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL_BASE}/search/${dynamicParam}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL_BASE}/search/${dynamicParam}`,
        });

        return NextResponse.json({ id: session.id, pay: true });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}