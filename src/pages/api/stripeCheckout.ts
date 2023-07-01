import { stripe } from "@/libs/stripe";
import { NextRequest, NextResponse } from "next/server";

export default async function handle(req: NextRequest, res: NextResponse) {
    const { priceId } = req.body;

    if (req.method !== "POST") {
        return res.status(505).json({ error: "Method not allowed" });
    }

    if (!priceId) {
        return res.status(400).json({ error: "Price not found" });
    }

    const successURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelURL = process.env.NEXT_URL;

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successURL,
        cancel_url: cancelURL,
    });

    return res.status(201).json({ checkoutURL: checkoutSession.url });
}
