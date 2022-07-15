import { Fonts } from "./types";

export const baseText = {
    fontFamily: "'Lato', 'Roboto', 'Noto Sans SC Sliced', 'Helvetica', 'Arial', sans-serif",
    fontStyle: "normal",
}

export const typography: Fonts = {
    h1Regular: {
        ...baseText,
        fontSize: '1.4996rem',
        fontWeight: '300',
        lineHeight: '1.167px',
    },
    bodyRegular: {
        ...baseText,
        fontWeight: "500",
        fontSize: "0.875rem",
        lineHeight: "1.75",
    }, 
    bodyBold: {
        ...baseText,
        fontWeight: "700",
        fontSize: "0.8125rem",
        lineHeight: "1.75",
    },
    buttonBold: {
        ...baseText,
        fontWeight: '600',
        fontSize: '0.8125rem',
        lineHeight: '1.75px'
    },
    label: {
        ...baseText,
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '1px'
    },
    uppercaseRegular: {
        ...baseText,
        fontWeight: '400',
        fontSize: '0.875rem',
        lineHeight: '1.43px',
        textTransform: 'uppercase'
    },
    uppercaseBold: {
        ...baseText,
        fontWeight: '700',
        fontSize: '0.8125rem',
        lineHeight: '1.75px',
        textTransform: 'uppercase'
    },
}