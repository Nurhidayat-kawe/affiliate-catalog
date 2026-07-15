import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

export default db;

export async function initDB() {
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
      category TEXT DEFAULT 'Lainnya',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try { await db.execute("ALTER TABLE products ADD COLUMN images TEXT DEFAULT '[]'"); } catch {}
  try { await db.execute("ALTER TABLE products ADD COLUMN video_url TEXT DEFAULT ''"); } catch {}
  try { await db.execute("ALTER TABLE products ADD COLUMN category TEXT DEFAULT 'Lainnya'"); } catch {}
}
