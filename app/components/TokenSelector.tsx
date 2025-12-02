"use client"; // DIRECTIVE: Client-side component (uses useState, useEffect).

import { useState, useRef } from "react"; // HOOKS: React state and lifecycle hooks.
import { isAddress, erc20Abi } from "viem"; // LIB: 'viem' is a lightweight library for Ethereum interactions.
import { usePublicClient } from "wagmi"; // HOOK: Access the blockchain provider.
import { Token } from "../interfaces"; // TYPE: Imported Token interface
import { useClickOutside } from "../hooks/useClickOutside"; // HOOK: Custom hook to detect clicks outside a component.

// CONSTANT: Hardcoded list of popular tokens to show by default.
const DEFAULT_TOKENS: Token[] = [
    {
        symbol: "WETH",
        name: "Wrapped Ether",
        address: "0x4200000000000000000000000000000000000006",
        decimals: 18,
        logoUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
    },
    {
        symbol: "USDC",
        name: "USD Coin",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base Mainnet USDC
        decimals: 6,
        logoUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
    },
    {
        symbol: "USDT",
        name: "Tether USD",
        address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2", // Base Mainnet USDT
        decimals: 6,
        logoUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
    },
    {
        symbol: "DAI",
        name: "Dai Stablecoin",
        address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // Base Mainnet DAI
        decimals: 18,
        logoUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
    },
];

// PROPS: Data passed from parent (PaymentForm) to this component.
interface TokenSelectorProps {
    selectedToken: Token; // The currently selected token.
    onSelect: (token: Token) => void; // Function to call when user picks a new token.
}

