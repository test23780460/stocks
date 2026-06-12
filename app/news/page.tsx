import Link from "next/link";
import { newsItems } from "@/lib/market-data";
import { Badge, DemoBadge, EmptyState, sentimentTone } from "@/components/MarketUi";

export default function NewsPage() {
  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">News</span>
        <h1>Market news with plain-English impact.</h1>
        <p className="lead">
          Headlines are grouped by category, related ticker, sentiment, and impact score so researchers can understand why a
          story matters.
        </p>
        <div className="action-row">
          <DemoBadge />
          <Badge>Categories: Earnings, Lawsuits, Layoffs, Product Launches, AI News, Regulation, Crypto Regulation, Interest Rates, Inflation, Market Crashes, Company Drama, Major Announcements</Badge>
        </div>
      </section>

      <section className="section">
        {newsItems.length === 0 ? (
          <EmptyState title="No news available" body="Connect a licensed news API to populate this section." />
        ) : (
          <div className="grid two">
            {newsItems.map((item) => (
              <article className="card card-pad" key={item.headline}>
                <div className="section-header">
                  <div>
                    <Badge>{item.category}</Badge>
                    <h2>{item.headline}</h2>
                  </div>
                  <Badge tone={sentimentTone(item.sentiment)}>{item.sentiment}</Badge>
                </div>
                <p className="muted">{item.summary}</p>
                <p><strong>Why it matters:</strong> <span className="muted">{item.whyItMatters}</span></p>
                <div className="action-row">
                  <Badge>Impact {item.impactScore}/10</Badge>
                  <Badge>{item.source}</Badge>
                  <Badge>{item.publishedAt}</Badge>
                </div>
                <div className="action-row">
                  {item.relatedSymbols.map((symbol) => (
                    <Link className="btn" href={`/asset/${symbol}`} key={symbol}>
                      {symbol}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
