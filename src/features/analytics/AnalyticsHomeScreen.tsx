import React, { useEffect, useState } from 'react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import {
  BarChart3,
  Brain,
  FileText,
  Bell,
  Trophy,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { DashboardAnalyticsTab } from './DashboardAnalyticsTab';
import { AIIntelligenceCenterTab } from './AIIntelligenceCenterTab';
import { ReportCenterTab } from './ReportCenterTab';
import { NotificationCenterTab } from './NotificationCenterTab';
import { ProductivityCenterTab } from './ProductivityCenterTab';
import { SuperAdminTab } from './SuperAdminTab';

interface Props {
  onBack?: () => void;
}

export const AnalyticsHomeScreen: React.FC<Props> = ({ onBack }) => {
  const { initialize } = useAnalyticsStore();
  const [activeTab, setActiveTab] = useState<string>('analytics');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'intelligence', label: 'AI Intelligence', icon: Brain },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'notifications', label: 'Notifikasi', icon: Bell },
    { id: 'productivity', label: 'Productivity', icon: Trophy },
    { id: 'admin', label: 'Super Admin', icon: ShieldAlert },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Main Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="p-2 bg-indigo-600 text-white rounded-2xl shadow-sm">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white">
              Dashboard Analytics & Intelligence
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Analitik Terpadu, AI Intelligence, Report & Admin
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Screen Tab */}
      <div>
        {activeTab === 'analytics' && <DashboardAnalyticsTab />}
        {activeTab === 'intelligence' && <AIIntelligenceCenterTab />}
        {activeTab === 'reports' && <ReportCenterTab />}
        {activeTab === 'notifications' && <NotificationCenterTab />}
        {activeTab === 'productivity' && <ProductivityCenterTab />}
        {activeTab === 'admin' && <SuperAdminTab />}
      </div>
    </div>
  );
};
