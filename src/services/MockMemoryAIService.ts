import { MemoryModel } from '../types/memories';

export interface AIMemoryInsightResponse {
  todayFlashback: {
    title: string;
    yearsAgo: number;
    description: string;
    imageUrl: string;
    dateFormatted: string;
  };
  summary: string;
  highlights: string[];
  recommendations: {
    title: string;
    reason: string;
    category: string;
  }[];
}

export class MockMemoryAIService {
  static getTodaysInsight(memories: MemoryModel[]): AIMemoryInsightResponse {
    const todayFlashback = {
      title: 'Momen Ulang Tahun Ahmad Rizky',
      yearsAgo: 1,
      description:
        'Tepat di hari ini tahun lalu, keluarga besar berkumpul merayakan ulang tahun ke-10 Ahmad Rizky dengan tiup lilin dan makan tumpeng bersama.',
      imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      dateFormatted: '5 Agustus 2025',
    };

    const summary =
      'Keluarga Anda telah mengabadikan 42+ momen berharga bulan ini. Kategori paling dominan adalah Liburan Keluarga (45%) dan Kegiatan Sekolah Anak (30%). Kecenderungan emosi kenangan menunjukkan kebahagiaan & kehangatan tinggi!';

    const highlights = [
      'Liburan Bali awal tahun menjadi momen foto terbanyak (120+ media).',
      'Audio dongeng Nenek Maryam adalah rekaman suara paling sering diputar.',
      'Siti Aisyah telah menambah 15 karya gambar mewarnai di album sekolah.',
    ];

    const recommendations = [
      {
        title: 'Buat Album Digital: Wisuda Ibu Dewi',
        reason: 'Ada 18 foto kelulusan yang belum dikelompokkan ke dalam album khusus.',
        category: 'Rekomendasi Album AI',
      },
      {
        title: 'Cetak Photobook Momen Liburan Bali 2026',
        reason: 'Momen liburan musim panas memiliki rating favorit tertinggi dari seluruh anggota.',
        category: 'Cetak Kenangan',
      },
      {
        title: 'Arsipkan Suara Cerita Kakek Sutrisno',
        reason: 'Rekaman cerita sejarah keluarga sangat bernilai untuk generasi mendatang.',
        category: 'Voice Preservation AI',
      },
    ];

    return {
      todayFlashback,
      summary,
      highlights,
      recommendations,
    };
  }

  static analyzeMemoryStory(title: string, description: string): string {
    return `AI Summary: Kenangan "${title}" mencerminkan hubungan kekeluargaan yang erat. Narasi menunjukkan momen emotif positif tinggi dengan sentimen kehangatan keluarga.`;
  }
}
