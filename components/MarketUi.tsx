import Link from "next/link";
import type React from "react";
import { Asset, DISCLAIMER, formatCompact, formatMoney, Mood, RiskLevel, Sentiment, Signal } from "@/lib/market-data";

export function DemoBadge() {
  return <span className="badge cyan">Demo Data</span>;
}

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return <div className="disclaimer">{compact ? DISCLAIMER : <strong>{DISCLAIMER}</strong>}</div>;
}

export function Badge({
  children,
  tone = "cyan"
}: {
  children: React.ReactNode;
  tone?: "cyan" | "green" | "amber" | "red";
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function moodTone(mood: Mood) {
  if (mood === "Bullish") return "green";
  if (mood === "Bearish") return "red";
  return "amber";
}

export function riskTone(level: RiskLevel) {
  if (level === "Low") return "green";
  if (level === "High") return "red";
  return "amber";
}

export function signalTone(signal: Signal) {
  if (signal === "Watch") return "green";
  if (signal === "Avoid") return "red";
  return "amber";
}

export function sentimentTone(sentiment: Sentiment) {
  if (sentiment === "Positive") return "green";
  if (sentiment === "Negative") return "red";
  return "amber";
}

export function ScoreBar({
  label,
  score,
  reason,
  tone = "cyan"
}: {
  label: string;
  score: number;
  reason: string;
  tone?: "cyan" | "green" | "amber" | "red";
}) {
  return (
    <div className="metric">
      <div className="asset-row" style={{ padding: 0, borderBottom: 0 }}>
        <span className="metric-label">{label}</span>
        <Badge tone={tone}>{score}/100</Badge>
      </div>
      <div className="progress" aria-label={`${label} ${score} of 100`}>
        <span style={{ width: `${score}%` }} />
      </div>
      <small className="muted">{reason}</small>
    </div>
  );
}

export function Sparkline({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 62 - ((value - min) / range) * 52;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="sparkline" viewBox="0 0 100 72" preserveAspectRatio="none" role="img" aria-label="Historical performance mini chart">
      <defs>
        <linearGradient id={`spark-${values.join("-")}`} x1="0" x2="1">
          <stop stopColor="#56cdff" />
          <stop offset="1" stopColor="#3ee98f" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={`url(#spark-${values.join("-")})`} strokeWidth="3" points={points} vectorEffect="non-scaling-stroke" />
      <polyline fill="rgba(86,205,255,0.10)" stroke="none" points={`0,72 ${points} 100,72`} />
    </svg>
  );
}

export function AssetMiniRow({ asset, rank }: { asset: Asset; rank?: number }) {
  return (
    <div className="asset-row">
      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
        <div className="symbol-chip">{rank ?? asset.symbol.slice(0, 2)}</div>
        <div>
          <strong>
            {asset.symbol} <span className="muted">{asset.name}</span>
          </strong>
          <div className="muted">{asset.type} · {asset.category}</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="mono">{formatMoney(asset.price)}</div>
        <Badge tone={signalTone(asset.signal)}>{asset.signal}</Badge>
      </div>
    </div>
  );
}

export function AssetTable({ assets: tableAssets }: { assets: Asset[] }) {
  if (tableAssets.length === 0) {
    return <EmptyState title="No assets match this view" body="Try clearing filters or selecting another market category." />;
  }

  return (
    <div className="table-wrap card">
      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Price</th>
            <th>Daily</th>
            <th>Signal</th>
            <th>Confidence</th>
            <th>Risk</th>
            <th>Momentum</th>
            <th>Volume</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tableAssets.map((asset) => (
            <tr key={asset.symbol}>
              <td>
                <strong>{asset.symbol}</strong>
                <div className="muted">{asset.name}</div>
              </td>
              <td className="mono">{formatMoney(asset.price)}</td>
              <td>
                <Badge tone={asset.dailyChangePercent >= 0 ? "green" : "red"}>{asset.dailyChangePercent.toFixed(2)}%</Badge>
              </td>
              <td>
                <Badge tone={signalTone(asset.signal)}>{asset.signal}</Badge>
              </td>
              <td>
                {asset.confidenceScore}/100
                <div className="muted">{asset.confidenceReason}</div>
              </td>
              <td>
                {asset.riskScore}/100
                <div className="muted">{asset.riskReason}</div>
              </td>
              <td>
                {asset.momentumScore}/100
                <div className="muted">{asset.momentumReason}</div>
              </td>
              <td>
                {formatCompact(asset.volume)}
                <div className="muted">{asset.relativeVolume}</div>
              </td>
              <td>
                <Link className="btn" href={`/asset/${asset.symbol}`}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LoadingState({ label = "Loading market data..." }: { label?: string }) {
  return (
    <div className="state-box" role="status">
      <strong>{label}</strong>
      <span>Connecting to the latest available snapshot.</span>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="state-box">
      <strong>{title}</strong>
      <span>{body}</span>
    </div>
  );
}

export function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="state-box" style={{ borderColor: "rgba(255,105,120,0.4)", color: "#ffd0d6" }}>
      <strong>{title}</strong>
      <span>{body}</span>
    </div>
  );
}
