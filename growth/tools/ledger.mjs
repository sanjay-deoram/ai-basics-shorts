#!/usr/bin/env node
// Builds growth/ledger.csv from every snapshot folder in growth/raw/<YYYY-MM-DD>/ (a later snapshot
// overwrites an earlier one for the same post, so posts that have aged out of the free 30-day
// windows keep their last numbers) and prints the scoreboard tables for the weekly report.
//
//   node growth/tools/ledger.mjs            write ledger.csv, print the scoreboard
//   node growth/tools/ledger.mjs --days 14  only score posts published in the last 14 days
//   node growth/tools/ledger.mjs --min-age 3 only score posts at least 3 days old (default 0.5)
//
// Snapshot files (all optional):
//   buffer-posts.json        trimmed Buffer list_posts (see PLAYBOOK.md for the jq that makes it)
//   metricool-ig-reels.json  [{ts, url, content, views, reach, avgWatch, viewRate, skipRate, saved, shares, likes, comments}]
//   metricool-tiktok.json    [{published, url, caption, views, reach, avg_watch_s, full_watch_pct, likes, comments, shares}]
//   metricool-youtube.json   [{published, url, caption, views, avg_watch_s, likes, comments, shares}]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TZ = 'America/Toronto';
const STYLES = ['reel', 'apple', 'soft', 'mono', 'whiteboard', 'papercut', 'sketch', 'comic', 'arcade', 'dark', 'claude', 'halftone', 'paper'];
const COLS = ['key', 'platform', 'status', 'published_et', 'weekday', 'hour_et', 'topic', 'episode', 'style', 'kind', 'hook',
  'duration_s', 'views', 'reach', 'hold_3s_pct', 'avg_watch_s', 'pct_watched', 'full_watch_pct', 'likes', 'comments', 'saves',
  'shares', 'saves_per_1k', 'shares_per_1k', 'snapshot', 'age_days', 'caption', 'url', 'buffer_id'];

const args = process.argv.slice(2);
const flag = (name, dflt) => (args.includes(name) ? Number(args[args.indexOf(name) + 1]) : dflt);
const days = flag('--days', null);
const minAge = flag('--min-age', 0.5);

const readJson = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : []);
const num = (v) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? null : Number(v));
const shortcode = (url) => (url && url.match(/instagram\.com\/(?:reel|p)\/([^/?]+)/) || [])[1] || null;
const tsToIso = (ts) => `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}T${ts.slice(8, 10)}:${ts.slice(10, 12)}:${ts.slice(12, 14)}Z`;

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; } else if (c === '"') quoted = false; else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some(Boolean));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}
const csvCell = (v) => {
  if (v === null || v === undefined) return '';
  const s = String(v).replace(/\s+/g, ' ').trim();
  return /[",]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// ---- merge snapshots ---------------------------------------------------------------------------
const rows = new Map();
const upsert = (key, data) => {
  const prev = rows.get(key) || { key };
  for (const [k, v] of Object.entries(data)) if (v !== null && v !== undefined && v !== '') prev[k] = v;
  rows.set(key, prev);
};

const snapshots = fs.existsSync(path.join(ROOT, 'raw'))
  ? fs.readdirSync(path.join(ROOT, 'raw')).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort()
  : [];

for (const snap of snapshots) {
  const dir = path.join(ROOT, 'raw', snap);
  const igByTime = [];

  for (const r of readJson(path.join(dir, 'metricool-ig-reels.json'))) {
    const key = `instagram:${shortcode(r.url)}`;
    const published = tsToIso(r.ts);
    igByTime.push({ key, t: Date.parse(published) });
    upsert(key, { platform: 'instagram', status: 'sent', published, caption: r.content, url: r.url, snapshot: snap,
      views: num(r.views), reach: num(r.reach), avg_watch_s: num(r.avgWatch), hold_3s_pct: num(r.viewRate),
      saves: num(r.saved), shares: num(r.shares), likes: num(r.likes), comments: num(r.comments) });
  }
  for (const platform of ['tiktok', 'youtube']) {
    for (const r of readJson(path.join(dir, `metricool-${platform}.json`))) {
      upsert(`${platform}:${r.url}`, { platform, status: 'sent', snapshot: snap, ...r });
    }
  }

  for (const p of readJson(path.join(dir, 'buffer-posts.json'))) {
    const m = p.metrics || {};
    const published = p.sentAt || p.dueAt;
    let key = `${p.service}:${p.id}`;
    if (p.service === 'instagram') {
      const code = shortcode(p.link);
      const near = igByTime.find((x) => Math.abs(x.t - Date.parse(published)) <= 120e3);
      if (code) key = `instagram:${code}`; else if (near) key = near.key;
    }
    const fromMetricool = rows.has(key) && rows.get(key).snapshot === snap && p.service === 'instagram';
    upsert(key, {
      platform: p.service, status: p.status, published, caption: p.text, url: p.link, buffer_id: p.id,
      video: p.videoTitle, duration_s: p.durationMs ? p.durationMs / 1000 : null, snapshot: snap,
      ...(fromMetricool || p.status !== 'sent' ? {} : {
        views: num(m.views), reach: num(m.reach), avg_watch_s: num(m.averageTimeWatched), likes: num(m.reactions),
        comments: num(m.comments), shares: num(m.shares), saves: num(m.saves),
      }),
    });
  }
}

// ---- labels and derived columns -----------------------------------------------------------------
const labelsFile = path.join(ROOT, 'labels.csv');
const labels = fs.existsSync(labelsFile) ? parseCsv(fs.readFileSync(labelsFile, 'utf8')) : [];
const label = Object.fromEntries(labels.map((l) => [l.key, l]));
const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false });

