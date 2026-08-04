import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bell,
  CheckCheck,
  Trash2,
  Sparkles,
  Users,
  Calendar,
  Volume2,
  Shield,
} from 'lucide-react';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { NotificationCategory } from '../../types/dashboard';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    activeCategory,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    setActiveCategory,
  } = useNotificationStore();

  if (!isOpen) return null;

  const filteredNotifications =
    activeCategory === 'ALL'
      ? notifications
      : notifications.filter((n) => n.category === activeCategory);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const categories = [
    { id: 'ALL', label: 'Semua' },
    { id: 'system', label: 'Sistem' },
    { id: 'family', label: 'Keluarga' },
    { id: 'reminder', label: 'Pengingat' },
    { id: 'announcement', label: 'Pengumuman' },
    { id: 'ai', label: 'AI Helper' },
  ];

  const getCategoryIcon = (cat: NotificationCategory) => {
    switch (cat) {
      case 'ai':
        return Sparkles;
      case 'family':
        return Users;
      case 'reminder':
        return Calendar;
      case 'announcement':
        return Volume2;
      case 'system':
      default:
        return Shield;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400 relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                )}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Pusat Notifikasi & Remind
                </h2>
                <p className="text-[11px] text-slate-500">
                  {unreadCount} belum dibaca dari {notifications.length} notifikasi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={markAllAsRead}
                className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                title="Tandai Semua Dibaca"
              >
                <CheckCheck className="w-5 h-5" />
              </button>
              <button
                onClick={clearAll}
                className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Hapus Semua"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 px-6 py-3 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Notification Items List */}
          <div className="p-6 overflow-y-auto space-y-3 flex-1">
            {filteredNotifications.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Bell className="w-10 h-10 mx-auto stroke-1" />
                <p className="text-xs font-semibold">Tidak ada notifikasi di kategori ini</p>
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const IconComponent = getCategoryIcon(item.category);
                return (
                  <div
                    key={item.id}
                    onClick={() => markAsRead(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                      item.isRead
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 opacity-75'
                        : 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800/80 shadow-xs'
                    }`}
                  >
                    {!item.isRead && (
                      <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-indigo-600 rounded-full" />
                    )}

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0 mt-0.5">
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                          {item.message}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{item.senderName} • {item.timestamp}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(item.id);
                            }}
                            className="text-rose-500 hover:underline"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
