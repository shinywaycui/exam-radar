CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at TEXT NOT NULL,
  event_name TEXT NOT NULL DEFAULT 'page_view',
  visitor_hash TEXT NOT NULL,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT DEFAULT '',
  referrer_host TEXT DEFAULT '',
  country TEXT DEFAULT '',
  region TEXT DEFAULT '',
  city TEXT DEFAULT '',
  colo TEXT DEFAULT '',
  device_type TEXT DEFAULT '',
  browser_name TEXT DEFAULT '',
  masked_ip TEXT DEFAULT '',
  metadata TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_analytics_time ON analytics_events(occurred_at);
CREATE INDEX IF NOT EXISTS idx_analytics_visitor ON analytics_events(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event_name);
