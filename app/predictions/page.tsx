import Link from "next/link";
import { assets, DISCLAIMER, predictionHistory } from "@/lib/market-data";
import { Badge, DemoBadge, Disclaimer, riskTone } from "@/components/MarketUi";

export default function PredictionsPage() {
  const showcased = assets.filter((asset) => ["NVDA", "BTC", "TSLA"].includes(asset.symbol));

  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">AI Predictions</span>
        <h1>Research estimates with accountability.</h1>
        <p className="lead">
          Each prediction includes bull, bear, and neutral cases, possible ranges, uncertainty, and a history dashboard so the
          AI feels accountable.
        </p>
        <div className="action-row">
          <DemoBadge />
          <Disclaimer compact />
        </div>
      </section>

      <section className="section grid three">
        {showcased.map((asset) => (
          <div className="card card-pad" key={asset.symbol}>
            <div className="section-header">
              <div>
                <h2>{asset.symbol}</h2>
                <p className="muted">{asset.name}</p>
              </div>
              <Badge tone={riskTone(asset.prediction.riskLevel)}>{asset.prediction.riskLevel} risk</Badge>
            </div>
            <p><strong>24-hour outlook:</strong> <span className="muted">{asset.prediction.h24}</span></p>
            <p><strong>7-day outlook:</strong> <span className="muted">{asset.prediction.d7}</span></p>
            <p><strong>30-day outlook:</strong> <span className="muted">{asset.prediction.d30}</span></p>
            <p><strong>Bull case:</strong> <span className="muted">{asset.prediction.bullCase}</span></p>
            <p><strong>Bear case:</strong> <span className="muted">{asset.prediction.bearCase}</span></p>
            <p><strong>Neutral case:</strong> <span className="muted">{asset.prediction.neutralCase}</span></p>
            <p><strong>Possible upside range:</strong> <span className="muted">{asset.prediction.possibleUpsideRange}</span></p>
            <p><strong>Possible downside range:</strong> <span className="muted">{asset.prediction.possibleDownsideRange}</span></p>
            <p><strong>What could make the prediction wrong:</strong> <span className="muted">{asset.prediction.uncertainty}</span></p>
            <div className="action-row">
              <Badge>Confidence {asset.prediction.confidence}/100</Badge>
              <Link className="btn" href={`/asset/${asset.symbol}`}>Open report</Link>
            </div>
            <small className="muted">This is a research-based estimate, not a guarantee. {DISCLAIMER}</small>
          </div>
        ))}
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <h2>Prediction Accuracy Dashboard</h2>
          <div className="grid two">
            {[
              ["Overall accuracy", "74%"],
              ["7-day accuracy", "78%"],
              ["30-day accuracy", "69%"],
              ["Stocks vs crypto", "Stocks 76% · Crypto 71%"],
              ["Best predicted assets", "NVDA, BTC"],
              ["Worst predicted assets", "AVAX, DOGE"],
              ["Most accurate prediction type", "Volatile direction"],
              ["Least accurate prediction type", "30-day ranges"]
            ].map(([label, value]) => (
              <div className="metric" key={label}>
                <span className="metric-label">{label}</span>
                <strong>{value}</strong>
                <small className="muted">Based on demo prediction results and market context notes.</small>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad">
          <h2>News events that may affect predictions</h2>
          <ul className="muted">
            <li>AI infrastructure spending and semiconductor demand.</li>
            <li>ETF flow headlines and crypto regulatory updates.</li>
            <li>Interest-rate expectations and broad market risk appetite.</li>
          </ul>
          <Disclaimer compact />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Prediction History</span>
            <h2>Past predictions are tracked and checked.</h2>
          </div>
        </div>
        <div className="table-wrap card">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Asset</th>
                <th>Timeframe</th>
                <th>Predicted direction</th>
                <th>Starting price</th>
                <th>Ending price</th>
                <th>Actual result</th>
                <th>Accuracy score</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {predictionHistory.map((item) => (
                <tr key={`${item.date}-${item.asset}`}>
                  <td>{item.date}</td>
                  <td>{item.asset}</td>
                  <td>{item.timeframe}</td>
                  <td>{item.predictedDirection}</td>
                  <td>{item.startingPrice}</td>
                  <td>{item.endingPrice}</td>
                  <td>{item.actualResult}</td>
                  <td>{item.accuracyScore}</td>
                  <td className="muted">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
