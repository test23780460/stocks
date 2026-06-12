"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { assets, formatMoney, getAsset } from "@/lib/market-data";
import { Badge, EmptyState, signalTone } from "@/components/MarketUi";

type Watchlist = {
  id: string;
  name: string;
  symbols: string[];
};

const fallbackLists: Watchlist[] = [
  {
    id: "demo-ai",
    name: "AI and cloud research",
    symbols: ["NVDA", "MSFT", "META"]
  }
];

export function WatchlistManager() {
  const [lists, setLists] = useState<Watchlist[]>(fallbackLists);
  const [selectedId, setSelectedId] = useState("demo-ai");
  const [newName, setNewName] = useState("");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("msd-watchlists");
    if (saved) {
      const timeout = window.setTimeout(() => setLists(JSON.parse(saved)), 0);
      return () => window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("msd-watchlists", JSON.stringify(lists));
  }, [lists]);

  const selected = useMemo(() => lists.find((list) => list.id === selectedId) ?? lists[0], [lists, selectedId]);

  function createList() {
    if (!newName.trim()) return;
    const list = { id: crypto.randomUUID(), name: newName.trim(), symbols: [] };
    setLists((current) => [...current, list]);
    setSelectedId(list.id);
    setNewName("");
  }

  function addSymbol() {
    const normalized = symbol.trim().toUpperCase();
    if (!selected || !getAsset(normalized)) return;
    setLists((current) =>
      current.map((list) =>
        list.id === selected.id && !list.symbols.includes(normalized)
          ? { ...list, symbols: [...list.symbols, normalized] }
          : list
      )
    );
    setSymbol("");
  }

  function removeSymbol(target: string) {
    if (!selected) return;
    setLists((current) =>
      current.map((list) => (list.id === selected.id ? { ...list, symbols: list.symbols.filter((item) => item !== target) } : list))
    );
  }

  return (
    <div className="grid two">
      <div className="card card-pad">
        <h2>Named watchlists</h2>
        <p className="muted">Guest mode syncs to localStorage. Supabase auth can replace this storage layer later.</p>
        <div className="grid">
          {lists.map((list) => (
            <button className="btn" type="button" key={list.id} onClick={() => setSelectedId(list.id)}>
              {list.name} · {list.symbols.length} assets
            </button>
          ))}
        </div>
        <div className="action-row">
          <input className="input" value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Create watchlist name" />
          <button className="btn primary" type="button" onClick={createList}>
            Create
          </button>
        </div>
      </div>
      <div className="card card-pad">
        <h2>{selected?.name ?? "Watchlist"}</h2>
        <p className="muted">Add your first asset to start tracking.</p>
        <div className="action-row">
          <select className="input" value={symbol} onChange={(event) => setSymbol(event.target.value)}>
            <option value="">Choose an asset</option>
            {assets.map((asset) => (
              <option key={asset.symbol} value={asset.symbol}>
                {asset.symbol} — {asset.name}
              </option>
            ))}
          </select>
          <button className="btn primary" type="button" onClick={addSymbol}>
            Add asset
          </button>
        </div>
        {!selected || selected.symbols.length === 0 ? (
          <EmptyState title="No assets yet" body="Add your first asset to start tracking." />
        ) : (
          selected.symbols.map((item) => {
            const asset = getAsset(item);
            if (!asset) return null;

            return (
              <div className="asset-row" key={item}>
                <div>
                  <strong>{asset.symbol}</strong>
                  <div className="muted">
                    {formatMoney(asset.price)} · Confidence {asset.confidenceScore}/100 · Risk {asset.riskScore}/100
                  </div>
                  <div className="muted">Alert status: Coming Soon in v1 alerts</div>
                </div>
                <div className="action-row" style={{ marginTop: 0 }}>
                  <Badge tone={signalTone(asset.signal)}>{asset.signal}</Badge>
                  <Link className="btn" href={`/asset/${asset.symbol}`}>
                    View
                  </Link>
                  <button className="btn" type="button" onClick={() => removeSymbol(asset.symbol)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
