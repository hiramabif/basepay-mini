

/**
 * Root Layout
 * This is the top-most layout component that wraps all pages in the application.
 * It defines the HTML structure, global fonts, and providers (context).
 */
import "./globals.css" // IMPORT: Global CSS styles (Tailwind directives, variables).
import type { Metadata } from "next" // TYPE: For SEO metadata.
import { Inter } from "next/font/google" // FONT: Optimized Google Font loader.
import { type ReactNode } from "react"
import { Providers } from "./providers" // COMPONENT: Wraps app in context providers (Wagmi, RainbowKit).

// FONT CONFIG: Load the Inter font with 'latin' subset.
// 'variable' allows us to use it as a CSS variable (--font-inter).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// METADATA: SEO configuration for the app.
export const metadata: Metadata = {
  title: "BasePay",
  description: "Hyper gas-optimized bulk ERC20 token transfer",
  other: {
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://basepay.vercel.app/api/og", // Placeholder, needs real URL
      button: {
        title: "Launch BasePay",
        action: {
          type: "launch_miniapp",
          name: "BasePay",
          url: "https://basepay.vercel.app", // Placeholder, needs real URL
          splashImageUrl: "https://basepay.vercel.app/splash.png", // Placeholder
          splashBackgroundColor: "#0052FF",
        },
      },
    }),
  },
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    // HTML: 
    // - lang="en": Accessibility best practice.
    // - className={inter.variable}: Injects the font variable into the root.
    <html lang="en" className={inter.variable}>
      <head>
      </head>
      {/* 
        BODY:
        - bg-background: Uses the --background CSS variable (white/dark blue).
        - text-foreground: Uses the --foreground CSS variable (black/white).
        - antialiased: Makes fonts look smoother.
        - min-h-screen: Ensures the body is at least as tall as the screen.
      */}
      <body className="bg-background text-foreground antialiased min-h-screen selection:bg-primary selection:text-primary-foreground">
        {/* 
          Providers:
          Wraps the app with WagmiConfig and RainbowKitProvider to enable 
          wallet connection and blockchain interactions throughout the app.
        */}
        <Providers>
          {props.children}
        </Providers>
      </body>
    </html>
  )
}