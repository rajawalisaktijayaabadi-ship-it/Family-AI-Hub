import React, { useEffect, useState } from 'react';
import { useMemoryStore } from '../../stores/useMemoryStore';
import {
  Sparkles,
  Camera,
  Film,
  FolderHeart,
  Calendar,
  GitFork,
  Map,
  Shield,
  Mic,
  UserCheck,
  HardDrive,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { MemoriesOverviewTab } from './MemoriesOverviewTab';
import { PhotoGalleryTab } from './PhotoGalleryTab';
import { VideoGalleryTab } from './VideoGalleryTab';
import { FamilyAlbumTab } from './FamilyAlbumTab';
import { MemoryTimelineTab } from './MemoryTimelineTab';
import { FamilyTreeTab } from './FamilyTreeTab';
import { MemoryMapTab } from './MemoryMapTab';
import { DigitalVaultTab } from './DigitalVaultTab';
import { VoiceAITab } from './VoiceAITab';
import { AIAvatarTab } from './AIAvatarTab';
import { StorageAnalyticsTab } from './StorageAnalyticsTab';
import { AddMemoryModal } from './AddMemoryModal';

interface Props {
  onBack?: () => void;
}

export const MemoriesHomeScreen: React.FC<Props> = ({ onBack }) => {
  const { initialize } = useMemoryStore();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const navItems = [
    { id: 'overview', label: 'Ringkasan', icon: Sparkles },
    { id: 'photos', label: 'Galeri Foto', icon: Camera },
    { id: 'videos', label: 'Video', icon: Film },
    { id: 'albums', label: 'Album', icon: FolderHeart },
    { id: 'timeline', label: 'Garis Waktu', icon: Calendar },
    { id: 'tree', label: 'Silsilah', icon: GitFork },
    { id: 'map', label: 'Peta Kenangan', icon: Map },
    { id: 'vault', label: 'Digital Vault', icon: Shield },
    { id: 'voice', label: 'Voice AI', icon: Mic },
    { id: 'avatar', label: 'AI Avatar', icon: UserCheck },
    { id: 'storage', label: 'Storage', icon: HardDrive },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Module Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="p-2 bg-amber-500 text-white rounded-2xl shadow-sm">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white">
              Family Memories & AI Gallery
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Kenangan, Digital Vault, Voice AI & AI Avatar
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddMemoryOpen(true)}
          className="p-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl shadow-sm active:scale-95 transition flex items-center justify-center"
          title="Tambah Kenangan"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Active Tab Screen */}
      <div>
        {activeTab === 'overview' && (
          <MemoriesOverviewTab
            onOpenAddMemory={() => setIsAddMemoryOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'photos' && <PhotoGalleryTab />}
        {activeTab === 'videos' && <VideoGalleryTab />}
        {activeTab === 'albums' && <FamilyAlbumTab />}
        {activeTab === 'timeline' && <MemoryTimelineTab />}
        {activeTab === 'tree' && <FamilyTreeTab />}
        {activeTab === 'map' && <MemoryMapTab />}
        {activeTab === 'vault' && <DigitalVaultTab />}
        {activeTab === 'voice' && <VoiceAITab />}
        {activeTab === 'avatar' && <AIAvatarTab />}
        {activeTab === 'storage' && <StorageAnalyticsTab />}
      </div>

      {/* Add Memory Modal */}
      <AddMemoryModal isOpen={isAddMemoryOpen} onClose={() => setIsAddMemoryOpen(false)} />
    </div>
  );
};
