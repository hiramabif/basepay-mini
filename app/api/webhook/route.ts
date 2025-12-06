import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Webhook received:", body);

        // TODO: Verify signature and handle notifications addition
        // For now, return 200 OK to allow the app to be added
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
