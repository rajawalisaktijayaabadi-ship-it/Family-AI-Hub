import React, { useState } from 'react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  Bell,
  CheckCheck,
  Pin,
  Archive,
  Megaphone,
  AlertCircle,
  Shield,
  Heart,
  DollarSign,
  BookOpen,
} from 'lucide-react';

export const NotificationCenterTab: React.FC = () => {
  const {
    notifications,
    announcements,
    markNotificationAsRead,
    markAllNotificationsRead,
    togglePinNotification,
    archiveNotification,
  } = useAnalyticsStore();

  const [activeSubTab, setActiveSubTab] = useState<'notifications' | 'announcements'>('notifications');
  const [filterType, setFilterType] = useState<string>('All');

  const types = ['All', 'Health', 'Finance', 'Security', 'Education', 'System'];

  const filteredNotifications = notifications.filter(
    (n) => filterType === 'All' || n.type === filterType
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <button
          onClick={() => setActiveSubTab('notifications')}
          className={`flex-1 py-2 text-xs font-black rounded-2xl transition flex items-center justify-center gap-2 ${
            activeSubTab === 'notifications'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Smart Notifications ({unreadCount})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('announcements')}
          className={`flex-1 py-2 text-xs font-black rounded-2xl transition flex items-center justify-center gap-2 ${
            activeSubTab === 'announcements'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Pengumuman Sistem ({announcements.length})</span>
        </button>
      </div>

      {activeSubTab === 'notifications' ? (
        <div className="space-y-3">
          {/* Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-extrabold transition ${
                    filterType === t
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={markAllNotificationsRead}
              className="text-[10px] font-black text-amber-600 hover:underline flex items-center gap-1 shrink-0 ml-2"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai Semua Dibaca</span>
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-2">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-3.5 rounded-3xl border transition flex items-start justify-between gap-3 ${
                  !notif.isRead
                    ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-2xl text-white shadow-sm shrink-0 ${
                      notif.priority === 'Urgent'
                        ? 'bg-rose-600'
                        : notif.type === 'Health'
                        ? 'bg-emerald-600'
                        : notif.type === 'Security'
                        ? 'bg-cyan-600'
                        : 'bg-amber-600'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                        {notif.type}
                      </span>
                      {notif.priority === 'Urgent' && (
                        <span className="text-[9px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse">
                          URGENT
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
                    </div>

                    <h5 className="text-xs font-black text-slate-900 dark:text-white">
                      {notif.title}
                    </h5>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      {notif.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinNotification(notif.id);
                    }}
                    className={`p-1.5 rounded-xl transition ${
                      notif.isPinned
                        ? 'text-amber-600 bg-amber-100 dark:bg-amber-950'
                        : 'text-slate-400 hover:text-amber-600'
                    }`}
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveNotification(notif.id);
                    }}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Announcements Section */
        <div className="space-y-3">
          {announcements.map((anc) => (
            <div
              key={anc.id}
              className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                  {anc.category}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">{anc.publishedAt}</span>
              </div>

              <h4 className="text-xs font-black text-slate-900 dark:text-white">{anc.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {anc.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
