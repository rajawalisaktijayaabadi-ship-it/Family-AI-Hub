import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Search,
  Filter,
  Plus,
  UserPlus,
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import {
  FamilyMemberModel,
  RelationshipType,
  MemberStatus,
  FamilyRoleType,
} from '../../types/userWorkspace';
import { useWorkspaceStore } from '../../stores/useWorkspaceStore';
import { useToastStore } from '../../stores/useToastStore';
import { WorkspaceManagerModal } from './WorkspaceManagerModal';
import { FamilyMemberModal } from './FamilyMemberModal';
import { InvitationModal } from './InvitationModal';
import { RolePermissionMatrixModal } from './RolePermissionMatrixModal';

export const FamilyWorkspaceScreen: React.FC = () => {
  const {
    workspaces,
    activeWorkspaceId,
    familyMembers,
    deleteMember,
    searchQuery,
    setSearchQuery,
    filterRole,
    setFilterRole,
    filterStatus,
    setFilterStatus,
    filterRelationship,
    setFilterRelationship,
    resetFilters,
  } = useWorkspaceStore();
  const { addToast } = useToastStore();

  // Modals state
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMemberModel | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);

  // Active Workspace object
  const activeWs = workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];

  // Filter & Search Logic
  const filteredMembers = familyMembers.filter((m) => {
    // Filter by Active Workspace
    if (m.workspaceId !== activeWorkspaceId) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchNick = m.nickname?.toLowerCase().includes(q);
      const matchEmail = m.email?.toLowerCase().includes(q);
      if (!matchName && !matchNick && !matchEmail) return false;
    }

    // Filter Role
    if (filterRole !== 'ALL' && m.roleName !== filterRole) return false;

    // Filter Status
    if (filterStatus !== 'ALL' && m.status !== filterStatus) return false;

    // Filter Relationship
    if (filterRelationship !== 'ALL' && m.relationship !== filterRelationship) return false;

    return true;
  });

  const handleDelete = (id: string, name: string) => {
    deleteMember(id);
    addToast(`Anggota "${name}" telah dihapus`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 pt-2 px-4 space-y-5 max-w-xl mx-auto">
      {/* Active Workspace Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner">
              {activeWs.icon}
            </span>
            <div>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 rounded-full backdrop-blur-md">
                {activeWs.type}
              </span>
              <h1 className="text-lg font-extrabold mt-0.5">{activeWs.name}</h1>
            </div>
          </div>
          <button
            onClick={() => setIsWorkspaceModalOpen(true)}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-xs rounded-xl backdrop-blur-md transition-all flex items-center gap-1 shrink-0"
          >
            <Building2 className="w-3.5 h-3.5" />
            Ganti WS
          </button>
        </div>

        <p className="text-xs text-indigo-100 leading-relaxed mb-4 relative z-10">
          {activeWs.description || 'Workspace keluarga terintegrasi untuk pendampingan AI harian.'}
        </p>

        {/* Action Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/20 relative z-10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setEditingMember(null);
              setIsMemberModalOpen(true);
            }}
            className="flex-1 py-2 px-3 bg-white text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Tambah Anggota
          </button>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex-1 py-2 px-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl backdrop-blur-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            Undang
          </button>
          <button
            onClick={() => setIsMatrixModalOpen(true)}
            className="py-2 px-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl backdrop-blur-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4" />
            Matriks
          </button>
        </div>
      </motion.div>

      {/* Universal Search & Filter Section */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari anggota berdasarkan nama, panggilan, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3 h-3 text-indigo-500" />
              Filter Cepat
            </span>
            {(filterRole !== 'ALL' || filterStatus !== 'ALL' || filterRelationship !== 'ALL') && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filter
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* Filter Role Selector */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as FamilyRoleType | 'ALL')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 font-semibold focus:outline-hidden"
            >
              <option value="ALL">Semua Peran</option>
              <option value="Owner">Owner</option>
              <option value="Admin Keluarga">Admin Keluarga</option>
              <option value="Orang Tua">Orang Tua</option>
              <option value="Wali">Wali</option>
              <option value="Anak">Anak</option>
              <option value="Tamu">Tamu</option>
            </select>

            {/* Filter Relationship Selector */}
            <select
              value={filterRelationship}
              onChange={(e) => setFilterRelationship(e.target.value as RelationshipType | 'ALL')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 font-semibold focus:outline-hidden"
            >
              <option value="ALL">Semua Hubungan</option>
              <option value="Ayah">Ayah</option>
              <option value="Ibu">Ibu</option>
              <option value="Suami">Suami</option>
              <option value="Istri">Istri</option>
              <option value="Anak">Anak</option>
              <option value="Kakek">Kakek</option>
              <option value="Nenek">Nenek</option>
              <option value="Paman">Paman</option>
              <option value="Bibi">Bibi</option>
              <option value="Saudara">Saudara</option>
              <option value="Pengasuh">Pengasuh</option>
            </select>

            {/* Filter Status Selector */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as MemberStatus | 'ALL')}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 font-semibold focus:outline-hidden"
            >
              <option value="ALL">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Pending">Pending</option>
              <option value="Inaktif">Inaktif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Family Member Cards List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" />
            Anggota Terdaftar ({filteredMembers.length})
          </h2>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Tidak ada anggota yang cocok.
            </p>
            <p className="text-xs text-slate-500">
              Coba ubah kata kunci pencarian atau reset filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={
                        member.photoURL ||
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'
                      }
                      alt={member.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500 shadow-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                          {member.name}
                        </h3>
                        {member.nickname && (
                          <span className="text-xs text-slate-400">({member.nickname})</span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-800">
                          {member.relationship}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-800">
                          {member.roleName}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                            member.status === 'Aktif'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingMember(member);
                        setIsMemberModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Additional Info details */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  {member.phoneNumber && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-indigo-500" />
                      {member.phoneNumber}
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-indigo-500" />
                      {member.email}
                    </div>
                  )}
                  {member.dateOfBirth && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-500" />
                      {member.dateOfBirth}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <WorkspaceManagerModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
      />
      <FamilyMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => {
          setIsMemberModalOpen(false);
          setEditingMember(null);
        }}
        memberToEdit={editingMember}
      />
      <InvitationModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      <RolePermissionMatrixModal
        isOpen={isMatrixModalOpen}
        onClose={() => setIsMatrixModalOpen(false)}
      />
    </div>
  );
};
