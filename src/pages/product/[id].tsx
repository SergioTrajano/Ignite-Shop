import { GetStaticPaths, GetStaticProps } from "next";
import Stripe from "stripe";

import { stripe } from "@/libs/stripe";

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import Image from "next/image";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageURL: string;
        price: string;
        description: string;
    };
}

export default function Product({ product }: ProductProps) {
    return (
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

                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
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
            },
        },
        revalidate: 60 * 60 * 1, // 1 hour
    };
};