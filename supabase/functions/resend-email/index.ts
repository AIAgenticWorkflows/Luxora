
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
// 3. PROPERTY_OWNER_EMAIL:
//    - Purpose: The email address where booking inquiries should be sent.
//    - Setup: Set this as an environment variable in your Supabase project's
//      Edge Function settings.
//    - Example: "your-email@domain.com"
//
// 4. FROM_EMAIL:
//    - Purpose: The email address to use as the sender for outgoing emails.
//    - Setup: Set this as an environment variable in your Supabase project's
//      Edge Function settings.
//    - Note: This must be a verified domain in your Resend account.
//    - Example: "bookings@yourdomain.com"
//
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Security-Policy": "default-src 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
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

// Simple in-memory rate limiting (for production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per minute per IP

function getRateLimitKey(req: Request): string {
  return req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(key);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  limit.count++;
  return false;
}

// Server-side input validation
function validateBookingRequest(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push("Name is required");
  } else if (data.name.trim().length === 0 || data.name.length > 100) {
    errors.push("Name must be between 1 and 100 characters");
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string') {
    errors.push("Email is required");
  } else if (!emailRegex.test(data.email) || data.email.length > 254) {
    errors.push("Invalid email format");
  }
  
  // Date validation
  if (!data.checkin || !data.checkout) {
    errors.push("Check-in and check-out dates are required");
  } else {
    const checkinDate = new Date(data.checkin);
    const checkoutDate = new Date(data.checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
      errors.push("Invalid date format");
    } else if (checkinDate < today) {
      errors.push("Check-in date cannot be in the past");
    } else if (checkoutDate <= checkinDate) {
      errors.push("Check-out date must be after check-in date");
    }
  }
  
  // Guests validation
  if (!data.guests || typeof data.guests !== 'number') {
    errors.push("Number of guests is required");
  } else if (data.guests < 1 || data.guests > 20) {
    errors.push("Number of guests must be between 1 and 20");
  }
  
  // Message validation (optional field)
  if (data.message && (typeof data.message !== 'string' || data.message.length > 1000)) {
    errors.push("Message must be less than 1000 characters");
  }
  
  // reCAPTCHA token validation
  if (!data.recaptchaToken || typeof data.recaptchaToken !== 'string') {
    errors.push("reCAPTCHA verification is required");
  }
  
  return { isValid: errors.length === 0, errors };
}

// Function to sanitize input strings
function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
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
      console.error('reCAPTCHA verification fetch error:', response.status);
      return { success: false, error: "reCAPTCHA verification service unavailable" };
    }
    
    const data = await response.json();
    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return { success: false, error: "reCAPTCHA verification failed" };
    }
    return { success: true };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error.message);
    return { success: false, error: "reCAPTCHA verification failed" };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(req);
    if (isRateLimited(rateLimitKey)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse and validate request body
    let requestData: any;
    try {
      requestData = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input data
    const validation = validateBookingRequest(requestData);
    if (!validation.isValid) {
      console.error("Validation errors:", validation.errors);
      return new Response(
        JSON.stringify({ error: "Invalid input data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, checkin, checkout, guests, message, recaptchaToken }: BookingRequest = requestData;

    // Sanitize input data
    const sanitizedData = {
      name: sanitizeString(name),
      email: sanitizeString(email),
      checkin,
      checkout,
      guests,
      message: message ? sanitizeString(message) : '',
      recaptchaToken
    };

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(sanitizedData.recaptchaToken);
    if (!recaptchaResult.success) {
      console.error("reCAPTCHA verification failed");
      return new Response(
        JSON.stringify({ error: "Verification failed. Please try again." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get email addresses from environment variables
    const propertyOwnerEmail = Deno.env.get("PROPERTY_OWNER_EMAIL");
    const fromEmail = Deno.env.get("FROM_EMAIL");

    if (!propertyOwnerEmail || !fromEmail) {
      console.error("Missing required email configuration");
      return new Response(
        JSON.stringify({ error: "Email service configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to property owner
    const ownerEmailResponse = await resend.emails.send({
      from: fromEmail,
      to: [propertyOwnerEmail],
      subject: `New Booking Inquiry from ${sanitizedData.name}`,
      html: `
        <h1>New Booking Inquiry</h1>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Check-in:</strong> ${sanitizedData.checkin}</p>
        <p><strong>Check-out:</strong> ${sanitizedData.checkout}</p>
        <p><strong>Guests:</strong> ${sanitizedData.guests}</p>
        <p><strong>Message:</strong> ${sanitizedData.message || "No additional message"}</p>
      `,
    });

    // Send confirmation email to guest
    const guestEmailResponse = await resend.emails.send({
      from: fromEmail,
      to: [sanitizedData.email],
      subject: "Your Booking Inquiry Has Been Received",
      html: `
        <h1>Thank You for Your Booking Inquiry</h1>
        <p>Dear ${sanitizedData.name},</p>
        <p>We have received your booking inquiry for the following dates:</p>
        <p><strong>Check-in:</strong> ${sanitizedData.checkin}</p>
        <p><strong>Check-out:</strong> ${sanitizedData.checkout}</p>
        <p><strong>Number of guests:</strong> ${sanitizedData.guests}</p>
        <p>We will review your request and get back to you as soon as possible.</p>
        <p>Best regards,<br>The Luxora Team</p>
      `,
    });

    console.log("Emails sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Internal server error:", error.message);
    
    // Generic error response - don't expose internal details
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
