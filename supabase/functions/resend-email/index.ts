
// Environment Variables Guide for resend-email Edge Function:
//
// 1. RESEND_API_KEY:
//    - Purpose: Mandatory for sending emails via the Resend service.
//    - How to get: Obtain this key from your Resend account (dashboard at resend.com).
//    - Setup: Set this as an environment variable in your Supabase project's
//      Edge Function settings.
//    - Without it: Email sending will fail.
//
// 2. RECAPTCHA_SECRET_KEY:
//    - Purpose: Mandatory for reCAPTCHA v2 verification in a production environment.
//    - How to get: Obtain this key from the Google Cloud Console after setting up
//      reCAPTCHA v2 for your site.
//    - Setup: Set this as an environment variable in your Supabase project's
//      Edge Function settings.
//    - For Testing: If this variable is not set, the function will fall back to
//      using Google's default test secret key "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe".
//      This is suitable for testing with Google's test site key on the frontend
//      ("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI") but MUST be replaced with your
//      actual production key for live deployment.
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  guests: number;
  message: string;
  recaptchaToken: string;
}

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const recaptchaSecret = Deno.env.get("RECAPTCHA_SECRET_KEY") || "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"; // This is Google's test key
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('reCAPTCHA verification fetch error:', response.status, errorText);
      return { success: false, error: `Failed to connect to reCAPTCHA service: ${response.status} ${errorText}` };
    }
    
    const data = await response.json();
    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return { success: false, error: `Invalid token: ${data['error-codes']?.join(', ')}` };
    }
    return { success: true };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error.message);
    return { success: false, error: error.message };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, checkin, checkout, guests, message, recaptchaToken }: BookingRequest = await req.json();

    // Validate the required fields
    if (!name || !email || !checkin || !checkout) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      console.error("reCAPTCHA verification failed:", recaptchaResult.error);
      return new Response(
        JSON.stringify({ error: "reCAPTCHA verification failed", details: recaptchaResult.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to property owner
    const ownerEmailResponse = await resend.emails.send({
      from: "nishzone@gmail.com",
      to: ["nishzone@gmail.com"], // This is hidden in the edge function
      subject: `New Booking Inquiry from ${name}`,
      html: `
        <h1>New Booking Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Check-in:</strong> ${checkin}</p>
        <p><strong>Check-out:</strong> ${checkout}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Message:</strong> ${message || "No additional message"}</p>
      `,
    });

    // Send confirmation email to guest
    const guestEmailResponse = await resend.emails.send({
      from: "nishzone@gmail.com",
      to: [email],
      subject: "Your Booking Inquiry Has Been Received",
      html: `
        <h1>Thank You for Your Booking Inquiry</h1>
        <p>Dear ${name},</p>
        <p>We have received your booking inquiry for the following dates:</p>
        <p><strong>Check-in:</strong> ${checkin}</p>
        <p><strong>Check-out:</strong> ${checkout}</p>
        <p><strong>Number of guests:</strong> ${guests}</p>
        <p>We will review your request and get back to you as soon as possible.</p>
        <p>Best regards,<br>The Luxora Team</p>
      `,
    });

    console.log("Emails sent successfully:", { ownerEmailResponse, guestEmailResponse });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    // Check if the error is from Resend API
    // This is a basic check; you might need a more robust way to identify Resend errors,
    // depending on the error objects thrown by the Resend SDK.
    // For example, if Resend errors have a specific `name` property like 'ResendError'.
    // Or if error.message contains specific keywords.
    if (error.name === 'ResendError' || (error.message && error.message.toLowerCase().includes('resend'))) {
      console.error("Resend API error:", error.message, error);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } else {
      console.error("Internal server error in resend-email function:", error.message, error);
      return new Response(
        JSON.stringify({ error: "Internal server error", details: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  }
});
