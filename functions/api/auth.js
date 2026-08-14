import { authorized, json } from './_lib.js';

export function onRequestGet({ request, env }) {
  if (!authorized(request, env)) return json({ ok: false, error: 'UNAUTHORIZED' }, 401);
  return json({ ok: true });
}

export async function onRequestPost({ request, env }) {
  const expected = String(env.ANALYTICS_ADMIN_TOKEN || '');
  const actual = String(await request.text()).trim();
  if (expected.length < 8 || actual !== expected) return json({ ok: false, error: 'UNAUTHORIZED' }, 401);
  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false, error: 'METHOD_NOT_ALLOWED' }, 405);
}
