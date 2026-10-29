/**
 * @component PropertyGalleryModal
 * @description Fullscreen photo gallery lightbox modal with blurred background backdrop.
 * Designed to match the modal aesthetic of PaymentModal (centered card overlay with backdrop-blur).
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TranslationDictionary } from '@/lib/translations';

interface PropertyGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  t: TranslationDictionary;
  initialIndex?: number;
}

export function PropertyGalleryModal({
  isOpen,
  onClose,
  images,
  title,
  t,
  initialIndex = 0,
}: PropertyGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const validIndex =
        images && images.length > 0 && initialIndex >= 0 && initialIndex < images.length
          ? initialIndex
          : 0;
      setActiveIndex(validIndex);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, initialIndex, images]);

  // Gallery keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe threshold of 45px
    if (diff > 45) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    } else if (diff < -45) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  if (!isOpen || !images || images.length === 0) return null;

  const totalCount = images.length;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Floating Gallery Modal Card */}
      <div
        className="relative w-full max-w-5xl rounded-3xl bg-zinc-950/95 text-white border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] backdrop-blur-xl animate-in zoom-in-95 duration-200"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-white/10 bg-zinc-900/60 shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-100 truncate">
              {title}
            </span>
            <span className="text-xs text-zinc-300 bg-white/10 px-2.5 py-1 rounded-full font-mono shrink-0">
              {t.photoOf(activeIndex + 1, totalCount)}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Main Active Image Display */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[440px] md:min-h-[500px] max-h-[66vh] w-full bg-black/40 flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={images[activeIndex]}
              alt={`${title} photo ${activeIndex + 1}`}
              fill
              priority
              className="object-contain animate-in fade-in duration-200"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex - 1 + totalCount) % totalCount)}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/90 text-white p-2.5 sm:p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % totalCount)}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/90 text-white p-2.5 sm:p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Bottom Thumbnails Strip */}
        <div className="relative z-10 flex justify-center gap-2 px-4 py-3 sm:py-4 overflow-x-auto bg-zinc-900/60 border-t border-white/10 shrink-0 no-scrollbar">
          {images.map((thumb, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'border-white scale-105 shadow-lg opacity-100'
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
    </div>
  );
}
