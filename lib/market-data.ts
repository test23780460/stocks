export type AssetType = "Stock" | "Crypto";
export type Signal = "Watch" | "Wait" | "Avoid";
export type Mood = "Bullish" | "Neutral" | "Bearish";
export type RiskLevel = "Low" | "Moderate" | "High";
export type Sentiment = "Positive" | "Neutral" | "Negative";

export const DISCLAIMER =
  "Market Signal Deck is for research and education only. This is not financial advice. Predictions are estimates and are not guaranteed.";

export const API_KEY_NOTES = [
  "// ADD YOUR API KEY HERE: stock market provider such as Polygon, Finnhub, IEX Cloud, or Alpha Vantage.",
  "// ADD YOUR API KEY HERE: crypto provider such as CoinGecko Pro, CoinMarketCap, or Coinbase.",
  "// ADD YOUR API KEY HERE: news provider such as NewsAPI, Benzinga, or a licensed market news feed.",
  "// ADD YOUR API KEY HERE: optional AI provider for daily summaries and prediction narratives.",
  "// ADD YOUR API KEY HERE: optional Discord webhook secret for owner alerts."
];

export type Asset = {
  symbol: string;
  name: string;
  type: AssetType;
  category: string;
  exchange: string;
  price: number;
  dailyChangePercent: number;
  dailyChangeDollar: number;
  weeklyChangePercent: number;
  monthlyChangePercent: number;
  marketCap: number;
  volume: number;
  relativeVolume: string;
  volatility: RiskLevel;
  signal: Signal;
  confidenceScore: number;
  confidenceReason: string;
  riskScore: number;
  riskReason: string;
  momentumScore: number;
  momentumReason: string;
  newsSentiment: Sentiment;
  prediction: {
    h24: string;
    d7: string;
    d30: string;
    confidence: number;
    riskLevel: RiskLevel;
    possibleUpsideRange: string;
    possibleDownsideRange: string;
    bullCase: string;
    bearCase: string;
    neutralCase: string;
    uncertainty: string;
  };
  beginnerExplanation: string;
  advancedExplanation: string;
  strengths: string[];
  risks: string[];
  suggestedAction: string;
  researchAnswer: "Yes — worth researching" | "Maybe — wait for better data" | "No — too risky right now";
  researchSupport: {
    good: string;
    risky: string;
    changed: string;
    news: string;
    beginner: string;
    data: string;
  };
  whySignal: string;
  sparkline: number[];
  lastUpdated: string;
};

