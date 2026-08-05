import React, { useState } from 'react';
import {
  Home,
  Bot,
  Grid,
  Calendar,
  User,
  ShieldCheck,
  Shield,
  HeartPulse,
  Baby,
  Wallet,
  GraduationCap,
  Smile,
  Brain,
  Activity,
  Bell,
  X,
  ChevronRight,
  Sparkles,
  Search,
  BarChart3,
} from 'lucide-react';
import { MainTab } from '../../types/navigation';

export interface BottomNavigationProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  notificationBadgeCount?: number;
}

interface ModuleItem {
  id: MainTab;
  label: string;
  category: 'Keamanan & Rumah' | 'Keluarga & Edukasi' | 'Kesehatan & Pikiran' | 'Keuangan & Sistem';
  desc: string;
  icon: React.ReactNode;
  badgeBg: string;
  textColor: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  notificationBadgeCount = 2,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // All 13+ modules organized cleanly
  const allModules: ModuleItem[] = [
    // Keamanan & Rumah
    {
      id: 'smart_home',
      label: 'Smart Home & IoT',
      category: 'Keamanan & Rumah',
      desc: 'Kontrol perangkat rumah pintar & energi',
      icon: <Home className="w-5 h-5 text-teal-600" />,
      badgeBg: 'bg-teal-100',
      textColor: 'text-teal-900',
    },
    {
      id: 'family_safety',
      label: 'Family Safety & SOS',
      category: 'Keamanan & Rumah',
      desc: 'GPS lokasi keluarga, safe zone & emergency',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      badgeBg: 'bg-emerald-100',
      textColor: 'text-emerald-900',
    },
    {
      id: 'protection',
      label: 'Proteksi & Brankas',
      category: 'Keamanan & Rumah',
      desc: 'Asuransi keluarga & brankas dokumen',
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      badgeBg: 'bg-blue-100',
      textColor: 'text-blue-900',
    },

    // Keluarga & Edukasi
    {
      id: 'memories',
      label: 'Family Memories & AI Gallery',
      category: 'Keluarga & Edukasi',
      desc: 'Galeri foto, video, vault, voice AI & AI avatar',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      badgeBg: 'bg-amber-100',
      textColor: 'text-amber-900',
    },
    {
      id: 'parenting',
      label: 'AI Parenting',
      category: 'Keluarga & Edukasi',
      desc: 'Panduan tumbuh kembang anak & nutrisi',
      icon: <Baby className="w-5 h-5 text-amber-600" />,
      badgeBg: 'bg-amber-100',
      textColor: 'text-amber-900',
    },
    {
      id: 'education',
      label: 'Edukasi Anak',
      category: 'Keluarga & Edukasi',
      desc: 'Rekomendasi belajar & les privat AI',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      badgeBg: 'bg-indigo-100',
      textColor: 'text-indigo-900',
    },
    {
      id: 'calendar',
      label: 'Kalender & Meal Planner',
      category: 'Keluarga & Edukasi',
      desc: 'Jadwal keluarga & rencana resep masakan',
      icon: <Calendar className="w-5 h-5 text-rose-600" />,
      badgeBg: 'bg-rose-100',
      textColor: 'text-rose-900',
    },

    // Kesehatan & Pikiran
    {
      id: 'health',
      label: 'Kesehatan Keluarga',
      category: 'Kesehatan & Pikiran',
      desc: 'Rekam medis, vaksinasi & pertolongan pertama',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      badgeBg: 'bg-rose-100',
      textColor: 'text-rose-900',
    },
    {
      id: 'mood',
      label: 'Deteksi Mood AI',
      category: 'Kesehatan & Pikiran',
      desc: 'Analisis suasana hati & emosi keluarga',
      icon: <Smile className="w-5 h-5 text-yellow-600" />,
      badgeBg: 'bg-yellow-100',
      textColor: 'text-yellow-900',
    },
    {
      id: 'psychology',
      label: 'Pusat Psikologi',
      category: 'Kesehatan & Pikiran',
      desc: 'Konsultasi kesehatan mental & harmonisasi',
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      badgeBg: 'bg-purple-100',
      textColor: 'text-purple-900',
    },

    // Keuangan & Sistem
    {
      id: 'analytics',
      label: 'Dashboard Analytics & AI Center',
      category: 'Keuangan & Sistem',
      desc: 'Skor keluarga, laporan, notifikasi & super admin',
      icon: <BarChart3 className="w-5 h-5 text-indigo-600" />,
      badgeBg: 'bg-indigo-100',
      textColor: 'text-indigo-900',
    },
    {
      id: 'finance',
      label: 'Keuangan Keluarga',
      category: 'Keuangan & Sistem',
      desc: 'Anggaran belanja, tabungan & tagihan',
      icon: <Wallet className="w-5 h-5 text-emerald-600" />,
      badgeBg: 'bg-emerald-100',
      textColor: 'text-emerald-900',
    },
    {
      id: 'activity',
      label: 'Log Aktivitas',
      category: 'Keuangan & Sistem',
      desc: 'Riwayat kegiatan & interaksi keluarga',
      icon: <Activity className="w-5 h-5 text-slate-600" />,
      badgeBg: 'bg-slate-100',
      textColor: 'text-slate-900',
    },
    {
      id: 'notification',
      label: 'Pemberitahuan',
      category: 'Keuangan & Sistem',
      desc: 'Pemberitahuan penting & peringatan sistem',
      icon: <Bell className="w-5 h-5 text-teal-600" />,
      badgeBg: 'bg-teal-100',
      textColor: 'text-teal-900',
    },
  ];

