import React, { useState } from 'react';
import { useSubscriptionStore, MultiTenantWorkspace } from '../../stores/useSubscriptionStore';
import { useToastStore } from '../../stores/useToastStore';
import {
  Building2,
  Users,
  CheckCircle2,
  Plus,
  UserPlus,
  ShieldCheck,
  QrCode,
  Copy,
  Link,
  ChevronRight,
  Share2,
} from 'lucide-react';

export const WorkspaceManagerTab: React.FC = () => {
  const { workspaces, activeWorkspaceId, switchWorkspace, createWorkspace, inviteMember } =
    useSubscriptionStore();
  const { addToast } = useToastStore();

  const [showCreateWs, setShowCreateWs] = useState(false);
  const [newWsName, setNewWsName] = useState('');
  const [newWsType, setNewWsType] = useState('Keluarga Inti');

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<MultiTenantWorkspace['role']>('Parent');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;
    createWorkspace(newWsName.trim(), newWsType);
    addToast(`Workspace "${newWsName}" berhasil dibuat & diaktifkan!`, 'success');
    setShowCreateWs(false);
    setNewWsName('');
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteMember(inviteEmail.trim(), inviteRole);
    addToast(`Undangan telah dikirim ke ${inviteEmail}`, 'success');
    setShowInviteModal(false);
    setInviteEmail('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://familyai.id/invite/join?ws=${activeWorkspaceId}&code=JOIN2026`);
    addToast('Tautan undangan workspace berhasil disalin!', 'info');
  };

  const currentWorkspace = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Active Workspace Banner */}
      <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              {currentWorkspace.icon}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-teal-200 font-extrabold block">
                Workspace Aktif Saat Ini
              </span>
              <h2 className="text-base font-extrabold text-white leading-tight">
                {currentWorkspace.name}
              </h2>
              <span className="text-[10px] text-teal-100 font-semibold">
                Tipe: {currentWorkspace.type} • Peran Anda: {currentWorkspace.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="px-3 py-2 bg-white text-emerald-800 font-extrabold rounded-2xl shadow-md hover:bg-emerald-50 transition flex items-center gap-1.5 shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Undang</span>
          </button>
        </div>

        <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-emerald-100 font-semibold">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-teal-200" />
            <span>{currentWorkspace.memberCount} Anggota Terhubung</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tenant Isolated & Encrypted</span>
          </div>
        </div>
      </div>

      {/* Workspace Switcher List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-600" />
            Multi-Tenant Family Workspaces ({workspaces.length})
          </h3>

          <button
            onClick={() => setShowCreateWs(!showCreateWs)}
            className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Workspace Baru</span>
          </button>
        </div>

        {/* Create Workspace Form */}
        {showCreateWs && (
          <form
            onSubmit={handleCreate}
            className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-2.5 animate-fadeIn"
          >
            <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200">
              Buat Tenant Workspace Keluarga Baru
            </h4>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Nama Workspace Keluarga:
              </label>
              <input
                type="text"
                placeholder="Contoh: Keluarga Besar Solo / Trajumas"
                value={newWsName}
                onChange={(e) => setNewWsName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Tipe Workspace:
              </label>
              <select
                value={newWsType}
                onChange={(e) => setNewWsType(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold"
              >
                <option value="Keluarga Inti">Keluarga Inti (Bapak, Ibu, Anak)</option>
                <option value="Keluarga Besar">Keluarga Besar (Trah / Bani)</option>
                <option value="Orang Tua">Orang Tua & Pengasuh</option>
                <option value="Custom Workspace">Custom Workspace</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowCreateWs(false)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-600 text-white font-extrabold rounded-xl hover:bg-emerald-700 transition"
              >
                Simpan & Buat
              </button>
            </div>
          </form>
        )}

        {/* Workspaces List Cards */}
        <div className="space-y-2">
          {workspaces.map((ws) => (
            <div
              key={ws.id}
              onClick={() => switchWorkspace(ws.id)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                ws.isCurrent
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-extrabold shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {ws.icon}
                </span>
                <div>
                  <h4 className="font-extrabold text-xs flex items-center gap-1.5">
                    {ws.name}
                    {ws.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black">
                        Aktif
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {ws.type} • Peran: {ws.role} • {ws.memberCount} Anggota
                  </p>
                </div>
              </div>

              {ws.isCurrent ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    switchWorkspace(ws.id);
                  }}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-[10px] hover:bg-emerald-600 hover:text-white transition"
                >
                  Pindah
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Role Permission Matrix Card */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Hak Akses Peran Workspace (Role-Based Access Control)
        </h4>
        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 dark:text-slate-400 pt-1">
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="font-extrabold text-emerald-600 block">Workspace Owner</span>
            Akses Penuh Billing, Hapus Workspace, Kelola Lisensi & Anggota.
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="font-extrabold text-teal-600 block">Admin Keluarga</span>
            Undang Anggota, Kelola Jadwal, Keuangan & Fitur AI.
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="font-extrabold text-indigo-600 block">Orang Tua / Wali</span>
            Akses Lengkap Fitur Kesehatan, Pendidikan & Asisten AI.
          </div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="font-extrabold text-purple-600 block">Anak & Guest</span>
            Akses Terbimbing Safe Mode & Edukasi Terbatas.
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-xl font-sans">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-emerald-600" />
                Undang Anggota Keluarga
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Email Anggota Keluarga:
                </label>
                <input
                  type="email"
                  placeholder="contoh: ibu.rahardjo@email.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Peran (Role):
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                >
                  <option value="Admin">Admin Keluarga (Akses Penuh Pengaturan)</option>
                  <option value="Parent">Orang Tua / Wali (Akses Lengkap)</option>
                  <option value="Child">Anak (Akses Edukasi Safe Mode)</option>
                  <option value="Guest">Tamu / Pengasuh (Akses Terbatas)</option>
                </select>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-[10px] text-emerald-800 dark:text-emerald-200 font-medium space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <Link className="w-3 h-3" /> Tautan Undangan Langsung:
                </span>
                <div className="flex items-center gap-1">
                  <code className="text-[9px] p-1 bg-white dark:bg-slate-900 rounded border truncate flex-1 font-mono">
                    https://familyai.id/invite?ws={activeWorkspaceId}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-extrabold text-xs hover:bg-emerald-700"
                >
                  Kirim Undangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
