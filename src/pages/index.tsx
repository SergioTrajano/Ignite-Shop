import { useKeenSlider } from "keen-slider/react";
import Stripe from "stripe";

import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";

import { stripe } from "@/libs/stripe";

import "keen-slider/keen-slider.min.css";

import { GetServerSideProps } from "next";

interface HomeProps {
    products: {
        id: string;
        name: string;
        imageURL: string;
        price: number;
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
        <HomeContainer
            ref={sliderRef}
            className="keen-slider"
        >
            {products.map((product) => {
                return (
                    <Product
                        key={product.id}
                        className="keen-slider__slide"
                    >
                        <Image
                            src={product.imageURL}
                            alt=""
                            width={520}
                            height={480}
                        />

                        <footer>
                            <strong>{product.name}</strong>
                            <span>R$ {product.price / 100}</span>
                        </footer>
                    </Product>
                );
            })}
        </HomeContainer>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await stripe.products.list({
        expand: ["data.default_price"],
    });

    const products = data.map((product) => {
        const productPrice = product.default_price as Stripe.Price;

        return {
            id: product.id,
            name: product.name,
            imageURL: product.images[0],
            price: productPrice.unit_amount,
        };
    });

    return {
        props: {
            products,
        },
    };
};
