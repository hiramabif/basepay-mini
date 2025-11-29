"use client";

import { Header } from "./components/Header"; // COMPONENT: Top navigation bar.
import { PaymentForm } from "./components/PaymentForm"; // COMPONENT: Main application logic.

/**
 * Home Page
 * The main landing page of the application.
 * It assembles the Header and the main PaymentForm.
 */
export default function Home() {
  return (
    // MAIN CONTAINER:
    // - min-h-screen: Full height.
    // - flex-col: Stacks Header and Content vertically.
    // - bg-gradient-to-b: Subtle background gradient for depth.
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />

      {/* CONTENT WRAPPER: Centers content and adds padding */}
      <div className="flex-1 container mx-auto px-4 pt-0 pb-0 flex flex-col items-center">
        <div className="w-full max-w-[480px] flex-1 flex flex-col">
          {/* Payment Form Component: Handles the core logic */}
          <PaymentForm />
        </div>
      </div>
    </main>
  );
}
