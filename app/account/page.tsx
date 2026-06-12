import { Badge } from "@/components/MarketUi";

export default function AccountPage() {
  return (
    <main className="main">
      <section className="page-hero">
        <span className="eyebrow">Login / Account</span>
        <h1>Account structure ready for Supabase auth.</h1>
        <p className="lead">
          Email and password authentication, logout, profile settings, roles, plan types, and future premium feature gates are
          represented in the interface and API route stubs.
        </p>
      </section>

      <section className="section grid two">
        <div className="card card-pad">
          <h2>Sign up or login</h2>
          <p className="muted">Demo form is a visible stub until Supabase credentials are connected.</p>
          <div className="grid">
            <input className="input" placeholder="Email" type="email" />
            <input className="input" placeholder="Password" type="password" />
            <button className="btn primary" type="button">Continue · Coming Soon</button>
            <button className="btn disabled" type="button">Google login · v2 optional</button>
          </div>
        </div>
        <div className="card card-pad">
          <h2>Profile settings</h2>
          <div className="grid">
            <input className="input" placeholder="Username" />
            <select className="input" defaultValue="beginner">
              <option value="beginner">Beginner mode preference</option>
              <option value="advanced">Advanced mode preference</option>
            </select>
            <select className="input" defaultValue="standard">
              <option value="standard">Standard dashboard</option>
              <option value="compact">Compact dashboard</option>
            </select>
            <button className="btn disabled" type="button">Save profile · Coming Soon</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Plan types</span>
            <h2>Free, Premium, and Admin roles.</h2>
          </div>
        </div>
        <div className="grid three">
          {[
            ["Free", "Dashboard, basic reports, one guest watchlist structure."],
            ["Premium", "Feature gates prepared for expanded scans and advanced reports."],
            ["Admin", "Aggregate operations and backend health controls."]
          ].map(([title, body]) => (
            <div className="card card-pad" key={title}>
              <Badge>{title}</Badge>
              <h3>{title}</h3>
              <p className="muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section card card-pad">
        <h2>Premium Feature Stubs</h2>
        <div className="action-row">
          {[
            "Unlimited scans",
            "Advanced AI reports",
            "Advanced alerts",
            "Extended prediction history",
            "Saved comparison reports",
            "More technical indicators",
            "Custom dashboards",
            "Export reports",
            "Additional watchlists"
          ].map((feature) => (
            <Badge key={feature}>{feature} · Coming Soon</Badge>
          ))}
        </div>
      </section>
    </main>
  );
}
