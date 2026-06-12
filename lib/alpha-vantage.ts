import { Asset } from "@/lib/market-data";

const BASE_URL = "https://www.alphavantage.co/query";
const FIVE_YEARS_MS = 1000 * 60 * 60 * 24 * 365 * 5;

type AlphaVantageDailyResponse = {
  "Meta Data"?: Record<string, string>;
  "Time Series (Daily)"?: Record<
    string,
    {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. adjusted close"?: string;
      "6. volume"?: string;
      "5. volume"?: string;
      "7. dividend amount"?: string;
      "8. split coefficient"?: string;
    }
  >;
  "Error Message"?: string;
  "Information"?: string;
  Note?: string;
};

type AlphaVantageQuoteResponse = {
  "Global Quote"?: {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
  "Error Message"?: string;
  "Information"?: string;
  Note?: string;
};

type TechnicalIndicatorResponse = {
  "Technical Analysis: SMA"?: Record<string, { SMA: string }>;
  "Technical Analysis: RSI"?: Record<string, { RSI: string }>;
  "Technical Analysis: MACD"?: Record<string, { MACD: string; MACD_Hist: string; MACD_Signal: string }>;
  "Error Message"?: string;
  "Information"?: string;
  Note?: string;
};

function getApiKey() {
  return process.env.ALPHA_VANTAGE_API_KEY?.trim();
}

export function hasAlphaVantageKey() {
  return Boolean(getApiKey());
}

function buildUrl(params: Record<string, string>) {
  const key = getApiKey();

  if (!key) {
    throw new Error("ALPHA_VANTAGE_API_KEY is not configured.");
  }

  const url = new URL(BASE_URL);
  Object.entries({ ...params, apikey: key }).forEach(([name, value]) => url.searchParams.set(name, value));
  return url;
}

async function fetchAlphaVantage<T>(params: Record<string, string>): Promise<T> {
  const response = await fetch(buildUrl(params), {
    // Market data can be cached briefly by Vercel while still supporting frequent refresh jobs.
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Alpha Vantage request failed with ${response.status}.`);
  }

  const data = (await response.json()) as T;
  const message = getAlphaVantageMessage(data);
  if (message) {
    throw new Error(message);
  }

  return data;
}

function getAlphaVantageMessage(data: unknown) {
  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as { "Error Message"?: string; Information?: string; Note?: string };
  return payload["Error Message"] ?? payload.Information ?? payload.Note ?? null;
}

export async function fetchAlphaVantageQuote(asset: Asset) {
  const data = await fetchAlphaVantage<AlphaVantageQuoteResponse>({
    function: "GLOBAL_QUOTE",
    symbol: asset.symbol
  });

  const quote = data["Global Quote"];
  if (!quote || Object.keys(quote).length === 0) {
    throw new Error(`Alpha Vantage returned no quote for ${asset.symbol}.`);
  }

  return {
    ...asset,
    price: Number(quote["05. price"]),
    dailyChangeDollar: Number(quote["09. change"]),
    dailyChangePercent: Number(quote["10. change percent"].replace("%", "")),
    volume: Number(quote["06. volume"]),
    lastUpdated: `Alpha Vantage latest trading day: ${quote["07. latest trading day"]}`
  };
}

export async function fetchFiveYearDailyPrices(symbol: string) {
  const data = await fetchAlphaVantage<AlphaVantageDailyResponse>({
    function: "TIME_SERIES_DAILY_ADJUSTED",
    symbol,
    outputsize: "full"
  });

  const series = data["Time Series (Daily)"];
  if (!series) {
    throw new Error(`Alpha Vantage returned no daily historical prices for ${symbol}.`);
  }

  const cutoff = Date.now() - FIVE_YEARS_MS;

  return Object.entries(series)
    .map(([date, row]) => ({
      date,
      open: Number(row["1. open"]),
      high: Number(row["2. high"]),
      low: Number(row["3. low"]),
      close: Number(row["4. close"]),
      adjustedClose: row["5. adjusted close"] ? Number(row["5. adjusted close"]) : null,
      volume: Number(row["6. volume"] ?? row["5. volume"] ?? 0),
      dividendAmount: row["7. dividend amount"] ? Number(row["7. dividend amount"]) : null,
      splitCoefficient: row["8. split coefficient"] ? Number(row["8. split coefficient"]) : null
    }))
    .filter((price) => new Date(`${price.date}T00:00:00Z`).getTime() >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function fetchTechnicalIndicators(symbol: string) {
  const [sma, rsi, macd] = await Promise.all([
    fetchAlphaVantage<TechnicalIndicatorResponse>({
      function: "SMA",
      symbol,
      interval: "daily",
      time_period: "50",
      series_type: "close"
    }),
    fetchAlphaVantage<TechnicalIndicatorResponse>({
      function: "RSI",
      symbol,
      interval: "daily",
      time_period: "14",
      series_type: "close"
    }),
    fetchAlphaVantage<TechnicalIndicatorResponse>({
      function: "MACD",
      symbol,
      interval: "daily",
      series_type: "close"
    })
  ]);

  return {
    symbol: symbol.toUpperCase(),
    provider: "Alpha Vantage",
    interval: "daily",
    indicators: {
      sma50: latestIndicator(sma["Technical Analysis: SMA"]),
      rsi14: latestIndicator(rsi["Technical Analysis: RSI"]),
      macd: latestIndicator(macd["Technical Analysis: MACD"])
    }
  };
}

function latestIndicator<T>(series?: Record<string, T>) {
  if (!series) {
    return null;
  }

  const [date, value] = Object.entries(series).sort(([a], [b]) => b.localeCompare(a))[0] ?? [];
  return date ? { date, value } : null;
}
