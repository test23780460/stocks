import { WatchlistManager } from "@/components/WatchlistManager";
import { DemoBadge, Disclaimer } from "@/components/MarketUi";

export default function WatchlistPage() {
  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Watchlist</span>
        <h1>Track assets with guest-mode storage.</h1>
        <p className="lead">
          Create named watchlists, add stocks or crypto, and review signal, confidence score, risk score, price, last updated,
          and alert status.
        </p>
        <div className="action-row">
          <DemoBadge />
          <Disclaimer compact />
        </div>
      </section>
      <WatchlistManager />
    </main>
  );
}
