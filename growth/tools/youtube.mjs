#!/usr/bin/env node
// YouTube Data + Analytics for the growth loop. Reads GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET /
// YOUTUBE_REFRESH_TOKEN from the gitignored .env at the repo root.
//
//   node growth/tools/youtube.mjs auth              one-time browser sign-in; saves YOUTUBE_REFRESH_TOKEN to .env
//   node growth/tools/youtube.mjs latest [--hours 24] [--no-cache]
//                                                   newest upload(s) in the window: live stats + Analytics report
//
// Quota rules (free 10,000 units/day):
//   - Several videos: ONE videos.list call with id=ID1,ID2,... (1 unit for up to 50 ids), never one call per video.
//   - Every GET is cached in growth/.youtube-cache/ (live stats 10 min, finished Analytics days 24 h), so
//     repeating a query does not spend quota. --no-cache forces a fresh call.
//   - 429 / 5xx / rateLimitExceeded retry with exponential backoff; quotaExceeded (daily cap) stops at once,
//     since retrying cannot succeed before the quota resets at midnight Pacific.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const ENV_FILE = path.join(REPO, '.env');
const CACHE_DIR = path.join(REPO, 'growth', '.youtube-cache');
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly', 'https://www.googleapis.com/auth/yt-analytics.readonly'];

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (name, dflt) => (args.includes(name) ? args[args.indexOf(name) + 1] : dflt);
const noCache = args.includes('--no-cache');

function loadEnv() {
  const env = {};
  if (fs.existsSync(ENV_FILE)) {
    for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return { ...env, ...process.env };
}
function setEnv(key, value) {
  let text = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '';
  const re = new RegExp(`^${key}=.*$`, 'm');
  text = re.test(text) ? text.replace(re, `${key}=${value}`) : text.replace(/\n?$/, '\n') + `${key}=${value}\n`;
  fs.writeFileSync(ENV_FILE, text, { mode: 0o600 });
}

const env = loadEnv();
const need = (k) => env[k] || die(`${k} is missing from .env`);
function die(msg) { console.error(msg); process.exit(1); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- HTTP with retry ----------
async function request(url, init = {}, tries = 5) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, init);
    const body = await res.text();
    let json; try { json = JSON.parse(body); } catch { json = { raw: body }; }
    if (res.ok) return json;
    const reason = json?.error?.errors?.[0]?.reason || json?.error?.status || '';
    if (/quotaExceeded|dailyLimitExceeded/.test(reason)) {
      throw new Error(`Daily YouTube quota used up (${reason}); it resets at midnight Pacific. Not retrying.`);
    }
    const transient = res.status === 429 || res.status >= 500 || /rateLimitExceeded|userRateLimitExceeded|backendError/.test(reason);
    if (!transient || attempt >= tries - 1) {
      throw new Error(`${res.status} ${reason} ${json?.error?.message || json?.error_description || body}`.trim());
    }
    const wait = Math.min(32000, 1000 * 2 ** attempt) + Math.random() * 1000;
    console.error(`  ${res.status} ${reason}: retrying in ${(wait / 1000).toFixed(1)} s`);
    await sleep(wait);
  }
}

// ---------- OAuth ----------
async function auth() {
  const clientId = need('GOOGLE_CLIENT_ID');
  const verifier = crypto.randomBytes(48).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
  const state = crypto.randomBytes(16).toString('hex');
  const port = Number(opt('--port', 8765));
  const redirect = `http://127.0.0.1:${port}`;

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const u = new URL(req.url, redirect);
      if (!u.searchParams.has('code') && !u.searchParams.has('error')) { res.end(); return; }
      const ok = u.searchParams.get('state') === state && u.searchParams.get('code');
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(ok ? '<h2>Signed in. You can close this tab.</h2>' : `<h2>Sign-in failed: ${u.searchParams.get('error') || 'state mismatch'}</h2>`);
      server.close();
      ok ? resolve(ok) : reject(new Error(u.searchParams.get('error') || 'state mismatch'));
    }).listen(port, '127.0.0.1', () => {
      const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      url.search = new URLSearchParams({
        client_id: clientId, redirect_uri: redirect, response_type: 'code', scope: SCOPES.join(' '),
        access_type: 'offline', prompt: 'select_account consent', code_challenge: challenge, code_challenge_method: 'S256', state,
      });
      console.log(`Open this URL and sign in with the channel's Google account:\n\n${url}\n\nWaiting on ${redirect} ...`);
    });
  });

  const params = { client_id: clientId, code, code_verifier: verifier, grant_type: 'authorization_code', redirect_uri: redirect };
  if (env.GOOGLE_CLIENT_SECRET) params.client_secret = env.GOOGLE_CLIENT_SECRET;
  const tok = await request('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams(params) }, 1);
  if (!tok.refresh_token) die('No refresh_token returned. Revoke the app at myaccount.google.com/permissions and run auth again.');
  setEnv('YOUTUBE_REFRESH_TOKEN', tok.refresh_token);
  console.log('Saved YOUTUBE_REFRESH_TOKEN to .env');
}

