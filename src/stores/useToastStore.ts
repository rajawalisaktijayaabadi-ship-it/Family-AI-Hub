import { create } from 'zustand';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (
    toastOrTitle: Omit<ToastItem, 'id'> | string,
    type?: ToastType,
    message?: string
  ) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toastOrTitle, type = 'info', message) => {
    const id = Math.random().toString(36).substring(2, 9);
    let newToast: ToastItem;

    if (typeof toastOrTitle === 'string') {
      newToast = { id, title: toastOrTitle, type, message, duration: 4000 };
    } else {
      newToast = { ...toastOrTitle, id, duration: toastOrTitle.duration || 4000 };
    }

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, newToast.duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  clearToasts: () => set({ toasts: [] }),
}));
