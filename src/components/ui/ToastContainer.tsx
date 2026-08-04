import React from 'react';
import { useToastStore, ToastItem as ToastItemType } from '../../stores/useToastStore';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastItem: React.FC<{ toast: ToastItemType }> = ({ toast }) => {
  const { removeToast } = useToastStore();

  const config = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-50 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-100',
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
      border: 'border-amber-500/30',
      bg: 'bg-amber-50 dark:bg-amber-950/90 text-amber-950 dark:text-amber-100',
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
      border: 'border-rose-500/30',
      bg: 'bg-rose-50 dark:bg-rose-950/90 text-rose-950 dark:text-rose-100',
    },
    info: {
      icon: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
      border: 'border-blue-500/30',
      bg: 'bg-blue-50 dark:bg-blue-950/90 text-blue-950 dark:text-blue-100',
    },
  }[toast.type];

  return (
    <div
      className={`w-full max-w-sm rounded-2xl p-3.5 shadow-xl border flex items-start gap-3 transition-all animate-slide-up ${config.bg} ${config.border}`}
    >
      {config.icon}
      <div className="flex-1 space-y-0.5">
        <h5 className="text-xs font-bold font-heading">{toast.title}</h5>
        {toast.message && <p className="text-[11px] opacity-90 leading-normal">{toast.message}</p>}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="p-1 rounded-full opacity-60 hover:opacity-100 transition"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 space-y-2 pointer-events-auto">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