export const assets: Asset[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "Stock",
    category: "Large cap technology",
    exchange: "NASDAQ",
    price: 213.18,
    dailyChangePercent: 0.84,
    dailyChangeDollar: 1.78,
    weeklyChangePercent: 2.9,
    monthlyChangePercent: 7.4,
    marketCap: 3260000000000,
    volume: 64200000,
    relativeVolume: "1.1x normal",
    volatility: "Low",
    signal: "Watch",
    confidenceScore: 78,
    confidenceReason: "Large-cap demand, steady volume, and positive product-cycle news support above-average confidence.",
    riskScore: 32,
    riskReason: "Risk is lower than most tracked assets because price swings are contained and liquidity is deep.",
    momentumScore: 73,
    momentumReason: "Price has held above short-term moving averages with improving relative strength.",
    newsSentiment: "Positive",
    prediction: {
      h24: "Slightly constructive with moderate confidence while broader tech remains firm.",
      d7: "Positive-to-sideways estimate if volume remains above normal.",
      d30: "Constructive estimate tied to services growth and large-cap market mood.",
      confidence: 74,
      riskLevel: "Low",
      possibleUpsideRange: "$216-$224",
      possibleDownsideRange: "$204-$209",
      bullCase: "Services revenue, device refresh expectations, and stable market mood could support continued strength.",
      bearCase: "Weak consumer data or broad tech rotation could pressure the trend.",
      neutralCase: "Price may consolidate if news flow slows and volume returns to normal.",
      uncertainty: "The estimate could be wrong if macro data changes market appetite for mega-cap technology."
    },
    beginnerExplanation: "Apple is a very large technology company, so its price usually moves less sharply than smaller names.",
    advancedExplanation:
      "Trend quality is supported by rising 20-day momentum, stable relative volume, and a lower realized volatility profile than the dashboard average.",
    strengths: ["Deep liquidity", "Positive product-cycle narrative", "Lower volatility profile"],
    risks: ["Valuation sensitivity", "Consumer demand risk", "Large-cap tech rotation risk"],
    suggestedAction: "Research further if you prefer liquid large-cap assets with steadier price behavior.",
    researchAnswer: "Yes — worth researching",
    researchSupport: {
      good: "Momentum is constructive and risk is below the dashboard average.",
      risky: "Valuation is sensitive to interest-rate expectations and consumer demand.",
      changed: "Volume improved while news sentiment stayed positive.",
      news: "Product and services headlines are supporting a stronger setup.",
      beginner: "This is a steadier research candidate, but it can still move against expectations.",
      data: "Confidence 78, risk 32, momentum 73, and low volatility support the answer."
    },
    whySignal:
      "AAPL is marked as Watch because momentum is constructive, volume is slightly above normal, news sentiment is positive, and the risk score is lower than many tracked assets. This is not a low-risk guarantee; it is a research setup with contained volatility.",
    sparkline: [199, 201, 203, 202, 207, 210, 213],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    type: "Stock",
    category: "EV and high-beta technology",
    exchange: "NASDAQ",
    price: 185.44,
    dailyChangePercent: -2.4,
    dailyChangeDollar: -4.56,
    weeklyChangePercent: -5.7,
    monthlyChangePercent: 3.2,
    marketCap: 592000000000,
    volume: 106400000,
    relativeVolume: "1.6x normal",
    volatility: "High",
    signal: "Wait",
    confidenceScore: 58,
    confidenceReason: "The setup has active volume but mixed news and wide price swings reduce confidence.",
    riskScore: 71,
    riskReason: "Risk is elevated because the asset often moves faster than the broader equity market.",
    momentumScore: 49,
    momentumReason: "Momentum is mixed after a pullback from recent highs.",
    newsSentiment: "Neutral",
    prediction: {
      h24: "Volatile and uncertain with low-to-moderate confidence.",
      d7: "Sideways-to-volatile estimate until price stabilizes above recent support.",
      d30: "Mixed estimate; company-specific headlines may dominate the market trend.",
      confidence: 55,
      riskLevel: "High",
      possibleUpsideRange: "$193-$207",
      possibleDownsideRange: "$165-$174",
      bullCase: "Improving delivery expectations or stronger EV sentiment could restore momentum.",
      bearCase: "Margin pressure, regulatory headlines, or weak growth data could increase downside pressure.",
      neutralCase: "The asset may remain choppy while traders wait for clearer operational data.",
      uncertainty: "Headline risk and high relative volume make this forecast easier to disrupt."
    },
    beginnerExplanation: "Tesla can move sharply because expectations and news change quickly.",
    advancedExplanation:
      "Relative volume is elevated, realized volatility is high, and short-term momentum has not confirmed a sustained trend.",
    strengths: ["High liquidity", "Strong retail and institutional attention", "Innovation narrative"],
    risks: ["High volatility", "Margin pressure", "Headline-driven moves"],
    suggestedAction: "Wait for stronger confirmation before relying on this research setup.",
    researchAnswer: "Maybe — wait for better data",
    researchSupport: {
      good: "Volume confirms that many market participants are watching the asset.",
      risky: "Volatility is high and confidence is only moderate.",
      changed: "Recent price action weakened after a fast move.",
      news: "EV demand and margin headlines matter most right now.",
      beginner: "Fast movement can create opportunity and risk at the same time.",
      data: "Confidence 58, risk 71, momentum 49, and high volatility support a patient answer."
    },
    whySignal:
      "TSLA is marked as Wait because momentum is mixed, volume is elevated, news sentiment is neutral, and the risk score is high. The data suggests watching for better confirmation before treating the setup as strong.",
    sparkline: [178, 186, 196, 194, 189, 190, 185],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    type: "Stock",
    category: "AI-related technology",
    exchange: "NASDAQ",
    price: 142.61,
    dailyChangePercent: 3.8,
    dailyChangeDollar: 5.21,
    weeklyChangePercent: 9.6,
    monthlyChangePercent: 18.4,
    marketCap: 3510000000000,
    volume: 251000000,
    relativeVolume: "1.9x normal",
    volatility: "Moderate",
    signal: "Watch",
    confidenceScore: 86,
    confidenceReason: "Strong AI demand, high liquidity, and positive news sentiment support the highest stock confidence score in the demo set.",
    riskScore: 48,
    riskReason: "Risk is moderate because volatility is elevated even though the trend is strong.",
    momentumScore: 91,
    momentumReason: "Price trend, relative volume, and recent performance all show strong momentum.",
    newsSentiment: "Positive",
    prediction: {
      h24: "Positive estimate with moderate confidence if AI-sector momentum holds.",
      d7: "Constructive estimate, but short pauses are possible after a strong run.",
      d30: "Positive-to-volatile estimate tied to AI infrastructure demand and valuation sensitivity.",
      confidence: 82,
      riskLevel: "Moderate",
      possibleUpsideRange: "$148-$158",
      possibleDownsideRange: "$129-$136",
      bullCase: "AI infrastructure demand, strong earnings expectations, and high relative volume could support further strength.",
      bearCase: "Valuation concerns or a broad semiconductor pullback could weaken the setup.",
      neutralCase: "The asset may digest recent gains while confidence remains above average.",
      uncertainty: "A fast change in AI-sector sentiment could make the estimate too optimistic."
    },
    beginnerExplanation: "NVIDIA is closely tied to AI computing demand, so news about AI spending can affect the stock quickly.",
    advancedExplanation:
      "Momentum remains strong with elevated relative volume, broad sector confirmation, and a positive news-impact profile.",
    strengths: ["Strong momentum", "AI demand narrative", "Positive news sentiment"],
    risks: ["Valuation sensitivity", "Semiconductor cycle risk", "Moderate volatility"],
    suggestedAction: "Worth researching if you are comparing AI-related large-cap assets.",
    researchAnswer: "Yes — worth researching",
    researchSupport: {
      good: "Momentum and confidence are both among the strongest in the dashboard.",
      risky: "The asset has already moved quickly and can reverse when sentiment changes.",
      changed: "Volume and market attention rose after AI infrastructure headlines.",
      news: "AI-capex and semiconductor supply-chain headlines are important.",
      beginner: "A strong trend does not remove risk; it only means the setup currently has more supporting data.",
      data: "Confidence 86, risk 48, momentum 91, and positive sentiment support the answer."
    },
    whySignal:
      "NVDA is marked as Watch because momentum is strong, volume is above normal, news sentiment is positive, and the risk score is moderate. However, volatility is elevated, so this is not a low-risk setup.",
    sparkline: [116, 120, 127, 130, 136, 139, 143],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "Stock",
    category: "AI and cloud technology",
    exchange: "NASDAQ",
    price: 468.22,
    dailyChangePercent: 1.2,
    dailyChangeDollar: 5.55,
    weeklyChangePercent: 4.1,
    monthlyChangePercent: 8.3,
    marketCap: 3480000000000,
    volume: 31800000,
    relativeVolume: "1.2x normal",
    volatility: "Low",
    signal: "Watch",
    confidenceScore: 82,
    confidenceReason: "Cloud growth, AI exposure, and steady institutional demand create a strong research profile.",
    riskScore: 35,
    riskReason: "Risk is contained by liquidity, diversification, and lower volatility.",
    momentumScore: 77,
    momentumReason: "Trend is positive with gradual strength across recent sessions.",
    newsSentiment: "Positive",
    prediction: {
      h24: "Slightly positive estimate with moderate confidence.",
      d7: "Constructive estimate if cloud and AI sentiment remains supportive.",
      d30: "Positive-to-sideways estimate with lower volatility than most growth assets.",
      confidence: 76,
      riskLevel: "Low",
      possibleUpsideRange: "$476-$492",
      possibleDownsideRange: "$449-$458",
      bullCase: "Cloud growth and AI platform adoption could support continued interest.",
      bearCase: "Regulatory pressure or software-spending weakness could slow momentum.",
      neutralCase: "Price may consolidate while investors evaluate valuation and growth.",
      uncertainty: "Macro data and enterprise spending trends can shift the estimate."
    },
    beginnerExplanation: "Microsoft is a large software and cloud company, so it is often researched as a steadier technology asset.",
    advancedExplanation:
      "Low realized volatility, positive trend slope, and improving news impact support a strong but not overheated profile.",
    strengths: ["Cloud and AI exposure", "Lower volatility", "Strong balance sheet profile"],
    risks: ["Regulatory scrutiny", "Enterprise spending cycles", "Valuation sensitivity"],
    suggestedAction: "Research further as a lower-volatility AI and cloud comparison candidate.",
    researchAnswer: "Yes — worth researching",
    researchSupport: {
      good: "Confidence is high and volatility is low relative to the demo set.",
      risky: "Large-cap technology can still weaken if rates or regulation pressure valuations.",
      changed: "Cloud and AI news sentiment improved this week.",
      news: "Enterprise AI adoption and regulatory headlines matter most.",
      beginner: "This setup is steadier, but steadier does not mean certain.",
      data: "Confidence 82, risk 35, momentum 77, and low volatility support the answer."
    },
    whySignal:
      "MSFT is marked as Watch because trend quality is positive, volume is stable, news sentiment is positive, and risk is lower than the dashboard average.",
    sparkline: [439, 445, 451, 454, 462, 466, 468],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    type: "Stock",
    category: "Cloud and consumer technology",
    exchange: "NASDAQ",
    price: 187.34,
    dailyChangePercent: 0.3,
    dailyChangeDollar: 0.57,
    weeklyChangePercent: 1.9,
    monthlyChangePercent: 5.1,
    marketCap: 1950000000000,
    volume: 42700000,
    relativeVolume: "0.9x normal",
    volatility: "Moderate",
    signal: "Wait",
    confidenceScore: 66,
    confidenceReason: "Trend is positive but lower relative volume makes confirmation less clear.",
    riskScore: 46,
    riskReason: "Risk is moderate because consumer and cloud expectations can shift quickly.",
    momentumScore: 62,
    momentumReason: "Momentum is positive but not as strong as AI-leading peers.",
    newsSentiment: "Neutral",
    prediction: {
      h24: "Sideways estimate with moderate confidence.",
      d7: "Mildly constructive if volume improves.",
      d30: "Positive-to-sideways estimate based on cloud and retail margin updates.",
      confidence: 64,
      riskLevel: "Moderate",
      possibleUpsideRange: "$192-$202",
      possibleDownsideRange: "$174-$181",
      bullCase: "Cloud margin expansion and consumer strength could improve the setup.",
      bearCase: "Retail weakness or cloud competition could pressure confidence.",
      neutralCase: "The asset may trade in a range while investors wait for clearer volume.",
      uncertainty: "Lower relative volume makes the current trend less confirmed."
    },
    beginnerExplanation: "Amazon has both retail and cloud businesses, so different types of economic news can affect it.",
    advancedExplanation:
      "Trend is intact but relative volume is below ideal confirmation levels, keeping the signal at Wait.",
    strengths: ["Diversified revenue", "Cloud exposure", "Positive monthly trend"],
    risks: ["Retail margin pressure", "Cloud competition", "Moderate volatility"],
    suggestedAction: "Research further, but compare it against stronger-volume technology setups.",
    researchAnswer: "Maybe — wait for better data",
    researchSupport: {
      good: "Monthly trend and cloud narrative are constructive.",
      risky: "Volume is below normal and news sentiment is neutral.",
      changed: "The price improved without a large volume confirmation.",
      news: "Cloud margin and consumer spending headlines matter most.",
      beginner: "A positive price move is stronger when more volume supports it.",
      data: "Confidence 66, risk 46, momentum 62, and neutral sentiment support a wait-for-confirmation answer."
    },
    whySignal:
      "AMZN is marked as Wait because momentum is constructive but volume is below normal and news sentiment is neutral. Market data suggests confirmation is not as strong as the top research candidates.",
    sparkline: [178, 181, 180, 184, 186, 187, 187],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    type: "Stock",
    category: "Social media and AI technology",
    exchange: "NASDAQ",
    price: 521.48,
    dailyChangePercent: 2.1,
    dailyChangeDollar: 10.74,
    weeklyChangePercent: 6.4,
    monthlyChangePercent: 11.8,
    marketCap: 1320000000000,
    volume: 21400000,
    relativeVolume: "1.3x normal",
    volatility: "Moderate",
    signal: "Watch",
    confidenceScore: 80,
    confidenceReason: "Advertising resilience, AI product momentum, and positive sentiment support confidence.",
    riskScore: 44,
    riskReason: "Risk is moderate because regulatory and ad-cycle headlines can shift sentiment.",
    momentumScore: 79,
    momentumReason: "Recent price trend and relative volume are both supportive.",
    newsSentiment: "Positive",
    prediction: {
      h24: "Positive-to-sideways estimate with moderate confidence.",
      d7: "Constructive estimate if ad-tech sentiment remains positive.",
      d30: "Positive estimate with moderate volatility risk.",
      confidence: 75,
      riskLevel: "Moderate",
      possibleUpsideRange: "$535-$558",
      possibleDownsideRange: "$493-$506",
      bullCase: "AI engagement tools and stronger ad pricing could support the trend.",
      bearCase: "Regulatory pressure or ad-market weakness could reduce confidence.",
      neutralCase: "Price may consolidate after a strong monthly move.",
      uncertainty: "Policy headlines can change sentiment quickly."
    },
    beginnerExplanation: "Meta earns heavily from advertising, so ad trends and regulation are important to research.",
    advancedExplanation:
      "Relative volume, trend slope, and sentiment breadth remain positive, while regulatory risk keeps the risk score moderate.",
    strengths: ["Positive momentum", "Advertising strength", "AI engagement narrative"],
    risks: ["Regulatory scrutiny", "Ad-cycle sensitivity", "Moderate volatility"],
    suggestedAction: "Worth researching alongside other AI-related large-cap stocks.",
    researchAnswer: "Yes — worth researching",
    researchSupport: {
      good: "Momentum and confidence remain strong with above-normal volume.",
      risky: "Regulatory headlines can change the setup quickly.",
      changed: "Recent ad-market and AI headlines improved sentiment.",
      news: "AI product updates and policy headlines matter most.",
      beginner: "Strong recent movement still needs risk review before any decision.",
      data: "Confidence 80, risk 44, momentum 79, and positive sentiment support the answer."
    },
    whySignal:
      "META is marked as Watch because momentum is strong, relative volume is above normal, and news sentiment is positive. Risk remains moderate because regulation and ad-cycle data can alter the setup.",
    sparkline: [475, 482, 490, 505, 510, 516, 521],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "Stock",
    category: "Search, ads, and AI technology",
    exchange: "NASDAQ",
    price: 176.22,
    dailyChangePercent: -0.7,
    dailyChangeDollar: -1.24,
    weeklyChangePercent: 0.8,
    monthlyChangePercent: 4.6,
    marketCap: 2170000000000,
    volume: 36100000,
    relativeVolume: "1.0x normal",
    volatility: "Low",
    signal: "Wait",
    confidenceScore: 63,
    confidenceReason: "The asset is stable, but near-term momentum and news sentiment are less decisive.",
    riskScore: 38,
    riskReason: "Lower volatility and deep liquidity keep risk below average.",
    momentumScore: 55,
    momentumReason: "Momentum is positive over a month but mixed over the daily window.",
    newsSentiment: "Neutral",
    prediction: {
      h24: "Sideways estimate with moderate confidence.",
      d7: "Neutral-to-slightly positive estimate if broader tech mood improves.",
      d30: "Constructive estimate if AI and ad demand headlines improve.",
      confidence: 62,
      riskLevel: "Low",
      possibleUpsideRange: "$181-$190",
      possibleDownsideRange: "$167-$171",
      bullCase: "AI product adoption and ad demand could restore momentum.",
      bearCase: "Regulatory pressure or search competition could weigh on sentiment.",
      neutralCase: "Price may remain range-bound while investors wait for clearer data.",
      uncertainty: "The estimate depends heavily on news sentiment improving."
    },
    beginnerExplanation: "Alphabet is a large company behind Google, so ad demand and AI competition matter.",
    advancedExplanation:
      "Risk is controlled, but the lack of strong daily momentum keeps the signal from moving higher.",
    strengths: ["Deep liquidity", "Lower volatility", "AI and ad exposure"],
    risks: ["Regulatory pressure", "AI competition narrative", "Mixed near-term momentum"],
    suggestedAction: "Research further as a steadier technology comparison, but wait for stronger momentum.",
    researchAnswer: "Maybe — wait for better data",
    researchSupport: {
      good: "Risk is lower than average and liquidity is strong.",
      risky: "Momentum is mixed and news sentiment is neutral.",
      changed: "Daily price action softened while monthly trend stayed constructive.",
      news: "AI search competition and regulatory headlines matter most.",
      beginner: "A stable asset can still be a weak setup if momentum is unclear.",
      data: "Confidence 63, risk 38, momentum 55, and neutral sentiment support a patient answer."
    },
    whySignal:
      "GOOGL is marked as Wait because risk is low but momentum and sentiment are not yet strong enough for a stronger research setup.",
    sparkline: [168, 172, 174, 177, 178, 177, 176],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    type: "Crypto",
    category: "Major crypto",
    exchange: "Crypto",
    price: 104820,
    dailyChangePercent: 1.9,
    dailyChangeDollar: 1957,
    weeklyChangePercent: 4.3,
    monthlyChangePercent: 12.7,
    marketCap: 2080000000000,
    volume: 58400000000,
    relativeVolume: "1.4x normal",
    volatility: "Moderate",
    signal: "Watch",
    confidenceScore: 76,
    confidenceReason: "Market leadership, positive momentum, and strong volume support confidence.",
    riskScore: 57,
    riskReason: "Crypto volatility keeps risk moderate even when the trend is constructive.",
    momentumScore: 82,
    momentumReason: "Price is trending higher with above-normal volume.",
    newsSentiment: "Positive",
    prediction: {
      h24: "Positive-to-volatile estimate with moderate confidence.",
      d7: "Constructive estimate if crypto market mood remains bullish.",
      d30: "Positive but volatile estimate tied to liquidity and macro conditions.",
      confidence: 72,
      riskLevel: "Moderate",
      possibleUpsideRange: "$108,000-$116,000",
      possibleDownsideRange: "$96,000-$100,500",
      bullCase: "ETF flows, improving liquidity, and broad crypto momentum could support strength.",
      bearCase: "Risk-off macro data or regulatory pressure could weaken the trend.",
      neutralCase: "Price may consolidate near major levels while volume normalizes.",
      uncertainty: "Crypto can reprice quickly when liquidity or regulation changes."
    },
    beginnerExplanation: "Bitcoin is the largest crypto asset and often sets the tone for the rest of crypto.",
    advancedExplanation:
      "Relative volume and trend breadth are constructive, but volatility remains materially above most large-cap equities.",
    strengths: ["Crypto market leadership", "Strong liquidity", "Positive momentum"],
    risks: ["Macro sensitivity", "Moderate volatility", "Regulatory headline risk"],
    suggestedAction: "Worth researching as the primary crypto market benchmark.",
    researchAnswer: "Yes — worth researching",
    researchSupport: {
      good: "Momentum and volume are both strong for a major crypto asset.",
      risky: "Crypto volatility can increase quickly during macro stress.",
      changed: "Market mood improved after stronger volume and ETF-flow headlines.",
      news: "ETF flows, regulation, and liquidity headlines matter most.",
      beginner: "Bitcoin is important to research before smaller crypto assets because it influences the broader crypto mood.",
      data: "Confidence 76, risk 57, momentum 82, and positive sentiment support the answer."
    },
    whySignal:
      "BTC is marked as Watch because it has positive momentum, above-normal volume, positive sentiment, and a moderate risk score. Market data suggests a strong setup, but crypto volatility means the estimate is not guaranteed.",
    sparkline: [94000, 96000, 98500, 100200, 102800, 103900, 104820],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    type: "Crypto",
    category: "Layer 1",
    exchange: "Crypto",
    price: 3864,
    dailyChangePercent: 2.6,
    dailyChangeDollar: 97,
    weeklyChangePercent: 7.1,
    monthlyChangePercent: 16.3,
    marketCap: 465000000000,
    volume: 24600000000,
    relativeVolume: "1.5x normal",
    volatility: "Moderate",
    signal: "Watch",
    confidenceScore: 74,
    confidenceReason: "Strong weekly trend, ecosystem activity, and positive sentiment support confidence.",
    riskScore: 60,
    riskReason: "Risk is moderate-high because crypto and DeFi conditions can change quickly.",
    momentumScore: 80,
    momentumReason: "Recent price action shows broad momentum with elevated volume.",
    newsSentiment: "Positive",
    prediction: {
      h24: "Positive-to-volatile estimate with moderate confidence.",
      d7: "Constructive estimate if Layer 1 interest remains strong.",
      d30: "Positive but uncertain estimate because ecosystem headlines matter.",
      confidence: 70,
      riskLevel: "Moderate",
      possibleUpsideRange: "$4,050-$4,420",
      possibleDownsideRange: "$3,470-$3,620",
      bullCase: "Layer 1 demand, staking activity, and developer momentum could support strength.",
      bearCase: "Regulatory pressure or weaker DeFi activity could reduce confidence.",
      neutralCase: "Price may consolidate if Bitcoin leadership absorbs market attention.",
      uncertainty: "Ecosystem activity and regulation can change the setup rapidly."
    },
    beginnerExplanation: "Ethereum is a major crypto network used by many apps and tokens.",
    advancedExplanation:
      "Momentum is strong, relative volume is elevated, and ecosystem sentiment is positive, with moderate-high crypto risk.",
    strengths: ["Layer 1 ecosystem", "Positive momentum", "High liquidity"],
    risks: ["Regulatory uncertainty", "DeFi cycle risk", "Moderate crypto volatility"],
    suggestedAction: "Research further as a major crypto comparison against BTC and SOL.",
    researchAnswer: "Yes — worth researching",
    researchSupport: {
      good: "Momentum is strong and ecosystem sentiment is positive.",
      risky: "Risk remains elevated because crypto conditions change quickly.",
      changed: "Layer 1 attention and volume improved this week.",
      news: "Regulation, staking, and DeFi activity headlines matter most.",
      beginner: "Ethereum can move differently from Bitcoin because it has its own ecosystem drivers.",
      data: "Confidence 74, risk 60, momentum 80, and positive sentiment support the answer."
    },
    whySignal:
      "ETH is marked as Watch because momentum is strong, volume is above normal, and news sentiment is positive. Risk remains moderate because crypto markets can move quickly.",
    sparkline: [3320, 3450, 3550, 3640, 3730, 3810, 3864],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "SOL",
    name: "Solana",
    type: "Crypto",
    category: "Layer 1",
    exchange: "Crypto",
    price: 171.64,
    dailyChangePercent: 4.9,
    dailyChangeDollar: 8.01,
    weeklyChangePercent: 12.8,
    monthlyChangePercent: 20.6,
    marketCap: 82000000000,
    volume: 6900000000,
    relativeVolume: "2.2x normal",
    volatility: "High",
    signal: "Watch",
    confidenceScore: 69,
    confidenceReason: "Momentum is strong, but high volatility prevents a higher confidence label.",
    riskScore: 74,
    riskReason: "Risk is high because the asset moves quickly and volume spikes can reverse.",
    momentumScore: 88,
    momentumReason: "Price, volume, and recent performance are all strong.",
    newsSentiment: "Positive",
    prediction: {
      h24: "Positive but highly volatile estimate.",
      d7: "Constructive estimate if volume remains elevated without sharp reversal.",
      d30: "Positive-to-volatile estimate; risk control matters in research interpretation.",
      confidence: 66,
      riskLevel: "High",
      possibleUpsideRange: "$184-$205",
      possibleDownsideRange: "$145-$156",
      bullCase: "Network activity, token launches, and strong crypto mood could support momentum.",
      bearCase: "A crypto pullback or network reliability concern could pressure price quickly.",
      neutralCase: "Price may cool after a fast move while the trend resets.",
      uncertainty: "The estimate could be wrong if the current volume spike fades."
    },
    beginnerExplanation: "Solana is a faster-moving crypto asset, so the research setup can change quickly.",
    advancedExplanation:
      "Relative volume is very high and momentum is strong, but realized volatility puts the risk score in the high zone.",
    strengths: ["Strong momentum", "High ecosystem activity", "Above-normal volume"],
    risks: ["High volatility", "Fast reversals", "Crypto market dependency"],
    suggestedAction: "Research further only if high-volatility setups fit your study criteria.",
    researchAnswer: "Maybe — wait for better data",
    researchSupport: {
      good: "Momentum is one of the strongest readings in the crypto set.",
      risky: "Risk is high and price can reverse quickly after a volume spike.",
      changed: "Volume jumped above normal while price accelerated.",
      news: "Network activity, app launches, and crypto market mood matter most.",
      beginner: "A strong move can be risky when it happens very fast.",
      data: "Confidence 69, risk 74, momentum 88, and high volatility support caution."
    },
    whySignal:
      "SOL is marked as Watch because momentum is very strong and volume is far above normal. The high risk score means this is a higher-volatility research setup, not a low-risk setup.",
    sparkline: [130, 138, 147, 151, 160, 166, 172],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "XRP",
    name: "XRP",
    type: "Crypto",
    category: "Major crypto",
    exchange: "Crypto",
    price: 0.61,
    dailyChangePercent: -1.6,
    dailyChangeDollar: -0.01,
    weeklyChangePercent: -3.1,
    monthlyChangePercent: 1.8,
    marketCap: 34000000000,
    volume: 2100000000,
    relativeVolume: "1.2x normal",
    volatility: "High",
    signal: "Wait",
    confidenceScore: 48,
    confidenceReason: "Mixed trend and regulatory headline sensitivity reduce confidence.",
    riskScore: 78,
    riskReason: "Risk is high because price movement is headline-sensitive and volatile.",
    momentumScore: 41,
    momentumReason: "Weekly trend is negative and recent bounce attempts have not held.",
    newsSentiment: "Neutral",
    prediction: {
      h24: "Uncertain and volatile estimate.",
      d7: "Sideways-to-down estimate with low confidence.",
      d30: "Uncertain estimate tied to legal and regulatory news.",
      confidence: 45,
      riskLevel: "High",
      possibleUpsideRange: "$0.66-$0.72",
      possibleDownsideRange: "$0.51-$0.55",
      bullCase: "Positive regulatory clarity or broader crypto strength could improve sentiment.",
      bearCase: "Negative legal headlines could pressure the asset.",
      neutralCase: "Price may remain range-bound until clearer catalysts appear.",
      uncertainty: "Regulatory news can override technical signals quickly."
    },
    beginnerExplanation: "XRP is especially sensitive to regulatory news, so research should include legal headlines.",
    advancedExplanation:
      "Momentum is weak, risk is high, and sentiment is neutral, which keeps the signal cautious.",
    strengths: ["Recognized major crypto", "Active liquidity", "Potential headline catalysts"],
    risks: ["High regulatory sensitivity", "Weak recent momentum", "High volatility"],
    suggestedAction: "Wait for better data and clearer headlines before prioritizing research.",
    researchAnswer: "No — too risky right now",
    researchSupport: {
      good: "Liquidity remains active and the asset is widely tracked.",
      risky: "Risk is high, weekly trend is weak, and news sentiment is neutral.",
      changed: "Recent price action weakened while volume stayed elevated.",
      news: "Regulatory headlines matter more than normal technical signals.",
      beginner: "If an asset depends heavily on headlines, the setup can change suddenly.",
      data: "Confidence 48, risk 78, momentum 41, and high volatility support a cautious answer."
    },
    whySignal:
      "XRP is marked as Wait because the trend is mixed, risk is high, and regulatory news can quickly change the setup. Market data suggests more confirmation is needed.",
    sparkline: [0.64, 0.63, 0.62, 0.65, 0.62, 0.62, 0.61],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    type: "Crypto",
    category: "Meme coins",
    exchange: "Crypto",
    price: 0.18,
    dailyChangePercent: 8.7,
    dailyChangeDollar: 0.014,
    weeklyChangePercent: 18.9,
    monthlyChangePercent: 24.4,
    marketCap: 27000000000,
    volume: 4800000000,
    relativeVolume: "3.4x normal",
    volatility: "High",
    signal: "Avoid",
    confidenceScore: 42,
    confidenceReason: "The move is powerful but heavily sentiment-driven, which lowers confidence.",
    riskScore: 91,
    riskReason: "Risk is very high because the asset is meme-driven and volume spikes can unwind quickly.",
    momentumScore: 86,
    momentumReason: "Momentum is high, but the quality of that momentum is unstable.",
    newsSentiment: "Neutral",
    prediction: {
      h24: "Highly volatile and low-confidence estimate.",
      d7: "Volatile estimate with elevated downside risk if hype fades.",
      d30: "Uncertain estimate because sentiment can shift without fundamental support.",
      confidence: 38,
      riskLevel: "High",
      possibleUpsideRange: "$0.20-$0.24",
      possibleDownsideRange: "$0.12-$0.15",
      bullCase: "Social attention and broad crypto strength could extend the move.",
      bearCase: "A sentiment reversal or lower volume could trigger a sharp pullback.",
      neutralCase: "Price may churn if attention fades but crypto market mood stays positive.",
      uncertainty: "Social attention is difficult to model and can change quickly."
    },
    beginnerExplanation: "Dogecoin is labeled high risk because it can move on social attention more than business fundamentals.",
    advancedExplanation:
      "Momentum is extreme, but risk quality is poor due to meme-coin concentration, very high relative volume, and low prediction confidence.",
    strengths: ["High attention", "Strong short-term momentum", "Large community awareness"],
    risks: ["Very high volatility", "Sentiment-driven moves", "Low prediction confidence"],
    suggestedAction: "Avoid prioritizing this unless your research specifically studies high-risk meme coins.",
    researchAnswer: "No — too risky right now",
    researchSupport: {
      good: "Momentum and volume are high.",
      risky: "Risk is extremely high and confidence is low.",
      changed: "A sudden volume spike pushed price quickly.",
      news: "Social sentiment matters more than traditional fundamentals.",
      beginner: "Fast meme-coin moves can reverse suddenly.",
      data: "Confidence 42, risk 91, momentum 86, and high volatility support the answer."
    },
    whySignal:
      "DOGE is marked as Avoid because risk is extremely high, confidence is low, and the move depends heavily on social sentiment. Momentum is strong, but the setup quality is weak.",
    sparkline: [0.13, 0.14, 0.15, 0.16, 0.17, 0.16, 0.18],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "ADA",
    name: "Cardano",
    type: "Crypto",
    category: "Layer 1",
    exchange: "Crypto",
    price: 0.48,
    dailyChangePercent: 0.6,
    dailyChangeDollar: 0.003,
    weeklyChangePercent: 2.2,
    monthlyChangePercent: -4.8,
    marketCap: 17200000000,
    volume: 590000000,
    relativeVolume: "0.8x normal",
    volatility: "Moderate",
    signal: "Wait",
    confidenceScore: 51,
    confidenceReason: "Low relative volume and mixed monthly trend keep confidence modest.",
    riskScore: 62,
    riskReason: "Moderate crypto volatility and weak volume create elevated risk.",
    momentumScore: 45,
    momentumReason: "Momentum is not confirming a strong directional setup.",
    newsSentiment: "Neutral",
    prediction: {
      h24: "Sideways estimate with low-to-moderate confidence.",
      d7: "Sideways estimate unless volume improves.",
      d30: "Uncertain estimate tied to ecosystem updates.",
      confidence: 49,
      riskLevel: "Moderate",
      possibleUpsideRange: "$0.52-$0.57",
      possibleDownsideRange: "$0.41-$0.44",
      bullCase: "Developer and ecosystem activity could improve sentiment.",
      bearCase: "Low volume and weak crypto breadth could weigh on price.",
      neutralCase: "Price may remain range-bound without stronger catalysts.",
      uncertainty: "The estimate depends on volume returning to normal."
    },
    beginnerExplanation: "Cardano needs stronger data before the current setup looks clear.",
    advancedExplanation:
      "Relative volume is below normal and momentum is mixed, which keeps the signal in the Wait category.",
    strengths: ["Established Layer 1", "Active community", "Moderate volatility versus smaller tokens"],
    risks: ["Low relative volume", "Mixed momentum", "Ecosystem catalyst risk"],
    suggestedAction: "Wait for stronger volume and clearer news before ranking it highly.",
    researchAnswer: "Maybe — wait for better data",
    researchSupport: {
      good: "Risk is not as extreme as meme-driven assets.",
      risky: "Volume is low and monthly trend is weak.",
      changed: "Price stabilized but did not confirm a new strong trend.",
      news: "Ecosystem development updates matter most.",
      beginner: "When volume is low, price moves may be less reliable.",
      data: "Confidence 51, risk 62, momentum 45, and neutral sentiment support a wait answer."
    },
    whySignal:
      "ADA is marked as Wait because volume is below normal, momentum is mixed, and the news backdrop is neutral.",
    sparkline: [0.52, 0.5, 0.47, 0.46, 0.47, 0.48, 0.48],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    type: "Crypto",
    category: "Layer 1",
    exchange: "Crypto",
    price: 34.26,
    dailyChangePercent: -3.2,
    dailyChangeDollar: -1.13,
    weeklyChangePercent: -8.1,
    monthlyChangePercent: 6.5,
    marketCap: 13900000000,
    volume: 930000000,
    relativeVolume: "1.7x normal",
    volatility: "High",
    signal: "Avoid",
    confidenceScore: 44,
    confidenceReason: "Elevated volume is appearing during a weak weekly trend, which reduces setup quality.",
    riskScore: 82,
    riskReason: "Risk is high because price is falling faster than normal with elevated volatility.",
    momentumScore: 37,
    momentumReason: "Momentum is weak after a sharp weekly decline.",
    newsSentiment: "Negative",
    prediction: {
      h24: "Negative-to-volatile estimate with low confidence.",
      d7: "Weak setup estimate unless price stabilizes and sentiment improves.",
      d30: "Uncertain estimate; recovery depends on ecosystem news and crypto breadth.",
      confidence: 43,
      riskLevel: "High",
      possibleUpsideRange: "$38-$43",
      possibleDownsideRange: "$27-$30",
      bullCase: "A recovery in Layer 1 sentiment could help price stabilize.",
      bearCase: "Continued high-volume weakness could extend the decline.",
      neutralCase: "Price may chop near support if sellers and dip researchers balance out.",
      uncertainty: "A sudden crypto market recovery could change the setup quickly."
    },
    beginnerExplanation: "Avalanche is showing high risk because price has dropped while volume is above normal.",
    advancedExplanation:
      "Negative sentiment, high volatility, and declining momentum create a weak technical profile.",
    strengths: ["Established Layer 1", "Active ecosystem", "Elevated attention"],
    risks: ["Weak trend", "High volatility", "Negative sentiment"],
    suggestedAction: "Avoid prioritizing until risk cools and price action stabilizes.",
    researchAnswer: "No — too risky right now",
    researchSupport: {
      good: "It remains a known Layer 1 with active liquidity.",
      risky: "High-volume weakness, negative sentiment, and high risk all line up.",
      changed: "Price fell faster than normal while volume increased.",
      news: "Ecosystem and risk-off crypto headlines matter most.",
      beginner: "When price falls on higher volume, researchers should inspect risk first.",
      data: "Confidence 44, risk 82, momentum 37, and negative sentiment support the answer."
    },
    whySignal:
      "AVAX is marked as Avoid because momentum is weak, sentiment is negative, volatility is high, and the risk score is elevated.",
    sparkline: [38, 37, 36, 35, 36, 35, 34],
    lastUpdated: "Demo snapshot refreshed 5 minutes ago"
  }
];

