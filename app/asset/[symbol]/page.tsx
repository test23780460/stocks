import Link from "next/link";
import { assets, DISCLAIMER, formatCompact, formatMoney, getAsset } from "@/lib/market-data";
import {
  Badge,
  DemoBadge,
  Disclaimer,
  ErrorState,
  ScoreBar,
  sentimentTone,
  signalTone,
  Sparkline
} from "@/components/MarketUi";
import { SignalExplainer } from "@/components/SignalExplainer";

export function generateStaticParams() {
  return assets.map((asset) => ({ symbol: asset.symbol }));
}

export default async function AssetReportPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const asset = getAsset(symbol);

  if (!asset) {
    return (
      <main className="main">
        <section className="page-hero">
          <span className="eyebrow">Search result</span>
          <h1>Unknown symbol: {symbol.toUpperCase()}</h1>
          <p className="lead">Try a supported stock or crypto such as NVDA, BTC, TSLA, AAPL, ETH, or SOL.</p>
        </section>
        <ErrorState
          title="Unknown ticker"
          body="This demo build logs unsupported ticker searches through the API route structure and shows a clear error state."
        />
      </main>
    );
  }

  const answerTone = asset.researchAnswer.startsWith("Yes") ? "green" : asset.researchAnswer.startsWith("Maybe") ? "amber" : "red";

  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Asset Report · {asset.type}</span>
        <h1>{asset.symbol} · {asset.name}</h1>
        <p className="lead">{asset.beginnerExplanation}</p>
        <div className="action-row">
          <DemoBadge />
          <Badge tone={signalTone(asset.signal)}>{asset.signal}</Badge>
          <Badge>{asset.lastUpdated}</Badge>
          <Link className="btn" href="/compare">Compare Assets</Link>
        </div>
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <div className="section-header">
            <div>
              <h2>Research snapshot</h2>
              <p className="muted">{asset.category} · {asset.exchange}</p>
            </div>
            <Badge tone={signalTone(asset.signal)}>{asset.signal}</Badge>
          </div>
          <div className="grid two">
            <div className="metric">
              <span className="metric-label">Current Price</span>
              <strong className="metric-value mono">{formatMoney(asset.price)}</strong>
            </div>
            <div className="metric">
              <span className="metric-label">Daily / Weekly / Monthly Change</span>
              <strong>{asset.dailyChangeDollar >= 0 ? "+" : ""}{formatMoney(asset.dailyChangeDollar)} · {asset.dailyChangePercent.toFixed(2)}%</strong>
              <span className="muted">{asset.weeklyChangePercent.toFixed(2)}% weekly · {asset.monthlyChangePercent.toFixed(2)}% monthly</span>
            </div>
            <div className="metric">
              <span className="metric-label">Market Cap</span>
              <strong>{formatCompact(asset.marketCap)}</strong>
            </div>
            <div className="metric">
              <span className="metric-label">Volume</span>
              <strong>{formatCompact(asset.volume)}</strong>
              <span className="muted">{asset.relativeVolume}</span>
            </div>
            <div className="metric">
              <span className="metric-label">Volatility</span>
              <Badge tone={asset.volatility === "High" ? "red" : asset.volatility === "Low" ? "green" : "amber"}>{asset.volatility}</Badge>
            </div>
            <div className="metric">
              <span className="metric-label">News Sentiment</span>
              <Badge tone={sentimentTone(asset.newsSentiment)}>{asset.newsSentiment}</Badge>
            </div>
          </div>
          <Sparkline values={asset.sparkline} />
          <SignalExplainer explanation={asset.whySignal} />
        </div>

        <div className="card card-pad">
          <h2>Scores with reasons</h2>
          <ScoreBar label="Confidence Score" score={asset.confidenceScore} reason={asset.confidenceReason} tone="green" />
          <ScoreBar label="Risk Score" score={asset.riskScore} reason={asset.riskReason} tone={asset.riskScore > 70 ? "red" : "amber"} />
          <ScoreBar label="Momentum Score" score={asset.momentumScore} reason={asset.momentumReason} tone="cyan" />
          <Disclaimer compact />
        </div>
      </section>

      <section className="section card card-pad">
        <div className="section-header">
          <div>
            <span className="eyebrow">Should I Research This?</span>
            <h2><Badge tone={answerTone}>{asset.researchAnswer}</Badge></h2>
          </div>
          <Badge>{asset.type}</Badge>
        </div>
        <div className="grid three">
          <div>
            <h3>What looks good</h3>
            <p className="muted">{asset.researchSupport.good}</p>
          </div>
          <div>
            <h3>What looks risky</h3>
            <p className="muted">{asset.researchSupport.risky}</p>
          </div>
          <div>
            <h3>What changed recently</h3>
            <p className="muted">{asset.researchSupport.changed}</p>
          </div>
          <div>
            <h3>What news matters</h3>
            <p className="muted">{asset.researchSupport.news}</p>
          </div>
          <div>
            <h3>What a beginner should understand first</h3>
            <p className="muted">{asset.researchSupport.beginner}</p>
          </div>
          <div>
            <h3>What data supports the answer</h3>
            <p className="muted">{asset.researchSupport.data}</p>
          </div>
        </div>
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <h2>Prediction Outlook</h2>
          <div className="grid">
            <p><strong>24h:</strong> <span className="muted">{asset.prediction.h24}</span></p>
            <p><strong>7d:</strong> <span className="muted">{asset.prediction.d7}</span></p>
            <p><strong>30d:</strong> <span className="muted">{asset.prediction.d30}</span></p>
            <p><strong>Possible upside range:</strong> <span className="muted">{asset.prediction.possibleUpsideRange}</span></p>
            <p><strong>Possible downside range:</strong> <span className="muted">{asset.prediction.possibleDownsideRange}</span></p>
            <p><strong>What could make this wrong:</strong> <span className="muted">{asset.prediction.uncertainty}</span></p>
          </div>
          <small className="muted">This is a research-based estimate, not a guarantee. {DISCLAIMER}</small>
        </div>
        <div className="card card-pad">
          <h2>Beginner vs Advanced Explanation</h2>
          <h3>Beginner</h3>
          <p className="muted">{asset.beginnerExplanation}</p>
          <h3>Advanced</h3>
          <p className="muted">{asset.advancedExplanation}</p>
          <h3>Suggested Research Action</h3>
          <p className="muted">{asset.suggestedAction}</p>
        </div>
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <h2>Key Strengths</h2>
          <ul>{asset.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="card card-pad">
          <h2>Key Risks</h2>
          <ul>{asset.risks.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="section card card-pad">
        <h2>Research Checklist</h2>
        <ul className="checklist">
          {[
            "Price trend reviewed",
            "News reviewed",
            "Risk reviewed",
            "Volatility reviewed",
            "Historical movement reviewed",
            "Prediction confidence reviewed",
            "Beginner explanation read",
            "Disclaimer acknowledged"
          ].map((item) => (
            <li key={item}>
              <label>
                <input type="checkbox" /> {item}
              </label>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
