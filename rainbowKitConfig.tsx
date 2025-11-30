"use client"

import { lightTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    monad
} from 'wagmi/chains';

const basepayId = process.env.NEXT_PUBLIC_BASE_PAY_ID

// Basic error handling for missing Project ID
if (!basepayId) {
    throw new Error("Error: NEXT_PUBLIC_WALLETCONNECT_PRO_ID is not defined. Please set it in your .env.local file");
}

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: basepayId!,
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, monad],
    ssr: false, // If your dApp uses server side rendering (SSR)
});

export default config;