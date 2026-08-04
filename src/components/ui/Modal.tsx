import React, { useEffect } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { X } from 'lucide-react';

export const Modal: React.FC = () => {
  const { modal, closeModal } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modal.isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modal.isOpen, closeModal]);

  if (!modal.isOpen) return null;

  const variant = modal.variant || 'popup';

  if (variant === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col pt-safe pb-safe animate-fade-in font-sans overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <h2 className="text-base font-bold font-heading text-slate-900 dark:text-white">
            {modal.title || 'Modal Fullscreen'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">{modal.content}</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-2xl relative space-y-3 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white">
            {modal.title}
          </h3>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-2 text-sm text-slate-700 dark:text-slate-300 max-h-[70vh] overflow-y-auto no-scrollbar">
          {modal.content}
        </div>
      </div>
    </div>
  );
};
