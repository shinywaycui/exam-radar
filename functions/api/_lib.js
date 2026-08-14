const encoder = new TextEncoder();

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

export function requireDatabase(env) {
  if (!env.ANALYTICS_DB) throw new Error('ANALYTICS_DB_NOT_CONFIGURED');
  return env.ANALYTICS_DB;
}

export async function ensureSchema(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS analytics_events (
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
    )`),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_analytics_time ON analytics_events(occurred_at)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_analytics_visitor ON analytics_events(visitor_hash)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event_name)')
  ]);
}

export function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || '';
}

export function maskIp(ip) {
  if (!ip) return '未知';
  if (ip.includes(':')) {
    const parts = ip.split(':').filter(Boolean);
    return `${parts.slice(0, 3).join(':')}::****`;
  }
  const parts = ip.split('.');
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.*` : '已脱敏';
}

export async function visitorHash(ip, userAgent, salt) {
  const input = encoder.encode(`${salt}|${ip}|${userAgent}`);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return [...new Uint8Array(digest)].map(v => v.toString(16).padStart(2, '0')).join('');
}

export function browserName(ua = '') {
  if (/MicroMessenger/i.test(ua)) return '微信';
  if (/Edg\//i.test(ua)) return 'Edge';
  if (/Chrome\//i.test(ua)) return 'Chrome';
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return 'Safari';
  if (/Firefox\//i.test(ua)) return 'Firefox';
  return '其他';
}

export function deviceType(ua = '') {
  if (/iPad|Tablet/i.test(ua)) return '平板';
  if (/Android|iPhone|iPod|Mobile/i.test(ua)) return '手机';
  return '电脑';
}

export function safeText(value, max = 240) {
  return String(value || '').trim().slice(0, max);
}

export function authorized(request, env) {
  const expected = String(env.ANALYTICS_ADMIN_TOKEN || '');
  const actual = request.headers.get('Authorization') || '';
  return expected.length >= 12 && actual === `Bearer ${expected}`;
}

export function dateRange(url) {
  const endDefault = new Date();
  const startDefault = new Date(endDefault.getTime() - 6 * 86400000);
  const parse = (value, fallback) => {
    const date = value ? new Date(value) : fallback;
    return Number.isNaN(date.getTime()) ? fallback : date;
  };
  const start = parse(url.searchParams.get('start'), startDefault);
  const end = parse(url.searchParams.get('end'), endDefault);
  const maxWindow = 366 * 86400000;
  if (end < start || end - start > maxWindow) throw new Error('INVALID_DATE_RANGE');
  return { start: start.toISOString(), end: end.toISOString() };
}

export function rows(result) {
  return result?.results || [];
}
