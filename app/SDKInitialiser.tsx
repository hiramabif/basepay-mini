
"use client"; // CRITICAL: Marks this as a Client Component

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export function SDKInitializer() {
    // useEffect runs only on the client after hydration
    useEffect(() => {
        sdk.actions.ready(); // Call is guaranteed to run here
    }, []);
    return null; // Doesn't render any UI
}