# Pay with Base MiniApp 🔵

[**https://basepay-mini.vercel.app**](https://basepay-mini.vercel.app)

> The coolest, most efficient way to send crypto on Base. Built for the Superchain.

## Use Case
Pay with Base MiniApp is designed for **bulk token distribution**. Whether you're a DAO contributor paying out grants, a friend splitting a dinner bill among 10 people, or an airdrop organizer, Pay with Base MiniApp lets you send ERC-20 tokens or ETH to multiple recipients in a **single transaction**.

## Stack
Built with the bleeding edge of onChain and frontend tech:
-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Blockchain Interaction**: [Wagmi v3](https://wagmi.sh/) & [Viem](https://viem.sh/)
-   **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/) & [AppKit](https://reown.com/)
-   **Social Integration**: [Farcaster Miniapp SDK](https://docs.farcaster.xyz/)

## 💡 The Problem
Sending crypto to multiple people usually sucks:
1.  **Tedious**: You have to copy-paste addresses and sign a transaction for *each* person.
2.  **Expensive**: You pay base gas fees for every single transfer.
3.  **Slow**: Waiting for 10 confirmations is boring.

**BasePay Mini fixes this.**
-   **Batching**: We use a smart contract (`TSender`) to bundle all transfers into one on-chain transaction.
-   **Gas Savings**: One transaction = One gas fee (plus a tiny bit for the calldata).
-   **Speed**: Done in seconds.

## ✨ Why It's The Coolest Thing Ever
-   **Farcaster Native**: Designed to work seamlessly as a Farcaster Miniapp.
-   **Zero Clutter**: A "Glassmorphism" UI that looks premium and feels native to Base.
-   **Smart Validation**: Automatically checks balances and allowances before you even click "Pay".
-   **Auto-Reset**: The UI knows when you're done and resets itself, ready for the next batch.

## 📖 Getting Started

### Prerequisites
-   Node.js & pnpm
-   A wallet (Coinbase Wallet, MetaMask, etc.)

### Installation
```bash
git clone https://github.com/yourusername/basepay-mini.git
cd basepay-mini
pnpm install
```

### Run Locally
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

## 💻 Code Walkthrough

### The Core Logic: `usePaymentForm.ts`
The magic happens in our custom hook. It handles the complex "Approve -> Send" flow automatically.

```typescript
// 1. We check if the contract is allowed to spend your tokens
const approvedAmount = await getAllowance(tSenderAddress);

if (approvedAmount < totalAmountWei) {
    // 2. If not, we ask for approval first
    const approvalHash = await writeContractAsync({
        functionName: "approve",
        args: [tSenderAddress, maxUint256]
    });
    await waitForTransactionReceipt({ hash: approvalHash });
}

// 3. Then we fire the batch transaction
await writeContractAsync({
    functionName: "airdropERC20",
    args: [token, recipients, amounts, total]
});
```

### The UI: `PaymentForm.tsx`
We keep the UI clean by separating logic. The form listens to the transaction state (`isSigning`, `isProcessing`, `isConfirmed`) to give real-time feedback.

```tsx
<button disabled={isTxLoading}>
    {isTxLoading ? "Processing..." : isConfirmed ? "Sent!" : "Pay"}
</button>
```

## 🌐 Live Demo
Check it out live on Vercel:
[**https://basepay-mini.vercel.app**](https://basepay-mini.vercel.app)

---
Built with 💙 on Base.