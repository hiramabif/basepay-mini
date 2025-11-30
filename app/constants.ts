

import { ContractsConfig } from "./interfaces";

export const chainsToTSender: ContractsConfig = {
    324: {
        tsender: "0x7e645Ea4386deb2E9e510D805461aA12db83fb5E",
        no_check: null,
    },
    1: {
        tsender: "0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821",
        no_check: "0x7D4a746Cb398e5aE19f6cBDC08473664ADBc6da5",
    },
    42161: {
        tsender: "0xA2b5aEDF7EEF6469AB9cBD99DE24a6881702Eb19",
        no_check: "0x091bAB6497F2Cc429c82c5807Df4faA34235Cccc",
    },
    10: {
        tsender: "0xAaf523DF9455cC7B6ca5637D01624BC00a5e9fAa",
        no_check: "0xa0c7ADA2c7c29729d12e2649BC6a0a293Ac46725",
    },
    8453: {
        tsender: "0x31801c3e09708549c1b2c9E1CFbF001399a1B9fa",
        no_check: "0x39338138414Df90EC67dC2EE046ab78BcD4F56D9",
    },
    31337: {
        tsender: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        no_check: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
    11155111: {
        tsender: "0xa27c5C77DA713f410F9b15d4B0c52CAe597a973a",
        no_check: "0xa27c5C77DA713f410F9b15d4B0c52CAe597a973a",
    }
}

export const tsenderAbi = [
    {
        type: "function",
        name: "airdropERC20",
        inputs: [
            {
                name: "tokenAddress",
                type: "address",
                internalType: "address",
            },
            {
                name: "recipients",
                type: "address[]",
                internalType: "address[]",
            },
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
            {
                name: "totalAmount",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "areListsValid",
        inputs: [
            {
                name: "recipients",
                type: "address[]",
                internalType: "address[]",
            },
            {
                name: "amounts",
                type: "uint256[]",
                internalType: "uint256[]",
            },
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool",
            },
        ],
        stateMutability: "pure",
    },
]