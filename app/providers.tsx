"use client";


import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import config from '@/rainbowKitConfig';



import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Providers(props: { children: React.ReactNode }) {


    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider initialChain={base} modalSize="compact" theme={lightTheme({ accentColor: '#0052FF', accentColorForeground: 'white' })}>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};