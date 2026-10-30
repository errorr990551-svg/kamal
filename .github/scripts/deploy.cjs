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

async function detectWebroots(client, targetDomain = 'kamalsnamkeen.in') {
  // If user explicitly defined FTP_REMOTE_DIR in GitHub Secrets, use that
  if (process.env.FTP_REMOTE_DIR && process.env.FTP_REMOTE_DIR.trim().length > 0) {
    return [process.env.FTP_REMOTE_DIR.trim()];
  }

  const candidateDirs = [];

  try {
    const rootList = await client.list();
    const rootNames = rootList.map(item => item.name);
    console.log(`📋 Remote root contains: ${rootNames.join(', ')}`);

    // Check Hostinger multi-domain setup: domains/<domain>/public_html
    const hasDomainsFolder = rootNames.some(n => n.toLowerCase() === 'domains');
    if (hasDomainsFolder) {
      try {
        const domainsList = await client.list('domains');
        const domainNames = domainsList.map(item => item.name);
        console.log(`📋 Domains found in /domains: ${domainNames.join(', ')}`);

        // Look for matching domain (kamalsnamkeen.in, kamal, etc)
        for (const d of domainNames) {
          if (d.toLowerCase().includes('kamal') || d.toLowerCase() === targetDomain.toLowerCase()) {
            const targetPath = `domains/${d}/public_html`;
            console.log(`🎯 Identified Hostinger webroot: ${targetPath}`);
            candidateDirs.push(targetPath);
          }
        }
      } catch (e) {
        console.warn(`Notice while inspecting /domains: ${e.message}`);
      }
    }

    // Also check standard public_html
    const hasPublicHtml = rootNames.some(n => n.toLowerCase() === 'public_html');
    if (hasPublicHtml) {
      try {
        const publicList = await client.list('public_html');
        const publicNames = publicList.map(item => item.name);
        
        // If public_html has subfolders for domains
        for (const p of publicNames) {
          if (p.toLowerCase().includes('kamal') || p.toLowerCase() === targetDomain.toLowerCase()) {
            candidateDirs.push(`public_html/${p}`);
          }
        }
        
        // If not found as subfolder, public_html itself might be the webroot
        if (candidateDirs.length === 0) {
          candidateDirs.push('public_html');
        }
      } catch (e) {
        candidateDirs.push('public_html');
      }
    }

    // If still empty, default to public_html
    if (candidateDirs.length === 0) {
      candidateDirs.push('public_html');
    }

  } catch (err) {
    console.warn(`⚠️ Error during directory scan: ${err.message}. Using public_html fallback.`);
    candidateDirs.push('public_html');
  }

  // Deduplicate
  return [...new Set(candidateDirs)];
}

async function runDeploy() {
  const rawHost = process.env.FTP_SERVER;
  const user = process.env.FTP_USERNAME;
  const password = process.env.FTP_PASSWORD;

  if (!rawHost || !user || !password) {
    console.error('❌ Missing FTP credentials! Please verify GitHub Secrets: FTP_SERVER, FTP_USERNAME, FTP_PASSWORD');
    process.exit(1);
  }

  const host = sanitizeHostname(rawHost);
  console.log(`🌐 Target FTP Host: ${host}`);

  const zipPath = path.resolve(__dirname, '../../deploy.zip');
  const extractorPath = path.resolve(__dirname, '../../frontend/dist/deploy_extract.php');

  if (!fs.existsSync(zipPath)) {
    console.error(`❌ deploy.zip not found at: ${zipPath}`);
    process.exit(1);
  }

  const zipStats = fs.statSync(zipPath);
  console.log(`📦 deploy.zip Size: ${(zipStats.size / (1024 * 1024)).toFixed(2)} MB`);

  const client = new ftp.Client(45000);
  client.ftp.verbose = false;

  try {
    await connectWithFallback(client, { host, user, password });

    // Detect all applicable webroots
    const targetDirs = await detectWebroots(client, 'kamalsnamkeen.in');
    console.log(`🚀 Target upload directories: ${targetDirs.join(', ')}`);

    for (const remoteDir of targetDirs) {
      console.log(`\n📂 Deploying into: ${remoteDir}...`);
      await client.ensureDir(remoteDir);

      // 1. Upload deploy_extract.php
      if (fs.existsSync(extractorPath)) {
        console.log(`  -> Uploading deploy_extract.php to ${remoteDir}...`);
        await client.uploadFrom(extractorPath, 'deploy_extract.php');
      }

      // 2. Upload deploy.zip
      console.log(`  -> Uploading deploy.zip to ${remoteDir}...`);
      const startTime = Date.now();
      await client.uploadFrom(zipPath, 'deploy.zip');
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  ✅ deploy.zip uploaded to ${remoteDir} in ${duration}s!`);
    }

    client.close();

    // 3. Trigger Extraction Webhooks
    console.log('\n🔗 Triggering Server-side Extraction Webhook on kamalsnamkeen.in...');
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
  
  // Domains to try - kamalsnamkeen.in is primary
  const domainCandidates = [
    'kamalsnamkeen.in',
    'www.kamalsnamkeen.in',
  ];
  if (process.env.LIVE_DOMAIN) domainCandidates.unshift(process.env.LIVE_DOMAIN.trim());
  if (process.env.HOSTINGER_DOMAIN) domainCandidates.unshift(process.env.HOSTINGER_DOMAIN.trim());

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
      console.log(`📥 Webhook Response from ${domain} [${response.status}]: ${bodyText.trim().substring(0, 100)}`);

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
    console.warn(`⚠️ Note: Auto-unzip webhook did not return EXTRACTION_SUCCESS immediately. (Response preview: ${lastResponse.substring(0, 150)})`);
  }
}

runDeploy();
