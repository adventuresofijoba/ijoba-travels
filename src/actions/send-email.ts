"use server";

import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

interface EmailData {
  type: "contact" | "custom_package" | "package_reserve" | "newsletter";
  [key: string]: any;
}

export async function sendEmail(data: EmailData) {
  const { type, ...rest } = data;
  let subject = "";
  let html = "";

  // Construct email content based on inquiry type
  switch (type) {
    case "contact":
      subject = "New Contact Form Submission";
      html = `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${rest.name}</p>
        <p><strong>Email:</strong> ${rest.email}</p>
        <p><strong>Phone:</strong> ${rest.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${rest.message}</p>
      `;
      break;

    case "custom_package":
      subject = "New Custom Package Request";
      html = `
        <h2>New Custom Package Request</h2>
        <p><strong>Name:</strong> ${rest.name}</p>
        <p><strong>Email:</strong> ${rest.email}</p>
        <p><strong>Phone:</strong> ${rest.phone}</p>
        <p><strong>Destination:</strong> ${rest.destination}</p>
        <p><strong>Travel Style:</strong> ${rest.travelStyle}</p>
        <p><strong>Dates:</strong> ${rest.dates}</p>
        <p><strong>Message:</strong></p>
        <p>${rest.message}</p>
      `;
      break;

    case "package_reserve":
      subject = `New Reservation Request: ${rest.packageName}`;
      html = `
        <h2>New Package Reservation</h2>
        <p><strong>Package:</strong> ${rest.packageName}</p>
        <p><strong>Name:</strong> ${rest.name}</p>
        <p><strong>Email:</strong> ${rest.email}</p>
        <p><strong>Phone:</strong> ${rest.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${rest.message}</p>
      `;
      break;

    case "newsletter":
      subject = "New Newsletter Subscriber";
      html = `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${rest.email}</p>
      `;
      break;
  }

  try {
    if (!resend) {
      return {
        success: false,
        error: "RESEND_API_KEY not configured",
      };
    }
    const { data: emailData, error } = await resend.emails.send({
      from: "Ijoba Travels <onboarding@resend.dev>",
      to: [process.env.RECEIVING_EMAIL || "devsenpai09@gmail.com"],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string) {
  try {
    if (!resend) {
      return {
        success: false,
        error: "RESEND_API_KEY not configured",
      };
    }
    const { data, error } = await resend.emails.send({
      from: "Ijoba Travels <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Ijoba Travels!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #F4A261;">Welcome to Ijoba Travels! 🌍</h1>
          <p>Hi there,</p>
          <p>Thank you for subscribing to our newsletter! We're thrilled to have you on board.</p>
          <p>You'll be the first to know about:</p>
          <ul>
            <li>Exclusive travel deals and packages</li>
            <li>Inspiring travel stories and tips</li>
            <li>New destination launches</li>
          </ul>
          <p>Stay tuned for our next update!</p>
          <br>
          <p>Warm regards,</p>
          <p><strong>The Ijoba Travels Team</strong></p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend welcome email error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
}
