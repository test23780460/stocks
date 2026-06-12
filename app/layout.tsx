import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Disclaimer } from "@/components/MarketUi";
import "./globals.css";

export const metadata: Metadata = {
  title: "Market Signal Deck",
  description: "AI-powered stock and crypto research made simple."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Header />
          {children}
          <footer className="footer">
            <div className="grid two">
              <div>
                <strong>Market Signal Deck</strong>
                <p>Understand the market before you make your next move.</p>
              </div>
              <div>
                <Disclaimer compact />
                <p>
                  <Link href="/disclaimer">Full disclaimer</Link> · <Link href="/account">Account</Link> ·{" "}
                  <Link href="/admin">Admin</Link>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
