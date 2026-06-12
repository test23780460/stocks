# Market Signal Deck

AI-powered stock and crypto research made simple.

Market Signal Deck is a futuristic dark-mode research dashboard for scanning market mood, stocks, crypto, news, risk, prediction estimates, watchlists, comparisons, and beginner education.

## Research-only language

Market Signal Deck is for research and education only. This is not financial advice. Predictions are estimates and are not guaranteed.

The app uses safe research labels:

- Watch
- Wait
- Avoid
- Research further
- Worth researching

## Tech stack

- Next.js App Router
- React
- TypeScript
- CSS design system
- Mock data fallback with visible `Demo Data` badges
- API route stubs for market, predictions, news, alerts, users, watchlists, webhooks, and admin
- Supabase/Postgres schema in `db/schema.sql`

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Key routes

- `/` landing page
- `/dashboard` main market dashboard
- `/asset/NVDA` asset report and search destination
- `/screeners/stocks`
- `/screeners/crypto`
- `/watchlist`
- `/predictions`
- `/news`
- `/compare`
- `/learn`
- `/admin`
- `/account`
- `/disclaimer`

## API routes

All requested API paths are dispatched from `app/api/[...path]/route.ts`.

Examples:

- `GET /api/market/live`
- `GET /api/market/asset/NVDA`
- `GET /api/market/historical/BTC`
- `GET /api/market/trending`
- `GET /api/market/mood`
- `GET /api/market/unusual-activity`
- `POST /api/predictions/create`
- `GET /api/predictions/asset/NVDA`
- `GET /api/predictions/accuracy/stats`
- `GET /api/news/latest`
- `GET /api/news/asset/BTC`
- `GET /api/watchlists`
- `POST /api/alerts`
- `POST /api/webhooks/discord`
- `GET /api/admin/stats`

## Live data integration notes

The demo build intentionally ships with mock data for:

- Stocks: AAPL, TSLA, NVDA, MSFT, AMZN, META, GOOGL
- Crypto: BTC, ETH, SOL, XRP, DOGE, ADA, AVAX

Live provider integration should be added server-side in `app/api/[...path]/route.ts`.

Required key comments are present in code as:

```ts
// ADD YOUR API KEY HERE
```

Recommended providers:

- Stocks: Polygon, Finnhub, IEX Cloud, Alpha Vantage
- Crypto: CoinGecko Pro, CoinMarketCap, Coinbase
- News: NewsAPI, Benzinga, licensed market feed
- AI summaries: preferred AI provider
- Discord alerts: owner webhook URL

## Database

Use `db/schema.sql` with Supabase Postgres. It includes users, watchlists, assets, snapshots, historical prices, ticker search logs, trending assets, predictions, prediction results, news, alerts, Discord webhooks, backend logs, market update logs, and daily AI summaries.

Suggested schedulers:

- Save stock and crypto market snapshots every 5 minutes.
- Log every refresh in `market_update_logs`.
- Check 7-day predictions after 7 days.
- Check 30-day predictions after 30 days.
- Generate daily AI summaries every morning.
