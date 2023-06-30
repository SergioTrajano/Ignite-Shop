import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { useRouter } from "next/router";

export default function Product() {
    const { query } = useRouter();

    console.log(query);

    return (
        <ProductContainer>
            <ImageContainer></ImageContainer>

            <ProductDetails>
                <h1>Camiseta X</h1>
                <span>R$ 79,90</span>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, nisi. Fuga culpa
                    totam magni accusamus, reprehenderit blanditiis amet dicta quis ab fugit. Non
                    rerum iste cumque nam illum aperiam alias.
                </p>

                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    );
}
