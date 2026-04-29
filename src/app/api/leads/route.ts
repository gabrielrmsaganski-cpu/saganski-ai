import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;

  if (!webhook) {
    return NextResponse.json({
      ok: true,
      forwarded: false,
      message:
        "LEADS_WEBHOOK_URL não configurado. O lead deve ser persistido no client (localStorage).",
    });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "saganski.ai",
        receivedAt: new Date().toISOString(),
        data: body,
      }),
    });
    if (!res.ok) {
      throw new Error(`Webhook respondeu ${res.status}`);
    }
    return NextResponse.json({ ok: true, forwarded: true });
  } catch (error) {
    console.error("[leads] forward failed:", error);
    return NextResponse.json({
      ok: true,
      forwarded: false,
      message: "Falha ao encaminhar webhook. Lead deve ser persistido no client.",
    });
  }
}
