import React from 'react';
import { Bell, ShieldAlert, Sparkles, Calendar, CheckCheck } from 'lucide-react';

export const NotificationScreen: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: 'Jadwal Check-up Kesehatan Ibu Besok',
      desc: 'Pengingat otomatis dari Klinik Pratama jam 09:00 WIB.',
      time: '30m lalu',
      type: 'health',
      icon: Calendar,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
      unread: true,
    },
    {
      id: 2,
      title: 'Peringatan Anggaran Belanja',
      desc: 'Pengeluaran mingguan mencapai 75% dari batas toleransi.',
      time: '2j lalu',
      type: 'finance',
      icon: ShieldAlert,
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
      unread: true,
    },
    {
      id: 3,
      title: 'Saran AI Hub Hari Ini Terbit',
      desc: 'Rekomendasi resep makan malam & aktivitas akhir pekan.',
      time: '5j lalu',
      type: 'ai',
      icon: Sparkles,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
      unread: true,
    },
    {
      id: 4,
      title: 'Budi Sampai Di Sekolah',
      desc: 'Lokasi terkonfirmasi berada di Safe Zone SMPN 1 Jakarta.',
      time: 'Kemarin',
      type: 'safety',
      icon: Bell,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
      unread: false,
    },
  ];

  return (
    <div className="px-4 py-4 space-y-4 pb-28 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Notifikasi Keluarga
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pemberitahuan, pengingat harian, dan saran otomatis
          </p>
        </div>
        <button className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline">
          <CheckCheck className="w-3.5 h-3.5" /> Tandai Dibaca
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`glass-card p-4 rounded-3xl flex items-start gap-3 transition-all ${
                n.unread ? 'border-l-4 border-l-blue-600' : 'opacity-80'
              }`}
            >
              <div className={`p-2.5 rounded-2xl border shrink-0 ${n.color}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">
                    {n.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {n.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
