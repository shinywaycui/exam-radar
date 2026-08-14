import { authorized, dateRange, ensureSchema, json, requireDatabase, rows } from './_lib.js';

export async function onRequestGet({ request, env }) {
  if (!authorized(request, env)) return json({ ok: false, error: 'UNAUTHORIZED' }, 401);
  try {
    const db = requireDatabase(env);
    await ensureSchema(db);
    const { start, end } = dateRange(new URL(request.url));
    const bindRange = sql => db.prepare(sql).bind(start, end);
    const [summary, trend, pages, sources, regions, devices, actions, ipSources, recent] = await db.batch([
      bindRange(`SELECT
        SUM(CASE WHEN event_name='page_view' THEN 1 ELSE 0 END) AS page_views,
        COUNT(DISTINCT CASE WHEN event_name='page_view' THEN visitor_hash END) AS visitors,
        COUNT(DISTINCT CASE WHEN event_name='page_view' THEN session_id END) AS visits,
        SUM(CASE WHEN event_name<>'page_view' THEN 1 ELSE 0 END) AS actions
        FROM analytics_events WHERE occurred_at>=? AND occurred_at<?`),
      bindRange(`SELECT substr(occurred_at,1,10) AS day,
        SUM(CASE WHEN event_name='page_view' THEN 1 ELSE 0 END) AS page_views,
        COUNT(DISTINCT CASE WHEN event_name='page_view' THEN visitor_hash END) AS visitors,
        COUNT(DISTINCT CASE WHEN event_name='page_view' THEN session_id END) AS visits
        FROM analytics_events WHERE occurred_at>=? AND occurred_at<? GROUP BY day ORDER BY day`),
      bindRange(`SELECT page_path AS name, COUNT(*) AS value FROM analytics_events
        WHERE occurred_at>=? AND occurred_at<? AND event_name='page_view' GROUP BY page_path ORDER BY value DESC LIMIT 12`),
      bindRange(`SELECT CASE WHEN referrer_host='' THEN '直接访问' ELSE referrer_host END AS name, COUNT(*) AS value
        FROM analytics_events WHERE occurred_at>=? AND occurred_at<? AND event_name='page_view'
        GROUP BY name ORDER BY value DESC LIMIT 12`),
      bindRange(`SELECT CASE WHEN country='' THEN '未知地区' ELSE country END AS country,
        CASE WHEN city='' THEN '未知城市' ELSE city END AS city, COUNT(*) AS page_views,
        COUNT(DISTINCT visitor_hash) AS visitors FROM analytics_events
        WHERE occurred_at>=? AND occurred_at<? AND event_name='page_view'
        GROUP BY country,city ORDER BY page_views DESC LIMIT 20`),
      bindRange(`SELECT CASE WHEN device_type='' THEN '未知设备' ELSE device_type END AS name, COUNT(*) AS value
        FROM analytics_events WHERE occurred_at>=? AND occurred_at<? AND event_name='page_view'
        GROUP BY name ORDER BY value DESC`),
      bindRange(`SELECT event_name AS name, COUNT(*) AS value FROM analytics_events
        WHERE occurred_at>=? AND occurred_at<? AND event_name<>'page_view'
        GROUP BY event_name ORDER BY value DESC LIMIT 12`),
      bindRange(`SELECT masked_ip, country, region, city, COUNT(*) AS page_views,
        COUNT(DISTINCT session_id) AS visits, MAX(occurred_at) AS last_seen
        FROM analytics_events WHERE occurred_at>=? AND occurred_at<? AND event_name='page_view'
        GROUP BY masked_ip,country,region,city ORDER BY last_seen DESC LIMIT 60`),
      bindRange(`SELECT occurred_at,event_name,page_path,masked_ip,country,city,device_type,browser_name
        FROM analytics_events WHERE occurred_at>=? AND occurred_at<? ORDER BY occurred_at DESC LIMIT 80`)
    ]);
    const totals = rows(summary)[0] || {};
    const pageViews = Number(totals.page_views || 0);
    const visits = Number(totals.visits || 0);
    return json({
      ok: true, range: { start, end },
      summary: {
        pageViews,
        visitors: Number(totals.visitors || 0),
        visits,
        actions: Number(totals.actions || 0),
        pagesPerVisit: visits ? Number((pageViews / visits).toFixed(2)) : 0
      },
      trend: rows(trend), pages: rows(pages), sources: rows(sources), regions: rows(regions),
      devices: rows(devices), actions: rows(actions), ipSources: rows(ipSources), recent: rows(recent)
    });
  } catch (error) {
    if (error.message === 'ANALYTICS_DB_NOT_CONFIGURED') return json({ ok: false, error: error.message }, 503);
    if (error.message === 'INVALID_DATE_RANGE') return json({ ok: false, error: error.message }, 400);
    return json({ ok: false, error: 'STATS_FAILED' }, 500);
  }
}

export function onRequest() {
  return json({ ok: false, error: 'METHOD_NOT_ALLOWED' }, 405);
}
