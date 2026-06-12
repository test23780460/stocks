import { adminStats, assets } from "@/lib/market-data";
import { Badge, DemoBadge } from "@/components/MarketUi";

export default function AdminPage() {
  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Admin Dashboard · Control room</span>
        <h1>Aggregate operations, never individual browsing.</h1>
        <p className="lead">
          Admin views show backend health, API status, market update logs, aggregate searches, prediction accuracy, and Discord
          webhook status without exposing private user behavior.
        </p>
        <div className="action-row">
          <DemoBadge />
          <Badge>Admin-only route structure</Badge>
        </div>
      </section>

      <section className="section grid four">
        {[
          ["Total users", adminStats.totalUsers.toLocaleString()],
          ["Active users", adminStats.activeUsers.toLocaleString()],
          ["Free users", adminStats.freeUsers.toLocaleString()],
          ["Premium users", adminStats.premiumUsers.toLocaleString()],
          ["API error count", String(adminStats.apiErrorCount)],
          ["Data refresh status", adminStats.dataRefreshStatus],
          ["Prediction accuracy", adminStats.predictionAccuracySummary],
          ["Discord webhook", adminStats.discordWebhookStatus]
        ].map(([label, value]) => (
          <div className="card card-pad metric" key={label}>
            <span className="metric-label">{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <h2>Most searched tickers</h2>
          <div className="grid two">
            <div>
              <h3>Stocks</h3>
              {adminStats.mostSearchedStocks.map((symbol) => <Badge key={symbol}>{symbol}</Badge>)}
            </div>
            <div>
              <h3>Crypto</h3>
              {adminStats.mostSearchedCrypto.map((symbol) => <Badge key={symbol}>{symbol}</Badge>)}
            </div>
          </div>
        </div>
        <div className="card card-pad">
          <h2>Most triggered alerts</h2>
          {adminStats.mostTriggeredAlerts.map((alert) => (
            <div className="asset-row" key={alert}>
              <strong>{alert}</strong>
              <Badge>Aggregate</Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="section grid three">
        {[
          "View backend logs",
          "View API errors",
          "View market update logs",
          "Review prediction accuracy",
          "Hide bad or broken data entries",
          "Disable broken tickers",
          "Review Discord webhook alerts",
          "Review daily AI summaries"
        ].map((control) => (
          <div className="card card-pad" key={control}>
            <h3>{control}</h3>
            <p className="muted">Coming Soon control. Route and data model are prepared for admin-only authorization.</p>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Disabled ticker review</span>
            <h2>Asset status overview</h2>
          </div>
        </div>
        <div className="table-wrap card">
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Admin action</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.symbol}>
                  <td>{asset.symbol}</td>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td><Badge tone="green">Active</Badge></td>
                  <td><button className="btn disabled" type="button">Disable · Coming Soon</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
