import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Settings,
  Crown,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Edit2,
  UserPlus,
  ShieldCheck,
  Laptop,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useAuth } from '../../providers/AuthProvider';
import { EditProfileModal } from './EditProfileModal';
import { WorkspaceManagerModal } from '../family/WorkspaceManagerModal';
import { InvitationModal } from '../family/InvitationModal';

interface ProfileScreenProps {
  onGoToSettings: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onGoToSettings }) => {
  const { user, devices } = useUserStore();
  const { workspaces, activeWorkspaceId } = useWorkspaceStore();
  const { logout } = useAuth();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const activeWs = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 pt-2 px-4 space-y-5 max-w-xl mx-auto font-sans">
      {/* Cover & Avatar Header Card */}
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-md">
        {/* Cover Photo */}
        <div className="relative h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
          <img
            src={user.coverURL}
            alt="Cover"
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="absolute top-3 right-3 p-2 bg-slate-900/60 hover:bg-slate-900/80 text-white rounded-xl backdrop-blur-md transition-all shadow-md"
            title="Ubah Sampul"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Avatar & Primary Info */}
        <div className="px-5 pb-5 pt-0 relative -mt-12">
          <div className="flex items-end justify-between mb-3">
            <div className="relative">
              <img
                src={user.photoURL}
                alt={user.fullName}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl bg-slate-100 dark:bg-slate-800"
              />
              <span className="absolute bottom-1 right-1 p-1.5 bg-emerald-500 text-white rounded-full ring-2 ring-white dark:ring-slate-900 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Profil
              </button>
              <button
                onClick={onGoToSettings}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                {user.fullName}
              </h1>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/40 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                ({user.nickname})
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {user.bio}
            </p>
          </div>

          {/* Subscription Tier Badge */}
          <div className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-100 block">
                  {user.subscriptionTier}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Fitur AI Hub Unlimted & Sync Multi-Device
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full shadow-xs">
              Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setIsWorkspaceModalOpen(true)}
          className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all text-left flex items-center gap-3"
        >
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
              Ganti Workspace
            </span>
            <span className="text-[10px] text-slate-500 block truncate">
              {activeWs.name}
            </span>
          </div>
        </button>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300 transition-all text-left flex items-center gap-3"
        >
          <div className="p-2 bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-xl">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
              Undang Anggota
            </span>
            <span className="text-[10px] text-slate-500 block truncate">
              Email, Link & QR Code
            </span>
          </div>
        </button>
      </div>

      {/* Information Details Card */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
          <User className="w-4 h-4 text-indigo-600" />
          Informasi Kontak & Domisili
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-semibold">Email</span>
              <span className="font-bold text-slate-700 dark:text-slate-200 truncate block">
                {user.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-semibold">Handphone / WA</span>
              <span className="font-bold text-slate-700 dark:text-slate-200 block">
                {user.phoneNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-semibold">Tanggal Lahir & Gender</span>
              <span className="font-bold text-slate-700 dark:text-slate-200 block capitalize">
                {user.dateOfBirth} ({user.gender})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-semibold">Kota & Provinsi</span>
              <span className="font-bold text-slate-700 dark:text-slate-200 block truncate">
                {user.city}, {user.province}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl col-span-1 sm:col-span-2">
            <Globe className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block font-semibold">Alamat Rumah</span>
              <span className="font-bold text-slate-700 dark:text-slate-200 block">
                {user.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Device Preview Card */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Laptop className="w-4 h-4 text-indigo-600" />
            Perangkat Terhubung ({devices.length})
          </span>
          <button
            onClick={onGoToSettings}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            Atur
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {devices.slice(0, 2).map((dev) => (
            <div
              key={dev.id}
              className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-between text-xs border border-slate-100 dark:border-slate-800"
            >
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  {dev.deviceName}
                  {dev.isCurrentDevice && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-indigo-600 text-white rounded-full">
                      Sesi Ini
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-slate-500">
                  {dev.browser} • {dev.lastActive}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Terpercaya
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-3.5 px-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-2xl border border-rose-200 dark:border-rose-800/50 transition-colors shadow-xs flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Keluar dari Akun</span>
      </button>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
      <WorkspaceManagerModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
      />
      <InvitationModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
};
