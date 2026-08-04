import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Users,
  Calendar,
  Phone,
  Mail,
  Shield,
  Check,
  Camera,
} from 'lucide-react';
import {
  FamilyMemberModel,
  RelationshipType,
  MemberStatus,
  FamilyRoleType,
} from '../../types/userWorkspace';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useToastStore } from '../../stores/useToastStore';

interface FamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberToEdit?: FamilyMemberModel | null;
}

const RELATIONSHIPS: RelationshipType[] = [
  'Ayah',
  'Ibu',
  'Suami',
  'Istri',
  'Anak',
  'Kakek',
  'Nenek',
  'Paman',
  'Bibi',
  'Saudara',
  'Pengasuh',
  'Lainnya',
];

const ROLES: FamilyRoleType[] = [
  'Owner',
  'Admin Keluarga',
  'Orang Tua',
  'Wali',
  'Anak',
  'Tamu',
];

export const FamilyMemberModal: React.FC<FamilyMemberModalProps> = ({
  isOpen,
  onClose,
  memberToEdit,
}) => {
  const { addMember, updateMember, activeWorkspaceId, roles } = useWorkspaceStore();
  const { addToast } = useToastStore();

  const [name, setName] = useState(memberToEdit ? memberToEdit.name : '');
  const [nickname, setNickname] = useState(memberToEdit ? memberToEdit.nickname || '' : '');
  const [relationship, setRelationship] = useState<RelationshipType>(
    memberToEdit ? memberToEdit.relationship : 'Anak'
  );
  const [gender, setGender] = useState<'pria' | 'wanita'>(
    memberToEdit?.gender || 'pria'
  );
  const [dateOfBirth, setDateOfBirth] = useState(memberToEdit?.dateOfBirth || '');
  const [phoneNumber, setPhoneNumber] = useState(memberToEdit?.phoneNumber || '');
  const [email, setEmail] = useState(memberToEdit?.email || '');
  const [status, setStatus] = useState<MemberStatus>(
    memberToEdit ? memberToEdit.status : 'Aktif'
  );
  const [roleName, setRoleName] = useState<FamilyRoleType>(
    memberToEdit ? memberToEdit.roleName : 'Anak'
  );
  const [photoURL, setPhotoURL] = useState(
    memberToEdit?.photoURL ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const matchedRole = roles.find((r) => r.name === roleName);
    const roleId = matchedRole ? matchedRole.id : 'role_anak';

    if (memberToEdit) {
      updateMember(memberToEdit.id, {
        name,
        nickname,
        relationship,
        gender,
        dateOfBirth,
        phoneNumber,
        email,
        status,
        roleId,
        roleName,
        photoURL,
      });
      addToast(`Data ${name} berhasil diperbarui!`, 'success');
    } else {
      addMember({
        workspaceId: activeWorkspaceId,
        name,
        nickname,
        relationship,
        gender,
        dateOfBirth,
        phoneNumber,
        email,
        status,
        roleId,
        roleName,
        photoURL,
      });
      addToast(`Anggota keluarga "${name}" berhasil ditambahkan!`, 'success');
    }
    onClose();
  };

  const handleRandomAvatar = () => {
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    ];
    const picked = avatarList[Math.floor(Math.random() * avatarList.length)];
    setPhotoURL(picked);
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
                <Users className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                {memberToEdit ? 'Edit Anggota Keluarga' : 'Tambah Anggota Keluarga'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            {/* Avatar Section */}
            <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <img
                src={photoURL}
                alt="Avatar"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500 shadow-xs"
              />
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Foto Profil Anggota
                </p>
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Acak Avatar Foto
                </button>
              </div>
            </div>

            {/* Nama Lengkap & Panggilan */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: Siti Aminah"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Contoh: Siti"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Hubungan Keluarga & Peran Access */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Hubungan Keluarga
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value as RelationshipType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  {RELATIONSHIPS.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-indigo-500" />
                  Peran Akses AI
                </label>
                <select
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value as FamilyRoleType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gender & Tanggal Lahir */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Jenis Kelamin
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'pria' | 'wanita')}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <option value="pria">Pria</option>
                  <option value="wanita">Wanita</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* No. HP & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-indigo-500" />
                  No. Handphone
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+62 8..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Status Anggota */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Status Keanggotaan
              </label>
              <div className="flex gap-2">
                {(['Aktif', 'Pending', 'Inaktif'] as MemberStatus[]).map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setStatus(st)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      status === st
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              {memberToEdit ? 'Simpan Perubahan' : 'Tambah Anggota Sekarang'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
