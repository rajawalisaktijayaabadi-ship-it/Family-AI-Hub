import React from 'react';
import { useIntegrationStore } from '../../stores/useIntegrationStore';
import {
  Bell,
  CheckCheck,
  Trash2,
  ShieldAlert,
  Brain,
  Heart,
  DollarSign,
  GraduationCap,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { NotificationCategory } from '../../types/integration';

export const PushNotificationCenterTab: React.FC = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useIntegrationStore();

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'family':
        return <Bell className="w-3.5 h-3.5 text-blue-500" />;
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-500" />;
      case 'health':
        return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      case 'finance':
        return <DollarSign className="w-3.5 h-3.5 text-emerald-500" />;
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5 text-purple-500" />;
      case 'calendar':
        return <Calendar className="w-3.5 h-3.5 text-amber-500" />;
      case 'emergency':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Push Banner */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Push Notification Center (FCM)
              </h3>
              <p className="text-[10px] text-slate-500">
                Pemberitahuan real-time keluarga, cuaca, AI pengingat & darurat
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 bg-rose-500 text-white font-extrabold text-[10px] rounded-full">
              {unreadCount} Baru
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-800/80 text-[10px]">
          <span className="text-slate-500 font-bold">Total Riwayat: {notifications.length} Notifikasi</span>
          <button
            onClick={clearAllNotifications}
            className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Hapus Semua
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-2">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-slate-500 font-bold">Tidak ada notifikasi baru.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                notif.isRead
                  ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-80'
                  : 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/50 shadow-xs'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getCategoryIcon(notif.category)}
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                    {notif.title}
                  </h4>
                </div>

                <span className="text-[9px] text-slate-400 font-mono">
                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug pl-7">
                {notif.body}
              </p>

              {!notif.isRead && (
                <div className="pl-7 pt-1 flex justify-end">
                  <span className="text-[9px] text-indigo-600 font-extrabold flex items-center gap-1">
                    <CheckCheck className="w-3 h-3" /> Tandai Dibaca
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
