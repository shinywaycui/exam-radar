import { browserName, clientIp, deviceType, ensureSchema, json, maskIp, requireDatabase, safeText, visitorHash } from './_lib.js';

export async function onRequestPost({ request, env, waitUntil }) {
  try {
    const db = requireDatabase(env);
    const payload = await request.json().catch(() => ({}));
    const eventName = safeText(payload.eventName || 'page_view', 60).replace(/[^a-zA-Z0-9_\-]/g, '') || 'page_view';
    const pagePath = safeText(payload.pagePath || '/', 300);
    const sessionId = safeText(payload.sessionId, 80);
    if (!sessionId || !pagePath) return json({ ok: false, error: 'INVALID_EVENT' }, 400);

    const ip = clientIp(request);
    const ua = request.headers.get('User-Agent') || '';
    const salt = env.ANALYTICS_SALT || env.ANALYTICS_ADMIN_TOKEN || 'exam-radar-anonymous';
    const hash = await visitorHash(ip, ua, salt);
    const cf = request.cf || {};
    let referrerHost = '';
    try { referrerHost = new URL(payload.referrer || '').hostname; } catch {}
    const metadata = payload.metadata && typeof payload.metadata === 'object'
      ? JSON.stringify(payload.metadata).slice(0, 800)
      : '';

    const write = async () => {
      await ensureSchema(db);
      await db.prepare(`INSERT INTO analytics_events (
        occurred_at,event_name,visitor_hash,session_id,page_path,page_title,referrer_host,
        country,region,city,colo,device_type,browser_name,masked_ip,metadata
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
        new Date().toISOString(), eventName, hash, sessionId, pagePath,
        safeText(payload.pageTitle, 160), safeText(referrerHost, 160),
        safeText(cf.country, 20), safeText(cf.region, 100), safeText(cf.city, 100), safeText(cf.colo, 20),
        deviceType(ua), browserName(ua), maskIp(ip), metadata
      ).run();
    };
    waitUntil(write());
    return json({ ok: true }, 202);
  } catch (error) {
    if (error.message === 'ANALYTICS_DB_NOT_CONFIGURED') return json({ ok: false, error: error.message }, 503);
    return json({ ok: false, error: 'TRACK_FAILED' }, 500);
  }
}

export function onRequest() {
  return json({ ok: false, error: 'METHOD_NOT_ALLOWED' }, 405);
}
