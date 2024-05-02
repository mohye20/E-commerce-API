import { createTransport } from "nodemailer";
import { readFileSync } from "fs";
import path from "path";

export async function sendPDFByEmail(pdfFilePath, recipientEmail) {
  try {
    // Read PDF file
    const pdfFile = readFileSync("invoice.pdf");

    // Create Nodemailer transporter
    const transporter = createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Setup email data
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: "PDF Attachment",
      text: "Please find the attached PDF file.",
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfFile,
        },
      ],
    };

    // Send email with PDF attachment
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

// Example usage