export const dashboard = {
  overallMood: "Bullish" as Mood,
  stockMood: "Bullish" as Mood,
  cryptoMood: "Neutral" as Mood,
  fearGreedScore: 68,
  marketStrength: 72,
  volatilityLevel: "Moderate" as RiskLevel,
  lastUpdated: "Demo snapshot refreshed 5 minutes ago",
  dailySummary:
    "Market data suggests a constructive but selective environment. Large-cap AI and cloud stocks show stronger confirmation than most high-volatility crypto assets. Beginners should notice that momentum is positive in several areas, but risk is not evenly distributed.",
  beginnerToday:
    "A bullish market mood means more assets are rising than falling, but it does not mean every asset is safe. Compare confidence, risk, volume, and news before deciding what to research further.",
  risksToday: [
    {
      title: "AI valuation sensitivity",
      severity: "Moderate",
      why: "AI-related stocks have strong momentum, but high expectations can make prices sensitive to any weaker news."
    },
    {
      title: "Crypto volatility spike",
      severity: "High",
      why: "SOL and DOGE show fast moves with elevated volume, which can reverse quickly."
    },
    {
      title: "Regulatory headline risk",
      severity: "Moderate",
      why: "Crypto and large-cap technology remain exposed to policy headlines that can change sentiment."
    }
  ]
};

