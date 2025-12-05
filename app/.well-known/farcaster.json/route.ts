import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.redirect(
        "https://api.farcaster.xyz/miniapps/hosted-manifest/019af0a9-8e31-7c6e-4935-8abb525a2c53",
        { status: 307 }
    );
}