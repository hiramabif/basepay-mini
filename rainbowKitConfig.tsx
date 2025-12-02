"use client"

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
    coinbaseWallet,
    metaMaskWallet,
    rainbowWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
} from 'wagmi/chains';

const basepayId = process.env.NEXT_PUBLIC_BASE_PAY_ID

// Basic error handling for missing Project ID
if (!basepayId) {
    throw new Error("Error: NEXT_PUBLIC_WALLETCONNECT_PRO_ID is not defined. Please set it in your .env.local file");
}

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [
                (params: any) => coinbaseWallet({ ...params, appName: 'Pay with Base' }),
                rainbowWallet,
                metaMaskWallet,
                walletConnectWallet,
            ],
        },
    ],
    {
        appName: 'Pay with Base',
        projectId: basepayId!,
    }
);

const config = createConfig({
    connectors,
    chains: [base, mainnet, polygon, optimism, arbitrum, sepolia],
    transports: {
        [base.id]: http(),
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
        [sepolia.id]: http(),
    },
    ssr: false,
});

export default config;