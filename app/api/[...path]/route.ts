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

type Context = {
  params: Promise<{ path?: string[] }>;
};

const demoHeaders = {
  "x-market-signal-data-mode": "demo"
};

function json(data: unknown, status = 200) {
  return Response.json(
    {
      dataMode: "Demo Data",
      apiKeyNotes: API_KEY_NOTES,
      data
    },
    { status, headers: demoHeaders }
  );
}

function routePath(parts: string[] = []) {
  return `/${parts.join("/")}`;
}

export async function GET(_request: Request, context: Context) {
  const { path = [] } = await context.params;
  const pathname = routePath(path);

  // ADD YOUR API KEY HERE: live data providers should be called from this server-only route layer.
  if (pathname === "/market/live") {
    return json({ dashboard, assets, newsItems, unusualActivity });
  }

  if (pathname.startsWith("/market/asset/")) {
    const symbol = path[2];
    const asset = getAsset(symbol);
    return asset ? json(asset) : json({ message: "Unknown symbol", symbol, found_status: false }, 404);
  }

  if (pathname.startsWith("/market/historical/")) {
    const symbol = path[2];
    const asset = getAsset(symbol);
    return asset
      ? json({ symbol: asset.symbol, asset_type: asset.type, prices: asset.sparkline.map((close, index) => ({ close, timestamp: `T-${6 - index}` })) })
      : json({ message: "Unknown symbol", symbol, found_status: false }, 404);
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
