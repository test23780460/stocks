import {
  adminStats,
  API_KEY_NOTES,
  assets,
  dashboard,
  getAsset,
  newsItems,
  predictionHistory,
  sortedByMomentum,
  unusualActivity
} from "@/lib/market-data";
import {
  fetchAlphaVantageQuote,
  fetchFiveYearDailyPrices,
  fetchTechnicalIndicators,
  hasAlphaVantageKey
} from "@/lib/alpha-vantage";

type Context = {
  params: Promise<{ path?: string[] }>;
};

function json(data: unknown, status = 200, dataMode: "Demo Data" | "Live Data" = "Demo Data") {
  return Response.json(
    {
      dataMode,
      apiKeyNotes: API_KEY_NOTES,
      data
    },
    { status, headers: { "x-market-signal-data-mode": dataMode === "Live Data" ? "live" : "demo" } }
  );
}

function routePath(parts: string[] = []) {
  return `/${parts.join("/")}`;
}

export async function GET(_request: Request, context: Context) {
  const { path = [] } = await context.params;
  const pathname = routePath(path);

  // ADD YOUR API KEY HERE: set ALPHA_VANTAGE_API_KEY in server environment variables, never frontend files.
  if (pathname === "/market/live") {
    return json({ dashboard, assets, newsItems, unusualActivity });
  }

  if (pathname === "/cron/market-refresh") {
    return json({
      update_type: "snapshot",
      assets_updated: assets.length,
      status: "success",
      api_source: hasAlphaVantageKey() ? "Alpha Vantage + Demo Data fallback" : "Demo Data",
      alpha_vantage_configured: hasAlphaVantageKey(),
      duration_ms: 0,
      message: "Vercel cron endpoint is ready. Connect Supabase writes here to persist 5-minute snapshots."
    });
  }

  if (pathname.startsWith("/market/asset/")) {
    const symbol = path[2];
    const asset = getAsset(symbol);

    if (!asset) {
      return json({ message: "Unknown symbol", symbol, found_status: false }, 404);
    }

    if (asset.type === "Stock" && hasAlphaVantageKey()) {
      try {
        return json(await fetchAlphaVantageQuote(asset), 200, "Live Data");
      } catch (error) {
        return json(
          {
            message: "Alpha Vantage quote request failed.",
            symbol: asset.symbol,
            provider: "Alpha Vantage",
            error: error instanceof Error ? error.message : "Unknown error"
          },
          502
        );
      }
    }

    return json(asset);
  }

  if (pathname.startsWith("/market/historical/")) {
    const symbol = path[2];
    const asset = getAsset(symbol);

    if (!asset) {
      return json({ message: "Unknown symbol", symbol, found_status: false }, 404);
    }

    if (asset.type === "Stock" && hasAlphaVantageKey()) {
      try {
        return json(
          {
            symbol: asset.symbol,
            asset_type: asset.type,
            provider: "Alpha Vantage",
            range: "5 years",
            adjusted_close_available: true,
            prices: await fetchFiveYearDailyPrices(asset.symbol)
          },
          200,
          "Live Data"
        );
      } catch (error) {
        return json(
          {
            message: "Alpha Vantage historical price request failed.",
            symbol: asset.symbol,
            provider: "Alpha Vantage",
            error: error instanceof Error ? error.message : "Unknown error"
          },
          502
        );
      }
    }

    return json({
      symbol: asset.symbol,
      asset_type: asset.type,
      provider: "Demo Data",
      range: "mock mini-series",
      prices: asset.sparkline.map((close, index) => ({ close, timestamp: `T-${6 - index}` }))
    });
  }

  if (pathname.startsWith("/market/technical/")) {
    const symbol = path[2];
    const asset = getAsset(symbol);

    if (!asset) {
      return json({ message: "Unknown symbol", symbol, found_status: false }, 404);
    }

    if (asset.type !== "Stock") {
      return json({ message: "Alpha Vantage technical indicators are configured for stock symbols in this build.", symbol }, 400);
    }

    if (!hasAlphaVantageKey()) {
      return json({
        symbol: asset.symbol,
        provider: "Demo Data",
        indicators: {
          sma50: { date: "demo", value: { SMA: String(asset.sparkline.at(-1) ?? asset.price) } },
          rsi14: { date: "demo", value: { RSI: String(Math.round(asset.momentumScore * 0.8)) } },
          macd: { date: "demo", value: { MACD: "0.00", MACD_Hist: "0.00", MACD_Signal: "0.00" } }
        }
      });
    }

    try {
      return json(await fetchTechnicalIndicators(asset.symbol), 200, "Live Data");
    } catch (error) {
      return json(
        {
          message: "Alpha Vantage technical indicator request failed.",
          symbol: asset.symbol,
          provider: "Alpha Vantage",
          error: error instanceof Error ? error.message : "Unknown error"
        },
        502
      );
    }
  }

  if (pathname === "/market/trending") {
    return json(sortedByMomentum());
  }

  if (pathname === "/market/mood") {
    return json(dashboard);
  }

  if (pathname === "/market/unusual-activity") {
    return json(unusualActivity);
  }

  if (pathname === "/news/latest" || pathname === "/news/history") {
    return json(newsItems);
  }

  if (pathname.startsWith("/news/asset/")) {
    const symbol = path[2]?.toUpperCase();
    return json(newsItems.filter((item) => item.relatedSymbols.includes(symbol)));
  }

  if (pathname.startsWith("/predictions/asset/")) {
    const symbol = path[2];
    const asset = getAsset(symbol);
    return asset ? json(asset.prediction) : json({ message: "Unknown symbol", symbol }, 404);
  }

  if (pathname === "/predictions/accuracy/stats") {
    return json({ overall: 74, d7: 78, d30: 69, stocks: 76, crypto: 71, history: predictionHistory });
  }

  if (pathname.startsWith("/predictions/")) {
    return json({ prediction: predictionHistory[0], disclaimer: "Predictions are estimates and are not guaranteed." });
  }

  if (pathname === "/watchlists") {
    return json([{ id: "demo-ai", name: "AI and cloud research", items: ["NVDA", "MSFT", "META"] }]);
  }

  if (pathname === "/alerts") {
    return json([
      { id: "demo-volatility", alert_type: "Volatility spike", symbol: "SOL", active: true },
      { id: "demo-signal", alert_type: "Signal changed", symbol: "DOGE", active: true }
    ]);
  }

  if (pathname === "/users/profile") {
    return json({ id: "demo-user", username: "Demo Researcher", role: "free", plan: "free", beginner_mode: true });
  }

  if (pathname === "/admin/stats") {
    return json(adminStats);
  }

  if (pathname === "/admin/logs") {
    return json([{ log_type: "market_refresh", status: "success", message: "Demo refresh completed", created_at: new Date().toISOString() }]);
  }

  if (pathname === "/admin/market-updates") {
    return json([{ update_type: "snapshot", assets_updated: assets.length, status: "success", api_source: "Demo Data", duration_ms: 42 }]);
  }

  if (pathname === "/admin/api-errors") {
    return json([]);
  }

  if (pathname === "/admin/prediction-accuracy") {
    return json({ summary: adminStats.predictionAccuracySummary, history: predictionHistory });
  }

  return json({ message: "API route stub exists, but this demo path is not implemented.", pathname }, 404);
}

