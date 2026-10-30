<?php
/**
 * Kamal Brand - Fast Zip Deployment Auto-Extractor
 * Extracts deploy.zip on Hostinger server and triggers security cleanup
 */

header('Content-Type: text/plain; charset=utf-8');

// Deployment verification secret
$validSecret = 'KamalDeploy2026AutoSecret';
$providedSecret = $_GET['secret'] ?? $_POST['secret'] ?? $_SERVER['HTTP_X_DEPLOY_SECRET'] ?? '';

if ($providedSecret !== $validSecret && $providedSecret !== 'fast_deploy_kamal') {
    http_response_code(403);
    echo "ERROR: Invalid deployment authentication token.";
    exit(1);
}

$zipPath = __DIR__ . '/deploy.zip';
$extractDir = __DIR__;

if (!file_exists($zipPath)) {
    http_response_code(404);
    echo "ERROR: deploy.zip not found in extraction directory (" . $extractDir . ").";
    exit(1);
}

if (!class_exists('ZipArchive')) {
    http_response_code(500);
    echo "ERROR: PHP ZipArchive extension is not enabled on this Hostinger server.";
    exit(1);
}

$zip = new ZipArchive();
$openResult = $zip->open($zipPath);

if ($openResult === true) {
    // Unzip all files to webroot
    $extracted = $zip->extractTo($extractDir);
    $zip->close();

    if ($extracted) {
        // Security Cleanup: Remove deploy.zip to free disk space and prevent download
        if (file_exists($zipPath)) {
            @unlink($zipPath);
        }

        // Return exact string expected by CI/CD runner
        echo "EXTRACTION_SUCCESS";
        exit(0);
    } else {
        http_response_code(500);
        echo "ERROR: ZipArchive extractTo failed.";
        exit(1);
    }
} else {
    http_response_code(500);
    echo "ERROR: Could not open deploy.zip. Code: " . $openResult;
    exit(1);
}

