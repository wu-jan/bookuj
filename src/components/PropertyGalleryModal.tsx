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
      setActiveIndex(initialIndex);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, initialIndex]);

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

  if (!isOpen) return null;

  const totalCount = images.length;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar with Counter and Close Button */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-black/80 to-transparent shrink-0">
        <div className="flex items-center gap-3 min-w-0 pr-4">
          <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-200 truncate">
            {title}
          </span>
          <span className="text-xs text-zinc-400 bg-white/10 px-2.5 py-1 rounded-full font-mono shrink-0">
            {t.photoOf(activeIndex + 1, totalCount)}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
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
            src={images[activeIndex]}
            alt={`${title} photo ${activeIndex + 1}`}
            fill
            priority
            className="object-contain animate-in fade-in zoom-in-95 duration-200"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        {/* Prev Button */}
        <button
          type="button"
          onClick={() => setActiveIndex((activeIndex - 1 + totalCount) % totalCount)}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/90 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => setActiveIndex((activeIndex + 1) % totalCount)}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/90 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Bottom Thumbnails Strip */}
      <div className="relative z-10 flex justify-center gap-2 px-4 py-3 sm:py-5 overflow-x-auto bg-gradient-to-t from-black/80 to-transparent shrink-0 no-scrollbar">
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
  );
}
