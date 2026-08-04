import React from 'react';
import { useOffline } from '../../providers/OfflineProvider';
import { useLanguage } from '../../providers/LanguageProvider';
import { WifiOff } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline } = useOffline();
  const { t } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="bg-amber-500/90 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 backdrop-blur-md shadow-md sticky top-0 z-50 animate-pulse">
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>{t('offlineNotice')}</span>
    </div>
  );
};
