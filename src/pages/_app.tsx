import type { AppProps } from "next/app";
import Image from "next/image";

import { globalStyles } from "@/styles/global";

import { Container, Header } from "@/styles/pages/app";

import Logo from "../assets/Logo.svg";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Container>
            <Header>
                <Image
                    src={Logo}
                    alt=""
                />
            </Header>
            <Component {...pageProps} />
        </Container>
    );
}
