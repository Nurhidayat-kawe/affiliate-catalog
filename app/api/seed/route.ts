import { NextResponse } from "next/server";
import db, { initDB } from "@/lib/db";

const products = [
  { name: "Apple iPhone 15 Pro Max 256GB - Titanium Black", image_url: "https://picsum.photos/seed/iphone15a/400/400", images: ["https://picsum.photos/seed/iphone15a/400/400","https://picsum.photos/seed/iphone15b/400/400","https://picsum.photos/seed/iphone15c/400/400","https://picsum.photos/seed/iphone15d/400/400","https://picsum.photos/seed/iphone15e/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 18999000, affiliate_link: "https://shopee.co.id/search?keyword=iphone+15+pro+max", rating: 4.9, category: "Handphone" },
  { name: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray", image_url: "https://picsum.photos/seed/s24a/400/400", images: ["https://picsum.photos/seed/s24a/400/400","https://picsum.photos/seed/s24b/400/400","https://picsum.photos/seed/s24c/400/400","https://picsum.photos/seed/s24d/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 16499000, affiliate_link: "https://shopee.co.id/search?keyword=samsung+s24+ultra", rating: 4.8, category: "Handphone" },
  { name: "MacBook Air M3 13 inch 16GB/512GB - Midnight", image_url: "https://picsum.photos/seed/mac13a/400/400", images: ["https://picsum.photos/seed/mac13a/400/400","https://picsum.photos/seed/mac13b/400/400","https://picsum.photos/seed/mac13c/400/400"], video_url: "", price: 17999000, affiliate_link: "https://shopee.co.id/search?keyword=macbook+air+m3", rating: 4.9, category: "Komputer" },
  { name: "Sony WH-1000XM5 Wireless Headphones - Black", image_url: "https://picsum.photos/seed/sony1a/400/400", images: ["https://picsum.photos/seed/sony1a/400/400","https://picsum.photos/seed/sony1b/400/400","https://picsum.photos/seed/sony1c/400/400","https://picsum.photos/seed/sony1d/400/400","https://picsum.photos/seed/sony1e/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 3999000, affiliate_link: "https://shopee.co.id/search?keyword=sony+wh1000xm5", rating: 4.7, category: "Audio" },
  { name: "Logitech MX Master 3S Wireless Mouse - Graphite", image_url: "https://picsum.photos/seed/logi3a/400/400", images: ["https://picsum.photos/seed/logi3a/400/400","https://picsum.photos/seed/logi3b/400/400","https://picsum.photos/seed/logi3c/400/400"], video_url: "", price: 1299000, affiliate_link: "https://shopee.co.id/search?keyword=logitech+mx+master+3s", rating: 4.8, category: "Aksesoris" },
  { name: "Xiaomi Redmi Note 13 Pro 5G 8GB/256GB", image_url: "https://picsum.photos/seed/redmi13a/400/400", images: ["https://picsum.photos/seed/redmi13a/400/400","https://picsum.photos/seed/redmi13b/400/400","https://picsum.photos/seed/redmi13c/400/400","https://picsum.photos/seed/redmi13d/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 3299000, affiliate_link: "https://shopee.co.id/search?keyword=redmi+note+13+pro", rating: 4.6, category: "Handphone" },
  { name: "Anker Nano II 65W USB-C GaN Fast Charger", image_url: "https://picsum.photos/seed/anker65a/400/400", images: ["https://picsum.photos/seed/anker65a/400/400","https://picsum.photos/seed/anker65b/400/400"], video_url: "", price: 499000, affiliate_link: "https://shopee.co.id/search?keyword=anker+nano+65w", rating: 4.5, category: "Aksesoris" },
  { name: "JBL Flip 6 Portable Bluetooth Speaker", image_url: "https://picsum.photos/seed/jblf6a/400/400", images: ["https://picsum.photos/seed/jblf6a/400/400","https://picsum.photos/seed/jblf6b/400/400","https://picsum.photos/seed/jblf6c/400/400","https://picsum.photos/seed/jblf6d/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 1899000, affiliate_link: "https://shopee.co.id/search?keyword=jbl+flip+6", rating: 4.7, category: "Audio" },
  { name: "ASUS ROG Strix G16 i7-13650HX RTX 4060", image_url: "https://picsum.photos/seed/rog16a/400/400", images: ["https://picsum.photos/seed/rog16a/400/400","https://picsum.photos/seed/rog16b/400/400","https://picsum.photos/seed/rog16c/400/400","https://picsum.photos/seed/rog16d/400/400","https://picsum.photos/seed/rog16e/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 18999000, affiliate_link: "https://shopee.co.id/search?keyword=asus+rog+strix+g16", rating: 4.8, category: "Gaming" },
  { name: "Baseus 65W Power Bank 20000mAh LED Display", image_url: "https://picsum.photos/seed/bp65a/400/400", images: ["https://picsum.photos/seed/bp65a/400/400","https://picsum.photos/seed/bp65b/400/400","https://picsum.photos/seed/bp65c/400/400"], video_url: "", price: 399000, affiliate_link: "https://shopee.co.id/search?keyword=baseus+power+bank+65w", rating: 4.6, category: "Aksesoris" },
  { name: "Razer DeathAdder V3 HyperSpeed Wireless", image_url: "https://picsum.photos/seed/razv3a/400/400", images: ["https://picsum.photos/seed/razv3a/400/400","https://picsum.photos/seed/razv3b/400/400","https://picsum.photos/seed/razv3c/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 1499000, affiliate_link: "https://shopee.co.id/search?keyword=razer+deathadder+v3", rating: 4.7, category: "Gaming" },
  { name: "iPad Air M2 11 inch 128GB WiFi - Space Gray", image_url: "https://picsum.photos/seed/ipada2a/400/400", images: ["https://picsum.photos/seed/ipada2a/400/400","https://picsum.photos/seed/ipada2b/400/400","https://picsum.photos/seed/ipada2c/400/400","https://picsum.photos/seed/ipada2d/400/400"], video_url: "https://www.youtube.com/embed/FUDU7KOdGtk", price: 8999000, affiliate_link: "https://shopee.co.id/search?keyword=ipad+air+m2", rating: 4.8, category: "Komputer" },
];

export async function POST() {
  try {
    await initDB();

    const existing = await db.execute("SELECT COUNT(*) as count FROM products");
    if (Number(existing.rows[0].count) > 0) {
      return NextResponse.json({ message: "Database sudah terisi", count: Number(existing.rows[0].count) });
    }

    for (const p of products) {
      const allImages = [p.image_url, ...p.images.filter((img) => img !== p.image_url)];
      await db.execute({
        sql: `INSERT INTO products (name, image_url, images, video_url, price, affiliate_link, rating, marketplace, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [p.name, p.image_url, JSON.stringify(allImages.slice(0, 5)), p.video_url, p.price, p.affiliate_link, p.rating, "Shopee", p.category],
      });
    }

    return NextResponse.json({ message: "Seed berhasil!", count: products.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