export const newsItems = [
  {
    headline: "AI infrastructure demand lifts semiconductor research screens",
    source: "Market Signal Demo Wire",
    relatedSymbols: ["NVDA", "MSFT", "META"],
    sentiment: "Positive" as Sentiment,
    impactScore: 8.6,
    category: "AI News",
    summary:
      "Large-cap AI infrastructure names are attracting higher volume in the demo feed. The strongest confirmation appears in semiconductor and cloud-linked assets.",
    whyItMatters:
      "AI spending can affect revenue expectations, valuation, and momentum for technology assets.",
    publishedAt: "Today, 9:05 AM",
    url: "#"
  },
  {
    headline: "Crypto volume rises while volatility remains elevated",
    source: "Market Signal Demo Wire",
    relatedSymbols: ["BTC", "ETH", "SOL", "DOGE"],
    sentiment: "Neutral" as Sentiment,
    impactScore: 7.4,
    category: "Crypto Regulation",
    summary:
      "Major crypto assets show stronger volume, but several smaller or meme-linked assets remain high risk. Researchers should separate market leadership from high-volatility spikes.",
    whyItMatters:
      "Volume can confirm interest, but high volatility means confidence must be checked carefully.",
    publishedAt: "Today, 8:35 AM",
    url: "#"
  },
  {
    headline: "Interest-rate expectations keep risk review important",
    source: "Market Signal Demo Wire",
    relatedSymbols: ["AAPL", "GOOGL", "AMZN"],
    sentiment: "Neutral" as Sentiment,
    impactScore: 6.8,
    category: "Interest Rates",
    summary:
      "Large-cap technology remains constructive, but interest-rate expectations can change valuation assumptions quickly.",
    whyItMatters:
      "When rates shift, investors may reassess growth assets and risk appetite.",
    publishedAt: "Today, 7:50 AM",
    url: "#"
  },
  {
    headline: "Layer 1 assets split between strong momentum and weak setup quality",
    source: "Market Signal Demo Wire",
    relatedSymbols: ["ETH", "SOL", "ADA", "AVAX"],
    sentiment: "Negative" as Sentiment,
    impactScore: 7.8,
    category: "Major Announcements",
    summary:
      "ETH and SOL show stronger momentum, while ADA and AVAX have weaker confirmation. The split highlights why crypto screeners need risk and confidence side by side.",
    whyItMatters:
      "Assets in the same category can have very different risk profiles.",
    publishedAt: "Yesterday, 4:10 PM",
    url: "#"
  }
];

