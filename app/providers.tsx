"use client";


import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { WagmiProvider } from 'wagmi';
import { darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import config from '@/rainbowKitConfig';
import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Providers(props: { children: React.ReactNode }) {
    useEffect(() => {
        sdk.actions.ready();
    }, [])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="compact" theme={lightTheme({ accentColor: '#0052FF', accentColorForeground: 'white' })}>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};