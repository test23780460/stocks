import Link from "next/link";
import { assets, dashboard, definitions, sortedByMomentum } from "@/lib/market-data";
import { AssetMiniRow, Badge, DemoBadge, Disclaimer, moodTone } from "@/components/MarketUi";

const features = [
  ["Dashboard", "Market mood, risks, trending stocks, trending crypto, and daily AI summary in one scan."],
  ["AI Predictions", "24h, 7d, and 30d research estimates with accountability and uncertainty."],
  ["Screeners", "Filter stocks and crypto by confidence, risk, momentum, volume, and beginner-friendly setups."],
  ["Compare", "Side-by-side research for assets like TSLA vs NVDA or BTC vs ETH."],
  ["Watchlist", "Track signals, confidence, risk, price, and alert status in guest mode or future account sync."]
];

export default function LandingPage() {
  const topAssets = sortedByMomentum().slice(0, 5);

  return (
    <main className="main">
      <section className="hero">
        <div>
          <span className="eyebrow">Market Signal Deck · Research only</span>
          <h1>AI-powered stock and crypto research made simple.</h1>
          <p className="lead">
            Market Signal Deck helps investors scan stocks, crypto, market trends, news, risk, and predictions in one clean
            dashboard.
          </p>
          <p className="muted">Understand the market before you make your next move.</p>
          <div className="hero-actions">
            <Link href="/dashboard" className="btn primary">
              Open dashboard
            </Link>
            <Link href="/asset/NVDA" className="btn">
              Try NVDA report
            </Link>
            <Link href="/learn" className="btn">
              Keyword definitions
            </Link>
          </div>
        </div>
        <div className="card card-pad">
          <div className="section-header">
            <div>
              <DemoBadge />
              <h2>Market mood preview</h2>
            </div>
            <Badge tone={moodTone(dashboard.overallMood)}>{dashboard.overallMood}</Badge>
          </div>
          <div className="locked-preview">
            <div className="grid two">
              <div className="metric">
                <span className="metric-label">Fear meter</span>
                <strong className="metric-value">{dashboard.fearGreedScore}/100</strong>
              </div>
              <div className="metric">
                <span className="metric-label">Strength</span>
                <strong className="metric-value">{dashboard.marketStrength}%</strong>
              </div>
            </div>
            {topAssets.slice(0, 3).map((asset, index) => (
              <AssetMiniRow key={asset.symbol} asset={asset} rank={index + 1} />
            ))}
          </div>
          <p className="muted">Preview unlocks as you explore the dashboard. Login can be connected through Supabase in v1.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Finished feature set</span>
            <h2>Designed for research, not hype.</h2>
          </div>
          <Disclaimer compact />
        </div>
        <div className="grid five">
          <div className="grid three">
            {features.map(([title, body]) => (
              <div className="card card-pad" key={title}>
                <Badge>{title}</Badge>
                <h3>{title}</h3>
                <p className="muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Top assets to watch today</span>
            <h2>Assets worth researching, not investment recommendations.</h2>
          </div>
          <Link className="btn" href="/dashboard">
            View full dashboard
          </Link>
        </div>
        <div className="grid">
          {topAssets.map((asset, index) => (
            <div className="card card-pad" key={asset.symbol}>
              <AssetMiniRow asset={asset} rank={index + 1} />
              <p className="muted">{asset.researchSupport.data}</p>
              <Link className="btn" href={`/asset/${asset.symbol}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Keyword definitions</span>
            <h2>Beginner mode starts with plain English.</h2>
          </div>
          <Link href="/learn" className="btn">
            Open full glossary
          </Link>
        </div>
        <div className="definition-grid">
          {definitions.slice(0, 6).map((item) => (
            <div className="card card-pad" key={item.term}>
              <h3>{item.term}</h3>
              <p className="muted">{item.plain}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
