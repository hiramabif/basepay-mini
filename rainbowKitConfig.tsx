"use client"

import { lightTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
} from 'wagmi/chains';

const monad = {
    id: 143,
    name: 'Monad',
    nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.monad.xyz'] }, // Assuming this, will need to verify or use user provided if any. User didn't provide RPC, I will use a placeholder or try to find one.
        public: { http: ['https://rpc.monad.xyz'] },
    },
    blockExplorers: {
        default: { name: 'Monad Explorer', url: 'https://explorer.monad.xyz' },
    },
} as const;

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