import { styled } from "..";

export const SuccessContainer = styled("main", {
    height: 656,
    margin: "0 auto",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    h1: {
        fontSize: "$2xl",
        color: "$gray100",
    },

    p: {
        maxWidth: 560,
        marginTop: "2rem",

        fontSize: "$xl",
        lineHeight: 1.4,
        color: "$gray300",

        textAlign: "center",
    },

    a: {
        marginTop: "5rem",

        display: "block",

        fontSize: "$lg",
        fontWeight: "bold",
        textDecoration: "none",
        color: "$green500",

        "&:hover": {
            color: "$green300",
        },
    },
});

export const ImageContainer = styled("div", {
    width: "100%",
    maxWidth: 130,
    height: 145,
    marginTop: "4rem",
    padding: "0.25rem",
    borderRadius: 8,
    background: "linear-gradient(100deg, #1ea483 0%, #7465d4 100%)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    img: {
        objectFit: "cover",
    },
});
