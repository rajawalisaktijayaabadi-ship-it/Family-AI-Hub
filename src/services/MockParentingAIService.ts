import { AIParentingInsight } from '../types/parenting';

export class MockParentingAIService {
  public static getInsight(childName: string, ageYears: number): AIParentingInsight {
    return {
      dailyTips: `Berikan pujian spesifik pada usaha ${childName}, bukan hanya hasil akhirnya. Pujian pada proses membangun growth mindset yang tahan banting.`,
      habitRecommendations: [
        `Rutinitas membaca 15 menit sebelum tidur bersama ${childName}.`,
        `Tantangan merapikan tempat tidur mandiri setelah bangun pagi.`,
        `Pembiasaan mengutarakan perasaan dengan ucapan "Aku merasa... karena...".`,
      ],
      learningSuggestions: [
        `Permainan puzzle logika 3D untuk mengasah konsentrasi spasial.`,
        `Diskusi ringan seputar cerita dongeng tentang nilai kejujuran dan empati.`,
        `Proyek eksperimen sains sederhana di rumah (misal: menanam biji kacang hijau).`,
      ],
      activityRecommendations: [
        `Olahraga bersepeda sore di taman komplek selama 30 menit.`,
        `Masak martabak mini bersama di akhir pekan untuk melatih keterampilan motorik halus.`,
        `Malam cerita keluarga tanpa gangguan gawai (Screen-Free Night).`,
      ],
      motivationQuote:
        '“Anak-anak tidak membutuhkan orang tua yang sempurna, melainkan orang tua yang hadir secara utuh, hangat, dan konsisten.”',
    };
  }
}