const out = [...rows.values()].map((r) => {
  const parts = Object.fromEntries(fmt.formatToParts(new Date(r.published)).map((x) => [x.type, x.value]));
  const fromVideo = (r.video || '').replace(/\.mp4$/, '');
  const style = STYLES.find((s) => fromVideo.endsWith(`-${s}`)) || null;
  const episode = fromVideo ? (style ? fromVideo.slice(0, -style.length - 1) : fromVideo) : null;
  const id = r.key.split(':').slice(1).join(':');
  const own = label[id] || label[r.buffer_id] || {};
  const ep = label[own.episode || episode] || {};
  const pick = (k) => own[k] || ep[k] || null;
  const reach = num(r.reach) || num(r.views);
  const per1k = (v) => (num(v) !== null && reach ? +(num(v) / reach * 1000).toFixed(1) : null);
  const snapEnd = Date.parse(`${r.snapshot}T23:59:59-05:00`);
  return {
    ...r,
    published_et: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`,
    weekday: parts.weekday, hour_et: Number(parts.hour) % 24,
    topic: pick('topic'), episode: own.episode || episode || ep.episode || null,
    style: own.style || (episode ? style || 'base' : null), kind: pick('kind'), hook: pick('hook'),
    pct_watched: r.avg_watch_s && r.duration_s ? +(r.avg_watch_s / r.duration_s * 100).toFixed(1) : null,
    saves_per_1k: per1k(r.saves), shares_per_1k: per1k(r.shares),
    age_days: r.status === 'sent' ? +((snapEnd - Date.parse(r.published)) / 864e5).toFixed(1) : null,
  };
}).sort((a, b) => Date.parse(b.published) - Date.parse(a.published));

fs.writeFileSync(path.join(ROOT, 'ledger.csv'),
  [COLS.join(','), ...out.map((r) => COLS.map((c) => csvCell(r[c])).join(','))].join('\n') + '\n');

// ---- scoreboard ---------------------------------------------------------------------------------
const median = (xs) => {
  const v = xs.map(num).filter((x) => x !== null).sort((a, b) => a - b);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return +(v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2).toFixed(1);
};
const show = (v) => (v === null || v === undefined ? '–' : v);
const table = (head, body) => console.log([`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`,
  ...body.map((r) => `| ${r.map(show).join(' | ')} |`)].join('\n') + '\n');

const cutoff = days ? Date.now() - days * 864e5 : 0;
const scored = out.filter((r) => r.status === 'sent' && Date.parse(r.published) >= cutoff && (r.age_days ?? 0) >= minAge);
console.log(`# Scoreboard (${snapshots.at(-1) || 'no snapshot'}; posts at least ${minAge} days old${days ? `, last ${days} days` : ''})\n`);

console.log('## By platform (medians)\n');
table(['platform', 'posts', 'views', 'hold 3 s %', 'avg watch s', 'saves /1k', 'shares /1k'],
  ['instagram', 'tiktok', 'youtube'].map((p) => {
    const g = scored.filter((r) => r.platform === p);
    return [p, g.length, median(g.map((r) => r.views)), median(g.map((r) => r.hold_3s_pct)),
      median(g.map((r) => r.avg_watch_s)), median(g.map((r) => r.saves_per_1k)), median(g.map((r) => r.shares_per_1k))];
  }));

for (const dim of ['style', 'topic', 'hook']) {
  const g = Object.groupBy(scored.filter((r) => r.platform === 'instagram' && r[dim]), (r) => r[dim]);
  console.log(`## Instagram by ${dim} (medians)\n`);
  table([dim, 'n', 'views', 'hold 3 s %', 'avg watch s', 'saves /1k', 'shares /1k'],
    Object.entries(g).map(([k, v]) => [k, v.length, median(v.map((r) => r.views)), median(v.map((r) => r.hold_3s_pct)),
      median(v.map((r) => r.avg_watch_s)), median(v.map((r) => r.saves_per_1k)), median(v.map((r) => r.shares_per_1k))])
      .sort((a, b) => (b[3] ?? 0) - (a[3] ?? 0)));
}

console.log('## Every post\n');
table(['published (ET)', 'platform', 'topic', 'style', 'views', 'hold 3 s %', 'avg watch s', 'saves', 'shares', 'age d'],
  scored.map((r) => [r.published_et, r.platform, r.topic, r.style, r.views, r.hold_3s_pct, r.avg_watch_s, r.saves, r.shares, r.age_days]));

const queued = out.filter((r) => r.status === 'scheduled');
console.log(`## Buffer queue: ${['instagram', 'tiktok', 'youtube'].map((p) => `${p} ${queued.filter((r) => r.platform === p).length}/10`).join(', ')}\n`);
