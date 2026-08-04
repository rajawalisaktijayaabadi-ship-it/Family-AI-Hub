import { AIMoodInsight, MoodModel } from '../types/mood';
import { PsychologyRecommendation } from '../types/psychology';

export class MockMoodAIService {
  /**
   * Generates mock AI analysis and insights based on recent mood entries.
   */
  static generateMoodInsight(recentMoods: MoodModel[]): AIMoodInsight {
    if (!recentMoods || recentMoods.length === 0) {
      return {
        summary:
          'Belum ada data check-in mood yang cukup untuk dianalisis oleh AI Family Assistant.',
        triggers: ['Memulai rutinitas harian', 'Penyesuaian kegiatan'],
        recommendations: [
          'Lakukan check-in mood pertama Anda hari ini',
          'Tulis 1 hal yang disyukuri pagi ini',
        ],
        motivationQuote:
          'Langkah kecil penuh kesadaran membawa keharmonisan besar dalam keluarga.',
        reflectionPrompt:
          'Apa momen paling berharga yang Anda rasakan bersama keluarga pekan ini?',
      };
    }

    const latest = recentMoods[0];
    const avgIntensity =
      recentMoods.reduce((acc, m) => acc + m.intensity, 0) / recentMoods.length;

    let summary = '';
    let triggers: string[] = [];
    let recommendations: string[] = [];
    let motivationQuote = '';
    let reflectionPrompt = '';

    if (latest.category.includes('Bahagia') || latest.category.includes('Bersyukur')) {
      summary = `Keluarga berada dalam energi emosional positif (${latest.category}) dengan rata-rata kebahagiaan ${avgIntensity.toFixed(
        1
      )}/10.`;
      triggers = [
        'Kualitas waktu bersama keluarga',
        'Capaian tugas harian yang tuntas',
        'Suasana rumah yang harmonis',
      ];
      recommendations = [
        'Abadikan momen kebahagiaan di Mood Journal',
        'Bagikan rasa syukur bersama anggota keluarga saat makan malam',
        'Pertahankan kebiasaan komunikasi hangat',
      ];
      motivationQuote =
        'Kehangatan keluarga adalah fondasi utama kedamaian dan kesuksesan hidup.';
      reflectionPrompt =
        'Bagaimana Anda bisa membagikan energi positif ini kepada anggota keluarga lainnya hari ini?';
    } else if (latest.category.includes('Lelah') || latest.category.includes('Stres') || latest.category.includes('Cemas')) {
      summary = `Terdeteksi tingkat kelelahan/stres pada aktivitas terbaru (${latest.category}). Skor stabilitas emosi perlu perhatian.`;
      triggers = [
        'Beban pekerjaan & akademis berlebih',
        'Kemacetan & kelelahan fisik',
        'Kurang rehat berkualitas',
      ];
      recommendations = [
        'Lakukan latihan pernapasan Box Breathing 4-4-4 selama 3 menit',
        'Jadwalkan istirahat tanpa layar gadget (digital detox)',
        'Komunikasikan kebutuhan bantuan dengan pasangan atau anak',
      ];
      motivationQuote =
        'Mengenali rasa lelah adalah tanda kedewasaan emosi. Beristirahatlah sejenak, Anda telah berjuang dengan sangat baik.';
      reflectionPrompt =
        'Hal sederhana apa yang bisa dikurangi dari daftar tugas Anda hari ini agar pikiran lebih rileks?';
    } else {
      summary = `Suasana emosi keluarga tergolong stabil dan tenang (${latest.category}) dengan indeks kenyamanan ${avgIntensity.toFixed(
        1
      )}/10.`;
      triggers = ['Rutinitas harian yang berjalan teratur', 'Keseimbangan aktivitas & rehat'];
      recommendations = [
        'Cobalah ide aktivitas ringan bersama keluarga di akhir pekan',
        'Lakukan sesi refleksi singkat malam ini',
      ];
      motivationQuote =
        'Kedamaian dalam ketenangan harian adalah berkah berharga yang merawat jiwa.';
      reflectionPrompt =
        'Apa satu kebaikan kecil yang ingin Anda lakukan untuk pasangan atau anak besok pagi?';
    }

    return {
      summary,
      triggers,
      recommendations,
      motivationQuote,
      reflectionPrompt,
    };
  }

  /**
   * Generates tailored psychological & wellness recommendations.
   */
  static getRecommendationsByMood(moodCategory: string): PsychologyRecommendation[] {
    const allRecs: PsychologyRecommendation[] = [
      {
        id: 'rec_1',
        category: 'Meditasi',
        title: 'Sesi Pernapasan Penenang Jiwa 4-4-4',
        description: 'Latihan pernapasan terkontrol untuk menurunkan respon stres saraf dan menenangkan pikiran.',
        durationMinutes: 5,
        targetRole: 'Semua Anggota',
        iconName: 'Wind',
      },
      {
        id: 'rec_2',
        category: 'Quality Time',
        title: 'Teh Sore & Percakapan Bebas Gadget',
        description: 'Duduk bersama di teras tanpa HP selama 15 menit untuk saling mendengarkan cerita harian.',
        durationMinutes: 15,
        targetRole: 'Keluarga',
        iconName: 'Users',
      },
      {
        id: 'rec_3',
        category: 'Olahraga',
        title: 'Jalan Santai Pagi / Sore 15 Menit',
        description: 'Gerak fisik ringan untuk merangsang hormon endorfin dan menyegarkan sirkulasi darah.',
        durationMinutes: 15,
        targetRole: 'Ayah & Ibu',
        iconName: 'Activity',
      },
      {
        id: 'rec_4',
        category: 'Musik',
        title: 'Instrumen Akustik Ketenangan Rumah',
        description: 'Mendengarkan musik akustik/nature sound pelan untuk meningkatkan konsentrasi dan relaksasi.',
        durationMinutes: 20,
        targetRole: 'Anak & Ibu',
        iconName: 'Music',
      },
      {
        id: 'rec_5',
        category: 'Istirahat',
        title: 'Power Nap & Digital Detox 20 Menit',
        description: 'Tidur singkat tanpa gangguan notifikasi untuk memulihkan energi emosional dan fokus.',
        durationMinutes: 20,
        targetRole: 'Semua Anggota',
        iconName: 'Moon',
      },
    ];

    if (moodCategory.includes('Stres') || moodCategory.includes('Cemas')) {
      return [allRecs[0], allRecs[4], allRecs[2]];
    }
    return allRecs;
  }
}
