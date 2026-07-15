import { NextRequest, NextResponse } from "next/server";
import db, { initDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  await initDB();
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "ID produk wajib" }, { status: 400 });
  }

  await db.execute({
    sql: "UPDATE products SET clicks = clicks + 1 WHERE id = ?",
    args: [Number(id)],
  });

  return NextResponse.json({ message: "Click tercatat" });
}
