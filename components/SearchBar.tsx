"use client";

import { useState, useEffect, useRef } from "react";

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
}

export default function SearchBar({ onResults }: { onResults: (products: Product[]) => void }) {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setAllProducts(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setShowClear(query.length > 0);
  }, [query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value.trim()) {
      onResults(allProducts);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(() => {
      const q = value.toLowerCase();
      const filtered = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.marketplace.toLowerCase().includes(q)
      );
      onResults(filtered);
      setLoading(false);
    }, 200);
  };

  const clearSearch = () => {
    setQuery("");
    onResults(allProducts);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {loading ? (
            <div className="animate-spin w-5 h-5 border-2 border-shopee border-t-transparent rounded-full" />
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-shopee focus:border-transparent transition-all text-gray-800 placeholder-gray-400"
          placeholder="Cari produk... (contoh: iPhone, Samsung, headphone)"
        />
        {showClear && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {query && !loading && (
        <p className="text-sm text-gray-500 mt-2 ml-1" id="search-result-count" />
      )}
    </div>
  );
}
