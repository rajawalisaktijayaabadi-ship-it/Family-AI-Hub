import { create } from 'zustand';
import {
  MemoryModel,
  AlbumModel,
  PhotoModel,
  VideoModel,
  AudioModel,
  FavoriteModel,
  FamilyTreeModel,
  VaultModel,
  AvatarModel,
  StorageModel,
  MemoryCategory,
  AvatarCategory,
  AvatarStyle,
  AvatarTheme,
} from '../types/memories';
import { MemoryRepository } from '../repositories/MemoryRepository';
import { GalleryRepository } from '../repositories/GalleryRepository';
import { VaultRepository } from '../repositories/VaultRepository';
import { AvatarRepository } from '../repositories/AvatarRepository';
import { MockMemoryAIService, AIMemoryInsightResponse } from '../services/MockMemoryAIService';
import { MockAvatarService } from '../services/MockAvatarService';
import { useToastStore } from './useToastStore';

interface MemoryState {
  memories: MemoryModel[];
  albums: AlbumModel[];
  photos: PhotoModel[];
  videos: VideoModel[];
  audios: AudioModel[];
  favorites: FavoriteModel[];
  familyTree: FamilyTreeModel[];
  vaultItems: VaultModel[];
  avatars: AvatarModel[];
  storage: StorageModel;
  aiInsight: AIMemoryInsightResponse | null;

  // Filter & Search states
  searchQuery: string;
  selectedCategory: string | 'All';
  selectedMemberId: string | 'All';
  selectedTimeframe: 'Today' | 'This Week' | 'This Month' | 'This Year' | 'All';
  isVaultUnlocked: boolean;
  isLoading: boolean;

  // Actions
  initialize: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedMemberId: (id: string) => void;
  setSelectedTimeframe: (tf: 'Today' | 'This Week' | 'This Month' | 'This Year' | 'All') => void;

  // Memory Actions
  addMemory: (memory: Omit<MemoryModel, 'id' | 'createdAt'>) => void;
  updateMemory: (id: string, updates: Partial<MemoryModel>) => void;
  deleteMemory: (id: string) => void;
  toggleFavoriteMemory: (memory: MemoryModel) => void;

  // Gallery & Album Actions
  createAlbum: (album: Omit<AlbumModel, 'id' | 'createdAt' | 'itemCount'>) => void;
  addPhoto: (photo: Omit<PhotoModel, 'id'>) => void;
  addVideo: (video: Omit<VideoModel, 'id'>) => void;
  addAudio: (audio: Omit<AudioModel, 'id' | 'createdAt'>) => void;

  // Family Tree Actions
  addFamilyMember: (member: Omit<FamilyTreeModel, 'id'>) => void;

  // Vault Actions
  unlockVault: (pin: string) => boolean;
  lockVault: () => void;
  addVaultItem: (item: Omit<VaultModel, 'id' | 'addedAt' | 'isEncrypted'>, pin: string) => void;
  deleteVaultItem: (id: string) => void;

  // Avatar Actions
  updateAvatar: (id: string, updates: Partial<AvatarModel>) => void;
  addAvatar: (avatar: Omit<AvatarModel, 'id'>) => void;
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  memories: [],
  albums: [],
  photos: [],
  videos: [],
  audios: [],
  favorites: [],
  familyTree: [],
  vaultItems: [],
  avatars: [],
  storage: {
    photoCount: 0,
    videoCount: 0,
    audioCount: 0,
    documentCount: 0,
    usedBytes: 0,
    totalBytes: 15 * 1024 * 1024 * 1024,
    photoSizeMb: 0,
    videoSizeMb: 0,
    audioSizeMb: 0,
    docSizeMb: 0,
  },
  aiInsight: null,

  searchQuery: '',
  selectedCategory: 'All',
  selectedMemberId: 'All',
  selectedTimeframe: 'All',
  isVaultUnlocked: false,
  isLoading: false,

