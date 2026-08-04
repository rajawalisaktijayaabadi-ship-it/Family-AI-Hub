import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Shield,
  Trash2,
  LogOut,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { DeviceType } from '../../types/userWorkspace';
import { useUserStore } from '../../stores/useUserStore';
import { useToastStore } from '../../stores/useToastStore';

interface DeviceManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getDeviceIcon = (type: DeviceType) => {
  switch (type) {
    case 'Android':
    case 'iPhone':
    case 'Foldable':
      return Smartphone;
    case 'Tablet':
      return Tablet;
    case 'Desktop':
      return Laptop;
    default:
      return Monitor;
  }
};

export const DeviceManagementModal: React.FC<DeviceManagementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { devices, revokeDevice, logoutOtherDevices } = useUserStore();
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  const handleRevoke = (id: string, name: string) => {
    revokeDevice(id);
    addToast(`Perangkat ${name} berhasil dikeluarkan`, 'info');
  };

  const handleLogoutAllOthers = () => {
    logoutOtherDevices();
    addToast('Semua perangkat lain berhasil dikeluarkan secara aman!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Manajemen Perangkat Terhubung
                </h2>
                <p className="text-[11px] text-slate-500">
                  Pantau & atur seluruh sesi perangkat aktif akun keluarga Anda.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                Jika Anda melihat perangkat yang tidak dikenal, segera keluarkan perangkat tersebut dan ubah kata sandi akun Anda.
              </p>
            </div>

            <div className="space-y-3">
              {devices.map((dev) => {
                const IconComponent = getDeviceIcon(dev.deviceType);

                return (
                  <div
                    key={dev.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      dev.isCurrentDevice
                        ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                              {dev.deviceName}
                            </h3>
                            {dev.isCurrentDevice && (
                              <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-600 text-white rounded-full">
                                Sesi Ini
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {dev.browser} • {dev.ipAddress}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Lokasi: {dev.location} • {dev.lastActive}
                          </p>
                        </div>
                      </div>

                      {!dev.isCurrentDevice && (
                        <button
                          onClick={() => handleRevoke(dev.id, dev.deviceName)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                          title="Keluarkan Sesi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {devices.length > 1 && (
              <button
                onClick={handleLogoutAllOthers}
                className="w-full mt-2 py-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-xl border border-rose-200 dark:border-rose-800/50 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Keluarkan Semua Perangkat Lain
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
