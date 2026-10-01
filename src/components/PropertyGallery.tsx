'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  isMobileView: boolean;
  onCheckDates: () => void;
}

export function PropertyGallery({
  images,
  title,
  isMobileView,
  onCheckDates,
}: PropertyGalleryProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);

  // Gallery keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGalleryIndex === null) return;
      if (e.key === 'Escape') setActiveGalleryIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveGalleryIndex((prev) =>
          prev !== null ? (prev + 1) % images.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveGalleryIndex((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryIndex, images.length]);

  return (
    <>
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
              Spaces & Atmosphere
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Authentic photography of the interior, private relaxation spaces, and surrounding nature.
            </p>
          </div>
          <button
            type="button"
            onClick={onCheckDates}
            className="self-start sm:self-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            Check dates for these spaces ↓
          </button>
        </div>

        <div className={`grid grid-cols-1 ${isMobileView ? 'gap-4' : 'sm:grid-cols-3 gap-5'}`}>
          {images.slice(1, 4).map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveGalleryIndex(idx + 1)}
              className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-zinc-100 group shadow-xs cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Image
                src={img}
                alt={`${title} space ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-2 bg-white/95 text-zinc-900 rounded-full px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <Maximize2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>View Fullscreen</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Animated Maximized Photo Gallery Lightbox */}
      {activeGalleryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-200">
                {title}
              </span>
              <span className="text-xs text-zinc-400 bg-white/10 px-2.5 py-1 rounded-full font-mono">
                {activeGalleryIndex + 1} / {images.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveGalleryIndex(null)}
              className="rounded-full p-2.5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Active Image View with Smooth Transitions */}
          <div className="relative w-full h-[70vh] max-w-5xl mx-4 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={images[activeGalleryIndex]}
                alt={`${title} photo ${activeGalleryIndex + 1}`}
                fill
                priority
                className="object-contain animate-in fade-in zoom-in-95 duration-200"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>

            {/* Prev Button */}
            <button
              type="button"
              onClick={() =>
                setActiveGalleryIndex(
                  (activeGalleryIndex - 1 + images.length) % images.length
                )
              }
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setActiveGalleryIndex((activeGalleryIndex + 1) % images.length)
              }
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 flex justify-center gap-2 px-4 overflow-x-auto py-2">
            {images.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeGalleryIndex === idx
                    ? 'border-emerald-500 scale-105 shadow-lg'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
