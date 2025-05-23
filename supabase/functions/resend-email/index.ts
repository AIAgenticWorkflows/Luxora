
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
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, checkin, checkout, guests, message }: BookingRequest = await req.json();

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

    // Send email to property owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Luxora Booking <onboarding@resend.dev>",
      to: ["n.appanah@gmail.com"], // This is hidden in the edge function
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
      from: "Luxora Booking <onboarding@resend.dev>",
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
    console.error("Error in resend-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
