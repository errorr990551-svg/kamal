const { sendMail } = require("../services/emailService");

exports.submitContactForm = async (req, res) => {
  try {
    const {
      formType = "lead_popup",
      name,
      email,
      phone,
      company,
      message,
      agencyName,
      address,
      state,
      maxQuantity,
      specifiedProduct,
      productWanted,
      quantity,
      size,
      dateWanted,
      purpose,
      extraWords,
      submittedAt = new Date().toISOString(),
    } = req.body;

    if (!name || (!phone && !email)) {
      return res.status(400).json({
        success: false,
        message: "Full Name and Phone Number (or Email) are required.",
      });
    }

    let badgeText = "Lead Quote Request";
    let emailSubject = `⚡ New 30-Min Quote Request: ${name}`;

    if (formType === "dealership_application" || agencyName) {
      badgeText = "Dealership Application";
      emailSubject = `🌟 New Dealership Application: ${name} (${agencyName || state || "Dealership"})`;
    } else if (formType === "contract_manufacturing" || productWanted) {
      badgeText = "Contract Manufacturing";
      emailSubject = `🏭 Contract Manufacturing Inquiry: ${name} (${productWanted || "Private Label"})`;
    }

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #1f2937;">
        <div style="background-color: #880812; padding: 26px 20px; text-align: center; border-bottom: 4px solid #f59e0b;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">
            KAMAL BRAND
          </h1>
          <p style="color: #fef3c7; margin: 6px 0 0; font-size: 13px; font-style: italic; letter-spacing: 0.5px;">
            savour the authentic flavors in every bite
          </p>
          <div style="margin-top: 12px;">
            <span style="display: inline-block; background-color: #f59e0b; color: #78350f; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; letter-spacing: 1px;">
              ${badgeText}
            </span>
          </div>
        </div>
        <div style="padding: 28px 24px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 16px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
            Inquiry Details
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 38%; font-weight: 600;">Full Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 700;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Phone Number:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 700;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Email Address:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${email || 'Not provided'}</td>
            </tr>
            ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Company / Location:</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${company}</td></tr>` : ''}
            ${agencyName ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Agency Name:</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${agencyName}</td></tr>` : ''}
            ${state ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">State:</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${state}</td></tr>` : ''}
            ${address ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Address:</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${address}</td></tr>` : ''}
            ${maxQuantity ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Max Quantity:</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${maxQuantity}</td></tr>` : ''}
            ${specifiedProduct ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Products:</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${specifiedProduct}</td></tr>` : ''}
            ${productWanted ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Custom Product:</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${productWanted} (Qty: ${quantity}, Size: ${size})</td></tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Received At:</td>
              <td style="padding: 10px 0; color: #4b5563; font-size: 13px;">${submittedAt}</td>
            </tr>
          </table>
          ${(message || extraWords) ? `
          <div style="margin-top: 22px; padding: 16px; background-color: #fefce8; border-left: 4px solid #f59e0b; border-radius: 6px;">
            <div style="font-size: 12px; font-weight: 700; color: #854d0e; text-transform: uppercase; margin-bottom: 6px;">Customer Notes:</div>
            <div style="color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message || extraWords}</div>
          </div>` : ''}
        </div>
        <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #f3f4f6; font-size: 12px; color: #6b7280;">
          Submitted from Kamal Brand Web Portal
        </div>
      </div>
    `;

    sendMail({
      to: process.env.TO_EMAIL || "kamalsbrand@gmail.com",
      cc: ["akshat99055@gmail.com", "errorr990551@gmail.com"],
      reply_to: email && email.includes("@") ? email : undefined,
      subject: emailSubject,
      html: emailHtml,
    })
      .then((res) => console.log("Email dispatched:", res))
      .catch((err) => console.error("Email failed:", err));

    res.status(200).json({
      success: true,
      message: "Inquiry received successfully. Our team will contact you within 30 minutes.",
    });
  } catch (err) {
    console.error("submitContactForm error:", err);
    res.status(500).json({ success: false, message: "Failed to process inquiry" });
  }
};
