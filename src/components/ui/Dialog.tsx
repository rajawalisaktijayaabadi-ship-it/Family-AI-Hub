import React from 'react';
import { useUIStore, DialogType } from '../../stores/useUIStore';
import { CheckCircle2, AlertTriangle, XCircle, Info, Trash2, HelpCircle } from 'lucide-react';
import { Button } from './Button';

export const Dialog: React.FC = () => {
  const { dialog, closeDialog } = useUIStore();

  if (!dialog.isOpen) return null;

  const typeConfig: Record<
    DialogType,
    { icon: React.ReactNode; color: string; defaultConfirmText: string }
  > = {
    confirmation: {
      icon: <HelpCircle className="w-7 h-7 text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-950/50',
      defaultConfirmText: 'Konfirmasi',
    },
    delete: {
      icon: <Trash2 className="w-7 h-7 text-rose-500" />,
      color: 'bg-rose-50 dark:bg-rose-950/50',
      defaultConfirmText: 'Hapus',
    },
    success: {
      icon: <CheckCircle2 className="w-7 h-7 text-emerald-500" />,
      color: 'bg-emerald-50 dark:bg-emerald-950/50',
      defaultConfirmText: 'Selesai',
    },
    error: {
      icon: <XCircle className="w-7 h-7 text-rose-500" />,
      color: 'bg-rose-50 dark:bg-rose-950/50',
      defaultConfirmText: 'Tutup',
    },
    warning: {
      icon: <AlertTriangle className="w-7 h-7 text-amber-500" />,
      color: 'bg-amber-50 dark:bg-amber-950/50',
      defaultConfirmText: 'Paham',
    },
    info: {
      icon: <Info className="w-7 h-7 text-teal-500" />,
      color: 'bg-teal-50 dark:bg-teal-950/50',
      defaultConfirmText: 'Mengerti',
    },
  };

  const current = typeConfig[dialog.type];

  const handleConfirm = () => {
    if (dialog.onConfirm) dialog.onConfirm();
    closeDialog();
  };

  const handleCancel = () => {
    if (dialog.onCancel) dialog.onCancel();
    closeDialog();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm glass-card rounded-3xl p-5 space-y-4 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-scale-up">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-2xl ${current.color} shrink-0`}>{current.icon}</div>
          <div className="space-y-1 pt-0.5">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              {dialog.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {dialog.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {dialog.cancelText && (
            <Button variant="secondary" size="sm" fullWidth onClick={handleCancel}>
              {dialog.cancelText}
            </Button>
          )}
          <Button
            variant={dialog.type === 'delete' ? 'danger' : 'primary'}
            size="sm"
            fullWidth
            onClick={handleConfirm}
          >
            {dialog.confirmText || current.defaultConfirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
