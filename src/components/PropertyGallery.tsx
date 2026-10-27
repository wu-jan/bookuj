'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { TranslationDictionary } from '@/lib/translations';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  isMobileView: boolean;
  onCheckDates: () => void;
  t: TranslationDictionary;
}

export function PropertyGallery({
  images,
  title,
  isMobileView,
  onCheckDates,
  t,
}: PropertyGalleryProps) {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (activeGalleryIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeGalleryIndex]);

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

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || activeGalleryIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe threshold of 45px
    if (diff > 45) {
      // Swiped left -> Next
      setActiveGalleryIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
    } else if (diff < -45) {
      // Swiped right -> Prev
      setActiveGalleryIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    }
    touchStartX.current = null;
  };

  const previewImages = images.slice(1, 4);
  const totalCount = images.length;
  const remainingCount = totalCount - 4;

  return (
    <>
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
              {t.spacesAndAtmosphere}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {t.gallerySubtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveGalleryIndex(0)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <Images className="h-3.5 w-3.5 text-zinc-500" />
              <span>{t.viewAllPhotos(totalCount)}</span>
            </button>
            <button
              type="button"
              onClick={onCheckDates}
              className="self-start sm:self-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              {t.checkDatesForSpaces}
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${isMobileView ? 'gap-4' : 'sm:grid-cols-3 gap-5'}`}>
          {previewImages.map((img, idx) => {
            const imageIndex = idx + 1;
            const isLast = idx === 2 && remainingCount > 0;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGalleryIndex(imageIndex)}
                className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-zinc-100 group shadow-xs cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <Image
                  src={img}
                  alt={`${title} space ${imageIndex}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {isLast && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white backdrop-blur-[2px] transition-colors group-hover:bg-black/50">
                    <div className="flex items-center gap-2 font-bold text-sm bg-white/20 px-3.5 py-1.5 rounded-full border border-white/30 backdrop-blur-md">
                      <Images className="h-4 w-4" />
                      <span>+{remainingCount + 1}</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 bg-white/95 text-zinc-900 rounded-full px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <Maximize2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{t.viewFullscreen}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Maximized Photo Gallery Lightbox */}
      {activeGalleryIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-black/70 to-transparent shrink-0">
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-200 truncate">
                {title}
              </span>
              <span className="text-xs text-zinc-400 bg-white/10 px-2.5 py-1 rounded-full font-mono shrink-0">
                {t.photoOf(activeGalleryIndex + 1, totalCount)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveGalleryIndex(null)}
              className="rounded-full p-2.5 text-zinc-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer shrink-0"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Active Image View with Smooth Transitions & Responsive Height */}
          <div className="relative flex-1 min-h-0 w-full max-w-5xl mx-auto px-4 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[62vh] sm:max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl">
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
                  (activeGalleryIndex - 1 + totalCount) % totalCount
                )
              }
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/90 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setActiveGalleryIndex((activeGalleryIndex + 1) % totalCount)
              }
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/90 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="relative z-10 flex justify-center gap-2 px-4 py-3 sm:py-5 overflow-x-auto bg-gradient-to-t from-black/70 to-transparent shrink-0">
            {images.map((thumb, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveGalleryIndex(idx)}
                className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeGalleryIndex === idx
                    ? 'border-emerald-500 scale-105 shadow-lg opacity-100'
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
