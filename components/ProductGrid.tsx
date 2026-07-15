"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";

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

const CATEGORIES = ["Semua", "Elektronik", "Handphone", "Komputer", "Aksesoris", "Audio", "Gaming", "Rumah", "Fashion", "Kecantikan", "Olahraga", "Lainnya"];

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredProducts = (query: string, category: string) => {
    let filtered = initialProducts;

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(q) || p.marketplace.toLowerCase().includes(q)
      );
    }

    if (category !== "Semua") {
      filtered = filtered.filter((p) => p.category === category);
    }

    return filtered;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = getFilteredProducts(query, activeCategory);
    setProducts(filtered);
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    const filtered = getFilteredProducts(searchQuery, cat);
    setProducts(filtered);
  };

  const availableCategories = CATEGORIES.filter((cat) => {
    if (cat === "Semua") return true;
    return initialProducts.some((p) => p.category === cat);
  });

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1 scrollbar-hide">
        {availableCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-shopee text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-shopee hover:text-shopee"
            }`}
          >
            {cat}
            {cat !== "Semua" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({initialProducts.filter((p) => p.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Produk Tidak Ditemukan</h3>
          <p className="text-gray-400">Coba kata kunci atau kategori lain</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Menampilkan <span className="font-semibold text-gray-700">{products.length}</span> produk
              {activeCategory !== "Semua" && (
                <span> di kategori <span className="font-semibold text-shopee">{activeCategory}</span></span>
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={String(product.id)} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
