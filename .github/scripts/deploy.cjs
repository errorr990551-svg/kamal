/**
 * Kamal Brand - ZIP deploy to Hostinger
 *
 * Steps (each one is logged, and a failure names the step that broke):
 *   1. Connect to Hostinger FTP
 *   2. Upload deploy_extract.php
 *   3. Upload deploy.zip (as deploy.zip.part, size-checked, then renamed)
 *   4. Call deploy_extract.php so the server unzips the site
 *   5. Check the live site actually serves the new build
 *
 * Every network call has a time limit and is retried, so a frozen connection
 * fails in minutes with a clear message instead of hanging until the job is killed.
 */

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
const SITE_URL = (process.env.SITE_URL || 'https://kamalsnamkeen.in').replace(/\/+$/, '');
const DEPLOY_SECRET = process.env.DEPLOY_SECRET || 'KamalDeploy2026AutoSecret';
const FTP_PORT = Number(process.env.FTP_PORT || 21);

const ATTEMPTS = 3; // tries per step
const FTP_SOCKET_TIMEOUT_MS = 30_000; // control connection idle limit
const UPLOAD_STALL_MS = Number(process.env.UPLOAD_STALL_MS || 45_000); // no bytes sent for this long = frozen
const UPLOAD_MAX_MS = Number(process.env.UPLOAD_MAX_MS || 180_000); // one upload attempt may take at most this long
const UPLOAD_CONFIRM_MS = Number(process.env.UPLOAD_CONFIRM_MS || 60_000); // after the last byte, wait this long for the server to confirm
const HTTP_TIMEOUT_MS = Number(process.env.HTTP_TIMEOUT_MS || 90_000);

const ROOT = path.resolve(__dirname, '../..');
const DIST_DIR = path.join(ROOT, 'frontend/dist');
const ZIP_PATH = path.join(ROOT, 'deploy.zip');
const EXTRACTOR_PATH = path.join(DIST_DIR, 'deploy_extract.php');

// ---------------------------------------------------------------------------
// Logging helpers
// ---------------------------------------------------------------------------
const TOTAL_STEPS = 5;
let currentStep = 'starting up';

function step(n, title) {
  currentStep = `Step ${n}/${TOTAL_STEPS} - ${title}`;
  console.log(`\n::group::${currentStep}`);
}
function endStep() {
  console.log('::endgroup::');
}
function fail(message) {
  console.log('::endgroup::');
  console.error(`::error title=Deploy failed at ${currentStep}::${message}`);
  console.error(`\n❌ DEPLOY FAILED at ${currentStep}\n   ${message}`);
  process.exit(1);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1) + ' MB';
const maskSecret = (s) => s.split(DEPLOY_SECRET).join('***');

async function retry(label, fn) {
  let lastErr;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastErr = err;
      console.warn(`⚠️  ${label}: attempt ${attempt}/${ATTEMPTS} failed - ${maskSecret(err.message)}`);
      if (attempt < ATTEMPTS) {
        const wait = 5_000 * attempt;
        console.log(`   retrying in ${wait / 1000}s...`);
        await sleep(wait);
      }
    }
  }
  throw new Error(`${label} failed after ${ATTEMPTS} attempts. Last error: ${maskSecret(lastErr.message)}`);
}

// ---------------------------------------------------------------------------
// FTP
// ---------------------------------------------------------------------------
function sanitizeHostname(rawHost) {
  let host = (rawHost || '').trim();
  host = host.replace(/^[a-zA-Z]+:\/\//, '');
  host = host.split('/')[0];
  host = host.split(':')[0];
  return host.trim();
}

const FTP_MODES = [
  { name: 'FTPS Explicit (TLS)', secure: true, port: FTP_PORT },
  { name: 'Plain FTP', secure: false, port: FTP_PORT },
  { name: 'FTPS Implicit (TLS)', secure: 'implicit', port: 990 },
];
let workingMode = null; // remembered after the first successful login

async function connect(creds) {
  const modes = workingMode ? [workingMode] : FTP_MODES;
  const errors = [];
  for (const mode of modes) {
    const client = new ftp.Client(FTP_SOCKET_TIMEOUT_MS);
    try {
      console.log(`📡 Connecting (${mode.name}, port ${mode.port})...`);
      await client.access({
        host: creds.host,
        user: creds.user,
        password: creds.password,
        port: mode.port,
        secure: mode.secure,
        secureOptions: { rejectUnauthorized: false },
      });
      workingMode = mode;
      console.log(`✅ Connected using ${mode.name}. Remote folder: ${await client.pwd()}`);
      return client;
    } catch (err) {
      errors.push(`${mode.name}: ${err.message}`);
      console.warn(`   ${mode.name} did not work: ${err.message}`);
      client.close();
    }
  }
  throw new Error(`Could not log in to FTP (${errors.join(' | ')})`);
}

/**
 * Upload one file on a fresh connection, with a watchdog that aborts the
 * transfer if no bytes move for UPLOAD_STALL_MS or it runs past UPLOAD_MAX_MS.
 * Large files go to "<name>.part" first and are renamed only after the remote
 * size matches, so the server never sees a half-uploaded zip.
 */
async function uploadFile(creds, localPath, remoteName, { atomic = false } = {}) {
  const size = fs.statSync(localPath).size;
  const tempName = atomic ? `${remoteName}.part` : remoteName;

  return retry(`Upload ${remoteName}`, async () => {
    const client = await connect(creds);
    const started = Date.now();
    let lastBytes = 0;
    let lastMove = Date.now();
    let lastLogged = 0;
    let watchdog;

    client.trackProgress((info) => {
      if (info.bytes > lastBytes) {
        lastBytes = info.bytes;
        lastMove = Date.now();
      }
      const pct = Math.floor((info.bytes / size) * 100);
      if (size > 1024 * 1024 && pct >= lastLogged + 25) {
        lastLogged = pct - (pct % 25);
        console.log(`   ${remoteName}: ${mb(info.bytes)} of ${mb(size)} (${lastLogged}%)`);
      }
    });

    const stalled = new Promise((_, reject) => {
      watchdog = setInterval(() => {
        const now = Date.now();
        const allSent = lastBytes >= size;
        if (allSent && now - lastMove > UPLOAD_CONFIRM_MS) {
          reject(new Error(`all ${mb(size)} sent but the server did not confirm the file within ${UPLOAD_CONFIRM_MS / 1000}s`));
        } else if (!allSent && now - lastMove > UPLOAD_STALL_MS) {
          reject(new Error(`connection froze: no data sent for ${UPLOAD_STALL_MS / 1000}s (stuck at ${mb(lastBytes)} of ${mb(size)})`));
        } else if (now - started > UPLOAD_MAX_MS) {
          reject(new Error(`too slow: not finished after ${UPLOAD_MAX_MS / 1000}s (${mb(lastBytes)} of ${mb(size)} sent)`));
        }
      }, 1_000);
    });

    try {
      await Promise.race([client.uploadFrom(localPath, tempName), stalled]);
      client.trackProgress();

      const remoteSize = await client.size(tempName).catch(() => null);
      if (remoteSize !== null && remoteSize !== size) {
        throw new Error(`size check failed: server has ${remoteSize} bytes, expected ${size}`);
      }
      if (atomic) {
        await client.remove(remoteName, true).catch(() => {});
        await client.rename(tempName, remoteName);
      }
      const secs = ((Date.now() - started) / 1000).toFixed(1);
      console.log(`✅ ${remoteName} uploaded (${mb(size)}) in ${secs}s`);
    } finally {
      clearInterval(watchdog);
      client.close(); // also aborts a frozen transfer
    }
  });
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------
async function httpGet(url, headers = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'KamalBrand-Deploy/2.0', 'Cache-Control': 'no-cache', ...headers },
    signal: AbortSignal.timeout(HTTP_TIMEOUT_MS),
    redirect: 'follow',
  });
  const body = await res.text();
  return { status: res.status, body };
}

