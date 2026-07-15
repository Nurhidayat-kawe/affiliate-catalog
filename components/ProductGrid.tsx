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
}

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <>
      <SearchBar onResults={setProducts} />

      {products.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Produk Tidak Ditemukan</h3>
          <p className="text-gray-400">Coba kata kunci lain</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              Menampilkan <span className="font-semibold text-gray-700">{products.length}</span> produk
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
