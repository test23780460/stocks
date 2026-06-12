"use client";

import { useMemo, useState } from "react";
import { assets, formatCompact, formatMoney, getAsset } from "@/lib/market-data";
import { Badge, ScoreBar, sentimentTone, signalTone, Sparkline } from "@/components/MarketUi";

function AssetPanel({ symbol }: { symbol: string }) {
  const asset = getAsset(symbol)!;

  return (
    <div className="card card-pad">
      <div className="asset-row" style={{ paddingTop: 0 }}>
        <div>
          <h2>{asset.symbol}</h2>
          <p className="muted">{asset.name}</p>
        </div>
        <Badge tone={signalTone(asset.signal)}>{asset.signal}</Badge>
      </div>
      <Sparkline values={asset.sparkline} />
      <div className="grid two">
        <div className="metric">
          <span className="metric-label">Price</span>
          <strong className="metric-value mono">{formatMoney(asset.price)}</strong>
        </div>
        <div className="metric">
          <span className="metric-label">Daily / Monthly</span>
          <strong>{asset.dailyChangePercent.toFixed(2)}% / {asset.monthlyChangePercent.toFixed(2)}%</strong>
        </div>
        <div className="metric">
          <span className="metric-label">Market cap</span>
          <strong>{formatCompact(asset.marketCap)}</strong>
        </div>
        <div className="metric">
          <span className="metric-label">Volume</span>
          <strong>{formatCompact(asset.volume)}</strong>
          <small className="muted">{asset.relativeVolume}</small>
        </div>
      </div>
      <ScoreBar label="Risk score" score={asset.riskScore} reason={asset.riskReason} tone={asset.riskScore > 70 ? "red" : "amber"} />
      <ScoreBar label="Confidence score" score={asset.confidenceScore} reason={asset.confidenceReason} tone="green" />
      <ScoreBar label="Momentum" score={asset.momentumScore} reason={asset.momentumReason} tone="cyan" />
      <div className="asset-row">
        <span>Volatility</span>
        <Badge tone={asset.volatility === "High" ? "red" : asset.volatility === "Low" ? "green" : "amber"}>{asset.volatility}</Badge>
      </div>
      <div className="asset-row">
        <span>News sentiment</span>
        <Badge tone={sentimentTone(asset.newsSentiment)}>{asset.newsSentiment}</Badge>
      </div>
      <h3>Strengths</h3>
      <ul>{asset.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
      <h3>Weaknesses</h3>
      <ul>{asset.risks.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="muted">{asset.prediction.d7}</p>
    </div>
  );
}

export function CompareTool() {
  const [left, setLeft] = useState("TSLA");
  const [right, setRight] = useState("NVDA");

  const summary = useMemo(() => {
    const a = getAsset(left)!;
    const b = getAsset(right)!;
    const aScore = a.confidenceScore + a.momentumScore - a.riskScore;
    const bScore = b.confidenceScore + b.momentumScore - b.riskScore;
    const stronger = aScore >= bScore ? a : b;
    return `${stronger.symbol} looks stronger for research right now because confidence and momentum are better balanced against risk. This is a research comparison, not an investment recommendation.`;
  }, [left, right]);

  return (
    <div className="grid">
      <div className="card card-pad">
        <h2>Compare two assets</h2>
        <p className="muted">Examples: TSLA vs NVDA, BTC vs ETH, AAPL vs MSFT.</p>
        <div className="grid two">
          {[left, right].map((value, index) => (
            <select
              className="input"
              key={index === 0 ? "left" : "right"}
              value={value}
              onChange={(event) => (index === 0 ? setLeft(event.target.value) : setRight(event.target.value))}
            >
              {assets.map((asset) => (
                <option key={asset.symbol} value={asset.symbol}>
                  {asset.symbol} — {asset.name}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
      <div className="comparison">
        <AssetPanel symbol={left} />
        <AssetPanel symbol={right} />
      </div>
      <div className="card card-pad">
        <h2>Research summary</h2>
        <p className="lead">{summary}</p>
      </div>
    </div>
  );
}