async function triggerExtraction() {
  const url = `${SITE_URL}/deploy_extract.php?secret=${encodeURIComponent(DEPLOY_SECRET)}`;
  console.log(`🌍 Calling ${maskSecret(url)}`);
  await retry('Server-side unzip', async () => {
    const { status, body } = await httpGet(url, { 'X-LiteSpeed-Purge': '*' });
    const text = body.trim().slice(0, 200);
    console.log(`   Response [${status}]: ${text}`);
    if (!body.includes('EXTRACTION_SUCCESS')) {
      throw new Error(`server did not confirm the unzip (HTTP ${status}: ${text || 'empty response'})`);
    }
  });
  console.log('✅ Server unzipped the new site.');
}

async function verifyLive() {
  const buster = `v=${Date.now()}`;

  // The sitemap is generated fresh by every build, so it proves the new files are live.
  const localSitemap = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
  const locs = [...localSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  await retry('Live site check', async () => {
    const sm = await httpGet(`${SITE_URL}/sitemap.xml?${buster}`);
    if (sm.status !== 200) throw new Error(`sitemap.xml returned HTTP ${sm.status}`);
    const missing = locs.filter((l) => !sm.body.includes(`<loc>${l}</loc>`));
    if (missing.length) {
      throw new Error(`live sitemap is the old version (${missing.length} new URLs missing, e.g. ${missing[0]})`);
    }
    console.log(`✅ Live sitemap.xml matches this build (${locs.length} URLs).`);

    // Spot-check a few pages: home, hub and first city page if they exist.
    const sample = [locs[0], ...locs.filter((l) => /mixture-manufacturer-distributor/.test(l)).slice(0, 2)];
    for (const loc of sample) {
      const page = await httpGet(`${SITE_URL}${new URL(loc).pathname}?${buster}`);
      const h1 = (page.body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
      if (page.status !== 200 || !h1) throw new Error(`${loc} returned HTTP ${page.status}${h1 ? '' : ' with no page heading'}`);
      console.log(`✅ ${loc} -> 200, "${h1.replace(/<[^>]+>/g, '').trim().slice(0, 70)}"`);
    }
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const creds = {
    host: sanitizeHostname(process.env.FTP_SERVER),
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
  };
  if (!creds.host || !creds.user || !creds.password) {
    fail('FTP_SERVER, FTP_USERNAME or FTP_PASSWORD secret is missing in GitHub repository settings.');
  }
  for (const f of [ZIP_PATH, EXTRACTOR_PATH]) {
    if (!fs.existsSync(f)) fail(`${path.relative(ROOT, f)} not found - did the build step run?`);
  }
  const t0 = Date.now();

  try {
    step(1, 'Connect to Hostinger FTP');
    await retry('FTP login', async () => (await connect(creds)).close());
    endStep();

    step(2, 'Upload deploy_extract.php');
    await uploadFile(creds, EXTRACTOR_PATH, 'deploy_extract.php');
    endStep();

    step(3, `Upload deploy.zip (${mb(fs.statSync(ZIP_PATH).size)})`);
    await uploadFile(creds, ZIP_PATH, 'deploy.zip', { atomic: true });
    endStep();

    step(4, 'Unzip on the server');
    await triggerExtraction();
    endStep();

    step(5, 'Check the live website');
    await verifyLive();
    endStep();
  } catch (err) {
    fail(maskSecret(err.message));
  }

  console.log(`\n🎉 Deploy finished in ${((Date.now() - t0) / 1000).toFixed(0)}s. ${SITE_URL} is serving the new build.`);
}

main();
