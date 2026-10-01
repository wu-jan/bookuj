import React from 'react';

interface MobileDeviceFrameProps {
  isActive: boolean;
  onExit: () => void;
  children: React.ReactNode;
}

export function MobileDeviceFrame({
  isActive,
  onExit,
  children,
}: MobileDeviceFrameProps) {
  if (!isActive) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen transition-all duration-300 bg-zinc-900 py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center">
      {/* Mobile Device Simulation Frame Header Bar */}
      <div className="mb-4 flex items-center justify-between gap-4 text-white text-xs bg-zinc-800/90 border border-zinc-700/80 px-4 py-2 rounded-full shadow-lg backdrop-blur-md max-w-sm w-full animate-in fade-in slide-from-top-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-zinc-200">Mobile Device Preview</span>
          <span className="text-[10px] text-zinc-400 font-mono">(iPhone 15 Pro, 393px)</span>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
        >
          Exit Frame ✕
        </button>
      </div>

      {/* Simulated iPhone Outer Container */}
      <div className="transition-all duration-300 w-full max-w-[400px] rounded-[48px] border-[10px] border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden bg-white relative ring-1 ring-zinc-700 min-h-[820px] max-h-[92vh] overflow-y-auto">
        {/* Simulated iPhone Status Bar & Dynamic Island */}
        <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between border-b border-zinc-100">
          <span className="text-[11px] font-bold text-zinc-800 font-mono tracking-tighter">9:41</span>
          <div className="h-4 w-24 bg-black rounded-full shadow-inner" />
          <div className="flex items-center gap-1.5 text-zinc-800">
            <span className="text-[10px] font-bold">5G</span>
            <div className="w-5 h-2.5 border border-zinc-800 rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-zinc-800 rounded-2xs" />
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
