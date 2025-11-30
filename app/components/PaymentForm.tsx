"use client";
import { useEffect } from "react";

import { TokenSelector } from "./TokenSelector";
import { RecipientInput } from "./RecipientInput";
import { ChainSelector } from "./ChainSelector"; // Import ChainSelector
import { useAccount, useChainId } from "wagmi"; // Removed useChainId
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePaymentForm } from "../hooks/usePaymentForm";

export function PaymentForm() {
    const { isConnected } = useAccount();
    const chainId = useChainId();

    const {
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
        submissionError: error,
        receiptError: isError,
        resetTxStatus,
        isBridgeMode,
        setIsBridgeMode,
    } = usePaymentForm();

    useEffect(() => {
        if (isConfirmed || isError) {
            const timer = setTimeout(() => {
                resetTxStatus();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isConfirmed, isError, resetTxStatus]);

    const isTxLoading = isSigning || isProcessing;

    return (
        <div className="w-full flex-1 flex flex-col">
            <div className="glass-panel bg-white dark:bg-card p-4 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-center mb-6 shrink-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-foreground">BasePay</h2>
                        <img src="/assets/_base-square.svg" alt="Base Square" className="w-8 h-8" />
                    </div>
                </div>

                {/* TOP SECTION: Chain & Token Selector */}
                <div className="bg-input/50 rounded-2xl p-4 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                    {/* Chain Selector */}
                    <ChainSelector />

                    {/* Token Selector */}
                    <TokenSelector
                        selectedToken={selectedToken}
                        onSelect={setSelectedToken}
                    />
                </div>

                {/* RECIPIENTS SECTION */}
                <div className="space-y-2 flex-1 flex flex-col min-h-0">
                    {/* SCROLLABLE LIST: justify-end makes items stick to the bottom. pb-12 moves the stack up. */}
                    <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar flex-1 flex flex-col justify-end pb-12">
                        {/* Label inside the scrollable area so it sits just above the inputs */}
                        <div className="px-1 shrink-0 mb-2">
                            <span className="text-sm font-bold text-foreground">Recipient</span>
                        </div>

                        {recipients.map((recipient, index) => (
                            <RecipientInput
                                key={recipient.id}
                                id={recipient.id}
                                address={recipient.address}
                                amount={recipient.amount}
                                onChange={handleRecipientChange}
                                onRemove={removeRecipient}
                                index={index}
                                isLast={index === recipients.length - 1}
                            />
                        ))}
                    </div>

                    {/* Add Button - Bottom Right */}
                    <div className="flex justify-end shrink-0">
                        <button
                            onClick={addRecipient}
                            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 px-2 py-1"
                        >
                            + Add
                        </button>
                    </div>
                </div>

                {/* SUMMARY SECTION */}
                <div className="bg-input/50 rounded-2xl p-4 shrink-0 space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">Total Recipients:</span>
                        <span className="font-bold">{recipients.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">Total Amount:</span>
                        <span className="font-bold">{totalAmount > 0 ? totalAmount.toFixed(6) : "0.0"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">Token:</span>
                        <span className="font-bold">{selectedToken.symbol}</span>
                    </div>
                </div>

                {/* BRIDGE TOGGLE (Monad Only) */}
                {chainId === 143 && (
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-bold text-foreground flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isBridgeMode}
                                onChange={(e) => setIsBridgeMode(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            Bridge to Base
                        </label>
                        <span className="text-xs text-muted-foreground">via Lock/Mint</span>
                    </div>
                )}

                <div className="shrink-0 pt-2">
                    {!isConnected ? (
                        <div className="w-full flex justify-center">
                            <ConnectButton.Custom>
                                {({ openConnectModal }: { openConnectModal: () => void }) => (
                                    <button
                                        onClick={openConnectModal}
                                        className="w-1/2 py-4 rounded-2xl font-bold text-lg bg-[#0052FF] text-white hover:brightness-110 transition-all shadow-lg"
                                    >
                                        Try BasePay
                                    </button>
                                )}
                            </ConnectButton.Custom>
                        </div>
                    ) : (
                        <div className="w-full flex justify-center">
                            <button
                                onClick={handlePay}
                                disabled={isTxLoading || isConfirmed}
                                className={`w-1/2 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-200 ${isConfirmed
                                    ? "bg-green-500 text-white"
                                    : "bg-[#0052FF] text-white hover:brightness-110 active:scale-[0.98]"
                                    }`}
                            >
                                {isTxLoading ? "Processing..." : isConfirmed ? "Sent!" : "Pay"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
