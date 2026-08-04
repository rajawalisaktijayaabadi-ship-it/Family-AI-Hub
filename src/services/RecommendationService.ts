import { PsychologyRecommendation, RecommendationCategory } from '../types/psychology';

export class RecommendationService {
  private static staticRecommendations: PsychologyRecommendation[] = [
    {
      id: 'rec_fit_1',
      category: 'Olahraga',
      title: 'Jalan Santai Pagi 15 Menit Bersama Pasangan',
      description: 'Menghirup udara segar pagi hari untuk merangsang dopamin dan melancarkan sirkulasi jantung.',
      durationMinutes: 15,
      targetRole: 'Ayah & Ibu',
      iconName: 'Activity',
    },
    {
      id: 'rec_rest_1',
      category: 'Istirahat',
      title: 'Digital Detox & Tidur Berkualitas',
      description: 'Matikan Notifikasi HP 30 menit sebelum tidur untuk meningkatkan kedalaman gelombang tidur teratur.',
      durationMinutes: 30,
      targetRole: 'Semua Anggota',
      iconName: 'Moon',
    },
    {
      id: 'rec_bond_1',
      category: 'Quality Time',
      title: 'Cerita Sore & Minum Teh Bersama Anak',
      description: 'Ajang bertukar cerita sekolah tanpa menghakimi, mendengarkan dengan kehangatan empati.',
      durationMinutes: 20,
      targetRole: 'Keluarga',
      iconName: 'Users',
    },
    {
      id: 'rec_med_1',
      category: 'Meditasi',
      title: 'Relaksasi Napas Dalam Box Breathing 4-4-4',
      description: 'Pernapasan ritmis 4 detik hirup, 4 detik tahan, 4 detik hembuskan untuk menetralkan sistem saraf tertekan.',
      durationMinutes: 5,
      targetRole: 'Semua Anggota',
      iconName: 'Wind',
    },
    {
      id: 'rec_music_1',
      category: 'Musik',
      title: 'Mendengarkan Musik Instrumental Suasana Terapi',
      description: 'Musik gamelan / piano santai untuk meredakan gelombang otak alpha dan meningkatkan kenyamanan ruang keluarga.',
      durationMinutes: 25,
      targetRole: 'Anak & Ibu',
      iconName: 'Music',
    },
  ];

  static getAllRecommendations(): PsychologyRecommendation[] {
    return this.staticRecommendations;
  }

  static getRecommendationsByCategory(
    category: RecommendationCategory
  ): PsychologyRecommendation[] {
    return this.staticRecommendations.filter((r) => r.category === category);
  }

  static getQuickCommands(): Array<{ command: string; label: string; description: string; prompt: string }> {
    return [
      {
        command: '/parenting',
        label: 'Saran Parenting',
        description: 'Saran mendampingi anak belajar & karakter',
        prompt: 'Berikan saran parenting untuk mendampingi anak belajar',
      },
      {
        command: '/harmoni',
        label: 'Harmoni Keluarga',
        description: 'Meningkatkan kehangatan hubungan rumah',
        prompt: 'Bagaimana cara meningkatkan kehangatan komunikasi di rumah?',
      },
      {
        command: '/stres',
        label: 'Manajemen Stres',
        description: 'Meredakan beban emosi & kecemasan',
        prompt: 'Tips meredakan beban emosi setelah beraktivitas seharian',
      },
      {
        command: '/kegiatan',
        label: 'Aktivitas Akhir Pekan',
        description: 'Ide kegiatan keluarga berkualitas',
        prompt: 'Rekomendasi kegiatan keluarga tanpa gawai di akhir pekan',
      },
    ];
  }

  static getSuggestedQuestions(_role?: string): string[] {
    return [
      'Bagaimana cara membangun kebiasaan membaca pada anak?',
      'Tips mengelola emosi orang tua saat anak tantrum?',
      'Bagaimana mengatur batas screen time gawai anak secara bijak?',
      'Ide kegiatan akhir pekan yang menyenangkan untuk keluarga?',
    ];
  }
}
