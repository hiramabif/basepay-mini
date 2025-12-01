export async function GET() {
    const appUrl = process.env.NEXT_PUBLIC_URL || "https://basepay.vercel.app"; // Fallback to a placeholder

    const manifest = {
        "accountAssociation": {
            "header": "",
            "payload": "",
            "signature": ""
        },
        "baseBuilder": {
            "ownerAddress": "0x30B25D38a488370bE4E568A260bFeA636459E37A" // TODO: Add your Base Account address here
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
            "description": "Send tokens to multiple recipients in a single transaction with BasePay.",
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

    return Response.json(manifest);
}