  const primaryTabs: Array<{ id: MainTab | 'menu'; label: string; icon: React.ReactNode; badge?: number }> = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-5 h-5" /> },
    { id: 'ai', label: 'AI Assistant', icon: <Bot className="w-5 h-5" /> },
    { id: 'menu', label: 'Layanan', icon: <Grid className="w-5 h-5" /> },
    { id: 'calendar', label: 'Kalender', icon: <Calendar className="w-5 h-5" /> },
    { id: 'profile', label: 'Profil', icon: <User className="w-5 h-5" /> },
  ];

  // Helper check if currently on a sub-module
  const isSubModuleActive = ![ 'home', 'ai', 'calendar', 'profile' ].includes(activeTab);
  const activeModule = allModules.find((m) => m.id === activeTab);

  const filteredModules = allModules.filter(
    (m) =>
      m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(allModules.map((m) => m.category)));

  return (
    <>
      {/* Sleek Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 pb-safe shadow-lg transition-all">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
          {primaryTabs.map((tab) => {
            const isMenuBtn = tab.id === 'menu';
            const isActive = isMenuBtn ? isSubModuleActive || isMenuOpen : activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (isMenuBtn) {
                    setIsMenuOpen(!isMenuOpen);
                  } else {
                    setIsMenuOpen(false);
                    onTabChange(tab.id as MainTab);
                  }
                }}
                className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all active-press ${
                  isMenuBtn
                    ? 'text-teal-700 dark:text-teal-400 font-bold'
                    : isActive
                    ? 'text-teal-700 dark:text-teal-400 font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
                }`}
              >
                {/* Active Pillar */}
                {isActive && !isMenuBtn && (
                  <div className="absolute top-0 w-8 h-1 rounded-b-full bg-gradient-to-r from-teal-600 to-emerald-500 shadow-sm" />
                )}

                {/* Elevated Central Menu Button */}
                {isMenuBtn ? (
                  <div className="relative -mt-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-2xl shadow-md transition-all ${
                        isMenuOpen || isSubModuleActive
                          ? 'bg-gradient-to-tr from-teal-700 to-emerald-600 text-white ring-4 ring-teal-100 dark:ring-teal-900/50 scale-105'
                          : 'bg-slate-900 dark:bg-teal-700 text-white hover:bg-teal-800'
                      }`}
                    >
                      {isMenuOpen ? <X className="w-6 h-6" /> : <Grid className="w-6 h-6" />}
                    </div>
                    {isSubModuleActive && !isMenuOpen && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500 border-2 border-white"></span>
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    {tab.icon}
                    {typeof tab.badge === 'number' && tab.badge > 0 && (
                      <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                )}

                <span className={`text-[10px] mt-1 tracking-tight leading-none ${isMenuBtn ? 'font-bold' : ''}`}>
                  {isMenuBtn && isSubModuleActive && activeModule
                    ? activeModule.label.split(' ')[0]
                    : tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Menu Layanan Drawer Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-slate-50 dark:bg-slate-900 rounded-t-3xl max-w-md w-full mx-auto max-h-[85vh] flex flex-col shadow-2xl border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-wider">FamilyAI Hub Indonesia</span>
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Layanan & Modul Keluarga</h3>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-4 pt-3 pb-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari modul (Smart Home, Safety, Health...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Batal
                  </button>
                )}
              </div>
            </div>

            {/* List of Categorized Modules */}
            <div className="p-4 overflow-y-auto space-y-5 scrollbar-thin">
              {categories.map((category) => {
                const categoryModules = filteredModules.filter((m) => m.category === category);
                if (categoryModules.length === 0) return null;

                return (
                  <div key={category} className="space-y-2">
                    <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {categoryModules.map((mod) => {
                        const isCurrent = activeTab === mod.id;
                        return (
                          <button
                            key={mod.id}
                            onClick={() => {
                              onTabChange(mod.id);
                              setIsMenuOpen(false);
                            }}
                            className={`flex items-center justify-between p-3 rounded-2xl transition border text-left active-press ${
                              isCurrent
                                ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-700 shadow-sm'
                                : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:border-teal-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2.5 rounded-xl ${mod.badgeBg} flex-shrink-0`}>
                                {mod.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                                    {mod.label}
                                  </span>
                                  {isCurrent && (
                                    <span className="bg-teal-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                                      Aktif
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                  {mod.desc}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredModules.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  Modul &quot;{searchQuery}&quot; tidak ditemukan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
