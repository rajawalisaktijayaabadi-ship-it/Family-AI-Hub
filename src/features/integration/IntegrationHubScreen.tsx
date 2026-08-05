import React, { useState } from 'react';
import { AutomationBuilderTab } from './AutomationBuilderTab';
import { PushNotificationCenterTab } from './PushNotificationCenterTab';
import { MapLocationHubTab } from './MapLocationHubTab';
import { WeatherHolidayTab } from './WeatherHolidayTab';
import { ObservabilityLogsTab } from './ObservabilityLogsTab';
import {
  Zap,
  Bell,
  MapPin,
  CloudSun,
  Activity,
  ChevronLeft,
  Share2,
  Globe,
} from 'lucide-react';

interface IntegrationHubScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export type IntegrationTabType = 'automation' | 'notifications' | 'maps' | 'weather' | 'observability';

export const IntegrationHubScreen: React.FC<IntegrationHubScreenProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<IntegrationTabType>('automation');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col font-sans max-w-md mx-auto select-none overflow-hidden">
      {/* Top Header Navigation */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-xs z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            title="Tutup Integration Hub"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-extrabold font-heading text-slate-900 dark:text-white leading-tight">
                Integration Hub Indonesia
              </h2>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block">
                BMKG • Maps • FCM • AI Automasi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 relative">
        {activeTab === 'automation' && <AutomationBuilderTab />}
        {activeTab === 'notifications' && <PushNotificationCenterTab />}
        {activeTab === 'maps' && <MapLocationHubTab />}
        {activeTab === 'weather' && <WeatherHolidayTab />}
        {activeTab === 'observability' && <ObservabilityLogsTab />}
      </div>

      {/* Sub-navigation Bottom Bar */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around text-slate-500 dark:text-slate-400 font-bold shrink-0 z-30 text-[10px]">
        <button
          onClick={() => setActiveTab('automation')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'automation' ? 'text-indigo-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Automasi</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'notifications' ? 'text-indigo-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Push FCM</span>
        </button>

        <button
          onClick={() => setActiveTab('maps')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'maps' ? 'text-indigo-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Peta GPS</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'weather' ? 'text-indigo-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <CloudSun className="w-4 h-4" />
          <span>Cuaca</span>
        </button>

        <button
          onClick={() => setActiveTab('observability')}
          className={`flex flex-col items-center gap-0.5 transition ${
            activeTab === 'observability' ? 'text-indigo-600 font-extrabold' : 'hover:text-slate-700'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Audit Log</span>
        </button>
      </div>
    </div>
  );
};
