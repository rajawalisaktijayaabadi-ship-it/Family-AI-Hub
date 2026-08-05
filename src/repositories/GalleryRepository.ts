import { AlbumModel, PhotoModel, VideoModel, AudioModel } from '../types/memories';

const STORAGE_KEYS = {
  ALBUMS: 'familyai_albums_v1',
  PHOTOS: 'familyai_photos_v1',
  VIDEOS: 'familyai_videos_v1',
  AUDIOS: 'familyai_audios_v1',
};

const INITIAL_ALBUMS: AlbumModel[] = [
  {
    id: 'alb_1',
    name: 'Liburan & Jalan-Jalan 2026',
    description: 'Album kenangan wisata keluarga Bali, Jogja, dan Puncak.',
    category: 'Vacation',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    isPrivate: false,
    isShared: true,
    tags: ['Liburan', 'Wisata', 'Pantai'],
    memberId: 'usr_fai_me',
    createdAt: '2026-01-10T08:00:00Z',
    itemCount: 24,
  },
  {
    id: 'alb_2',
    name: 'Sekolah & Prestasi Anak',
    description: 'Dokumentasi kegiatan les, piala rapot, dan pentas seni Rizky & Aisyah.',
    category: 'School',
    coverUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    isPrivate: false,
    isShared: true,
    tags: ['Sekolah', 'PentasSeni', 'Prestasi'],
    memberId: 'usr_mother',
    createdAt: '2026-02-15T10:00:00Z',
    itemCount: 18,
  },
  {
    id: 'alb_3',
    name: 'Arsip Rahasia Kakek & Nenek',
    description: 'Foto jadul keluarga masa lalu dan sertifikat tanah/warisan.',
    category: 'Private Album',
    coverUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    isPrivate: true,
    isShared: false,
    tags: ['Rahasia', 'ArsipJadul'],
    memberId: 'usr_grandparent',
    createdAt: '2025-08-01T12:00:00Z',
    itemCount: 12,
  },
];

const INITIAL_PHOTOS: PhotoModel[] = [
  {
    id: 'pho_1',
    memoryId: 'mem_1',
    albumId: 'alb_2',
    title: 'Momen Potong Kue Ulang Tahun Rizky',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80',
    sizeMb: 3.2,
    width: 1920,
    height: 1080,
    isFavorite: true,
    memberId: 'usr_child',
    takenAt: '2026-05-12T15:45:00Z',
  },
  {
    id: 'pho_2',
    memoryId: 'mem_2',
    albumId: 'alb_1',
    title: 'Sunset Indah Pantai Kuta Bali',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
    sizeMb: 4.5,
    width: 2048,
    height: 1365,
    isFavorite: true,
    memberId: 'usr_fai_me',
    takenAt: '2026-01-05T18:15:00Z',
  },
  {
    id: 'pho_3',
    memoryId: 'mem_3',
    albumId: 'alb_2',
    title: 'Foto Keluarga Wisuda Ibu Dewi',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=300&q=80',
    sizeMb: 2.8,
    width: 1600,
    height: 1200,
    isFavorite: false,
    memberId: 'usr_mother',
    takenAt: '2025-11-20T09:30:00Z',
  },
];

const INITIAL_VIDEOS: VideoModel[] = [
  {
    id: 'vid_1',
    memoryId: 'mem_1',
    albumId: 'alb_2',
    title: 'Video Menyanyikan Lagu Tiup Lilin',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-happy-birthday-cake-with-candles-41618-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80',
    durationSeconds: 95,
    videoType: 'Family Event',
    sizeMb: 48.5,
    isFavorite: true,
    memberId: 'usr_child',
    takenAt: '2026-05-12T15:50:00Z',
  },
  {
    id: 'vid_2',
    memoryId: 'mem_2',
    albumId: 'alb_1',
    title: 'Vlog Singkat Snorkeling Nusa Dua Bali',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-underwater-view-of-a-coral-reef-41586-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
    durationSeconds: 180,
    videoType: 'Short Video',
    sizeMb: 92.0,
    isFavorite: false,
    memberId: 'usr_fai_me',
    takenAt: '2026-01-06T11:00:00Z',
  },
];

const INITIAL_AUDIOS: AudioModel[] = [
  {
    id: 'aud_1',
    memoryId: 'mem_4',
    title: 'Dongeng Kancil & Buaya Nenek Maryam',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    durationSeconds: 240,
    category: 'Family Story',
    date: '2026-07-28',
    memberId: 'usr_grandparent',
    memberName: 'Nenek Maryam',
    transcript: 'Dahulu kala di pinggir hutan yang rindang, ada seekor Kancil yang cerdik...',
    isFavorite: true,
    createdAt: '2026-07-28T20:15:00Z',
  },
  {
    id: 'aud_2',
    title: 'Suara Tawa Pertama Adik Aisyah (Bayi)',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    durationSeconds: 45,
    category: 'Baby Sound',
    date: '2021-02-14',
    memberId: 'usr_mother',
    memberName: 'Ibu Dewi',
    transcript: '[Suara tawa menggemaskan bayi Aisyah saat digelitik oleh Ayah]',
    isFavorite: true,
    createdAt: '2021-02-14T14:20:00Z',
  },
  {
    id: 'aud_3',
    title: 'Catatan Suara Rencana Biaya Renovasi Rumah',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    durationSeconds: 110,
    category: 'Voice Note',
    date: '2026-08-01',
    memberId: 'usr_fai_me',
    memberName: 'Bapak Hendra',
    transcript: 'Catatan penting: Anggaran cat ulang atap dan garasi diperkirakan 8.5 juta rupiah...',
    isFavorite: false,
    createdAt: '2026-08-01T09:00:00Z',
  },
];

export class GalleryRepository {
  static getAlbums(): AlbumModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALBUMS);
      return data ? JSON.parse(data) : INITIAL_ALBUMS;
    } catch {
      return INITIAL_ALBUMS;
    }
  }

  static saveAlbums(albums: AlbumModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(albums));
    } catch (e) {
      console.error('Failed to save albums', e);
    }
  }

  static addAlbum(album: AlbumModel): AlbumModel[] {
    const list = this.getAlbums();
    const updated = [album, ...list];
    this.saveAlbums(updated);
    return updated;
  }

  static getPhotos(): PhotoModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PHOTOS);
      return data ? JSON.parse(data) : INITIAL_PHOTOS;
    } catch {
      return INITIAL_PHOTOS;
    }
  }

  static savePhotos(photos: PhotoModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to save photos', e);
    }
  }

  static addPhoto(photo: PhotoModel): PhotoModel[] {
    const list = this.getPhotos();
    const updated = [photo, ...list];
    this.savePhotos(updated);
    return updated;
  }

  static getVideos(): VideoModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      return data ? JSON.parse(data) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  }

  static saveVideos(videos: VideoModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
    } catch (e) {
      console.error('Failed to save videos', e);
    }
  }

  static addVideo(video: VideoModel): VideoModel[] {
    const list = this.getVideos();
    const updated = [video, ...list];
    this.saveVideos(updated);
    return updated;
  }

  static getAudios(): AudioModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUDIOS);
      return data ? JSON.parse(data) : INITIAL_AUDIOS;
    } catch {
      return INITIAL_AUDIOS;
    }
  }

  static saveAudios(audios: AudioModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIOS, JSON.stringify(audios));
    } catch (e) {
      console.error('Failed to save audios', e);
    }
  }

  static addAudio(audio: AudioModel): AudioModel[] {
    const list = this.getAudios();
    const updated = [audio, ...list];
    this.saveAudios(updated);
    return updated;
  }
}
