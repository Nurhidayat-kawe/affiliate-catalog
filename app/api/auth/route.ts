import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, getSecret } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (verifyPassword(password)) {
    const response = NextResponse.json({ message: "Login berhasil" });
    response.cookies.set("admin_token", getSecret(), {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Password salah" }, { status: 401 });
}

export async function GET() {
  const { checkAuth } = await import("@/lib/auth");
  if (checkAuth()) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Logout berhasil" });
  response.cookies.delete("admin_token");
  return response;
}