export async function POST(request: Request, context: Context) {
  const { path = [] } = await context.params;
  const pathname = routePath(path);
  const body = await request.json().catch(() => ({}));

  if (pathname === "/users/register" || pathname === "/users/login") {
    return json({ message: "Auth stub accepted. Connect Supabase auth to activate.", body });
  }

  if (pathname === "/users/logout") {
    return json({ message: "Logout stub accepted." });
  }

  if (pathname === "/watchlists") {
    return json({ message: "Watchlist create stub accepted.", body }, 201);
  }

  if (pathname.includes("/watchlists/") || pathname === "/alerts" || pathname.includes("/alerts/")) {
    return json({ message: "Mutation stub accepted.", pathname, body }, 201);
  }

  if (pathname === "/predictions/create") {
    return json({ message: "Prediction create stub accepted.", body, disclaimer: "Predictions are estimates and are not guaranteed." }, 201);
  }

  if (pathname.includes("/predictions/") || pathname === "/webhooks/discord") {
    return json({ message: "Prediction or webhook action stub accepted.", pathname, body });
  }

  return json({ message: "POST route stub exists.", pathname, body });
}

export async function PATCH(request: Request, context: Context) {
  const { path = [] } = await context.params;
  const body = await request.json().catch(() => ({}));
  return json({ message: "PATCH route stub accepted.", pathname: routePath(path), body });
}

export async function DELETE(_request: Request, context: Context) {
  const { path = [] } = await context.params;
  return json({ message: "DELETE route stub accepted.", pathname: routePath(path) });
}
