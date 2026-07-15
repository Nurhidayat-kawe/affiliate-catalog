import { NextRequest, NextResponse } from "next/server";
import db, { initDB } from "@/lib/db";

export async function GET() {
  await initDB();
  const result = await db.execute("SELECT * FROM products ORDER BY created_at DESC");
  const rows = result.rows.map((row) => ({
    ...row,
    id: Number(row.id),
    price: Number(row.price),
    rating: Number(row.rating),
    clicks: Number(row.clicks),
    images: typeof row.images === "string" ? JSON.parse(row.images || "[]") : [],
    category: row.category || "Lainnya",
  }));
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  await initDB();
  const body = await request.json();
  const { name, image_url, images, video_url, price, affiliate_link, rating, marketplace, category } = body;

  if (!name || !image_url || !price || !affiliate_link) {
    return NextResponse.json(
      { error: "Nama, gambar utama, harga, dan link affiliate wajib diisi" },
      { status: 400 }
    );
  }

  const allImages = Array.isArray(images) ? images : [];
  if (!allImages.includes(image_url)) {
    allImages.unshift(image_url);
  }

  const result = await db.execute({
    sql: `INSERT INTO products (name, image_url, images, video_url, price, affiliate_link, rating, marketplace, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      name,
      image_url,
      JSON.stringify(allImages.slice(0, 5)),
      video_url || "",
      Number(price),
      affiliate_link,
      Number(rating) || 0,
      marketplace || "Shopee",
      category || "Lainnya",
    ],
  });

  return NextResponse.json({ id: Number(result.lastInsertRowid), message: "Produk ditambahkan" }, { status: 201 });
}
