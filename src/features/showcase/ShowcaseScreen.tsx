import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { IconButton } from '../../components/ui/IconButton';
import {
  Input,
  PasswordInput,
  SearchInput,
  CurrencyInput,
  PhoneInput,
  DateInput,
  TimeInput,
  OTPInput,
  TextArea,
} from '../../components/ui/Input';
import {
  Card,
  GlassCard,
  SummaryCard,
  AnalyticsCard,
  ProfileCard,
  AICard,
  PremiumCard,
} from '../../components/ui/Card';
import { Chip } from '../../components/ui/Chip';
import { Badge } from '../../components/ui/Badge';
import { Skeleton, CircularProgress, LinearProgress } from '../../components/ui/Loading';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { UniversalSearch, FilterPanel } from '../../components/ui/UniversalSearch';
import { PullToRefresh, SwipeCard } from '../../components/mobile/PullToRefresh';
import { SlideIn, FadeIn, BounceIn } from '../../components/animation/Animations';
import { useUIStore } from '../../stores/useUIStore';
import { useToastStore } from '../../stores/useToastStore';
import {
  ArrowLeft,
  Sparkles,
  SlidersHorizontal,
  Bell,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Smartphone,
  Eye,
} from 'lucide-react';

export interface ShowcaseScreenProps {
  onBack: () => void;
}

