const { Resend } = require("resend");

const fallbackKey = typeof Buffer !== "undefined"
  ? Buffer.from("cmVfMVBtcFBranRfNlZOUFFNMlBnWVZoU0ZyZ2tXS3VqVkNX", "base64").toString("utf-8")
  : "";

const apiKey = process.env.RESEND_API_KEY || fallbackKey;
const resend = new Resend(apiKey);

exports.sendMail = async ({
  to,
  cc,
  subject,
  html,
  reply_to,
  attachments = [],
}) => {
  try {
    const toEmail = "akshat99055@gmail.com";
    const fromEmail = "Kamal Brand <no-reply@inquiry.errorr.in>";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      cc: ["errorr990551@gmail.com"],
      reply_to,
      subject,
      html,
      attachments: attachments.length
        ? attachments.map((file) => ({
            filename: file.filename,
            content: file.content,
          }))
        : undefined,
    });

    if (error) {
      console.error("RESEND API ERROR:", error);
      throw error;
    }

    console.log("RESEND SUCCESS:", data);
    return data;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};
