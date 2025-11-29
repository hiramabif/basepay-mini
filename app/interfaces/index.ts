"use client";

/**
 * Represents a recipient in the payment form.
 * Used to track the address and amount for each recipient in the list.
 */
export interface Recipient {
    id: string;
    address: string;
    amount: string;
}

/**
 * Represents a cryptocurrency token.
 * Contains metadata needed for display and contract interaction.
 */
export type Token = {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoUrl?: string;
};

/**
 * Configuration for contract addresses across different chains.
 * Maps chain IDs to contract addresses.
 */
export interface ContractsConfig {
    [chainId: number]: {
        tsender: string
        no_check: string | null
    }
}
