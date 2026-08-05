import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUserStore } from '../../stores/useUserStore';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useDashboardStore } from '../../stores/useDashboardStore';
import { useNotificationStore } from '../../stores/useNotificationStore';
import { useToastStore } from '../../stores/useToastStore';
import { useUIStore } from '../../stores/useUIStore';
import { INITIAL_DASHBOARD_CARDS } from '../../core/constants';
import { DashboardCardItem } from '../../types/dashboard';
import { CardDetailModal } from './CardDetailModal';

// Widgets
import { TodaySummaryWidget } from '../dashboard/widgets/TodaySummaryWidget';
import { QuickActionWidget } from '../dashboard/widgets/QuickActionWidget';
import { FamilyOverviewWidget } from '../dashboard/widgets/FamilyOverviewWidget';
import { WeatherWidget } from '../dashboard/widgets/WeatherWidget';
import { QuoteMotivationWidget } from '../dashboard/widgets/QuoteMotivationWidget';
import { CalendarPreviewWidget } from '../dashboard/widgets/CalendarPreviewWidget';
import { FavoriteModulesWidget } from '../dashboard/widgets/FavoriteModulesWidget';
import { RecentActivityWidget } from '../dashboard/widgets/RecentActivityWidget';
import { ChartPlaceholderWidget } from '../dashboard/widgets/ChartPlaceholderWidget';
import { AIPlaceholderWidget } from '../dashboard/widgets/AIPlaceholderWidget';

// Containers & Modals
import { WidgetContainer } from '../dashboard/WidgetContainer';
import { WidgetCustomizationModal } from '../dashboard/WidgetCustomizationModal';
import { NotificationCenterModal } from '../dashboard/NotificationCenterModal';
import { UniversalSearchModal } from '../dashboard/UniversalSearchModal';
import { FloatingAIButton } from '../dashboard/FloatingAIButton';

import {
  Search,
  SlidersHorizontal,
  Bell,
  RefreshCw,
  Home as HomeIcon,
  Smile,
  Activity,
  Wallet,
  GraduationCap,
  Utensils,
  Calendar,
  Shield,
  Image as ImageIcon,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Check,
  Building2,
} from 'lucide-react';

