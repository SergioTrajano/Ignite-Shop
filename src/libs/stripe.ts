import Stripe from "stripe";

const secreteKey = String(process.env.VITE_STRIPE_SECRETY_KEY);

export const stripe = new Stripe(secreteKey, {
    apiVersion: "2022-11-15",
    appInfo: {
        name: "IgniteShop",
    },
});
