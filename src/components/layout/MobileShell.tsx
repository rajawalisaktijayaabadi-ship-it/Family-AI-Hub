import React, { useEffect, useState } from 'react';
import { isMobileOrTabletDevice } from '../../utils/device';
import { DesktopShield } from './DesktopShield';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileShellProps {
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [simulatorMode, setSimulatorMode] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(390);

  useEffect(() => {
    const checkDevice = () => {
      const mobileStatus = isMobileOrTabletDevice();
      setIsMobile(mobileStatus);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isMobile && !simulatorMode) {
    return <DesktopShield onSimulateMobile={() => setSimulatorMode(true)} />;
  }

  // Desktop Simulator View
  if (!isMobile && simulatorMode) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        {/* Top Control Bar */}
        <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-slate-200">Simulator FamilyAI Mobile</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
            {[360, 375, 390, 414, 430, 480, 600, 768].map((width) => (
              <button
                key={width}
                onClick={() => setViewportWidth(width)}
                className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                  viewportWidth === width
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {width}px
              </button>
            ))}
          </div>

          <button
            onClick={() => setSimulatorMode(false)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
          >
            <Monitor className="w-3.5 h-3.5" /> Tutup Simulator
          </button>
        </div>

        {/* Mobile Device Frame */}
        <div
          className="bg-slate-900 rounded-[48px] p-4 shadow-2xl border-4 border-slate-800 transition-all duration-300 relative overflow-hidden"
          style={{ width: `${viewportWidth}px`, height: '844px' }}
        >
          {/* Top Notch / Dynamic Island */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-50 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-800 rounded-full mr-2" />
            <div className="w-1.5 h-1.5 bg-blue-500/60 rounded-full" />
          </div>

          {/* Device Screen Content */}
          <div className="w-full h-full bg-slate-50 dark:bg-slate-950 rounded-[36px] overflow-hidden relative flex flex-col">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Real Mobile Viewport
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative overflow-x-hidden">
      {children}
    </div>
  );
};
