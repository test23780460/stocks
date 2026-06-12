"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { assets } from "@/lib/market-data";

const navItems = [
  ["Dashboard", "/dashboard"],
  ["Stocks", "/screeners/stocks"],
  ["Crypto", "/screeners/crypto"],
  ["Predictions", "/predictions"],
  ["News", "/news"],
  ["Compare", "/compare"],
  ["Watchlist", "/watchlist"],
  ["Learn", "/learn"]
];

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [beginnerMode, setBeginnerMode] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("msd-beginner-mode");
    if (saved) {
      const next = saved === "true";
      document.documentElement.dataset.mode = next ? "beginner" : "advanced";
      const timeout = window.setTimeout(() => setBeginnerMode(next), 0);
      return () => window.clearTimeout(timeout);
    }
  }, []);

  const matches = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const normalized = query.trim().toLowerCase();
    return assets
      .filter((asset) => asset.symbol.toLowerCase().includes(normalized) || asset.name.toLowerCase().includes(normalized))
      .slice(0, 5);
  }, [query]);

  function search(symbol: string) {
    const normalized = symbol.trim().toUpperCase();
    setQuery("");
    router.push(`/asset/${encodeURIComponent(normalized)}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) {
      search(query);
    }
  }

  function toggleMode() {
    const next = !beginnerMode;
    setBeginnerMode(next);
    window.localStorage.setItem("msd-beginner-mode", String(next));
    document.documentElement.dataset.mode = next ? "beginner" : "advanced";
  }

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Market Signal Deck home">
        <span className="brand-mark">MS</span>
        <span>Market Signal Deck</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <form className="search-box" onSubmit={onSubmit}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a stock or crypto — try NVDA, BTC, TSLA"
            aria-label="Search a stock or crypto"
          />
          {matches.length > 0 ? (
            <div className="autocomplete">
              {matches.map((asset) => (
                <button type="button" key={asset.symbol} onClick={() => search(asset.symbol)}>
                  <strong>{asset.symbol}</strong>
                  <span className="muted">{asset.name}</span>
                </button>
              ))}
            </div>
          ) : null}
        </form>
        <button className="beginner-toggle" onClick={toggleMode} type="button">
          {beginnerMode ? "Beginner mode" : "Advanced mode"}
        </button>
      </div>
    </header>
  );
}
