import { AssetType, getAssetsByType, screenerFilters } from "@/lib/market-data";
import { AssetTable, Badge, DemoBadge, Disclaimer } from "@/components/MarketUi";

export function ScreenerView({ type }: { type: AssetType }) {
  const tableAssets = getAssetsByType(type).sort((a, b) => b.confidenceScore + b.momentumScore - b.riskScore - (a.confidenceScore + a.momentumScore - a.riskScore));
  const filters = screenerFilters(type);

  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">{type} Screener</span>
        <h1>{type === "Stock" ? "Screen stocks by research quality." : "Screen crypto with risk labels first."}</h1>
        <p className="lead">
          Filter and sort by confidence, risk, momentum, volume, volatility, trending news, and beginner-friendly setups. Demo
          filters are visible as functional UI stubs for the next live-data pass.
        </p>
        <div className="action-row">
          <DemoBadge />
          <Disclaimer compact />
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Filter palette</span>
            <h2>Research filters</h2>
          </div>
        </div>
        <div className="action-row">
          {filters.map((filter) => (
            <button className={filter.includes("High Risk") ? "btn disabled" : "btn"} type="button" key={filter}>
              {filter} {filter.includes("High Risk") ? "· Coming Soon" : ""}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Sortable table structure</span>
            <h2>{type} quick-view signals</h2>
          </div>
          <Badge>Mock sort: confidence + momentum - risk</Badge>
        </div>
        <AssetTable assets={tableAssets} />
      </section>
    </main>
  );
}
