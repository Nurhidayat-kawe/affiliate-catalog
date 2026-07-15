import { NextRequest, NextResponse } from "next/server";
import db, { initDB } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await initDB();
  const body = await request.json();
  const { name, image_url, images, video_url, price, affiliate_link, rating, marketplace, category } = body;

  const allImages = Array.isArray(images) ? images : [];
  if (image_url && !allImages.includes(image_url)) {
    allImages.unshift(image_url);
  }

  await db.execute({
    sql: `UPDATE products SET name=?, image_url=?, images=?, video_url=?, price=?, affiliate_link=?, rating=?, marketplace=?, category=? WHERE id=?`,
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
      Number(params.id),
    ],
  });

  return NextResponse.json({ message: "Produk diperbarui" });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await initDB();
  await db.execute({
    sql: "DELETE FROM products WHERE id=?",
    args: [Number(params.id)],
  });
  return NextResponse.json({ message: "Produk dihapus" });
}
