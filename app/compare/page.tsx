import { CompareTool } from "@/components/CompareTool";
import { DemoBadge, Disclaimer } from "@/components/MarketUi";

export default function ComparePage() {
  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Compare Assets</span>
        <h1>Side-by-side stock and crypto research.</h1>
        <p className="lead">
          Compare price, changes, market cap, volume, risk, confidence, momentum, volatility, news sentiment, prediction
          outlook, historical performance, strengths, and weaknesses.
        </p>
        <div className="action-row">
          <DemoBadge />
          <Disclaimer compact />
        </div>
      </section>
      <CompareTool />
    </main>
  );
}
