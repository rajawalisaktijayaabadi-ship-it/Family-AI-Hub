import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Mail,
  Link,
  QrCode,
  Copy,
  Check,
  Send,
  UserPlus,
  Clock,
  Trash2,
  Share2,
} from 'lucide-react';
import { FamilyRoleType, InvitationType } from '../../types/userWorkspace';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useToastStore } from '../../stores/useToastStore';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES: FamilyRoleType[] = [
  'Admin Keluarga',
  'Orang Tua',
  'Wali',
  'Anak',
  'Tamu',
];

export const InvitationModal: React.FC<InvitationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    invitations,
    createInvitation,
    revokeInvitation,
    activeWorkspaceId,
    workspaces,
  } = useWorkspaceStore();
  const { addToast } = useToastStore();

  const [activeTab, setActiveTab] = useState<InvitationType>('email');
  const [selectedRole, setSelectedRole] = useState<FamilyRoleType>('Orang Tua');
  const [emailInput, setEmailInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const activeWs = workspaces.find((w) => w.id === activeWorkspaceId);
  const activeWsName = activeWs ? activeWs.name : 'Keluarga Inti';

  const handleSendEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    createInvitation('email', selectedRole, emailInput.trim());
    addToast(`Undangan telah dikirim ke email ${emailInput}`, 'success');
    setEmailInput('');
  };

  const generatedInviteLink = `https://familyai.hub/invite/JOIN-${activeWorkspaceId.slice(-4)}-${selectedRole.slice(0, 3).toUpperCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedInviteLink);
    createInvitation('link', selectedRole);
    setCopiedLink(true);
    addToast('Tautan undangan berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRevoke = (id: string) => {
    revokeInvitation(id);
    addToast('Undangan telah dibatalkan', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Undang Anggota Keluarga
                </h2>
                <p className="text-[11px] text-slate-500">
                  Workspace: <span className="font-semibold text-indigo-600">{activeWsName}</span>
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

          {/* Invitation Method Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 px-4 pt-2 gap-2">
            {[
              { id: 'email', label: 'Email', icon: Mail },
              { id: 'link', label: 'Tautan Link', icon: Link },
              { id: 'qr', label: 'Kode QR', icon: QrCode },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as InvitationType)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Role Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pilih Peran Anggota Baru:
              </label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      selectedRole === r
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Invitation Form */}
            {activeTab === 'email' && (
              <form onSubmit={handleSendEmailInvite} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Alamat Email Calon Anggota
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="contoh: anggota@gmail.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim Undangan Email
                </button>
              </form>
            )}

            {/* Link Invitation Form */}
            {activeTab === 'link' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Bagikan tautan berikut ke grup WhatsApp atau pesan keluarga:
                </p>
                <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="flex-1 text-xs text-slate-700 dark:text-slate-300 font-mono truncate px-2">
                    {generatedInviteLink}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0 shadow-xs"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedLink ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
              </div>
            )}

            {/* QR Code Invitation */}
            {activeTab === 'qr' && (
              <div className="flex flex-col items-center justify-center space-y-3 py-2">
                <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-200 flex flex-col items-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl flex items-center justify-center text-white font-mono text-center text-xs">
                    <div className="w-full h-full bg-white text-slate-900 p-3 rounded-lg flex flex-col items-center justify-center gap-1 border border-slate-200">
                      <QrCode className="w-20 h-20 text-indigo-600" />
                      <span className="text-[10px] font-bold text-slate-600">
                        FAMILYAI-HUB
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  Pindai dengan kamera ponsel anggota keluarga untuk bergabung instan.
                </p>
                <button
                  onClick={() => {
                    createInvitation('qr', selectedRole);
                    addToast('Kode QR dibagikan!', 'success');
                  }}
                  className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800"
                >
                  <Share2 className="w-4 h-4" />
                  Bagikan QR Code
                </button>
              </div>
            )}

            {/* Pending Invitations List */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                Undangan Aktif ({invitations.length})
              </span>

              {invitations.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Belum ada undangan aktif.</p>
              ) : (
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {invitations.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-slate-800 dark:text-slate-100 truncate">
                          {inv.inviteeEmail || inv.inviteCode}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Peran: {inv.roleName} • Tipe: {inv.type.toUpperCase()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            inv.status === 'pending'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {inv.status}
                        </span>
                        <button
                          onClick={() => handleRevoke(inv.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