let accessToken;
async function token() {
  if (accessToken) return accessToken;
  const params = { client_id: need('GOOGLE_CLIENT_ID'), refresh_token: env.YOUTUBE_REFRESH_TOKEN || die('Run `node growth/tools/youtube.mjs auth` first.'), grant_type: 'refresh_token' };
  if (env.GOOGLE_CLIENT_SECRET) params.client_secret = env.GOOGLE_CLIENT_SECRET;
  accessToken = (await request('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams(params) }, 3)).access_token;
  return accessToken;
}

// ---------- cached GET ----------
async function get(base, params, ttlMs) {
  const url = `${base}?${new URLSearchParams(params)}`;
  const file = path.join(CACHE_DIR, crypto.createHash('sha1').update(url).digest('hex') + '.json');
  if (!noCache && fs.existsSync(file) && Date.now() - fs.statSync(file).mtimeMs < ttlMs) {
    return JSON.parse(fs.readFileSync(file, 'utf8')).data;
  }
  const data = await request(url, { headers: { authorization: `Bearer ${await token()}` } });
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ url, fetched: new Date().toISOString(), data }, null, 2));
  return data;
}
const MIN = 60e3;
const yt = (p, params) => get(`https://www.googleapis.com/youtube/v3/${p}`, params, 10 * MIN);

// ---------- commands ----------
async function latest() {
  const hours = Number(opt('--hours', 24));
  const ch = await yt('channels', { part: 'snippet,contentDetails', mine: 'true' });
  const channel = ch.items?.[0] || die('No channel on this Google account.');
  const uploads = channel.contentDetails.relatedPlaylists.uploads;
  const pl = await yt('playlistItems', { part: 'contentDetails', playlistId: uploads, maxResults: '25' });
  const ids = pl.items.map((i) => i.contentDetails.videoId);
  // One batched call for every id (1 quota unit for up to 50).
  const vids = (await yt('videos', { part: 'snippet,contentDetails,statistics,status', id: ids.join(',') })).items
    .sort((a, b) => b.snippet.publishedAt.localeCompare(a.snippet.publishedAt));
  const cutoff = Date.now() - hours * 3600e3;
  let picks = vids.filter((v) => Date.parse(v.snippet.publishedAt) >= cutoff);
  if (!picks.length) {
    console.log(`No upload in the last ${hours} h on "${channel.snippet.title}"; showing the newest instead.`);
    picks = vids.slice(0, 1);
  }

  const today = new Date().toISOString().slice(0, 10);
  const out = [];
  for (const v of picks) {
    const start = v.snippet.publishedAt.slice(0, 10);
    const report = await get('https://youtubeanalytics.googleapis.com/v2/reports', {
      ids: 'channel==MINE', startDate: start, endDate: today, filters: `video==${v.id}`,
      metrics: 'views,engagedViews,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,likes,comments,shares,subscribersGained',
    }, 60 * MIN).catch((e) => get('https://youtubeanalytics.googleapis.com/v2/reports', {
      // engagedViews is newer; fall back without it if this account's API rejects it
      ids: 'channel==MINE', startDate: start, endDate: today, filters: `video==${v.id}`,
      metrics: 'views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,likes,comments,shares,subscribersGained',
    }, 60 * MIN));
    const analytics = report.rows?.length
      ? Object.fromEntries(report.columnHeaders.map((h, i) => [h.name, report.rows[0][i]]))
      : null;
    out.push({
      id: v.id, url: `https://youtube.com/shorts/${v.id}`, title: v.snippet.title, published: v.snippet.publishedAt,
      duration: v.contentDetails.duration, privacy: v.status.privacyStatus,
      live: { views: +v.statistics.viewCount || 0, likes: +v.statistics.likeCount || 0, comments: +v.statistics.commentCount || 0 },
      analytics: analytics ?? 'no rows yet (Analytics usually lags 24–72 h behind the live counters)',
    });
  }
  console.log(JSON.stringify({ channel: channel.snippet.title, videos: out }, null, 2));
}

try {
  if (cmd === 'auth') await auth();
  else if (cmd === 'latest') await latest();
  else die('usage: node growth/tools/youtube.mjs auth | latest [--hours 24] [--no-cache]');
} catch (e) { die(String(e.message || e)); }
