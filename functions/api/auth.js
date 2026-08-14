import { authorized, json } from './_lib.js';

export function onRequestGet({ request, env }) {
  if (!authorized(request, env)) return json({ ok: false, error: 'UNAUTHORIZED' }, 401);
  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false, error: 'METHOD_NOT_ALLOWED' }, 405);
}
