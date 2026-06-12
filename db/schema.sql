-- Market Signal Deck database schema
-- Designed for Supabase Postgres. Enable auth policies before production use.

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  username text,
  role text not null default 'free' check (role in ('free', 'premium', 'admin')),
  plan text not null default 'free',
  beginner_mode boolean not null default true,
  created_at timestamptz not null default now(),
  last_login timestamptz
);

create table if not exists watchlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists watchlist_items (
  id uuid primary key default gen_random_uuid(),
  watchlist_id uuid not null references watchlists(id) on delete cascade,
  symbol text not null,
  asset_type text not null check (asset_type in ('stock', 'crypto')),
  added_at timestamptz not null default now(),
  unique (watchlist_id, symbol)
);

create table if not exists assets (
  id uuid primary key default gen_random_uuid(),
  symbol text unique not null,
  name text not null,
  asset_type text not null check (asset_type in ('stock', 'crypto')),
  exchange text,
  market_cap numeric,
  active_status boolean not null default true
);

create table if not exists market_data_snapshots (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  asset_type text not null check (asset_type in ('stock', 'crypto')),
  price numeric not null,
  daily_change numeric,
  volume numeric,
  market_cap numeric,
  volatility text check (volatility in ('low', 'moderate', 'high')),
  timestamp timestamptz not null default now()
);

create table if not exists historical_prices (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  asset_type text not null check (asset_type in ('stock', 'crypto')),
  open numeric,
  high numeric,
  low numeric,
  close numeric not null,
  volume numeric,
  timestamp timestamptz not null
);

create table if not exists ticker_search_logs (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  asset_type text,
  timestamp timestamptz not null default now(),
  found_status boolean not null
);

create table if not exists trending_assets (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  asset_type text not null check (asset_type in ('stock', 'crypto')),
  trend_score numeric not null,
  reason text not null,
  timeframe text not null,
  calculated_at timestamptz not null default now()
);

create table if not exists predictions (
  id uuid primary key default gen_random_uuid(),
  symbol text not null,
  asset_type text not null check (asset_type in ('stock', 'crypto')),
  timeframe text not null,
  predicted_direction text not null check (predicted_direction in ('up', 'down', 'sideways', 'volatile', 'uncertain')),
  predicted_range_low numeric,
  predicted_range_high numeric,
  confidence_score numeric not null,
  risk_score numeric not null,
  price_at_prediction numeric not null,
  explanation text not null,
  created_at timestamptz not null default now(),
  check_due_at timestamptz not null
);

create table if not exists prediction_results (
  id uuid primary key default gen_random_uuid(),
  prediction_id uuid not null references predictions(id) on delete cascade,
  actual_direction text not null,
  ending_price numeric,
  accuracy_score numeric,
  was_correct boolean,
  checked_at timestamptz not null default now(),
  notes text
);

create table if not exists news_items (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  source text not null,
  related_symbols text[] not null default '{}',
  sentiment text not null check (sentiment in ('positive', 'neutral', 'negative')),
  impact_score numeric not null,
  category text not null,
  summary text not null,
  url text,
  published_at timestamptz not null
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  symbol text not null,
  alert_type text not null,
  condition text not null,
  target_value numeric,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  triggered_at timestamptz
);

create table if not exists discord_webhooks (
  id uuid primary key default gen_random_uuid(),
  webhook_name text not null,
  webhook_url text not null,
  alert_type text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists backend_logs (
  id uuid primary key default gen_random_uuid(),
  log_type text not null,
  status text not null check (status in ('success', 'failure')),
  message text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

create table if not exists market_update_logs (
  id uuid primary key default gen_random_uuid(),
  update_type text not null,
  assets_updated integer not null,
  status text not null,
  api_source text not null,
  error_message text,
  duration_ms integer,
  created_at timestamptz not null default now()
);

create table if not exists daily_ai_summaries (
  id uuid primary key default gen_random_uuid(),
  market_mood text not null,
  stock_mood text not null,
  crypto_mood text not null,
  fear_greed_score numeric not null,
  summary text not null,
  risks jsonb not null default '[]',
  trending_assets jsonb not null default '[]',
  beginner_explanation text not null,
  created_at timestamptz not null default now()
);

create index if not exists market_data_symbol_timestamp_idx on market_data_snapshots (symbol, timestamp desc);
create index if not exists historical_prices_symbol_timestamp_idx on historical_prices (symbol, timestamp desc);
create index if not exists ticker_search_symbol_idx on ticker_search_logs (symbol, timestamp desc);
create index if not exists news_related_symbols_idx on news_items using gin (related_symbols);

-- Suggested scheduler:
-- Refresh market_data_snapshots every 5 minutes for stocks and crypto.
-- Check 7-day predictions after 7 days and 30-day predictions after 30 days.
-- Generate daily_ai_summaries every morning.
