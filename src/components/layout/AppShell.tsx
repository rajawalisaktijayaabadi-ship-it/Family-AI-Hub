import React from 'react';
import { ToastContainer } from '../ui/ToastContainer';
import { Dialog } from '../ui/Dialog';
import { BottomSheet } from '../ui/BottomSheet';
import { Modal } from '../ui/Modal';
import { GlobalFullscreenLoader } from '../ui/Loading';
import { PWAOfflineBanner, PWAInstallBanner } from '../common/PWABanners';
import { useUIStore } from '../../stores/useUIStore';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { highContrast } = useUIStore();

  return (
    <div
      className={`min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-white ${
        highContrast ? 'contrast-125 saturate-150' : ''
      }`}
    >
      {/* PWA Offline Connection Banner */}
      <PWAOfflineBanner />

      {/* Main Container constrained to Mobile Shell width */}
      <div className="relative min-h-screen max-w-md mx-auto bg-slate-50 dark:bg-slate-950 shadow-2xl overflow-x-hidden flex flex-col">
        {/* PWA Install Promo Banner */}
        <PWAInstallBanner />

        {/* Primary Page Content */}
        {children}

        {/* Global Overlays & Portal Containers */}
        <ToastContainer />
        <Dialog />
        <BottomSheet />
        <Modal />
        <GlobalFullscreenLoader />
      </div>
    </div>
  );
};