export const ShowcaseScreen: React.FC<ShowcaseScreenProps> = ({ onBack }) => {
  const { addToast } = useToastStore();
  const {
    openDialog,
    openBottomSheet,
    closeBottomSheet,
    openModal,
    closeModal,
    setGlobalLoading,
    highContrast,
    toggleHighContrast,
  } = useUIStore();

  const [otpVal, setOtpVal] = useState('123');
  const [selectedCategory, setSelectedCategory] = useState('Keuangan');
  const [activeTab, setActiveTab] = useState<
    'buttons' | 'inputs' | 'cards' | 'dialogs' | 'loaders' | 'states'
  >('buttons');

  // Trigger Toasts
  const handleToast = (type: 'success' | 'warning' | 'error' | 'info') => {
    addToast({
      type,
      title: `Toast Alert ${type.toUpperCase()}`,
      message: 'Komponen toast berhasil dipicu dan akan otomatis hilang.',
    });
  };

  // Trigger Bottom Sheet
  const handleOpenBottomSheetDemo = () => {
    openBottomSheet({
      title: 'Filter & Urutkan Data',
      content: (
        <FilterPanel
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onReset={() => setSelectedCategory('Semua')}
        />
      ),
    });
  };

  // Trigger Modal
  const handleOpenModalDemo = (variant: 'popup' | 'fullscreen') => {
    openModal({
      variant,
      title: `Modal Layout ${variant === 'fullscreen' ? 'Layar Penuh' : 'Pop-up'}`,
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Ini adalah contoh modal reusable yang mendukung layout fullscreen maupun pop-up
            responsif untuk seluruh perangkat mobile.
          </p>
          <div className="p-3 bg-teal-500/10 rounded-2xl border border-teal-500/30 text-xs text-teal-700 dark:text-teal-300 font-semibold">
            ✨ Mendukung animasi smooth, ESC key dismiss, dan safe area padding.
          </div>
          <Button fullWidth onClick={closeModal} variant="primary" size="sm">
            Tutup Modal
          </Button>
        </div>
      ),
    });
  };

  // Trigger Loading Overlay
  const handleGlobalLoadingDemo = () => {
    setGlobalLoading(true, 'Menyiapkan Design System Enterprise...');
    setTimeout(() => {
      setGlobalLoading(false);
      addToast({
        type: 'success',
        title: 'Proses Selesai',
        message: 'Global loading overlay berhasil diproses.',
      });
    }, 2000);
  };

  return (
    <PullToRefresh onRefresh={async () => new Promise((res) => setTimeout(res, 1000))}>
      <div className="px-4 py-4 space-y-5 pb-32 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <IconButton
              icon={<ArrowLeft className="w-5 h-5" />}
              size="sm"
              variant="secondary"
              onClick={onBack}
              ariaLabel="Kembali"
            />
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-5 h-5 text-blue-600 dark:text-teal-400" />
                <span>Enterprise Design System</span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pustaka Komponen Reusable & Mobile UI Framework
              </p>
            </div>
          </div>

          <button
            onClick={toggleHighContrast}
            className={`p-2 rounded-2xl text-xs font-bold border transition ${
              highContrast
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {highContrast ? 'Contrast ON' : 'Contrast OFF'}
          </button>
        </div>

        {/* Universal Search Bar */}
        <UniversalSearch
          onFilterClick={handleOpenBottomSheetDemo}
          activeFilterCount={selectedCategory !== 'Semua' ? 1 : 0}
        />

        {/* Showcase Sub-Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'buttons', label: 'Tombol & Badge' },
            { id: 'inputs', label: 'Form & Input' },
            { id: 'cards', label: 'Kartu & Glass' },
            { id: 'dialogs', label: 'Dialog & Sheet' },
            { id: 'loaders', label: 'Loading & Shimmer' },
            { id: 'states', label: 'Empty & Error' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition active-press ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BUTTONS & BADGES */}
        {activeTab === 'buttons' && (
          <SlideIn className="space-y-4">
            <GlassCard className="space-y-3">
              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Varian Tombol (Button Library)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="gradient" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                  Gradient
                </Button>
              </div>
              <Button variant="gradient" fullWidth isLoading>
                Memuat Data
              </Button>
            </GlassCard>

            <GlassCard className="space-y-3">
              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Badge & Chip Library
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge type="notification" count={5} />
                <Badge type="premium" label="PRO PLAN" />
                <Badge type="ai" label="Gemini AI" />
                <Badge type="online" label="Terhubung" />
                <Badge type="offline" label="Mode Luring" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Chip label="Status Aktif" variant="status" statusType="success" />
                <Chip label="Filter Kategori" variant="filter" selected />
                <Chip label="Pilihan Safe Zone" variant="selection" selected />
              </div>
            </GlassCard>
          </SlideIn>
        )}

        {/* TAB 2: INPUTS & FORMS */}
        {activeTab === 'inputs' && (
          <SlideIn className="space-y-4">
            <GlassCard className="space-y-3">
              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Form Inputs & Accessibility
              </h3>
              <Input label="Nama Lengkap" placeholder="Masukkan nama Anda" />
              <PasswordInput label="Kata Sandi Security" placeholder="••••••••" />
              <PhoneInput label="Nomor WhatsApp" />
              <CurrencyInput label="Anggaran Keuangan Dapur" placeholder="0" />
              <div className="grid grid-cols-2 gap-2">
                <DateInput label="Tanggal Agenda" />
                <TimeInput label="Waktu Pengingat" />
              </div>
              <OTPInput label="Kode OTP Verifikasi (6-Digit)" value={otpVal} onChange={setOtpVal} />
              <TextArea label="Catatan Tambahan Keluarga" placeholder="Tuliskan catatan harian..." />
            </GlassCard>
          </SlideIn>
        )}

        {/* TAB 3: CARDS & GLASS UI */}
        {activeTab === 'cards' && (
          <SlideIn className="space-y-4">
            <SummaryCard
              title="Total Tabungan Keluarga"
              value="Rp 12.500.000"
              subtitle="Tersimpan di dompet digital terverifikasi"
              icon={<Heart className="w-5 h-5" />}
              trend={{ value: '+14.2%', isPositive: true }}
              badgeText="Aman"
            />
            <AnalyticsCard
              title="Nutrisi Anak Minggu Ini"
              metric="88%"
              description="Target konsumsi protein & buah-buahan terpenuhi"
              progressPercentage={88}
              color="teal"
            />
            <ProfileCard
              name="Budi Santoso"
              role="Kepala Keluarga"
              familyRole="Administrator"
            />
            <AICard
              title="Rekomendasi Menu Makan Malam"
              description="Ayam Bakar Kecap & Capcay Sayur Segar (Estimasi 30 menit)"
              onAction={() => handleToast('info')}
            />
            <PremiumCard />
          </SlideIn>
        )}

        {/* TAB 4: DIALOGS, BOTTOM SHEET & MODALS */}
        {activeTab === 'dialogs' && (
          <SlideIn className="space-y-4">
            <GlassCard className="space-y-3">
              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Picu Toast Notification
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" onClick={() => handleToast('success')}>
                  Toast Sukses
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleToast('warning')}>
                  Toast Peringatan
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleToast('error')}>
                  Toast Error
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleToast('info')}>
                  Toast Informasi
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="space-y-3">
              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Picu Modal & Dialog System
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openDialog({
                      type: 'confirmation',
                      title: 'Konfirmasi Tindakan',
                      description: 'Apakah Anda yakin ingin menyimpan perubahan pada profil keluarga?',
                      cancelText: 'Batal',
                    })
                  }
                >
                  Dialog Konfirmasi
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    openDialog({
                      type: 'delete',
                      title: 'Hapus Agenda',
                      description: 'Agenda ini akan dihapus secara permanen dari kalender keluarga.',
                      cancelText: 'Batal',
                    })
                  }
                >
                  Dialog Hapus
                </Button>
                <Button variant="secondary" size="sm" onClick={handleOpenBottomSheetDemo}>
                  Bottom Sheet Filter
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleOpenModalDemo('popup')}>
                  Pop-up Modal
                </Button>
              </div>
            </GlassCard>
          </SlideIn>
        )}

        {/* TAB 5: LOADERS & SKELETONS */}
        {activeTab === 'loaders' && (
          <SlideIn className="space-y-4">
            <GlassCard className="space-y-3">
              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Skeleton & Shimmer Loading
              </h3>
              <div className="space-y-2">
                <Skeleton height="h-6" width="w-3/4" />
                <Skeleton height="h-4" width="w-full" />
                <Skeleton height="h-4" width="w-5/6" />
                <Skeleton height="h-12" width="w-full" rounded="rounded-2xl" />
              </div>

              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider pt-3">
                Progress & Loading Fullscreen
              </h3>
              <LinearProgress progress={65} />
              <div className="flex items-center gap-3 pt-2">
                <CircularProgress size="md" />
                <Button variant="gradient" size="sm" onClick={handleGlobalLoadingDemo}>
                  Uji Fullscreen Loader
                </Button>
              </div>
            </GlassCard>
          </SlideIn>
        )}

        {/* TAB 6: EMPTY STATES, ERRORS & GESTURES */}
        {activeTab === 'states' && (
          <SlideIn className="space-y-4">
            <EmptyState
              type="noData"
              title="Belum Ada Catatan Keuangan"
              description="Tambahkan transaksi pertama Anda untuk mulai memantau arus kas keluarga."
            />

            <ErrorState
              type="offline"
              title="Akses Luring Khas PWA"
              description="Aplikasi menggunakan cache offline otomatis saat koneksi terputus."
              onRetry={() => handleToast('info')}
            />

            <div className="space-y-2">
              <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white uppercase tracking-wider">
                Gesture Support (Swipe Card Demo)
              </h3>
              <SwipeCard onSwipeLeft={() => handleToast('error')} onSwipeRight={() => handleToast('success')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Kartu Geser Interaktif (Swipe Card)
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Geser ke kiri untuk hapus, geser ke kanan untuk arsip
                    </p>
                  </div>
                  <Smartphone className="w-5 h-5 text-blue-500" />
                </div>
              </SwipeCard>
            </div>
          </SlideIn>
        )}
      </div>
    </PullToRefresh>
  );
};
