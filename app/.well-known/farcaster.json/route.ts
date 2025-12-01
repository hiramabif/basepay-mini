import { NextResponse } from 'next/server';

// 1. The Helper Function (Filters out empty/undefined values)
function withValidProperties(properties: Record<string, undefined | string | string[] | any>) {
    return Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
    );
}

export async function GET() {
    const appUrl = process.env.NEXT_PUBLIC_URL || "https://basepay.vercel.app";

    // 2. Define the Manifest
    const manifest = {
        // Leave accountAssociation empty for the FIRST deploy to generate keys
        // Once generated, paste them here and redeploy.
        "accountAssociation": {
            "header": "eyJmaWQiOjE1MzYyNzUsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgyYzdFQzAxOUVEOTk1OTFENGY2QTkwOUIyRmJENTM2RTIyOTUyQzJCIn0",
            "payload": "eyJkb21haW4iOiJiYXNlcGF5LW1pbmkudmVyY2VsLmFwcCJ9",
            "signature": "QLAlbMhXYHsXYODKzRFdyzzeSr6rc5XuZkvKejEi86UoM1JPc2NZgx+B3y0ST+mTbq8PysNto2OAVHiGWrtqSRw="
        },

        baseBuilder: withValidProperties({
            ownerAddress: "0x30B25D38a488370bE4E568A260bFeA636459E37A",
        }),
        miniapp: withValidProperties({
            version: "1",
            name: "BasePay",
            homeUrl: appUrl,
            iconUrl: `${appUrl}/icon.png`,
            splashImageUrl: `${appUrl}/splash.png`,
            splashBackgroundColor: "#0052FF",
            webhookUrl: `${appUrl}/api/webhook`,
            subtitle: "Fast, Secure, 0 Fees",
            description: "Send tokens to multiple recipients in a single transaction.",
            screenshotUrls: [
                `${appUrl}/screenshot1.png`,
                `${appUrl}/screenshot2.png`
            ],
            primaryCategory: "finance",
            tags: ["payments", "defi", "base"],
            heroImageUrl: `${appUrl}/hero.png`,
            tagline: "Bulk payments made easy",
            ogTitle: "BasePay - Bulk Token Sender",
            ogDescription: "Hyper gas-optimized bulk ERC20 token transfer on Base.",
            ogImageUrl: `${appUrl}/og-image.png`,
            noindex: true, // Note: Strings are safer for clean JSON output
        }),
    };

    // 3. Return Response with CORS Headers
    return NextResponse.json(manifest, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}