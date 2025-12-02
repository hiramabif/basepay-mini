/**
 * "use client" Directive:
 * This tells Next.js that this component should be rendered on the client-side (in the browser).
 * We need this because we use `useState`, `useEffect`, and `window` (browser APIs) which
 * don't exist on the server.
 */
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit"; // COMPONENT: RainbowKit's wallet connection button.
import { useEffect, useState } from "react"; // HOOKS: React state and lifecycle.

export function Header() {
    // STATE: Track if dark mode is active.
    const [isDark, setIsDark] = useState(false);

    /**
     * Effect: Check System Preference
     * When the component mounts (empty dependency array []), we check if the user's
     * operating system prefers dark mode. If so, we automatically enable it.
     */
    useEffect(() => {
        // CHECK: Does the browser support matchMedia AND does it match dark scheme?
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDark(true);
            document.documentElement.classList.add('dark'); // Add class to <html> tag.
        }
    }, []);

    /**
     * Toggle Theme Function
     * Switches between light and dark mode by:
     * 1. Updating local state (`isDark`)
     * 2. Adding/Removing the 'dark' class from the <html> element (Tailwind uses this class)
     * 3. Saving preference to localStorage so it persists on reload
     */
    const toggleTheme = () => {
        setIsDark(!isDark);
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        // HEADER CONTAINER:
        // - sticky top-0: Keeps header visible when scrolling.
        // - z-50: Ensures it stays on top of other content.
        // - backdrop-blur: Creates the frosted glass effect.
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* LOGO SECTION */}
                {/* LOGO SECTION */}
                <div className="flex items-center">
                    <img
                        src="/assets/Base_basemark_blue.png"
                        alt="BasePay"
                        className="h-12 w-auto object-contain"
                    />
                </div>

                {/* RIGHT ACTIONS: Theme Toggle & Wallet Connect */}
                <div className="flex items-center gap-4">
                    {/* THEME TOGGLE BUTTON */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            // SUN ICON (for Dark Mode)
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" />
                            </svg>
                        ) : (
                            // MOON ICON (for Light Mode)
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                        )}
                    </button>

                    <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" label="Get Based" />
                </div>
            </div>
        </header>
    );
}
