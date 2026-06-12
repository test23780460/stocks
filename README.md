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
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

Add your server-only API keys to `.env.local`. Do not prefix secret keys with `NEXT_PUBLIC_`.

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
- `GET /api/market/technical/NVDA`
- `GET /api/market/trending`
- `GET /api/market/mood`
- `GET /api/market/unusual-activity`
- `GET /api/cron/market-refresh`
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

Live provider integration is handled server-side in `app/api/[...path]/route.ts`.

Required key comments are present in code as:

```ts
// ADD YOUR API KEY HERE
```

Recommended providers:

- Stocks: Alpha Vantage is wired through the server-only `ALPHA_VANTAGE_API_KEY` environment variable
- Crypto: CoinGecko Pro, CoinMarketCap, Coinbase
- News: NewsAPI, Benzinga, licensed market feed
- AI summaries: preferred AI provider
- Discord alerts: owner webhook URL

### Alpha Vantage stock data

When `ALPHA_VANTAGE_API_KEY` is configured, stock routes use Alpha Vantage from server-side API routes only:

- `GET /api/market/asset/AAPL` uses `GLOBAL_QUOTE`
- `GET /api/market/historical/AAPL` uses `TIME_SERIES_DAILY_ADJUSTED` with `outputsize=full`, filters to 5 years, and returns daily open, high, low, close, adjusted close, volume, dividends, and splits when available
- `GET /api/market/technical/AAPL` returns daily SMA 50, RSI 14, and MACD data

If the key is missing, those routes return visible `Demo Data` fallback responses. If Alpha Vantage returns an error or rate-limit notice, the API returns a structured `502` error without exposing the key.

## Vercel hosting

This repo is ready for Vercel hosting.

1. Import the GitHub repository in Vercel.
2. Keep the framework preset as Next.js.
3. Add the environment variable in Vercel:
   - Name: `ALPHA_VANTAGE_API_KEY`
   - Value: use the Alpha Vantage key you provided
   - Environments: Production, Preview, and Development as needed
4. Deploy.
5. Open these URLs after deploy to confirm server-side data access:
   - `/api/market/asset/AAPL`
   - `/api/market/historical/AAPL`
   - `/api/market/technical/AAPL`

The refresh endpoint `/api/cron/market-refresh` is prepared for refresh logging and can persist snapshots after Supabase credentials are added. It is not auto-scheduled in `vercel.json` so the first Vercel deploy works on every plan. If your Vercel project supports high-frequency cron jobs, add a 5-minute schedule for that endpoint from Vercel or re-add this cron entry:

```json
{
  "crons": [
    {
      "path": "/api/cron/market-refresh",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

## Database

Use `db/schema.sql` with Supabase Postgres. It includes users, watchlists, assets, snapshots, historical prices, ticker search logs, trending assets, predictions, prediction results, news, alerts, Discord webhooks, backend logs, market update logs, and daily AI summaries.

Suggested schedulers:

- Save stock and crypto market snapshots every 5 minutes.
- Log every refresh in `market_update_logs`.
- Check 7-day predictions after 7 days.
- Check 30-day predictions after 30 days.
- Generate daily AI summaries every morning.
