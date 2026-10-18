import React from 'react';
import {
  Wifi,
  Flame,
  Waves,
  Trees,
  Utensils,
  Zap,
  Laptop,
  Coffee,
  Heart,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface AmenitiesListProps {
  amenities: string[];
  locale?: 'pl' | 'en';
}

// Icon dictionary matching standardized English and Polish amenity strings
const AMENITY_ICON_MAP: Record<string, React.ReactNode> = {
  'High-Speed WiFi': <Wifi className="h-5 w-5 text-emerald-600" />,
  'Szybkie Wi-Fi': <Wifi className="h-5 w-5 text-emerald-600" />,
  'Szybki internet światłowodowy': <Wifi className="h-5 w-5 text-emerald-600" />,
  'Starlink Wi-Fi': <Wifi className="h-5 w-5 text-emerald-600" />,
  'Panoramic Sauna': <Sparkles className="h-5 w-5 text-amber-500" />,
  'Sauna fińska': <Sparkles className="h-5 w-5 text-amber-500" />,
  'Panoramiczna sauna': <Sparkles className="h-5 w-5 text-amber-500" />,
  'Private Hot Tub': <Waves className="h-5 w-5 text-sky-500" />,
  'Balia kąpielowa na drewno': <Waves className="h-5 w-5 text-sky-500" />,
  'Fire Pit & Outdoor Lounge': <Flame className="h-5 w-5 text-orange-500" />,
  'Palenisko na ognisko': <Flame className="h-5 w-5 text-orange-500" />,
  'Kominek na drewno': <Flame className="h-5 w-5 text-orange-500" />,
  'Mountain & Forest Views': <Trees className="h-5 w-5 text-emerald-700" />,
  'Widok na Tatry i las': <Trees className="h-5 w-5 text-emerald-700" />,
  'Widok na morze': <Waves className="h-5 w-5 text-sky-500" />,
  'Fully Equipped Chef Kitchen': <Utensils className="h-5 w-5 text-amber-600" />,
  'Kuchnia z pełnym wyposażeniem': <Utensils className="h-5 w-5 text-amber-600" />,
  'EV Charging Station': <Zap className="h-5 w-5 text-emerald-500" />,
  'Dedicated Workspace': <Laptop className="h-5 w-5 text-indigo-500" />,
  'Wygodne biurko do pracy': <Laptop className="h-5 w-5 text-indigo-500" />,
  'Complimentary Artisanal Breakfast': <Coffee className="h-5 w-5 text-amber-700" />,
  'Ekspres ciśnieniowy': <Coffee className="h-5 w-5 text-amber-700" />,
  'Pet Friendly': <Heart className="h-5 w-5 text-rose-500" />,
  'Zwierzęta mile widziane': <Heart className="h-5 w-5 text-rose-500" />,
};

export function AmenitiesList({ amenities, locale = 'en' }: AmenitiesListProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold tracking-tight text-zinc-900 mb-6">
        {locale === 'pl' ? 'Co oferuje to miejsce' : 'What this place offers'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((item) => {
          const icon = AMENITY_ICON_MAP[item] || <CheckCircle2 className="h-5 w-5 text-zinc-600" />;
          return (
            <div
              key={item}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-zinc-100 bg-white/60 shadow-2xs hover:bg-white transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100">
                {icon}
              </div>
              <span className="text-sm font-medium text-zinc-800">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
