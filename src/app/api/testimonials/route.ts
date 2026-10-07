import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

// Kept under Vercel's 4.5MB request body limit.
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Basic per-IP rate limit. In-memory, so it resets on redeploy and is per
// server instance; the database trigger adds a global cap on top of this.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: real users never see this field. Pretend success for bots.
  if (text(form, "website")) {
    return NextResponse.json({ success: true });
  }

  const name = text(form, "name");
  const destination = text(form, "destination");
  const quote = text(form, "quote");
  const tripYear = parseInt(text(form, "trip_year"), 10);
  const currentYear = new Date().getFullYear();
  const photo = form.get("photo");

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Please enter your name (2–80 characters)." }, { status: 400 });
  }
  if (destination.length < 2 || destination.length > 80) {
    return NextResponse.json({ error: "Please enter the destination you visited." }, { status: 400 });
  }
  if (isNaN(tripYear) || tripYear < 1990 || tripYear > currentYear) {
    return NextResponse.json({ error: "Please enter a valid trip year." }, { status: 400 });
  }
  if (quote.length < 20 || quote.length > 1500) {
    return NextResponse.json(
      { error: "Your story should be between 20 and 1500 characters." },
      { status: 400 }
    );
  }

  const hasPhoto = photo instanceof File && photo.size > 0;
  if (hasPhoto) {
    if (!ALLOWED_PHOTO_TYPES[photo.type]) {
      return NextResponse.json({ error: "Photo must be a JPG, PNG or WebP image." }, { status: 400 });
    }
    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ error: "Photo must be 4MB or smaller." }, { status: 400 });
    }
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You've already shared a few stories recently. Please try again later." },
      { status: 429 }
    );
  }

  let photoUrl: string | null = null;
  if (hasPhoto) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return NextResponse.json({ error: "Photo uploads are unavailable right now." }, { status: 500 });
    }
    const admin = createClient(url, serviceKey);
    const filePath = `testimonials/${Math.random()
      .toString(36)
      .substring(2, 15)}_${Date.now()}.${ALLOWED_PHOTO_TYPES[photo.type]}`;

    const { error: uploadError } = await admin.storage
      .from("destinations")
      .upload(filePath, photo, { contentType: photo.type });
    if (uploadError) {
      console.error("Testimonial photo upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload photo. Please try again." }, { status: 500 });
    }
    photoUrl = admin.storage.from("destinations").getPublicUrl(filePath).data.publicUrl;
  }

  // Insert with the anon client so RLS enforces pending/form.
  const { error } = await supabase.from("testimonials").insert({
    name,
    destination,
    trip_year: tripYear,
    quote,
    photo_url: photoUrl,
    status: "pending",
    source: "form",
  });

  if (error) {
    console.error("Testimonial insert error:", error);
    return NextResponse.json({ error: "Failed to submit. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
