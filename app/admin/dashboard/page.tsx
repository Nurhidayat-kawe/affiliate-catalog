"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  image_url: string;
  images: string[];
  video_url: string;
  price: number;
  affiliate_link: string;
  rating: number;
  clicks: number;
  marketplace: string;
  category: string;
}

interface FormData {
  name: string;
  image_url: string;
  images: string[];
  video_url: string;
  price: number;
  affiliate_link: string;
  rating: number;
  marketplace: string;
  category: string;
}

const CATEGORIES = ["Elektronik", "Handphone", "Komputer", "Aksesoris", "Audio", "Gaming", "Rumah", "Fashion", "Kecantikan", "Olahraga", "Lainnya"];

const emptyForm: FormData = {
  name: "",
  image_url: "",
  images: [],
  video_url: "",
  price: 0,
  affiliate_link: "",
  rating: 5,
  marketplace: "Shopee",
  category: "Elektronik",
};

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({ total: 0, clicks: 0 });
  const [newImageUrl, setNewImageUrl] = useState("");
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
      const totalClicks = data.reduce((sum: number, p: Product) => sum + (p.clicks || 0), 0);
      setStats({ total: data.length, clicks: totalClicks });
    } catch {
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => {
        if (!res.ok) { router.push("/admin"); return; }
        fetchProducts();
      })
      .catch(() => router.push("/admin"));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, images: form.images.slice(0, 5) };
      if (editingId) {
        await fetch(`/api/products/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchProducts();
    } catch {
      alert("Gagal menyimpan produk");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    const imgs = product.images?.length ? product.images : [product.image_url];
    setForm({
      name: product.name,
      image_url: product.image_url,
      images: imgs,
      video_url: product.video_url || "",
      price: product.price,
      affiliate_link: product.affiliate_link,
      rating: product.rating,
      marketplace: product.marketplace,
      category: product.category || "Lainnya",
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const addImage = () => {
    if (!newImageUrl.trim()) return;
    if (form.images.length >= 5) { alert("Maksimal 5 gambar"); return; }
    if (form.images.includes(newImageUrl.trim())) return;
    setForm({ ...form, images: [...form.images, newImageUrl.trim()] });
    setNewImageUrl("");
  };

  const removeImage = (idx: number) => {
    const updated = form.images.filter((_, i) => i !== idx);
    setForm({ ...form, images: updated, image_url: updated[0] || "" });
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= form.images.length) return;
    const updated = [...form.images];
    [updated[from], updated[to]] = [updated[to], updated[from]];
    setForm({ ...form, images: updated, image_url: updated[0] || "" });
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-shopee border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-shopee to-orange-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">Kelola produk affiliate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="/" className="text-sm text-gray-500 hover:text-shopee transition-colors">Lihat Katalog</a>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 transition-colors">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Produk</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Klik</p>
                <p className="text-2xl font-bold text-gray-900">{stats.clicks.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Marketplace</p>
                <p className="text-2xl font-bold text-gray-900">Shopee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Daftar Produk</h2>
          <button
            onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="btn-shopee text-white font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Produk
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{editingId ? "Edit Produk" : "Tambah Produk"}</h3>
                  <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent" placeholder="Nama produk" />
                </div>

                {/* Gambar Utama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gambar Utama * (wajib)</label>
                  <input type="url" required value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent" placeholder="https://..." />
                  {form.image_url && (
                    <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                  )}
                </div>

                {/* Gallery Tambahan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar Tambahan <span className="text-gray-400">(opsional, maks 5 total)</span>
                  </label>
                  <div className="flex gap-2">
                    <input type="url" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent text-sm"
                      placeholder="URL gambar tambahan..." onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImage(); } }} />
                    <button type="button" onClick={addImage}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                      + Tambah
                    </button>
                  </div>
                  {form.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {form.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <img src={img} alt={`Gambar ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex gap-1">
                              {idx > 0 && (
                                <button type="button" onClick={() => moveImage(idx, idx - 1)} className="w-6 h-6 bg-white/90 rounded-full text-xs flex items-center justify-center hover:bg-white">←</button>
                              )}
                              <button type="button" onClick={() => removeImage(idx)} className="w-6 h-6 bg-red-500/90 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-500">✕</button>
                              {idx < form.images.length - 1 && (
                                <button type="button" onClick={() => moveImage(idx, idx + 1)} className="w-6 h-6 bg-white/90 rounded-full text-xs flex items-center justify-center hover:bg-white">→</button>
                              )}
                            </div>
                          </div>
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 bg-shopee text-white text-[9px] px-1.5 py-0.5 rounded font-bold">UTAMA</span>
                          )}
                          <span className="absolute top-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Video <span className="text-gray-400">(YouTube embed, opsional)</span>
                  </label>
                  <input type="url" value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent"
                    placeholder="https://www.youtube.com/embed/XXXXX" />
                  <p className="text-xs text-gray-400 mt-1">Gunakan format embed: https://www.youtube.com/embed/VIDEO_ID</p>
                  {form.video_url && (
                    <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-gray-200 max-w-xs">
                      <iframe src={form.video_url} className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  )}
                </div>

                {/* Harga & Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label>
                    <input type="number" required min="0" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent" />
                  </div>
                </div>

                {/* Link Affiliate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Affiliate *</label>
                  <input type="url" required value={form.affiliate_link} onChange={(e) => setForm({ ...form, affiliate_link: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent"
                    placeholder="https://shopee.co.id/..." />
                </div>

                {/* Category & Marketplace */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marketplace</label>
                    <select value={form.marketplace} onChange={(e) => setForm({ ...form, marketplace: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-shopee focus:border-transparent">
                      <option value="Shopee">Shopee</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                    Batal
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 btn-shopee text-white font-semibold px-4 py-2.5 rounded-xl disabled:opacity-50">
                    {saving ? "Menyimpan..." : editingId ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500">Belum ada produk</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Produk</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Kategori</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Harga</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Media</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Rating</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Klik</th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => {
                    const imgCount = product.images?.length || 1;
                    return (
                      <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              <img src={product.image_url} alt="" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 text-sm truncate max-w-[200px]">{product.name}</p>
                              <p className="text-xs text-gray-400">{product.marketplace}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">{product.category || "Lainnya"}</span>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="price-format text-sm">{formatPrice(product.price)}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">🖼 {imgCount}</span>
                            {product.video_url && <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">🎬 1</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-600">⭐ {product.rating?.toFixed(1)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-600">{product.clicks || 0}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