interface DashboardScreenProps {
  onOpenAI: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onOpenAI }) => {
  const { user } = useUserStore();
  const { workspaces, activeWorkspaceId, setActiveWorkspace } = useWorkspaceStore();
  const {
    widgets,
    favoriteModules,
    quickActions,
    isCustomizing,
    isRefreshing,
    toggleWidgetVisibility,
    toggleWidgetPin,
    moveWidgetUp,
    moveWidgetDown,
    setIsCustomizing,
    togglePinFavorite,
    refreshDashboard,
  } = useDashboardStore();
  const { notifications, setIsOpen: setIsNotifOpen } = useNotificationStore();
  const { addToast } = useToastStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<DashboardCardItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  const categories = [
    { id: 'all', label: 'Semua Widget' },
    { id: 'ringkasan', label: 'Ringkasan' },
    { id: 'pintasan', label: 'Pintasan & Modul' },
    { id: 'utama', label: 'Aktivitas Utama' },
    { id: 'analitik', label: 'Analitik & AI' },
  ];

  const getCardIcon = (iconName: string, color: string) => {
    const props = { className: 'w-5 h-5', style: { color } };
    switch (iconName) {
      case 'Smile':
        return <Smile {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'Wallet':
        return <Wallet {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'Utensils':
        return <Utensils {...props} />;
      case 'Calendar':
        return <Calendar {...props} />;
      case 'Shield':
        return <Shield {...props} />;
      case 'Home':
        return <HomeIcon {...props} />;
      case 'Image':
        return <ImageIcon {...props} />;
      case 'Sparkles':
      default:
        return <Sparkles {...props} />;
    }
  };

  const { openQuickInput } = useUIStore();

  const handleQuickAction = (actionKey: string, title: string) => {
    switch (actionKey) {
      case 'OPEN_AI_CHAT':
        onOpenAI();
        break;
      case 'OPEN_MOOD_MODAL':
        openQuickInput('mood');
        break;
      case 'ADD_SCHEDULE_MODAL':
        openQuickInput('calendar');
        break;
      case 'ADD_NOTE_MODAL':
        openQuickInput('memory');
        break;
      case 'ADD_EXPENSE_MODAL':
        openQuickInput('finance');
        break;
      case 'OPEN_EMERGENCY_MODAL':
        openQuickInput('health');
        break;
      case 'NAVIGATE_FAMILY_WORKSPACE':
        openQuickInput('member');
        break;
      default:
        openQuickInput('finance');
        break;
    }
  };

  const renderWidgetContent = (type: string) => {
    switch (type) {
      case 'today_summary':
        return (
          <TodaySummaryWidget
            onActionClick={(key) => handleQuickAction(key, 'Agenda Hari Ini')}
          />
        );
      case 'quick_actions':
        return (
          <QuickActionWidget
            quickActions={quickActions}
            onActionClick={(key, title) => handleQuickAction(key, title)}
          />
        );
      case 'family_overview':
        return (
          <FamilyOverviewWidget
            onCardClick={(m) => addToast(`Membuka ikhtisar ${m}...`, 'info')}
          />
        );
      case 'weather':
        return <WeatherWidget />;
      case 'quote_motivation':
        return <QuoteMotivationWidget />;
      case 'calendar_preview':
        return (
          <CalendarPreviewWidget
            onAddEventClick={() => handleQuickAction('ADD_SCHEDULE_MODAL', 'Tambah Jadwal')}
          />
        );
      case 'favorite_modules':
        return (
          <FavoriteModulesWidget
            modules={favoriteModules}
            onTogglePin={(id) => togglePinFavorite(id)}
            onNavigateModule={(route) => addToast(`Navigasi ke modul: ${route}`, 'info')}
          />
        );
      case 'recent_activity':
        return <RecentActivityWidget />;
      case 'chart_placeholder':
        return <ChartPlaceholderWidget />;
      case 'ai_placeholder':
        return <AIPlaceholderWidget onOpenAI={onOpenAI} />;
      default:
        return null;
    }
  };

  const userNameDisplay = user?.fullName || user?.nickname || 'Keluarga Rahardjo';

  return (
    <div className="px-4 py-4 space-y-4 pb-28 font-sans">
      {/* Header Greeting & Action Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-4 text-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 font-bold text-base shadow-sm">
              {userNameDisplay.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-indigo-200">
                  Selamat Pagi 👋
                </span>
                <button
                  onClick={() => setIsWorkspaceModalOpen(true)}
                  className="px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-[10px] font-extrabold text-white backdrop-blur-md transition-colors flex items-center gap-1 border border-white/20"
                >
                  <Building2 className="w-3 h-3 text-teal-200" />
                  {currentWorkspace?.name || 'Workspace Utama'}
                </button>
              </div>
              <h2 className="text-base font-extrabold font-heading leading-tight">
                {userNameDisplay}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md"
              title="Cari"
            >
              <Search className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => setIsNotifOpen(true)}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md relative"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4 text-white" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-indigo-700" />
              )}
            </button>

            <button
              onClick={() => setIsCustomizationModalOpen(true)}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md"
              title="Atur Widget"
            >
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Refresh & Offline Cached Bar */}
        <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-indigo-100 font-medium relative z-10">
          <span>Tersinkronisasi • Offline Capable</span>
          <button
            onClick={refreshDashboard}
            disabled={isRefreshing}
            className="flex items-center gap-1 hover:text-white font-bold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Memuat...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Category Filter Horizontal Pills */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors shrink-0 ${
            isCustomizing
              ? 'bg-amber-500 text-white border-amber-600'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
        >
          {isCustomizing ? 'Selesai Edit' : 'Edit Layout'}
        </button>
      </div>

      {/* Dynamic Widget Engine Rendering */}
      <div className="space-y-3.5">
        {widgets.map((widget) => (
          <WidgetContainer
            key={widget.id}
            widget={widget}
            isCustomizing={isCustomizing}
            onMoveUp={() => moveWidgetUp(widget.id)}
            onMoveDown={() => moveWidgetDown(widget.id)}
            onToggleVisibility={() => toggleWidgetVisibility(widget.id)}
            onTogglePin={() => toggleWidgetPin(widget.id)}
          >
            {renderWidgetContent(widget.type)}
          </WidgetContainer>
        ))}
      </div>

      {/* Interactive Activity Cards Section */}
      <div className="pt-2 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Modul Utuh Aktivitas Keluarga (10)
          </h3>
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Terintegrasi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {INITIAL_DASHBOARD_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs cursor-pointer hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2.5 rounded-2xl bg-gradient-to-tr ${card.gradient} border border-slate-200/50 dark:border-slate-700/50`}
                    >
                      {getCardIcon(card.iconName, card.accentColor)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-heading text-slate-900 dark:text-white leading-tight">
                        {card.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block line-clamp-1">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>

                  {card.badgeText && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                      style={{
                        backgroundColor: `${card.accentColor}18`,
                        color: card.accentColor,
                      }}
                    >
                      {card.badgeText}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 my-2.5 leading-relaxed">
                  {card.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  {card.metrics.map((m, i) => (
                    <div key={i} className="text-[11px]">
                      <span className="text-slate-400 font-normal">{m.label}: </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{m.value}</span>
                    </div>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating AI Action Button */}
      <FloatingAIButton
        onOpenAI={onOpenAI}
        onQuickActionSelect={(key) => handleQuickAction(key, 'AI Feature')}
      />

      {/* Modals */}
      <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />

      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(route) => addToast(`Navigasi ke ${route}...`, 'info')}
      />

      <WidgetCustomizationModal
        isOpen={isCustomizationModalOpen}
        onClose={() => setIsCustomizationModalOpen(false)}
      />

      <NotificationCenterModal
        isOpen={useNotificationStore().isOpen}
        onClose={() => useNotificationStore().setIsOpen(false)}
      />

      {/* Workspace Switcher Modal */}
      <AnimatePresence>
        {isWorkspaceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Pilih Workspace Keluarga
                </h3>
                <button
                  onClick={() => setIsWorkspaceModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      setActiveWorkspace(ws.id);
                      setIsWorkspaceModalOpen(false);
                      addToast(`Beralih ke workspace ${ws.name}`, 'success');
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                      activeWorkspaceId === ws.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-600 dark:text-indigo-300'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{ws.name}</span>
                    {activeWorkspaceId === ws.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
