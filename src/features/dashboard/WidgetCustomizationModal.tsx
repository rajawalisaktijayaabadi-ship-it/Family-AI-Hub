import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  Palette,
} from 'lucide-react';
import { useDashboardStore } from '../../stores/useDashboardStore';
import { useToastStore } from '../../stores/useToastStore';

interface WidgetCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WidgetCustomizationModal: React.FC<WidgetCustomizationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    widgets,
    layout,
    toggleWidgetVisibility,
    toggleWidgetPin,
    moveWidgetUp,
    moveWidgetDown,
    resetWidgets,
    setDensity,
    setAccentColor,
  } = useDashboardStore();
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  const handleReset = () => {
    resetWidgets();
    addToast('Tata letak widget berhasil dikembalikan ke default!', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Kustomisasi Dashboard & Widget
                </h2>
                <p className="text-[11px] text-slate-500">
                  Atur urutan, visibilitas, mode kerapatan, dan warna aksen.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-5">
            {/* Density & Accent Selector */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <LayoutGrid className="w-4 h-4 text-indigo-500" />
                  Kerapatan Tampilan (Density Mode)
                </span>
                <div className="flex bg-slate-200 dark:bg-slate-700 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setDensity('comfortable')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      layout.density === 'comfortable'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Renggang
                  </button>
                  <button
                    onClick={() => setDensity('compact')}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      layout.density === 'compact'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    Rapat (Compact)
                  </button>
                </div>
              </div>

              {/* Accent Color */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-indigo-500" />
                  Warna Aksen Dashboard
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'indigo', bg: 'bg-indigo-600' },
                    { id: 'purple', bg: 'bg-purple-600' },
                    { id: 'emerald', bg: 'bg-emerald-600' },
                    { id: 'amber', bg: 'bg-amber-500' },
                    { id: 'rose', bg: 'bg-rose-600' },
                    { id: 'teal', bg: 'bg-teal-600' },
                  ].map((clr) => (
                    <button
                      key={clr.id}
                      onClick={() => setAccentColor(clr.id as any)}
                      className={`w-7 h-7 rounded-full ${clr.bg} flex items-center justify-center text-white transition-transform ${
                        layout.accentColor === clr.id ? 'scale-110 ring-2 ring-indigo-400' : ''
                      }`}
                    >
                      {layout.accentColor === clr.id && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Widget List Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Daftar Widget Aktif ({widgets.filter((w) => w.isVisible).length}/{widgets.length})
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Layout
                </button>
              </div>

              <div className="space-y-2">
                {widgets.map((w, index) => (
                  <div
                    key={w.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${
                      w.isVisible
                        ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <button
                        onClick={() => toggleWidgetVisibility(w.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          w.isVisible
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                        }`}
                      >
                        {w.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
                          {w.title}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {w.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveWidgetUp(w.id)}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 disabled:opacity-30"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveWidgetDown(w.id)}
                        disabled={index === widgets.length - 1}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleWidgetPin(w.id)}
                        className={`p-1.5 rounded-lg ${
                          w.isPinned
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {w.isPinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
