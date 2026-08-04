import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { X } from 'lucide-react';

export const BottomSheet: React.FC = () => {
  const { bottomSheet, closeBottomSheet } = useUIStore();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBottomSheet();
    };
    if (bottomSheet.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bottomSheet.isOpen, closeBottomSheet]);

  if (!bottomSheet.isOpen) return null;

  const heightClasses = {
    auto: 'max-h-[85vh]',
    half: 'h-[50vh]',
    full: 'h-[92vh]',
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop touch dismiss */}
      <div className="flex-1 w-full" onClick={closeBottomSheet} />

      {/* Bottom Sheet Drawer */}
      <div
        ref={sheetRef}
        className={`w-full max-w-lg mx-auto bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden pb-safe animate-slide-up ${
          heightClasses[bottomSheet.height || 'auto']
        }`}
      >
        {/* Drag Handle Bar */}
        <div className="pt-3 pb-2 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Header */}
        {bottomSheet.title && (
          <div className="px-5 py-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
              {bottomSheet.title}
            </h3>
            <button
              onClick={closeBottomSheet}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 no-scrollbar space-y-4">
          {bottomSheet.content}
        </div>
      </div>
    </div>
  );
};
