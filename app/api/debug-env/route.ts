import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 4) || null,
    businessEmail: process.env.BUSINESS_EMAIL || null,
    nodeEnv: process.env.NODE_ENV || null,
  });
}