export const predictionHistory = [
  {
    date: "Jun 10",
    asset: "NVDA",
    timeframe: "7d",
    predictedDirection: "Up",
    startingPrice: "$136.30",
    endingPrice: "Pending",
    actualResult: "Pending",
    accuracyScore: "Pending",
    notes: "AI sector volume remained above normal."
  },
  {
    date: "Jun 3",
    asset: "BTC",
    timeframe: "7d",
    predictedDirection: "Volatile",
    startingPrice: "$99,400",
    endingPrice: "$104,820",
    actualResult: "Up with volatility",
    accuracyScore: "82%",
    notes: "ETF-flow headlines improved crypto mood."
  },
  {
    date: "May 13",
    asset: "TSLA",
    timeframe: "30d",
    predictedDirection: "Uncertain",
    startingPrice: "$181.80",
    endingPrice: "$185.44",
    actualResult: "Sideways",
    accuracyScore: "68%",
    notes: "Mixed EV demand headlines kept direction muted."
  }
];

export const unusualActivity = [
  {
    title: "DOGE volume spike",
    symbol: "DOGE",
    level: "High",
    explanation:
      "Volume is 3.4x normal while risk is extremely high. This matters because meme-driven moves can reverse quickly."
  },
  {
    title: "SOL price moving faster than normal",
    symbol: "SOL",
    level: "High",
    explanation:
      "Momentum is strong but volatility is high. Researchers should understand that fast movement can increase both opportunity and downside risk."
  },
  {
    title: "AVAX moving against stronger crypto assets",
    symbol: "AVAX",
    level: "Moderate",
    explanation:
      "AVAX is weaker while BTC and ETH are constructive, which can signal asset-specific risk."
  },
  {
    title: "Demo data refresh status",
    symbol: "ALL",
    level: "Low",
    explanation:
      "Live APIs are not connected in this build, so all market views show clearly labeled Demo Data."
  }
];

