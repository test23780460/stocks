import { definitions } from "@/lib/market-data";
import { Badge } from "@/components/MarketUi";

export default function LearnPage() {
  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Learn · Beginner Mode</span>
        <h1>Keyword definitions for market research.</h1>
        <p className="lead">
          Toggle Beginner Mode globally to keep explanations plain-English. Advanced Mode keeps the technical detail visible
          for deeper research.
        </p>
      </section>

      <section className="section definition-grid">
        {definitions.map((item) => (
          <article className="card card-pad" key={item.term}>
            <Badge>{item.term}</Badge>
            <h2>{item.term}</h2>
            <h3>Beginner explanation</h3>
            <p className="muted">{item.plain}</p>
            <h3>Advanced mode detail</h3>
            <p className="muted">{item.advanced}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
