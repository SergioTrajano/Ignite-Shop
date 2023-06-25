import Image from "next/image";

import { HomeContainer, Product } from "@/styles/pages/home";

import shirt2 from "../assets/Shirt-1.png";
import shirt1 from "../assets/Shirt.png";

export default function Home() {
    return (
        <HomeContainer>
            <Product>
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
            <Product>
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
        </HomeContainer>
    );
}
