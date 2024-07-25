import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Código não utilzado

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10'
});
const endpointScrete = process.env.STRIPE_WEBHOOK_SECRET!;

const handleCompletedCheckoutSession = async (event: Stripe.CheckoutSessionCompletedEvent) => {
    try {

        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            (event.data.object as any).id,
            {
                expand: ["line_items"]
            }
        );
        const lineItems = sessionWithLineItems.line_items;

        if (!lineItems) return false;

        // Salvar dados no Firebase

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function POST(req: NextRequest) {
    const rawBody = await req.text()
    const sig = req.headers.get("stripe-signature");

    let event;
    let result = "Webhook called.";

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointScrete);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Unable to save checkout session.", status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const savedSession = await handleCompletedCheckoutSession(event);
            if (!savedSession) {
                return NextResponse.json({
                    error: "Unable to save checkout session",
                    status: 500
                });
            };
            break;
        default:
            console.log("Unhandled event type: " + event.type);
    }

    return NextResponse.json({
        received: true,
        status: result
    });
};