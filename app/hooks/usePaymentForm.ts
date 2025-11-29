"use client";

import { useState, useMemo, useEffect } from "react";
import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient, useConfig } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { parseUnits, erc20Abi, isAddress, maxUint256 } from "viem";
import { DEFAULT_TOKENS } from "../components/TokenSelector";
import { chainsToTSender, tsenderAbi } from "../constants";
import { Recipient, Token } from "../interfaces";


export function usePaymentForm() {
    // State for the selected token
    const [selectedToken, setSelectedToken] = useState<Token>(DEFAULT_TOKENS[0]);

    // State for the list of recipients
    const [recipients, setRecipients] = useState<Recipient[]>([
        { id: "1", address: "", amount: "" },
    ]);

    // Wagmi hooks
    const account = useAccount();
    const chainId = useChainId();
    const config = useConfig();

    // Transaction status state.
    // isPending -> isSigning (Wallet interaction)
    // isLoading -> isProcessing (Transaction mining)
    // isSuccess -> isConfirmed (Transaction confirmed)
    const { data: hash, isPending: isSigning, error: submissionError, writeContractAsync, reset } = useWriteContract();
    const { isLoading: isProcessing, isSuccess: isConfirmed, isError: receiptError } = useWaitForTransactionReceipt({
        confirmations: 1,
        hash
    });

    // Calculate total amount to send
    const totalAmount = useMemo(() => {
        return recipients.reduce((acc, r) => acc + (parseFloat(r.amount) || 0), 0);
    }, [recipients]);

    // Get the T-Sender contract address for the current chain
    // Q: why the `?.` ? A: Optional chaining operator. It is used to safely attempt to access a property on an object that might be null or undefined without causing your application to crash.
    const tSenderAddress = chainsToTSender[chainId]?.tsender;

    // Read allowance for the selected token
    async function getAllowance(tSenderAddress: string | null): Promise<bigint> {
        // Validate the addresses
        if (!tSenderAddress || !account.address) {
            return BigInt(0);
        }
        const allowance = await readContract(config, {
            address: selectedToken.address as `0x${string}`,
            abi: erc20Abi,
            functionName: "allowance",
            args: [account.address, tSenderAddress as `0x${string}`],
        });

        return allowance as bigint;
    }

    // Handle recipient changes
    const handleRecipientChange = (id: string, field: "address" | "amount", value: string) => {
        setRecipients((prev) =>
            prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
        );
    };

    // Add a new recipient
    const addRecipient = () => {
        setRecipients((prev) => [
            ...prev,
            { id: Math.random().toString(36).substr(2, 9), address: "", amount: "" },
        ]);
    };

    // Remove a recipient
    const removeRecipient = (id: string) => {
        if (recipients.length === 1) return;
        setRecipients((prev) => prev.filter((r) => r.id !== id));
    };

    // Main payment handler
    async function handlePay() {
        //Important variables
        const decimals = selectedToken.decimals;
        const recipientsAddresses = recipients.map(r => r.address as `0x${string}`);
        const amounts = recipients.map(r => parseUnits(r.amount, decimals));

        // Calculate total amount in Wei (BigInt)
        const totalAmountWei = parseUnits(totalAmount.toFixed(decimals), decimals);

        /** PAY */
        /**
         * What is the payment flow?
         * 1. Validation
         * 2. Check approvals
         *  - To do this, we will need to get the amount approved.
         * 3. Approve if needed
         * 4. Send tokens
         */

        try {
            const isValid = recipients.every(r => isAddress(r.address) && r.amount && parseFloat(r.amount) > 0);
            if (!isValid) {
                alert("Please check recipient addresses and amounts");
                return;
            }

            if (!account.isConnected || !account.address) {
                alert("Please connect your wallet");
                return;
            }

            if (!tSenderAddress) {
                alert("Unsupported chain");
                return;
            }

            // 2. Check Approvals
            const approvedAmount = await getAllowance(tSenderAddress);

            if (approvedAmount < totalAmountWei) {
                //Let us approve
                const approvalHash = await writeContractAsync({
                    abi: erc20Abi, // the ABI for the ERC20 token contract
                    address: selectedToken.address as `0x${string}`,
                    functionName: "approve",// the approve function
                    args: [tSenderAddress as `0x${string}`, maxUint256] // approve the T-Sender contract for the total amount
                })

                // wait for transaction to complete then retrieve receipt.
                const approvalReceipt = await waitForTransactionReceipt(config, {
                    hash: approvalHash,
                })

                console.log("Transaction Approved: ", approvalReceipt)

                //Now pay by calling the airdropERC20 function on our contract.
                await writeContractAsync({
                    address: tSenderAddress as `0x${string}`,
                    abi: tsenderAbi,
                    functionName: "airdropERC20",
                    args: [
                        selectedToken.address as `0x${string}`,
                        recipientsAddresses,
                        amounts,
                        totalAmountWei
                    ],
                })
            } else {
                await writeContractAsync({
                    address: tSenderAddress as `0x${string}`,
                    abi: tsenderAbi,
                    functionName: "airdropERC20",
                    args: [
                        selectedToken.address as `0x${string}`,
                        recipientsAddresses,
                        amounts,
                        totalAmountWei
                    ],
                })
            }
        } catch (error) {
            console.error("Payment failed:", error);

            alert("Transaction failed. Check console for details.");
        }
    }

    // Reset transaction status
    const resetTxStatus = () => {
        reset();
    };

    return {
        // STATE & DATA
        selectedToken,
        setSelectedToken,
        recipients,
        totalAmount,

        // ACTIONS
        handleRecipientChange,
        addRecipient,
        removeRecipient,
        handlePay,

        // TRANSACTION STATUSES
        isSigning,
        isProcessing,
        isConfirmed,
        submissionError,
        receiptError,
        resetTxStatus,
    };
};
