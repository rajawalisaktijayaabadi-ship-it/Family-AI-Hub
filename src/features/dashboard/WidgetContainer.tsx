import React from 'react';
import { motion } from 'motion/react';
import { WidgetModel } from '../../types/dashboard';
import {
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  GripVertical,
} from 'lucide-react';

interface WidgetContainerProps {
  widget: WidgetModel;
  isCustomizing: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleVisibility: () => void;
  onTogglePin: () => void;
  children: React.ReactNode;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  widget,
  isCustomizing,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  onTogglePin,
  children,
}) => {
  if (!widget.isVisible && !isCustomizing) {
    return null;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`p-4 rounded-3xl transition-all relative ${
        isCustomizing
          ? 'bg-indigo-50/70 dark:bg-slate-900 border-2 border-dashed border-indigo-400 dark:border-indigo-600 shadow-md'
          : widget.isVisible
          ? 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs'
          : 'bg-slate-100 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 opacity-60'
      }`}
    >
      {/* Customization Bar Overlay Header */}
      {isCustomizing && (
        <div className="flex items-center justify-between bg-indigo-600 text-white px-3 py-1.5 rounded-2xl mb-3 text-xs shadow-sm">
          <div className="flex items-center gap-1.5">
            <GripVertical className="w-4 h-4 cursor-grab" />
            <span className="font-bold">{widget.title}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onMoveUp}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              title="Pindah ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onMoveDown}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              title="Pindah ke bawah"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onTogglePin}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              title={widget.isPinned ? 'Lepas Sematan' : 'Sematkan Widget'}
            >
              {widget.isPinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onToggleVisibility}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              title={widget.isVisible ? 'Sembunyikan' : 'Tampilkan'}
            >
              {widget.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {children}
    </motion.div>
  );
};
