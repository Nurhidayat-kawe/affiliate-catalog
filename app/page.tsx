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
      <header className="bg-gradient-to-r from-shopee to-orange-400 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold text-white leading-tight">Nurreview</h1>
                <p className="text-[10px] text-orange-100 leading-tight">Rekomendasi Produk Terbaik</p>
              </div>
            </div>
            <SocialLinks variant="header" />
          </div>
        </div>
      </header>

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
