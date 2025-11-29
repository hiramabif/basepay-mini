"use client";

import { useState, useRef } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useClickOutside } from "../hooks/useClickOutside";

// Map chain IDs to logos
const CHAIN_LOGOS: Record<number, string> = {
    8453: "/assets/_base-square.svg", // Base
    1: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png", // Mainnet
    137: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png", // Polygon
    10: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png", // Optimism
    42161: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png", // Arbitrum
    11155111: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png", // Sepolia (use ETH logo)
};

export function ChainSelector() {
    const { isConnected } = useAccount();
    const chainId = useChainId();
    const { chains, switchChain } = useSwitchChain();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useClickOutside(dropdownRef, () => setIsOpen(false));

    // Find current chain object
    const currentChain = chains.find(c => c.id === chainId);

    if (!isConnected) {
        return (
            <ConnectButton.Custom>
                {({ openConnectModal }: { openConnectModal: () => void }) => (
                    <button
                        onClick={openConnectModal}
                        className="flex items-center gap-2 bg-background/50 rounded-full px-3 py-1.5 border border-border/50 shadow-sm hover:bg-secondary/50 transition-colors"
                    >
                        <span className="font-bold text-sm text-muted-foreground">Not Connected :(</span>
                    </button>
                )}
            </ConnectButton.Custom>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-background/50 rounded-full px-3 py-1.5 border border-border/50 shadow-sm hover:bg-secondary/50 transition-colors"
            >
                {/* Logo */}
                {CHAIN_LOGOS[chainId] ? (
                    <img src={CHAIN_LOGOS[chainId]} alt={currentChain?.name} className="w-5 h-5 rounded-md" />
                ) : (
                    <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                        {currentChain?.name?.[0] || "?"}
                    </div>
                )}

                <span className="font-bold text-sm">{currentChain?.name || "Unknown Chain"}</span>

                {/* Chevron */}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 z-50 glass-panel rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 shadow-2xl border border-border/50">
                    <div className="max-h-60 overflow-y-auto p-1">
                        {chains.map((chain) => (
                            <button
                                key={chain.id}
                                onClick={() => {
                                    switchChain({ chainId: chain.id });
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors ${chainId === chain.id
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-secondary/50"
                                    }`}
                            >
                                {CHAIN_LOGOS[chain.id] ? (
                                    <img src={CHAIN_LOGOS[chain.id]} alt={chain.name} className="w-5 h-5 rounded-md" />
                                ) : (
                                    <div className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center text-[10px] font-bold text-foreground">
                                        {chain.name[0]}
                                    </div>
                                )}
                                <span className="font-bold text-xs text-left">{chain.name}</span>
                                {chainId === chain.id && (
                                    <div className="ml-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