export const definitions = [
  {
    term: "Volatility",
    plain:
      "Volatility means how much the price moves up and down. High volatility can mean bigger gains, but also bigger losses.",
    advanced:
      "A measure of price dispersion over time, often based on realized standard deviation or implied market expectations."
  },
  {
    term: "Volume",
    plain: "Volume is how much of an asset traded during a period. Higher volume can make a price move more meaningful.",
    advanced: "Total units or shares traded, often compared with average volume to detect participation changes."
  },
  {
    term: "Market Cap",
    plain: "Market cap is the total estimated value of an asset or company.",
    advanced: "For stocks, share price multiplied by shares outstanding; for crypto, token price multiplied by circulating supply."
  },
  {
    term: "RSI",
    plain: "RSI is a momentum tool that tries to show whether price has moved too far too fast.",
    advanced: "Relative Strength Index compares average gains and losses across a lookback period, commonly 14 periods."
  },
  {
    term: "Moving Averages",
    plain: "A moving average smooths price so you can see the trend more clearly.",
    advanced: "Rolling average price over a defined window, often used to evaluate trend direction and support zones."
  },
  {
    term: "Support and Resistance",
    plain: "Support is an area where price has often stopped falling. Resistance is an area where price has often stopped rising.",
    advanced: "Price zones inferred from historical supply-demand behavior, liquidity, and prior turning points."
  },
  {
    term: "News Sentiment",
    plain: "News sentiment estimates whether recent headlines are mostly positive, neutral, or negative.",
    advanced: "A categorization of text tone and expected market impact, usually weighted by source, recency, and relevance."
  },
  {
    term: "Risk Score",
    plain: "Risk score estimates how risky the current setup looks. Higher means more caution is needed.",
    advanced: "Composite risk metric using volatility, trend instability, sentiment, liquidity, and event risk."
  },
  {
    term: "Confidence Score",
    plain: "Confidence score estimates how much data supports the current research signal.",
    advanced: "Composite confidence metric using momentum confirmation, volume, sentiment, data freshness, and trend consistency."
  },
  {
    term: "Bullish",
    plain: "Bullish means market data is leaning positive.",
    advanced: "A directional market state where trend, breadth, or momentum data leans upward."
  },
  {
    term: "Bearish",
    plain: "Bearish means market data is leaning negative.",
    advanced: "A directional market state where trend, breadth, or momentum data leans downward."
  },
  {
    term: "Fear Meter",
    plain: "The fear meter estimates whether market behavior looks cautious or confident.",
    advanced: "A composite sentiment gauge derived from volatility, breadth, momentum, and demand proxies."
  },
  {
    term: "Momentum",
    plain: "Momentum shows whether price has been moving strongly in one direction.",
    advanced: "A trend-strength measure derived from recent return velocity, relative strength, and moving-average behavior."
  },
  {
    term: "Crypto Market Terms",
    plain: "Layer 1 means a base blockchain. DeFi means financial apps built on blockchains. Meme coins are high-risk tokens driven heavily by attention.",
    advanced:
      "Crypto categories include Layer 1 networks, Layer 2 scaling systems, DeFi protocols, and attention-driven meme assets with distinct liquidity and risk behavior."
  }
];

