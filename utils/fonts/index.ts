import { Roboto } from "next/font/google";

export const font = Roboto({
    subsets: ['latin'],
    weight: ['300', '400'],
    style: 'normal',
    preload: true,
    variable: '--strongwood-font',
    display: 'swap'
})