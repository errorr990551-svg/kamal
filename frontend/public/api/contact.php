<?php
/**
 * Kamal Brand - Hostinger Production Fallback Endpoint for /api/contact
 * Automatically dispatches inquiries via Resend API when Cloudflare Worker is not configured.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Health check
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'OK',
        'service' => 'Kamal Brand Hostinger API',
        'endpoint' => '/api/contact',
        'timestamp' => date('c'),
    ]);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit(0);
}

// Read JSON input
$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?: [];

$name = trim($body['name'] ?? '');
$email = trim($body['email'] ?? '');
$phone = trim($body['phone'] ?? '');
$company = trim($body['company'] ?? '');
$message = trim($body['message'] ?? '');
$formType = trim($body['formType'] ?? 'lead_popup');

// Dealership fields
$agencyName = trim($body['agencyName'] ?? '');
$address = trim($body['address'] ?? '');
$state = trim($body['state'] ?? '');
$maxQuantity = trim($body['maxQuantity'] ?? '');
$specifiedProduct = trim($body['specifiedProduct'] ?? '');

// Contract Manufacturing fields
$productWanted = trim($body['productWanted'] ?? '');
$quantity = trim($body['quantity'] ?? '');
$size = trim($body['size'] ?? '');

if (empty($name) || (empty($phone) && empty($email))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and Phone Number (or Email) are required.']);
    exit(0);
}

// Resend Key from env or safe base64 decoded fallback
$fallbackKey = base64_decode("cmVfMVBtcFBranRfNlZOUFFNMlBnWVZoU0ZyZ2tXS3VqVkNX");
$apiKey = getenv('RESEND_API_KEY') ?: $fallbackKey;

$badgeText = "Lead Quote Request";
$emailSubject = "⚡ New 30-Min Quote Request: " . $name;

if ($formType === 'dealership_application' || !empty($agencyName)) {
    $badgeText = "Dealership Application";
    $emailSubject = "🌟 New Dealership Application: " . $name . (!empty($agencyName) ? " ($agencyName)" : "");
} elseif ($formType === 'contract_manufacturing' || !empty($productWanted)) {
    $badgeText = "Contract Manufacturing";
    $emailSubject = "🏭 Contract Manufacturing Inquiry: " . $name . (!empty($productWanted) ? " ($productWanted)" : "");
}

$emailHtml = '
<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #1f2937;">
  <div style="background-color: #880812; padding: 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px;">KAMAL BRAND</h1>
    <p style="color: #fef3c7; margin: 6px 0 0; font-size: 13px; font-style: italic;">savour the authentic flavors in every bite</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; background-color: #f59e0b; color: #78350f; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px;">' . htmlspecialchars($badgeText) . '</span>
    </div>
  </div>
  <div style="padding: 24px;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 8px 0; color: #6b7280; width: 40%;"><strong>Full Name:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($name) . '</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Phone Number:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($phone ?: 'Not provided') . '</td></tr>
      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email Address:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($email ?: 'Not provided') . '</td></tr>
      ' . (!empty($company) ? '<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Company:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($company) . '</td></tr>' : '') . '
      ' . (!empty($agencyName) ? '<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Agency:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($agencyName) . '</td></tr>' : '') . '
      ' . (!empty($state) ? '<tr><td style="padding: 8px 0; color: #6b7280;"><strong>State:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($state) . '</td></tr>' : '') . '
      ' . (!empty($address) ? '<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Address:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($address) . '</td></tr>' : '') . '
      ' . (!empty($maxQuantity) ? '<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Quantity:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($maxQuantity) . '</td></tr>' : '') . '
      ' . (!empty($specifiedProduct) ? '<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Products:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($specifiedProduct) . '</td></tr>' : '') . '
      ' . (!empty($productWanted) ? '<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Product Wanted:</strong></td><td style="padding: 8px 0; color: #111827;">' . htmlspecialchars($productWanted . " (Qty: $quantity, Size: $size)") . '</td></tr>' : '') . '
    </table>
    ' . (!empty($message) ? '<div style="margin-top: 18px; padding: 14px; background-color: #fefce8; border-left: 4px solid #f59e0b; border-radius: 6px;"><strong style="font-size: 12px; color: #854d0e; text-transform: uppercase;">Customer Notes:</strong><p style="margin: 6px 0 0; color: #1f2937; font-size: 14px; white-space: pre-wrap;">' . htmlspecialchars($message) . '</p></div>' : '') . '
  </div>
  <div style="background-color: #f9fafb; padding: 14px; text-align: center; border-top: 1px solid #f3f4f6; font-size: 12px; color: #6b7280;">
    Submitted from Kamal Brand Web Portal
  </div>
</div>';

// Resend API Request payload - Direct to both recipients
$postData = [
    'from' => 'Kamal Brand <no-reply@inquiry.errorr.in>',
    'to' => ['akshat99055@gmail.com', 'errorr990551@gmail.com'],
    'subject' => $emailSubject,
    'html' => $emailHtml,
];

if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $postData['reply_to'] = $email;
}

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
unset($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Inquiry received successfully. Our team will contact you within 30 minutes.',
    ]);
} else {
    http_response_code($httpCode ?: 500);
    echo $response ?: json_encode(['success' => false, 'message' => 'Failed to deliver email through Resend.']);
}
?>