function TokenSelector({ selectedToken, onSelect }: TokenSelectorProps) {
    /**
     * State to control the visibility of the token dropdown menu.
     * 
     * - `isOpen`: The current value (boolean). `true` means the menu is visible, `false` means hidden.
     * - `setIsOpen`: The function we call to update this value.
     * - `useState(false)`: React hook that initializes this state to `false` (hidden by default).
     * 
     * This is used in the JSX below to conditionally render the dropdown: `{isOpen && (...)}`.
     */
    // STATE: Visibility of the dropdown menu.
    const [isOpen, setIsOpen] = useState(false);
    // STATE: Search input value.
    const [searchQuery, setSearchQuery] = useState("");
    // STATE: List of available tokens. Can be updated if user imports a custom token.
    const [tokens, setTokens] = useState<Token[]>(DEFAULT_TOKENS);
    // STATE: UI mode for importing a custom token.
    const [isImporting, setIsImporting] = useState(false);
    // STATE: Input value for custom token address.
    const [customAddress, setCustomAddress] = useState("");

    // REF: Reference to the dropdown container for click-outside detection.
    const dropdownRef = useRef<HTMLDivElement>(null);
    // HOOK: Close dropdown when clicking outside of it.
    useClickOutside(dropdownRef, () => setIsOpen(false));

    // LOGIC: Filter tokens based on search query.
    const filteredTokens = tokens.filter(t => {
        const query = searchQuery.toLowerCase();
        return t.symbol.toLowerCase().includes(query) ||
            t.name.toLowerCase().includes(query);
    });

    // HOOK: Access the public client to read from blockchain.
    const publicClient = usePublicClient();

    /**
     * FUNCTION: Import a custom token from the blockchain.
     */
    const handleImport = async () => {
        // VALIDATION: Use viem's isAddress to check checksums and format.
        if (!isAddress(customAddress)) {
            alert("Invalid address");
            return;
        }

        try {
            // FETCH: Read multiple contract values in parallel for speed.
            const [symbol, name, decimals] = await Promise.all([
                publicClient?.readContract({
                    address: customAddress,
                    abi: erc20Abi, // Standard ERC20 Interface
                    functionName: 'symbol',
                }) as Promise<string>,
                publicClient?.readContract({
                    address: customAddress,
                    abi: erc20Abi,
                    functionName: 'name',
                }) as Promise<string>,
                publicClient?.readContract({
                    address: customAddress,
                    abi: erc20Abi,
                    functionName: 'decimals',
                }) as Promise<number>,
            ]);

            // CREATE: New token object.
            const newToken: Token = {
                symbol: symbol || "CUSTOM",
                name: name || "Custom Token",
                address: customAddress,
                decimals: decimals || 18,
                logoUrl: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png", // Fallback logo
            };

            // UPDATE: Add to list and select it.
            setTokens([...tokens, newToken]);
            onSelect(newToken);
            // RESET: Clear form and close dropdown.
            setCustomAddress("");
            setIsImporting(false);
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to fetch token details:", error);
            alert("Failed to fetch token details. Please check the address and try again.");
        }
    };

    return (
        /* 
         * STYLING STRATEGY:
         * We use a "relative" container so the dropdown (absolute positioned) 
         * stays anchored to this specific button, not the whole page.
         */
        // CONTAINER: Relative positioning is crucial for the absolute dropdown to anchor correctly.
        <div className="relative" ref={dropdownRef}>
            {/* 
             * VISUAL DESIGN:
             * "Glassmorphism" effect created with bg-background/50 (50% opacity) 
             * and backdrop-blur (inherited from parent or global css).
             * The 'shadow-sm' and 'border' add depth to make it pop off the page.
             */}
            {/* 
                TRIGGER BUTTON: 
                The main pill-shaped button showing the selected token.
                Uses glassmorphism (bg-background/50) and rounded-full for the slick look.
            */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-background/50 rounded-full p-1 pr-3 border border-border/50 shadow-sm hover:bg-secondary/50 transition-colors"
            >
                <img
                    src={selectedToken.logoUrl}
                    alt={selectedToken.symbol}
                    className="w-6 h-6 rounded-full"
                />
                <div className="flex flex-col items-start leading-none">
                    <span className="font-bold text-sm">{selectedToken.symbol}</span>
                    <span className="text-[10px] text-muted-foreground">{selectedToken.name}</span>
                </div>
                {/* ICON: Chevron that rotates when open */}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-1 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {/* DROPDOWN MENU: Conditionally rendered when isOpen is true */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 z-50 glass-panel rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 shadow-2xl border border-border/50">
                    {/* SEARCH BAR */}
                    <div className="p-2 border-b border-border/50">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-secondary/30 rounded-xl px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-primary/50"
                            autoFocus
                        />
                    </div>

                    {/* TOKEN LIST: Scrollable area */}
                    <div className="max-h-60 overflow-y-auto p-1">
                        {filteredTokens.map((token) => (
                            <button
                                key={token.address}
                                onClick={() => {
                                    onSelect(token); // Notify parent
                                    setIsOpen(false); // Close dropdown
                                }}
                                className={`w-full flex items-center gap-3 p-2 rounded-xl transition-colors ${selectedToken.address === token.address
                                    ? "bg-primary/10 text-primary" // Highlight selected
                                    : "hover:bg-secondary/50" // Hover effect
                                    }`}
                            >
                                <img
                                    src={token.logoUrl}
                                    alt={token.symbol}
                                    className="w-6 h-6 rounded-full"
                                />
                                <div className="text-left">
                                    <div className="font-bold text-xs">{token.symbol}</div>
                                    <div className="text-[10px] opacity-70">{token.name}</div>
                                </div>
                                {/* CHECKMARK: Show if selected */}
                                {selectedToken.address === token.address && (
                                    <div className="ml-auto">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </div>
                                )}
                            </button>
                        ))}

                        {/* IMPORT SECTION: Allow adding custom tokens */}
                        <div className="pt-1 mt-1 border-t border-border/50">
                            {!isImporting ? (
                                // BUTTON: Show "Import Token"
                                <button
                                    onClick={() => setIsImporting(true)}
                                    className="w-full p-2 text-xs text-primary hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    + Import Token
                                </button>
                            ) : (
                                // FORM: Input for address
                                <div className="p-2 space-y-2 bg-secondary/20 rounded-xl">
                                    <input
                                        type="text"
                                        placeholder="0x..."
                                        value={customAddress}
                                        onChange={(e) => setCustomAddress(e.target.value)}
                                        className="w-full p-2 rounded-lg bg-background border border-border/50 text-[10px] outline-none focus:border-primary"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsImporting(false)}
                                            className="flex-1 px-2 py-1 text-[10px] rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleImport}
                                            className="flex-1 px-2 py-1 text-[10px] rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                        >
                                            Import
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { DEFAULT_TOKENS, TokenSelector, type Token }