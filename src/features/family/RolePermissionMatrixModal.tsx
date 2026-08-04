import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Check, Lock } from 'lucide-react';
import { PermissionModel } from '../../types/userWorkspace';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useToastStore } from '../../stores/useToastStore';

interface RolePermissionMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PERMISSION_LABELS: { key: keyof PermissionModel; label: string }[] = [
  { key: 'view', label: 'Lihat Data' },
  { key: 'create', label: 'Tambah Data' },
  { key: 'update', label: 'Edit Data' },
  { key: 'delete', label: 'Hapus Data' },
  { key: 'invite', label: 'Undang Anggota' },
  { key: 'manage', label: 'Kelola Workspace' },
  { key: 'aiAccess', label: 'Akses Fitur AI' },
];

export const RolePermissionMatrixModal: React.FC<RolePermissionMatrixModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { roles, updateRolePermission } = useWorkspaceStore();
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  const handleToggle = (roleId: string, roleName: string, permKey: keyof PermissionModel, currentVal: boolean) => {
    if (roleName === 'Owner') {
      addToast('Perizinan Owner selalu lengkap dan tidak dapat diubah.', 'warning');
      return;
    }
    updateRolePermission(roleId, permKey, !currentVal);
    addToast('Hak akses matriks berhasil diperbarui!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Matriks Perizinan Peran (Permission Matrix)
                </h2>
                <p className="text-[11px] text-slate-500">
                  Atur hak akses dan wewenang modul AI untuk setiap anggota keluarga.
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

          {/* Matrix Table */}
          <div className="p-6 overflow-x-auto overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th className="p-3 font-bold text-slate-700 dark:text-slate-300">
                    Hak Akses / Peran
                  </th>
                  {roles.map((r) => (
                    <th key={r.id} className="p-3 font-bold text-slate-800 dark:text-slate-200 text-center">
                      {r.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {PERMISSION_LABELS.map((perm) => (
                  <tr key={perm.key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">
                      {perm.label}
                    </td>
                    {roles.map((r) => {
                      const isAllowed = r.permissions[perm.key];
                      const isOwner = r.name === 'Owner';

                      return (
                        <td key={r.id} className="p-3 text-center">
                          <button
                            onClick={() => handleToggle(r.id, r.name, perm.key, isAllowed)}
                            disabled={isOwner}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                              isAllowed
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold'
                                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                            } ${isOwner ? 'opacity-70 cursor-not-allowed' : 'hover:scale-110'}`}
                          >
                            {isOwner ? (
                              <Lock className="w-3.5 h-3.5" />
                            ) : isAllowed ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              '✕'
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
