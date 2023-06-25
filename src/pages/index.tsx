import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

import { HomeContainer, Product } from "@/styles/pages/home";

import shirt2 from "../assets/Shirt-1.png";
import shirt3 from "../assets/Shirt-2.png";
import shirt1 from "../assets/Shirt.png";

import "keen-slider/keen-slider.min.css";

export default function Home() {
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
            <Product className="keen-slider__slide">
                <Image
                    src={shirt1}
                    alt=""
                    width={520}
                    height={480}
                />

                <footer>
                    <strong>Camiseta 1</strong>
                    <span>R$ 79,90</span>
                </footer>
            </Product>
            <Product className="keen-slider__slide">
                <Image
                    src={shirt2}
                    alt=""
                    width={520}
                    height={480}
                />

                <footer>
                    <strong>Camiseta 2</strong>
                    <span>R$ 79,90</span>
                </footer>
            </Product>
            <Product className="keen-slider__slide">
                <Image
                    src={shirt3}
                    alt=""
                    width={520}
                    height={480}
                />

                <footer>
                    <strong>Camiseta 3</strong>
                    <span>R$ 79,90</span>
                </footer>
            </Product>
        </HomeContainer>
    );
}