  initialize: () => {
    set({ isLoading: true });

    const memories = MemoryRepository.getMemories();
    const familyTree = MemoryRepository.getFamilyTree();
    const favorites = MemoryRepository.getFavorites();
    const storage = MemoryRepository.getStorageOverview();

    const albums = GalleryRepository.getAlbums();
    const photos = GalleryRepository.getPhotos();
    const videos = GalleryRepository.getVideos();
    const audios = GalleryRepository.getAudios();

    const vaultItems = VaultRepository.getVaultItems();
    const avatars = AvatarRepository.getAvatars();

    const aiInsight = MockMemoryAIService.getTodaysInsight(memories);

    set({
      memories,
      albums,
      photos,
      videos,
      audios,
      favorites,
      familyTree,
      vaultItems,
      avatars,
      storage,
      aiInsight,
      isLoading: false,
    });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
  setSelectedTimeframe: (tf) => set({ selectedTimeframe: tf }),

  addMemory: (data) => {
    const newMem: MemoryModel = {
      ...data,
      id: `mem_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = MemoryRepository.addMemory(newMem);
    const storage = MemoryRepository.getStorageOverview();
    set({ memories: updated, storage });

    useToastStore.getState().addToast(`Kenangan "${data.title}" berhasil disimpan!`, 'success');
  },

  updateMemory: (id, updates) => {
    const updated = MemoryRepository.updateMemory(id, updates);
    set({ memories: updated });
    useToastStore.getState().addToast('Kenangan berhasil diperbarui', 'info');
  },

  deleteMemory: (id) => {
    const updated = MemoryRepository.deleteMemory(id);
    const storage = MemoryRepository.getStorageOverview();
    set({ memories: updated, storage });
    useToastStore.getState().addToast('Kenangan berhasil dihapus', 'info');
  },

  toggleFavoriteMemory: (memory) => {
    const favItem = {
      id: `fav_${Date.now()}`,
      targetId: memory.id,
      targetType: memory.mediaType,
      title: memory.title,
      previewUrl: memory.coverUrl || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
      addedAt: new Date().toISOString(),
    };

    const updatedFavs = MemoryRepository.toggleFavorite(favItem);
    const updatedMemories = get().memories.map((m) =>
      m.id === memory.id ? { ...m, isFavorite: !m.isFavorite } : m
    );

    set({ favorites: updatedFavs, memories: updatedMemories });
    useToastStore
      .getState()
      .addToast(
        memory.isFavorite
          ? 'Dihapus dari Favorit'
          : 'Ditambahkan ke Favorit Kenangan Keluarga',
        'success'
      );
  },

  createAlbum: (data) => {
    const newAlbum: AlbumModel = {
      ...data,
      id: `alb_${Date.now()}`,
      createdAt: new Date().toISOString(),
      itemCount: 0,
    };
    const updated = GalleryRepository.addAlbum(newAlbum);
    set({ albums: updated });
    useToastStore.getState().addToast(`Album "${data.name}" berhasil dibuat!`, 'success');
  },

  addPhoto: (data) => {
    const newPhoto: PhotoModel = {
      ...data,
      id: `pho_${Date.now()}`,
    };
    const updated = GalleryRepository.addPhoto(newPhoto);
    const storage = MemoryRepository.getStorageOverview();
    set({ photos: updated, storage });
    useToastStore.getState().addToast('Foto berhasil ditambahkan ke galeri!', 'success');
  },

  addVideo: (data) => {
    const newVideo: VideoModel = {
      ...data,
      id: `vid_${Date.now()}`,
    };
    const updated = GalleryRepository.addVideo(newVideo);
    const storage = MemoryRepository.getStorageOverview();
    set({ videos: updated, storage });
    useToastStore.getState().addToast('Video kenangan berhasil diunggah!', 'success');
  },

  addAudio: (data) => {
    const newAudio: AudioModel = {
      ...data,
      id: `aud_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = GalleryRepository.addAudio(newAudio);
    const storage = MemoryRepository.getStorageOverview();
    set({ audios: updated, storage });
    useToastStore.getState().addToast('Catatan suara berhasil direkam & disimpan!', 'success');
  },

  addFamilyMember: (data) => {
    const newMember: FamilyTreeModel = {
      ...data,
      id: `ft_${Date.now()}`,
    };
    const updated = MemoryRepository.addFamilyMember(newMember);
    set({ familyTree: updated });
    useToastStore
      .getState()
      .addToast(`Anggota keluarga "${data.name}" ditambahkan ke silsilah!`, 'success');
  },

  unlockVault: (pin) => {
    if (pin === '1234' || pin === '0000') {
      set({ isVaultUnlocked: true });
      useToastStore.getState().addToast('Digital Vault berhasil dibuka (Sandi Benar)', 'success');
      return true;
    }
    useToastStore.getState().addToast('PIN Akses Digital Vault Salah!', 'error');
    return false;
  },

  lockVault: () => {
    set({ isVaultUnlocked: false });
    useToastStore.getState().addToast('Digital Vault dikunci kembali', 'info');
  },

  addVaultItem: (data, pin) => {
    const newItem: VaultModel = {
      ...data,
      id: `vlt_${Date.now()}`,
      isEncrypted: true,
      lockedPin: pin,
      addedAt: new Date().toISOString(),
    };
    const updated = VaultRepository.addVaultItem(newItem);
    set({ vaultItems: updated });
    useToastStore
      .getState()
      .addToast(`Berkas rahasia "${data.title}" tersimpan dengan enkripsi PIN!`, 'success');
  },

  deleteVaultItem: (id) => {
    const updated = VaultRepository.deleteVaultItem(id);
    set({ vaultItems: updated });
    useToastStore.getState().addToast('Berkas Digital Vault dihapus', 'info');
  },

  updateAvatar: (id, updates) => {
    const updated = AvatarRepository.updateAvatar(id, updates);
    set({ avatars: updated });
    useToastStore.getState().addToast('Profil AI Avatar berhasil diperbarui!', 'success');
  },

  addAvatar: (data) => {
    const newAvatar: AvatarModel = {
      ...data,
      id: `av_${Date.now()}`,
    };
    const updated = AvatarRepository.addAvatar(newAvatar);
    set({ avatars: updated });
    useToastStore.getState().addToast(`AI Avatar "${data.memberName}" dibuat!`, 'success');
  },
}));
