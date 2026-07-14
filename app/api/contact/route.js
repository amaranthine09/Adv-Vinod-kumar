import { NextResponse } from "next/server";

const SCRIPT_URL = process.env.REVIEW_API_URL || "";

// POST – submit a new contact message to Google Apps Script
export async function POST(request) {
  if (!SCRIPT_URL) {
    return NextResponse.json(
      { error: "Contact system not configured yet." },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();

    // Validate
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        name: body.name,
        phone: body.phone || "",
        email: body.email,
        subject: body.legal_matter || "",
        message: body.message,
      }),
    });

    const text = await res.text();
    try {
      const result = JSON.parse(text);
      return NextResponse.json(result);
    } catch {
      // Google Apps Script sometimes returns HTML on redirect
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
