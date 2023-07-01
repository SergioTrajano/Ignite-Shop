import Stripe from "stripe";

const secretKey = String(process.env.STRIPE_SECRET_KEY);

export const stripe = new Stripe(secretKey, {
    apiVersion: "2022-11-15",
    appInfo: {
        name: "IgniteShop",
    },
});