export const adminStats = {
  totalUsers: 12840,
  activeUsers: 3910,
  freeUsers: 11870,
  premiumUsers: 970,
  mostSearchedStocks: ["NVDA", "TSLA", "AAPL", "MSFT", "META"],
  mostSearchedCrypto: ["BTC", "SOL", "ETH", "DOGE", "XRP"],
  mostTriggeredAlerts: ["Signal changed", "Volatility spike", "Risk score changed"],
  apiErrorCount: 0,
  dataRefreshStatus: "Demo scheduler healthy",
  predictionAccuracySummary: "Overall 74%, 7-day 78%, 30-day 69%",
  discordWebhookStatus: "Configured stub, inactive until webhook URL is provided"
};

export function getAsset(symbol: string) {
  return assets.find((asset) => asset.symbol.toLowerCase() === symbol.toLowerCase());
}

export function getAssetsByType(type: AssetType) {
  return assets.filter((asset) => asset.type === type);
}

export function formatMoney(value: number) {
  if (value >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 1 ? 3 : 2
  }).format(value);
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2
  }).format(value);
}

export function sortedByMomentum(type?: AssetType) {
  return [...(type ? getAssetsByType(type) : assets)].sort((a, b) => b.momentumScore - a.momentumScore);
}

export function sortedByChange(type?: AssetType) {
  return [...(type ? getAssetsByType(type) : assets)].sort((a, b) => b.dailyChangePercent - a.dailyChangePercent);
}

export function screenerFilters(type: AssetType) {
  const base = [
    "Top gainers",
    "Top losers",
    "High confidence",
    "Low risk",
    "High momentum",
    "High volume",
    "Low volatility",
    "Trending news",
    "Strong Watch signal",
    "Beginner-friendly assets"
  ];

  if (type === "Stock") {
    return [...base, "Large cap", "AI-related stocks", "Tech stocks"];
  }

  return [...base, "Major crypto only", "DeFi", "Layer 1", "Layer 2", "Meme coins (High Risk)"];
}
