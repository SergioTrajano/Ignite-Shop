import { useKeenSlider } from "keen-slider/react";
import Head from "next/head";
import Stripe from "stripe";

import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import { stripe } from "@/libs/stripe";

import "keen-slider/keen-slider.min.css";

import { GetStaticProps } from "next";
import Link from "next/link";

interface HomeProps {
    products: {
        id: string;
        name: string;
        imageURL: string;
        price: string;
    }[];
}

export default function Home({ products }: HomeProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 2.5,
            spacing: 48,
        },
    });

    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
            </Head>
            <HomeContainer
                ref={sliderRef}
                className="keen-slider"
            >
                {products.map((product) => {
                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                        >
                            <Product className="keen-slider__slide">
                                <Image
                                    src={product.imageURL}
                                    alt=""
                                    width={520}
                                    height={480}
                                />

                                <footer>
                                    <strong>{product.name}</strong>
                                    <span>{product.price}</span>
                                </footer>
                            </Product>
                        </Link>
                    );
                })}
            </HomeContainer>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await stripe.products.list({
        expand: ["data.default_price"],
    });

    const products = data.map((product) => {
        const productPrice = product.default_price as Stripe.Price;

        return {
            id: product.id,
            name: product.name,
            imageURL: product.images[0],
            price: new Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
            }).format(productPrice.unit_amount! / 100),
        };
    });

    return {
        props: {
            products,
        },
        revalidate: 60 * 60 * 2,
    };
};
