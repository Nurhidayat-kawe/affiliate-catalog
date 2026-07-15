import db, { initDB } from "@/lib/db";
import SocialLinks from "@/components/SocialLinks";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

async function getProducts() {
  await initDB();
  const result = await db.execute("SELECT * FROM products ORDER BY created_at DESC");
  return result.rows.map((row) => ({
    ...row,
    id: Number(row.id),
    price: Number(row.price),
    rating: Number(row.rating),
    clicks: Number(row.clicks),
    images: typeof row.images === "string" ? JSON.parse(row.images || "[]") : [],
  }));
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-shopee to-orange-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Affiliate Catalog</h1>
                <p className="text-xs text-gray-500">Produk Shopee Terbaik</p>
              </div>
            </div>
            <a href="/admin" className="text-sm text-gray-500 hover:text-shopee transition-colors">
              Admin
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-shopee to-orange-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Produk Pilihan Terbaik</h2>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-6">
              Koleksi produk affiliate Shopee dengan harga terbaik dan rating tinggi
            </p>
            <SocialLinks variant="hero" />
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid initialProducts={products as any} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold mb-2">Ikuti Saya</h3>
            <p className="text-gray-400 text-sm mb-4">Follow untuk update produk terbaru dan tips belanja hemat</p>
            <SocialLinks variant="footer" />
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Affiliate Catalog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
