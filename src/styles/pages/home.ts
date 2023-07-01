import { styled } from "..";

export const HomeContainer = styled("main", {
    width: "100%",
    maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
    minHeight: 656,
    marginLeft: "auto",
    marginBottom: "2rem",

    display: "flex",
});

export const Product = styled("div", {
    minWidth: 540,
    borderRadius: 8,
    background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",
    overflow: "hidden",

    position: "relative",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    cursor: "pointer",

    img: {
        objectFit: "cover",
    },

    footer: {
        padding: "2rem",
        borderRadius: 6,
        backgroundColor: "rgba(0, 0, 0, 0.6)",

        transform: "translateY(110%)",
        opacity: 0,
        transition: "all 0.2s ease-in-out",

        position: "absolute",
        bottom: "0.25rem",
        left: "0.25rem",
        right: "0.25rem",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        strong: {
            fontSize: "$lg",
            color: "$gray100",
        },

        span: {
            fontSize: "$xl",
            fontWeight: "bold",
            color: "$green300",
        },
    },

    "&:hover": {
        footer: {
            transform: "translateY(0%)",
            opacity: 1,
        },
    },
});
