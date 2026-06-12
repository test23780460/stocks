import Link from "next/link";
import type React from "react";
import { assets, dashboard, formatMoney, newsItems, sortedByChange, sortedByMomentum, unusualActivity } from "@/lib/market-data";
import {
  AssetMiniRow,
  Badge,
  DemoBadge,
  Disclaimer,
  moodTone,
  riskTone,
  sentimentTone,
  signalTone
} from "@/components/MarketUi";

export default function DashboardPage() {
  const trendingStocks = sortedByMomentum("Stock").slice(0, 5);
  const trendingCrypto = sortedByMomentum("Crypto").slice(0, 5);
  const gainers = sortedByChange().slice(0, 5);
  const losers = sortedByChange().slice(-5).reverse();
  const bestResearch = assets
    .filter((asset) => asset.signal === "Watch")
    .sort((a, b) => b.confidenceScore + b.momentumScore - b.riskScore - (a.confidenceScore + a.momentumScore - a.riskScore))
    .slice(0, 6);

  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Main dashboard · Market Today</span>
        <h1>What is happening in the market right now?</h1>
        <p className="lead">{dashboard.dailySummary}</p>
        <div className="action-row">
          <DemoBadge />
          <Badge tone="green">
            <span className="status-dot" /> Live status indicator
          </Badge>
          <Badge>{dashboard.lastUpdated}</Badge>
        </div>
      </section>

      <section className="section grid four">
        <div className="card card-pad">
          <span className="metric-label">Overall Market Mood</span>
          <h2><Badge tone={moodTone(dashboard.overallMood)}>{dashboard.overallMood}</Badge></h2>
          <p className="muted">Market data suggests broad strength with selective risk pockets.</p>
        </div>
        <div className="card card-pad">
          <span className="metric-label">Stock Market Mood</span>
          <h2><Badge tone={moodTone(dashboard.stockMood)}>{dashboard.stockMood}</Badge></h2>
          <p className="muted">AI and cloud-linked large caps are leading the equity snapshot.</p>
        </div>
        <div className="card card-pad">
          <span className="metric-label">Crypto Market Mood</span>
          <h2><Badge tone={moodTone(dashboard.cryptoMood)}>{dashboard.cryptoMood}</Badge></h2>
          <p className="muted">Major crypto is constructive, while high-risk tokens are uneven.</p>
        </div>
        <div className="card card-pad">
          <span className="metric-label">Volatility Level</span>
          <h2><Badge tone={riskTone(dashboard.volatilityLevel)}>{dashboard.volatilityLevel}</Badge></h2>
          <p className="muted">Risk review matters most for fast-moving crypto assets.</p>
        </div>
      </section>

      <section className="section grid three">
        <div className="card card-pad">
          <h2>Fear Meter</h2>
          <div className="gauge" style={{ "--score": dashboard.fearGreedScore } as React.CSSProperties}>
            <span>{dashboard.fearGreedScore}</span>
          </div>
          <p className="muted">Low readings mean fear; high readings mean stronger risk appetite.</p>
        </div>
        <div className="card card-pad">
          <h2>Market Strength %</h2>
          <div className="metric-value">{dashboard.marketStrength}%</div>
          <div className="progress">
            <span style={{ width: `${dashboard.marketStrength}%` }} />
          </div>
          <p className="muted">Breadth, momentum, and sentiment support a constructive reading.</p>
        </div>
        <div className="card card-pad">
          <h2>Beginner read</h2>
          <p className="muted">{dashboard.beginnerToday}</p>
        </div>
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <h2>Top Trending Stocks</h2>
          {trendingStocks.map((asset, index) => <AssetMiniRow key={asset.symbol} asset={asset} rank={index + 1} />)}
        </div>
        <div className="card card-pad">
          <h2>Top Trending Crypto</h2>
          {trendingCrypto.map((asset, index) => <AssetMiniRow key={asset.symbol} asset={asset} rank={index + 1} />)}
        </div>
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <h2>Top Gainers</h2>
          {gainers.map((asset) => (
            <div className="asset-row" key={asset.symbol}>
              <div>
                <strong>{asset.symbol}</strong>
                <div className="muted">{formatMoney(asset.price)}</div>
              </div>
              <Badge tone="green">+{asset.dailyChangePercent.toFixed(2)}%</Badge>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <h2>Top Losers</h2>
          {losers.map((asset) => (
            <div className="asset-row" key={asset.symbol}>
              <div>
                <strong>{asset.symbol}</strong>
                <div className="muted">{formatMoney(asset.price)}</div>
              </div>
              <Badge tone="red">{asset.dailyChangePercent.toFixed(2)}%</Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="section grid three">
        <div className="card card-pad">
          <h2>Biggest Risks Today</h2>
          {dashboard.risksToday.map((risk) => (
            <div className="asset-row" key={risk.title}>
              <div>
                <strong>{risk.title}</strong>
                <div className="muted">{risk.why}</div>
              </div>
              <Badge tone={risk.severity === "High" ? "red" : "amber"}>{risk.severity}</Badge>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <h2>Unusual Market Activity</h2>
          {unusualActivity.map((item) => (
            <div className="asset-row" key={item.title}>
              <div>
                <strong>{item.title}</strong>
                <div className="muted">{item.explanation}</div>
              </div>
              <Badge tone={item.level === "High" ? "red" : item.level === "Low" ? "green" : "amber"}>{item.level}</Badge>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <h2>Daily AI Market Summary</h2>
          <p className="muted">{dashboard.dailySummary}</p>
          <Disclaimer compact />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Top Assets to Watch Today</span>
            <h2>These are assets worth researching, not investment recommendations.</h2>
          </div>
        </div>
        <div className="grid three">
          {bestResearch.map((asset, index) => (
            <div className="card card-pad" key={asset.symbol}>
              <Badge>{index + 1}</Badge>
              <h3>{asset.symbol} · {asset.name}</h3>
              <p className="mono">{formatMoney(asset.price)}</p>
              <div className="action-row">
                <Badge tone={signalTone(asset.signal)}>{asset.signal}</Badge>
                <Badge tone="green">Confidence {asset.confidenceScore}</Badge>
                <Badge tone={asset.riskScore > 60 ? "red" : "amber"}>Risk {asset.riskScore}</Badge>
              </div>
              <p className="muted">{asset.researchSupport.data}</p>
              <Link className="btn" href={`/asset/${asset.symbol}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Major News Affecting Market</span>
            <h2>News cards with sentiment and impact.</h2>
          </div>
          <Link href="/news" className="btn">Open News</Link>
        </div>
        <div className="grid three">
          {newsItems.slice(0, 3).map((news) => (
            <div className="card card-pad" key={news.headline}>
              <Badge tone={sentimentTone(news.sentiment)}>{news.sentiment}</Badge>
              <h3>{news.headline}</h3>
              <p className="muted">{news.summary}</p>
              <p><strong>Why it matters:</strong> <span className="muted">{news.whyItMatters}</span></p>
              <Badge>Impact {news.impactScore}/10</Badge>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
