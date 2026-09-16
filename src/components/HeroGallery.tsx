import React from 'react';
import Image from 'next/image';

interface HeroGalleryProps {
  images: string[];
  title: string;
}

export function HeroGallery({ images, title }: HeroGalleryProps) {
  const primaryImage = images[0] || 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=80';
  const secondaryImages = images.slice(1, 4);

  return (
    <div className="w-full">
      {/* Mobile Swipeable / Scrollable Row */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none px-4 -mx-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative h-72 w-80 shrink-0 snap-center overflow-hidden rounded-2xl bg-zinc-100"
          >
            <Image
              src={img}
              alt={`${title} - Photo ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="(max-width: 768px) 320px, 100vw"
            />
          </div>
        ))}
      </div>

      {/* Desktop Grid Layout (1 large hero image + 2-3 side images) */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-3 h-[480px] rounded-3xl overflow-hidden shadow-xs">
        {/* Main large image */}
        <div className="relative col-span-2 row-span-2 overflow-hidden bg-zinc-100 group">
          <Image
            src={primaryImage}
            alt={`${title} - Main photo`}
            fill
            priority
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Supporting gallery images */}
        {secondaryImages.map((img, idx) => {
          // If there are only 2 secondary images, make the second one span 2 rows
          const isWide = secondaryImages.length === 2 && idx === 1;
          const colSpanClass = secondaryImages.length === 3 && idx === 0 ? 'col-span-2' : 'col-span-1';

          return (
            <div
              key={idx}
              className={`relative overflow-hidden bg-zinc-100 group ${colSpanClass} ${isWide ? 'row-span-2 col-span-2' : ''}`}
            >
              <Image
                src={img}
                alt={`${title} - Gallery photo ${idx + 2}`}
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-500"
                sizes="(min-width: 768px) 25vw, 100vw"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
