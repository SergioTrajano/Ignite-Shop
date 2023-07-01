import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";

import { stripe } from "@/libs/stripe";

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageURL: string;
        price: string;
        description: string;
        defaultPriceId: string;
    };
}

export default function Product({ product }: ProductProps) {
    const [isLoadingCheckoutSession, setIsLoadingCheckoutSession] = useState<boolean>(false);

    async function handleBuyProduct() {
        setIsLoadingCheckoutSession(true);

        try {
            const response = await axios.post("/api/stripeCheckout", {
                priceId: product.defaultPriceId,
            });

            const { checkoutURL } = response.data;

            window.location.href = checkoutURL;
        } catch (error) {
            setIsLoadingCheckoutSession(false);

            alert("Falha ao redirecionar ao checkout. Tente novamente mais tarde.");
        }
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image
                        src={product.imageURL}
                        alt=""
                        width={520}
                        height={480}
                    />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button
                        onClick={handleBuyProduct}
                        disabled={isLoadingCheckoutSession}
                    >
                        Comprar agora
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: "prod_OAtA997X8EJSpX" } },
            { params: { id: "prod_OAt8mSNpFh1rMV" } },
            { params: { id: "prod_OAt7sF26J768zb" } },
            { params: { id: "prod_OAt6Bz4PUNWYsN" } },
        ],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ["default_price"],
    });

    const productPrice = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageURL: product.images[0],
                price: new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                }).format(productPrice.unit_amount! / 100),
                description: product.description,
                defaultPriceId: productPrice.id,
            },
        },
        revalidate: 60 * 60 * 1, // 1 hour
    };
};
