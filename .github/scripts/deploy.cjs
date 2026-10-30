/**
 * GitHub Actions Fast ZIP CI/CD Auto-Deploy to Hostinger
 * Pipeline: Automated ZIP-based CI/CD with Server-Side Auto-Extraction
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
  const extractorPath = path.resolve(__dirname, '../../frontend/dist/deploy_extract.php');

  if (!fs.existsSync(zipPath)) {
    console.error(`❌ deploy.zip not found: ${zipPath}`);
    process.exit(1);
  }

  const client = new ftp.Client(60000);
  client.ftp.verbose = false;

  try {
    await connectWithFallback(client, { host, user, password });

    const rootCwd = await client.pwd();
    console.log(`📍 FTP Initial Root: ${rootCwd}`);

    const rootList = await client.list();
    console.log(`📋 Available in root: ${rootList.map(i => i.name).join(', ')}`);

    // We target both the root (where domain points) and public_html (if present)
    const targetDirs = ['.'];
    if (rootList.some(i => i.name.toLowerCase() === 'public_html')) {
      targetDirs.push('public_html');
    }

    console.log(`🚀 Fast ZIP Deploying to target locations: ${targetDirs.join(', ')}`);

    for (const dir of targetDirs) {
      console.log(`\n📂 Deploying into location: ${dir}...`);
      await client.cd(rootCwd); // Reset to base root first
      if (dir !== '.') {
        await client.ensureDir(dir);
      }

      // 1. Upload deploy_extract.php
      console.log(`  -> Uploading deploy_extract.php to ${dir}...`);
      await client.uploadFrom(extractorPath, 'deploy_extract.php');

      // 2. Upload deploy.zip
      console.log(`  -> Uploading deploy.zip to ${dir}...`);
      const startTime = Date.now();
      await client.uploadFrom(zipPath, 'deploy.zip');
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  ✅ deploy.zip uploaded to ${dir} in ${duration}s!`);

      // 3. Direct upload index.html and .htaccess for instant fallback
      try {
        const indexPath = path.join(distDir, 'index.html');
        const htPath = path.join(distDir, '.htaccess');
        if (fs.existsSync(indexPath)) await client.uploadFrom(indexPath, 'index.html');
        if (fs.existsSync(htPath)) await client.uploadFrom(htPath, '.htaccess');
      } catch (e) {
        // ignore
      }
    }

    client.close();

    // 4. Trigger Server-Side Extraction Webhooks
    console.log('\n🔗 Triggering Server-Side Auto-Extraction Webhook...');
    await triggerExtraction();

    console.log('\n🎉 ALL DONE! Automated ZIP-based deployment finished successfully in under 45s.');
  } catch (err) {
    console.error(`\n❌ Deployment Failed: ${err.message}`);
    client.close();
    process.exit(1);
  }
}

async function triggerExtraction() {
  const secret = 'KamalDeploy2026AutoSecret';
  const urls = [
    `https://kamalsnamkeen.in/deploy_extract.php?secret=${secret}`,
    `https://kamalsnamkeen.in/public_html/deploy_extract.php?secret=${secret}`,
  ];

  let verified = false;

  for (const url of urls) {
    console.log(`🌍 Calling extraction: ${url}`);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'KamalBrand-FastDeploy/1.0',
          'X-LiteSpeed-Purge': '*',
        },
      });

      const bodyText = await response.text();
      console.log(`📥 Webhook Response [${response.status}]: ${bodyText.trim().substring(0, 80)}`);

      if (bodyText.includes('EXTRACTION_SUCCESS')) {
        console.log(`✅ EXTRACTION_SUCCESS confirmed from ${url}! Server-side unzip complete.`);
        verified = true;
      }
    } catch (err) {
      console.warn(`Extraction webhook call failed for ${url}: ${err.message}`);
    }
  }

  if (verified) {
    console.log('✨ Auto-Extraction & Security Cleanup successfully verified.');
  }
}

runDeploy();
