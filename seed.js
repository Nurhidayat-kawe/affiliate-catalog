const { createClient } = require("@libsql/client");

const db = createClient({ url: "file:local.db" });

const products = [
  {
    name: "Apple iPhone 15 Pro Max 256GB - Titanium Black",
    image_url: "https://picsum.photos/seed/iphone15a/400/400",
    images: [
      "https://picsum.photos/seed/iphone15a/400/400",
      "https://picsum.photos/seed/iphone15b/400/400",
      "https://picsum.photos/seed/iphone15c/400/400",
      "https://picsum.photos/seed/iphone15d/400/400",
      "https://picsum.photos/seed/iphone15e/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 18999000,
    affiliate_link: "https://shopee.co.id/search?keyword=iphone+15+pro+max",
    rating: 4.9,
  },
  {
    name: "Samsung Galaxy S24 Ultra 512GB - Titanium Gray",
    image_url: "https://picsum.photos/seed/s24a/400/400",
    images: [
      "https://picsum.photos/seed/s24a/400/400",
      "https://picsum.photos/seed/s24b/400/400",
      "https://picsum.photos/seed/s24c/400/400",
      "https://picsum.photos/seed/s24d/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 16499000,
    affiliate_link: "https://shopee.co.id/search?keyword=samsung+s24+ultra",
    rating: 4.8,
  },
  {
    name: "MacBook Air M3 13 inch 16GB/512GB - Midnight",
    image_url: "https://picsum.photos/seed/mac13a/400/400",
    images: [
      "https://picsum.photos/seed/mac13a/400/400",
      "https://picsum.photos/seed/mac13b/400/400",
      "https://picsum.photos/seed/mac13c/400/400",
    ],
    video_url: "",
    price: 17999000,
    affiliate_link: "https://shopee.co.id/search?keyword=macbook+air+m3",
    rating: 4.9,
  },
  {
    name: "Sony WH-1000XM5 Wireless Headphones - Black",
    image_url: "https://picsum.photos/seed/sony1a/400/400",
    images: [
      "https://picsum.photos/seed/sony1a/400/400",
      "https://picsum.photos/seed/sony1b/400/400",
      "https://picsum.photos/seed/sony1c/400/400",
      "https://picsum.photos/seed/sony1d/400/400",
      "https://picsum.photos/seed/sony1e/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 3999000,
    affiliate_link: "https://shopee.co.id/search?keyword=sony+wh1000xm5",
    rating: 4.7,
  },
  {
    name: "Logitech MX Master 3S Wireless Mouse - Graphite",
    image_url: "https://picsum.photos/seed/logi3a/400/400",
    images: [
      "https://picsum.photos/seed/logi3a/400/400",
      "https://picsum.photos/seed/logi3b/400/400",
      "https://picsum.photos/seed/logi3c/400/400",
    ],
    video_url: "",
    price: 1299000,
    affiliate_link: "https://shopee.co.id/search?keyword=logitech+mx+master+3s",
    rating: 4.8,
  },
  {
    name: "Xiaomi Redmi Note 13 Pro 5G 8GB/256GB",
    image_url: "https://picsum.photos/seed/redmi13a/400/400",
    images: [
      "https://picsum.photos/seed/redmi13a/400/400",
      "https://picsum.photos/seed/redmi13b/400/400",
      "https://picsum.photos/seed/redmi13c/400/400",
      "https://picsum.photos/seed/redmi13d/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 3299000,
    affiliate_link: "https://shopee.co.id/search?keyword=redmi+note+13+pro",
    rating: 4.6,
  },
  {
    name: "Anker Nano II 65W USB-C GaN Fast Charger",
    image_url: "https://picsum.photos/seed/anker65a/400/400",
    images: [
      "https://picsum.photos/seed/anker65a/400/400",
      "https://picsum.photos/seed/anker65b/400/400",
    ],
    video_url: "",
    price: 499000,
    affiliate_link: "https://shopee.co.id/search?keyword=anker+nano+65w",
    rating: 4.5,
  },
  {
    name: "JBL Flip 6 Portable Bluetooth Speaker",
    image_url: "https://picsum.photos/seed/jblf6a/400/400",
    images: [
      "https://picsum.photos/seed/jblf6a/400/400",
      "https://picsum.photos/seed/jblf6b/400/400",
      "https://picsum.photos/seed/jblf6c/400/400",
      "https://picsum.photos/seed/jblf6d/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 1899000,
    affiliate_link: "https://shopee.co.id/search?keyword=jbl+flip+6",
    rating: 4.7,
  },
  {
    name: "ASUS ROG Strix G16 i7-13650HX RTX 4060",
    image_url: "https://picsum.photos/seed/rog16a/400/400",
    images: [
      "https://picsum.photos/seed/rog16a/400/400",
      "https://picsum.photos/seed/rog16b/400/400",
      "https://picsum.photos/seed/rog16c/400/400",
      "https://picsum.photos/seed/rog16d/400/400",
      "https://picsum.photos/seed/rog16e/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 18999000,
    affiliate_link: "https://shopee.co.id/search?keyword=asus+rog+strix+g16",
    rating: 4.8,
  },
  {
    name: "Baseus 65W Power Bank 20000mAh LED Display",
    image_url: "https://picsum.photos/seed/bp65a/400/400",
    images: [
      "https://picsum.photos/seed/bp65a/400/400",
      "https://picsum.photos/seed/bp65b/400/400",
      "https://picsum.photos/seed/bp65c/400/400",
    ],
    video_url: "",
    price: 399000,
    affiliate_link: "https://shopee.co.id/search?keyword=baseus+power+bank+65w",
    rating: 4.6,
  },
  {
    name: "Razer DeathAdder V3 HyperSpeed Wireless",
    image_url: "https://picsum.photos/seed/razv3a/400/400",
    images: [
      "https://picsum.photos/seed/razv3a/400/400",
      "https://picsum.photos/seed/razv3b/400/400",
      "https://picsum.photos/seed/razv3c/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 1499000,
    affiliate_link: "https://shopee.co.id/search?keyword=razer+deathadder+v3",
    rating: 4.7,
  },
  {
    name: "iPad Air M2 11 inch 128GB WiFi - Space Gray",
    image_url: "https://picsum.photos/seed/ipada2a/400/400",
    images: [
      "https://picsum.photos/seed/ipada2a/400/400",
      "https://picsum.photos/seed/ipada2b/400/400",
      "https://picsum.photos/seed/ipada2c/400/400",
      "https://picsum.photos/seed/ipada2d/400/400",
    ],
    video_url: "https://www.youtube.com/embed/FUDU7KOdGtk",
    price: 8999000,
    affiliate_link: "https://shopee.co.id/search?keyword=ipad+air+m2",
    rating: 4.8,
  },
];

async function seed() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image_url TEXT NOT NULL,
      images TEXT DEFAULT '[]',
      video_url TEXT DEFAULT '',
      price INTEGER NOT NULL,
      affiliate_link TEXT NOT NULL,
      rating REAL DEFAULT 0,
      clicks INTEGER DEFAULT 0,
      marketplace TEXT DEFAULT 'Shopee',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  try { await db.execute("ALTER TABLE products ADD COLUMN images TEXT DEFAULT '[]'"); } catch {}
  try { await db.execute("ALTER TABLE products ADD COLUMN video_url TEXT DEFAULT ''"); } catch {}

  await db.execute("DELETE FROM products");

  for (const p of products) {
    await db.execute({
      sql: `INSERT INTO products (name, image_url, images, video_url, price, affiliate_link, rating, marketplace) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [p.name, p.image_url, JSON.stringify(p.images), p.video_url || "", p.price, p.affiliate_link, p.rating, "Shopee"],
    });
  }

  console.log(`${products.length} produk (dengan multiple gambar + video) berhasil ditambahkan!`);
  process.exit(0);
}

seed().catch((err) => { console.error("Error:", err); process.exit(1); });
