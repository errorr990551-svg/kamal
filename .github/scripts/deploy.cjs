/**
 * Kamal Brand - Direct & High Speed FTP/FTPS Deployment Script
 * Uploads dist files directly to webroots AND supports auto-extractor webhook for zero-downtime deploy.
 */

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

function sanitizeHostname(rawHost) {
  if (!rawHost) return '';
  let host = rawHost.trim();
  host = host.replace(/^[a-zA-Z]+:\/\//, '');
  host = host.split('/')[0];
  host = host.split(':')[0];
  return host.trim();
}

async function connectWithFallback(client, config) {
  const modes = [
    { name: 'FTPS Explicit (TLS)', secure: true, port: 21 },
    { name: 'Standard Plain FTP', secure: false, port: 21 },
    { name: 'FTPS Implicit (TLS)', secure: 'implicit', port: 990 },
  ];

  let lastError = null;

  for (const mode of modes) {
    try {
      console.log(`📡 Connecting with mode: ${mode.name}...`);
      await client.access({
        host: config.host,
        user: config.user,
        password: config.password,
        port: mode.port,
        secure: mode.secure,
        secureOptions: {
          rejectUnauthorized: false,
        },
      });
      console.log(`✅ Connected successfully using: ${mode.name}`);
      return mode;
    } catch (err) {
      console.warn(`⚠️ Mode ${mode.name} failed: ${err.message}`);
      lastError = err;
      client.close();
    }
  }

  throw new Error(`All FTP connection modes failed: ${lastError ? lastError.message : 'Unknown'}`);
}

async function discoverAllWebroots(client) {
  if (process.env.FTP_REMOTE_DIR && process.env.FTP_REMOTE_DIR.trim().length > 0) {
    return [process.env.FTP_REMOTE_DIR.trim()];
  }

  const webroots = [];

  try {
    const rootItems = await client.list();
    const rootNames = rootItems.map(i => i.name);
    console.log(`📋 Remote root contains: ${rootNames.join(', ')}`);

    // 1. Check for domains/ folder (Hostinger multi-domain)
    const hasDomains = rootNames.some(n => n.toLowerCase() === 'domains');
    if (hasDomains) {
      try {
        const domainsList = await client.list('domains');
        const dNames = domainsList.map(i => i.name);
        console.log(`📋 Domains found in /domains: ${dNames.join(', ')}`);

        for (const d of dNames) {
          const lower = d.toLowerCase();
          if (lower.includes('kamal') || lower.includes('namkeen')) {
            const p = `domains/${d}/public_html`;
            console.log(`🎯 Found matching Hostinger domain webroot: ${p}`);
            webroots.push(p);
          }
        }
      } catch (e) {
        console.warn('Notice while inspecting /domains:', e.message);
      }
    }

    // 2. Check public_html/
    const hasPublicHtml = rootNames.some(n => n.toLowerCase() === 'public_html');
    if (hasPublicHtml) {
      try {
        const publicItems = await client.list('public_html');
        const pubNames = publicItems.map(i => i.name);
        for (const p of pubNames) {
          if (p.toLowerCase().includes('kamal') || p.toLowerCase().includes('namkeen')) {
            webroots.push(`public_html/${p}`);
          }
        }
      } catch (e) {
        // ignore
      }
      webroots.push('public_html');
    }

    // 3. Fallback to current directory if neither exists
    if (webroots.length === 0) {
      webroots.push('.');
    }

  } catch (err) {
    console.warn(`Directory inspection error: ${err.message}. Using public_html fallback.`);
    webroots.push('public_html');
  }

  return [...new Set(webroots)];
}

async function runDeploy() {
  const rawHost = process.env.FTP_SERVER;
  const user = process.env.FTP_USERNAME;
  const password = process.env.FTP_PASSWORD;

  if (!rawHost || !user || !password) {
    console.error('❌ Missing FTP credentials (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)');
    process.exit(1);
  }

  const host = sanitizeHostname(rawHost);
  const distDir = path.resolve(__dirname, '../../frontend/dist');
  const zipPath = path.resolve(__dirname, '../../deploy.zip');

  if (!fs.existsSync(distDir)) {
    console.error(`❌ Dist directory not found: ${distDir}`);
    process.exit(1);
  }

  const client = new ftp.Client(60000);
  client.ftp.verbose = false;

  try {
    await connectWithFallback(client, { host, user, password });

    const targetDirs = await discoverAllWebroots(client);
    console.log(`🚀 Target upload directories: ${targetDirs.join(', ')}`);

    for (const remoteDir of targetDirs) {
      console.log(`\n📂 Deploying directly into: ${remoteDir}...`);
      await client.ensureDir(remoteDir);

      // Direct fast upload of all built files (index.html, assets, .htaccess, images)
      console.log(`  -> Uploading build files to ${remoteDir}...`);
      const startTime = Date.now();
      await client.uploadFromDir(distDir);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  ✅ Direct files uploaded in ${elapsed}s!`);

      // Also upload deploy.zip if present
      if (fs.existsSync(zipPath)) {
        console.log(`  -> Syncing deploy.zip to ${remoteDir}...`);
        await client.uploadFrom(zipPath, 'deploy.zip');
      }
    }

    client.close();

    // Trigger Extraction & Cache-Purge Webhook
    console.log('\n🔗 Triggering Cache-Purge Webhook on kamalsnamkeen.in...');
    await triggerExtraction();

    console.log('\n🎉 ALL DONE! Deployment finished successfully.');
  } catch (err) {
    console.error(`\n❌ Deployment Failed: ${err.message}`);
    client.close();
    process.exit(1);
  }
}

async function triggerExtraction() {
  const secret = 'KamalDeploy2026AutoSecret';
  const domainCandidates = [
    'kamalsnamkeen.in',
    'www.kamalsnamkeen.in',
  ];
  if (process.env.LIVE_DOMAIN) domainCandidates.unshift(process.env.LIVE_DOMAIN.trim());

  const cleanDomains = [...new Set(domainCandidates.map(d => d.replace(/^[a-zA-Z]+:\/\//, '').replace(/\/+$/, '')))];

  for (const domain of cleanDomains) {
    const url = `https://${domain}/deploy_extract.php?secret=${secret}`;
    console.log(`🌍 Calling: ${url}`);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'KamalBrand-Deploy/1.0',
          'X-LiteSpeed-Purge': '*',
        },
      });

      const bodyText = await response.text();
      console.log(`📥 Webhook Response [${response.status}]: ${bodyText.trim().substring(0, 80)}`);
    } catch (err) {
      console.warn(`Webhook failed for ${domain}: ${err.message}`);
    }
  }
}

runDeploy();
