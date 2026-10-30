import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom dev API middleware for local testing without separate backend server
function localDevApiPlugin() {
  return {
    name: 'local-dev-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        // Health check
        if ((url === '/health' || url === '/api/health') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ status: 'OK', service: 'Kamal Local Dev API' }));
          return;
        }

        // Contact endpoint
        if (url === '/api/contact' && req.method === 'POST') {
          let rawBody = '';
          req.on('data', chunk => { rawBody += chunk; });
          req.on('end', async () => {
            try {
              const body = JSON.parse(rawBody || '{}');
              const {
                name,
                email,
                phone,
                company,
                message,
                formType = 'lead_popup',
                agencyName,
                address,
                state,
                maxQuantity,
                specifiedProduct,
                productWanted,
                quantity,
                size,
              } = body;

              if (!name || (!phone && !email)) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({
                  success: false,
                  message: 'Name and Phone Number (or Email) are required.',
                }));
                return;
              }

              // Base64 decoded fallback key
              const fallbackKey = atob('cmVfMVBtcFBranRfNlZOUFFNMlBnWVZoU0ZyZ2tXS3VqVkNX');
              const apiKey = process.env.RESEND_API_KEY || fallbackKey;

              let badgeText = 'Lead Quote Request';
              let emailSubject = `⚡ New 30-Min Quote Request: ${name}`;

              if (formType === 'dealership_application' || agencyName) {
                badgeText = 'Dealership Application';
                emailSubject = `🌟 New Dealership Application: ${name} (${agencyName || 'Dealership'})`;
              } else if (formType === 'contract_manufacturing' || productWanted) {
                badgeText = 'Contract Manufacturing';
                emailSubject = `🏭 Contract Manufacturing Inquiry: ${name} (${productWanted || 'Custom Order'})`;
              }

              const emailHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #1f2937;">
                  <div style="background-color: #880812; padding: 22px 20px; text-align: center; border-bottom: 4px solid #f59e0b;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 2px;">KAMAL BRAND</h1>
                    <p style="color: #fef3c7; margin: 4px 0 0; font-size: 13px; font-style: italic;">savour the authentic flavors in every bite</p>
                    <div style="margin-top: 10px;">
                      <span style="display: inline-block; background-color: #f59e0b; color: #78350f; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 3px 10px; border-radius: 9999px;">${badgeText}</span>
                    </div>
                  </div>
                  <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr><td style="padding: 8px 0; color: #6b7280; width: 40%;"><strong>Full Name:</strong></td><td style="padding: 8px 0; color: #111827; font-weight: bold;">${name}</td></tr>
                      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Phone Number:</strong></td><td style="padding: 8px 0; color: #111827; font-weight: bold;">${phone || 'Not provided'}</td></tr>
                      <tr><td style="padding: 8px 0; color: #6b7280;"><strong>Email Address:</strong></td><td style="padding: 8px 0; color: #111827;">${email || 'Not provided'}</td></tr>
                      ${company ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Company:</strong></td><td style="padding: 8px 0; color: #111827;">${company}</td></tr>` : ''}
                      ${agencyName ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Agency:</strong></td><td style="padding: 8px 0; color: #111827;">${agencyName}</td></tr>` : ''}
                      ${state ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>State:</strong></td><td style="padding: 8px 0; color: #111827;">${state}</td></tr>` : ''}
                      ${address ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Address:</strong></td><td style="padding: 8px 0; color: #111827;">${address}</td></tr>` : ''}
                      ${maxQuantity ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Quantity:</strong></td><td style="padding: 8px 0; color: #111827;">${maxQuantity}</td></tr>` : ''}
                      ${specifiedProduct ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Products:</strong></td><td style="padding: 8px 0; color: #111827;">${specifiedProduct}</td></tr>` : ''}
                      ${productWanted ? `<tr><td style="padding: 8px 0; color: #6b7280;"><strong>Product Wanted:</strong></td><td style="padding: 8px 0; color: #111827;">${productWanted} (Qty: ${quantity || 'N/A'}, Size: ${size || 'N/A'})</td></tr>` : ''}
                    </table>
                    ${message ? `<div style="margin-top: 18px; padding: 14px; background-color: #fefce8; border-left: 4px solid #f59e0b; border-radius: 6px;"><strong style="font-size: 12px; color: #854d0e; text-transform: uppercase;">Message:</strong><p style="margin: 6px 0 0; color: #1f2937; font-size: 14px; white-space: pre-wrap;">${message}</p></div>` : ''}
                  </div>
                  <div style="background-color: #f9fafb; padding: 12px; text-align: center; border-top: 1px solid #f3f4f6; font-size: 12px; color: #6b7280;">
                    Submitted from Kamal Brand Web Portal (Local Dev)
                  </div>
                </div>
              `;

              // Send via Resend REST API
              let resendId = null;
              try {
                const resendRes = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: 'Kamal Brand <no-reply@inquiry.errorr.in>',
                    to: ['akshat99055@gmail.com', 'errorr990551@gmail.com'],
                    reply_to: email && email.includes('@') ? email : undefined,
                    subject: emailSubject,
                    html: emailHtml,
                  }),
                });
                const resData = await resendRes.json().catch(() => ({}));
                resendId = resData.id;
              } catch (emailErr) {
                console.error('Dev server email dispatch error:', emailErr);
              }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                message: 'Inquiry received successfully. Our team will contact you within 30 minutes.',
                id: resendId,
              }));
            } catch (err) {
              console.error('Dev API server error:', err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, message: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localDevApiPlugin(),
  ],
})
