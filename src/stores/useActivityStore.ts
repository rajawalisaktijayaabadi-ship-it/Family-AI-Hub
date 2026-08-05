import { create } from 'zustand';

export interface FamilyActivityItem {
  id: string;
  time: string;
  timestamp: number;
  author: string;
  role: string;
  title: string;
  desc: string;
  tag: 'Keuangan' | 'Kalender' | 'Kesehatan' | 'Keamanan' | 'Pendidikan' | 'Smart Home' | 'Memori' | 'Parenting' | 'Mood' | 'Umum';
  color: string;
  modulePath?: string;
  likes?: number;
}

interface ActivityState {
  activities: FamilyActivityItem[];
  addActivity: (activity: Omit<FamilyActivityItem, 'id' | 'timestamp' | 'time'>) => void;
  toggleAppreciation: (id: string | number) => void;
  clearActivities: () => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [
    {
      id: 'act_101',
      time: 'Baru saja',
      timestamp: Date.now() - 60000 * 5,
      author: 'Ibu Siti',
      role: 'Admin Keluarga',
      title: 'Menambahkan Jadwal Belanja Bulanan',
      desc: 'Membeli bahan sayur segar & sembako untuk persiapan akhir pekan.',
      tag: 'Keuangan',
      color: 'text-blue-500',
      modulePath: 'finance',
      likes: 2,
    },
    {
      id: 'act_102',
      time: '15 menit lalu',
      timestamp: Date.now() - 60000 * 15,
      author: 'Budi Rahardjo',
      role: 'Owner',
      title: 'Check-in Lokasi Safe Zone',
      desc: 'Tiba di kantor Gedung Senopati dengan selamat.',
      tag: 'Keamanan',
      color: 'text-teal-500',
      modulePath: 'family_safety',
      likes: 1,
    },
    {
      id: 'act_103',
      time: '1 jam lalu',
      timestamp: Date.now() - 60000 * 60,
      author: 'Ahmad Rizky',
      role: 'Anak',
      title: 'Menyelesaikan Tugas Matematika',
      desc: 'Tugas Geometri telah dikirimkan secara mandiri.',
      tag: 'Pendidikan',
      color: 'text-purple-500',
      modulePath: 'education',
      likes: 3,
    },
    {
      id: 'act_104',
      time: '2 jam lalu',
      timestamp: Date.now() - 60000 * 120,
      author: 'Ibu Siti',
      role: 'Admin Keluarga',
      title: 'Pengingat Minum Obat Vitamin C',
      desc: 'Pengingat otomatis dari modul Kesehatan Keluarga.',
      tag: 'Kesehatan',
      color: 'text-emerald-500',
      modulePath: 'health',
      likes: 0,
    },
  ],

  addActivity: (act) => {
    const newItem: FamilyActivityItem = {
      ...act,
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      time: 'Baru saja',
      likes: 0,
    };
    set((state) => ({ activities: [newItem, ...state.activities] }));
  },

  toggleAppreciation: (id) => {
    set((state) => ({
      activities: state.activities.map((act) =>
        act.id === String(id) ? { ...act, likes: (act.likes || 0) + 1 } : act
      ),
    }));
  },

  clearActivities: () => set({ activities: [] }),
}));
