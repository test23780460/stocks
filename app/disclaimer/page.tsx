import { API_KEY_NOTES, DISCLAIMER } from "@/lib/market-data";
import { Badge } from "@/components/MarketUi";

export default function DisclaimerPage() {
  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Disclaimer</span>
        <h1>Research-only disclaimer and data limitations.</h1>
        <p className="lead">{DISCLAIMER}</p>
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <Badge>No financial advice</Badge>
          <h2>Full research-only statement</h2>
          <p className="muted">
            Market Signal Deck is an educational market research interface. Signals such as Watch, Wait, and Avoid are
            research labels that summarize current data quality, not instructions. Users are responsible for independent
            research and professional guidance when appropriate.
          </p>
        </div>
        <div className="card card-pad">
          <Badge>Prediction limitations</Badge>
          <h2>Predictions are estimates</h2>
          <p className="muted">
            Predictions may be incomplete, stale, or wrong. Market data suggests possible scenarios, but outcomes can change
            because of news, liquidity, macro events, regulation, or data errors.
          </p>
        </div>
        <div className="card card-pad">
          <Badge>Data source attribution</Badge>
          <h2>Demo and future live data</h2>
          <p className="muted">
            This build uses visible Demo Data. Live market data should be connected to licensed providers and attributed in
            the interface according to each provider&apos;s terms.
          </p>
        </div>
        <div className="card card-pad">
          <Badge>Terms of use summary</Badge>
          <h2>Use responsibly</h2>
          <p className="muted">
            Do not rely on any single score, signal, headline, prediction, or chart. Review source data, understand risk, and
            treat all market estimates as uncertain.
          </p>
        </div>
      </section>

      <section className="section card card-pad">
        <h2>API key locations</h2>
        <p className="muted">Live integrations should be added through environment variables and server-only route handlers.</p>
        <pre className="muted">{API_KEY_NOTES.join("\n")}</pre>
      </section>
    </main>
  );
}
