"use client";

import { useState, useRef } from "react";

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

export default function ProductCard({ product }: { product: Product }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const touchStartX = useRef(0);

  const allImages = product.images?.length ? product.images : [product.image_url];
  const hasVideo = !!product.video_url;
  const totalItems = allImages.length + (hasVideo ? 1 : 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  const renderStars = (rating: number) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    for (let i = 0; i < full; i++) {
      stars.push(
        <svg key={`f${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    if (half) {
      stars.push(
        <svg key="h" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs><linearGradient id={`h${product.id}`}><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="#e5e7eb"/></linearGradient></defs>
          <path fill={`url(#h${product.id})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <svg key={`e${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    return stars;
  };

  const handleCheck = async () => {
    try { await fetch("/api/click", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: product.id }) }); } catch {}
    window.open(product.affiliate_link, "_blank");
  };

  const handleImgError = (idx: number) => {
    setImgErrors((prev) => ({ ...prev, [idx]: true }));
  };

  const goPrev = () => {
    if (showVideo) { setShowVideo(false); return; }
    setCurrentImg((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const goNext = () => {
    if (hasVideo && currentImg === allImages.length - 1 && !showVideo) {
      setShowVideo(true);
      return;
    }
    if (showVideo) { setShowVideo(false); setCurrentImg(0); return; }
    setCurrentImg((prev) => (prev < allImages.length - 1 ? prev + 1 : (hasVideo ? prev : 0)));
  };

  const goToSlide = (idx: number) => {
    setShowVideo(false);
    setCurrentImg(idx);
  };

  const goToVideo = () => {
    setShowVideo(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev(); }
  };

  const ImgPlaceholder = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-200">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover border border-gray-100">
      {/* Image / Video Carousel */}
      <div className="relative aspect-square bg-gray-100 select-none" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {showVideo && hasVideo ? (
          <div className="w-full h-full">
            <iframe
              src={product.video_url}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            {imgErrors[currentImg] ? (
              <ImgPlaceholder />
            ) : (
              <img
                src={allImages[currentImg]}
                alt={`${product.name} - gambar ${currentImg + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={() => handleImgError(currentImg)}
                loading="lazy"
                draggable={false}
              />
            )}
          </>
        )}

        {/* Marketplace badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-shopee text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            {product.marketplace}
          </span>
        </div>

        {/* Click count */}
        {product.clicks > 0 && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              🔥 {product.clicks} klik
            </span>
          </div>
        )}

        {/* Video badge */}
        {hasVideo && !showVideo && (
          <button
            onClick={goToVideo}
            className="absolute bottom-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 hover:bg-black/90 transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
            Video
          </button>
        )}

        {/* Back from video */}
        {showVideo && (
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full hover:bg-black/90 transition-colors"
          >
            ← Kembali ke Gambar
          </button>
        )}

        {/* Nav arrows (only if multiple items) */}
        {totalItems > 1 && !showVideo && (
          <>
            <button onClick={goPrev} className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors text-sm">
              ‹
            </button>
            <button onClick={goNext} className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors text-sm">
              ›
            </button>
          </>
        )}

        {/* Dot indicators */}
        {totalItems > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentImg && !showVideo ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
            {hasVideo && (
              <button
                onClick={goToVideo}
                className={`w-2 h-2 rounded-full transition-all ${showVideo ? "bg-shopee w-4" : "bg-white/50 hover:bg-white/80"}`}
              />
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 min-h-[40px]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="price-format text-lg">{formatPrice(product.price)}</span>
          <button onClick={handleCheck} className="btn-shopee text-white text-sm font-semibold px-4 py-2 rounded-lg">
            Cek →
          </button>
        </div>
      </div>
    </div>
  );
}
