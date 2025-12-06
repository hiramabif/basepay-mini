import { NextResponse } from "next/server";

function withValidProperties(properties: Record<string, undefined | string | string[]>) {
    return Object.fromEntries(
        Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
    );
}

export async function GET() {
    const URL = process.env.NEXT_PUBLIC_URL || "https://basepay-mini.vercel.app";
    return NextResponse.json(
        {
            "accountAssociation": {
                "header": "eyJmaWQiOjE1MzYyNzUsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgyYzdFQzAxOUVEOTk1OTFENGY2QTkwOUIyRmJENTM2RTIyOTUyQzJCIn0",
                "payload": "eyJkb21haW4iOiJiYXNlcGF5LW1pbmkudmVyY2VsLmFwcCJ9",
                "signature": "QLAlbMhXYHsXYODKzRFdyzzeSr6rc5XuZkvKejEi86UoM1JPc2NZgx+B3y0ST+mTbq8PysNto2OAVHiGWrtqSRw="
            },
            miniapp: {
                version: "1",
                name: "Pay with Base",
                homeUrl: URL,
                iconUrl: "https://basepay-mini.vercel.app/assets/Base_basemark_blue.png",
                splashImageUrl: "https://basepay-mini.vercel.app/assets/Base_basemark_blue.png",
                splashBackgroundColor: "#ffffff",
                webhookUrl: "https://basepay-mini.vercel.app/api/webhook",
                subtitle: "Fast, free, secure",
                description: "A fast, fun way to pay friends in real time.",
                screenshotUrls: [
                    "https://basepay-mini.vercel.app/assets/screenshot1.png",
                ],
                primaryCategory: "finance",
                tags: ["defi", "payment", "finance", "social", "miniapp"],
                heroImageUrl: "https://basepay-mini.vercel.app/assets/Base_basemark_blue.png",
                tagline: "Pay instantly",
                ogTitle: "Pay with Base",
                ogDescription: "Send fast bulk transfers with one click.",
                ogImageUrl: "https://basepay-mini.vercel.app/assets/Base_basemark_blue.png",
                noindex: false,
            }
        }
    ); // see the next step for the manifest_json_object
}