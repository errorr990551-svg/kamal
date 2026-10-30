/**
 * Kamal Brand - High Speed ZIP FTP/FTPS Deployment Script
 * Uploads deploy.zip and deploy_extract.php in seconds, then triggers auto-unzip webhook.
 */

const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

// 1. Hostname & Input Sanitizer
function sanitizeHostname(rawHost) {
  if (!rawHost) return '';
  let host = rawHost.trim();
  // Strip ftp://, ftps://, https://, http://
  host = host.replace(/^[a-zA-Z]+:\/\//, '');
  // Strip trailing path (/public_html, etc)
  host = host.split('/')[0];
  // Strip port (:21, etc)
  host = host.split(':')[0];
  return host.trim();
}

function resolveRemoteDir(rawServer, customDir) {
  if (customDir && customDir.trim().length > 0) {
    return customDir.trim();
  }
  // Check if rawServer had a path like access8472.hostinger.com/public_html
  if (rawServer && rawServer.includes('/')) {
    const parts = rawServer.split('/');
    parts.shift();
    const joined = parts.join('/');
    if (joined.length > 0) return joined;
  }
  return 'public_html';
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
      console.log(`📡 Attempting connection using mode: ${mode.name}...`);
      await client.access({
        host: config.host,
        user: config.user,
        password: config.password,
        port: mode.port,
        secure: mode.secure,
        secureOptions: {
          rejectUnauthorized: false, // Prevents self-signed or shared host TLS failures
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

  throw new Error(`All FTP/FTPS connection attempts failed. Last error: ${lastError ? lastError.message : 'Unknown'}`);
}

async function runDeploy() {
  const rawHost = process.env.FTP_SERVER;
  const user = process.env.FTP_USERNAME;
  const password = process.env.FTP_PASSWORD;
  const remoteDir = resolveRemoteDir(rawHost, process.env.FTP_REMOTE_DIR);

  if (!rawHost || !user || !password) {
    console.error('❌ Missing FTP credentials! Please verify GitHub Secrets: FTP_SERVER, FTP_USERNAME, FTP_PASSWORD');
    process.exit(1);
  }

  const host = sanitizeHostname(rawHost);
  console.log(`🌐 Target FTP Host: ${host}`);
  console.log(`📁 Target Remote Directory: ${remoteDir}`);

  const zipPath = path.resolve(__dirname, '../../deploy.zip');
  const extractorPath = path.resolve(__dirname, '../../frontend/dist/deploy_extract.php');

  if (!fs.existsSync(zipPath)) {
    console.error(`❌ deploy.zip not found at: ${zipPath}`);
    process.exit(1);
  }

  const zipStats = fs.statSync(zipPath);
  console.log(`📦 deploy.zip Size: ${(zipStats.size / (1024 * 1024)).toFixed(2)} MB`);

  const client = new ftp.Client(30000);
  client.ftp.verbose = false;

  try {
    await connectWithFallback(client, { host, user, password });

    // Navigate to remote directory
    console.log(`📂 Ensuring remote directory ${remoteDir}...`);
    await client.ensureDir(remoteDir);

    // 1. Upload deploy_extract.php
    if (fs.existsSync(extractorPath)) {
      console.log('🚀 Uploading deploy_extract.php...');
      await client.uploadFrom(extractorPath, 'deploy_extract.php');
      console.log('✅ deploy_extract.php uploaded.');
    }

    // 2. Upload deploy.zip
    console.log('🚀 Uploading deploy.zip (Fast ZIP upload)...');
    const startTime = Date.now();
    await client.uploadFrom(zipPath, 'deploy.zip');
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✅ deploy.zip uploaded in ${duration}s!`);

    client.close();

    // 3. Trigger Extraction Webhook
    console.log('\n🔗 Triggering Server-side Extraction Webhook...');
    await triggerExtraction();

    console.log('\n🎉 ALL DONE! Deployment finished successfully in seconds.');
  } catch (err) {
    console.error(`\n❌ Deployment Failed: ${err.message}`);
    client.close();
    process.exit(1);
  }
}

async function triggerExtraction() {
  const secret = 'KamalDeploy2026AutoSecret';
  
  // Domains to try
  const domainCandidates = [];
  if (process.env.LIVE_DOMAIN) domainCandidates.push(process.env.LIVE_DOMAIN.trim());
  if (process.env.HOSTINGER_DOMAIN) domainCandidates.push(process.env.HOSTINGER_DOMAIN.trim());
  domainCandidates.push('kamalsbrand.in');
  domainCandidates.push('kamalbrand.com');

  // Clean candidates
  const cleanDomains = [...new Set(domainCandidates.map(d => d.replace(/^[a-zA-Z]+:\/\//, '').replace(/\/+$/, '')))];

  let success = false;
  let lastResponse = '';

  for (const domain of cleanDomains) {
    const url = `https://${domain}/deploy_extract.php?secret=${secret}`;
    console.log(`🌍 Calling extraction webhook: ${url}`);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'KamalBrand-FastDeploy/1.0',
        },
      });

      const bodyText = await response.text();
      console.log(`📥 Webhook Response [${response.status}]: ${bodyText.trim()}`);

      if (bodyText.includes('EXTRACTION_SUCCESS')) {
        console.log(`✅ Extraction verified successfully on https://${domain}!`);
        success = true;
        break;
      } else {
        lastResponse = bodyText;
      }
    } catch (err) {
      console.warn(`⚠️ Webhook call failed for ${domain}: ${err.message}`);
    }
  }

  if (!success) {
    console.warn(`⚠️ Note: Auto-unzip webhook did not return EXTRACTION_SUCCESS immediately. (Response: ${lastResponse})`);
    console.warn('ℹ️ If this is your first deploy or SSL is still propagating, you can manually open https://<your-domain>/deploy_extract.php?secret=KamalDeploy2026AutoSecret in your browser.');
  }
}

runDeploy();

