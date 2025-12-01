// app/.well-known/farcaster.json/route.ts

export async function GET() {
    const appUrl = process.env.NEXT_PUBLIC_URL || "https://basepay.vercel.app";

    const manifest = {
        // 1. TEMPORARILY REMOVE accountAssociation
        // We will add this back in Phase 3 after the Base tool generates it for us.

        "baseBuilder": {
            // Make sure this is your correct Base/Coinbase Smart Wallet address
            "ownerAddress": "0x30B25D38a488370bE4E568A260bFeA636459E37A"
        },
        "miniapp": {
            "version": "1",
            "name": "BasePay",
            "homeUrl": appUrl,
            "iconUrl": `${appUrl}/icon.png`,
            "splashImageUrl": `${appUrl}/splash.png`,
            "splashBackgroundColor": "#0052FF",
            "webhookUrl": `${appUrl}/api/webhook`,
            "subtitle": "Hyper gas-optimized bulk ERC20 token transfer",
            "description": "Send tokens to multiple recipients in a single transaction.",
            "screenshotUrls": [
                `${appUrl}/screenshot1.png`,
                `${appUrl}/screenshot2.png`
            ],
            "primaryCategory": "finance",
            "tags": ["payments", "defi", "base"],
            "heroImageUrl": `${appUrl}/hero.png`,
            "tagline": "Bulk payments made easy",
            "ogTitle": "BasePay - Bulk Token Sender",
            "ogDescription": "Hyper gas-optimized bulk ERC20 token transfer on Base.",
            "ogImageUrl": `${appUrl}/og-image.png`,
            "noindex": true
        }
    };

    return Response.json(manifest, {
        status: 200,
        headers: {
            // 2. CRITICAL: Add CORS headers so the Base Validator can read this file
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}