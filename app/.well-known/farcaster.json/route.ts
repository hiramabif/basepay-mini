import { NextResponse } from 'next/server';

// 1. The Helper Function (Filters out empty/undefined values)
function withValidProperties(properties: Record<string, undefined | string | string[] | any>) {
    return Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
    );
}

export async function GET() {
    const appUrl = "https://basepay-mini.vercel.app";

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
            name: "PaywithBase",
            homeUrl: appUrl,
            iconUrl: `${appUrl}/assets/Base_square_blue.png`,
            splashImageUrl: `${appUrl}/assets/Base_square_blue.png`,
            splashBackgroundColor: "#ffffff",
            webhookUrl: `${appUrl}/api/webhook`,
            subtitle: "onChain,Fast,Secure,0Fees",
            description: "Send bulk transactions in one click.",
            screenshotUrls: [
                `${appUrl}/assets/screenshot1.png`,
                `${appUrl}/assets/screenshot2.png`
            ],
            primaryCategory: "finance",
            tags: ["payments", "defi", "base"],
            heroImageUrl: `${appUrl}/assets/Base_square_blue.png`,
            tagline: "Bulk payments made easy",
            ogTitle: "Pay with Base - Bulk Token Sender",
            ogDescription: "onChain,Fast,Secure,0Fees.",
            ogImageUrl: `${appUrl}/assets/Base_square_blue.png`,
            noindex: false, // Note: Strings are safer for clean JSON output
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