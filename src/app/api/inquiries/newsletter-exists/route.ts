import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey || !email) {
      return NextResponse.json({ error: "Missing configuration" }, { status: 500 });
    }
    const supabase = createClient(url, serviceKey);
    const { data, error } = await supabase
      .from("inquiries")
      .select("id,email")
      .eq("inquiry_type", "newsletter")
      .ilike("email", `%${email}%`)
      .limit(1);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const exists =
      Array.isArray(data) &&
      data.some(
        (row: any) =>
          typeof row.email === "string" &&
          row.email.trim().toLowerCase() === email.toLowerCase()
      );
    return NextResponse.json({ exists });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 500 });
  }
}
