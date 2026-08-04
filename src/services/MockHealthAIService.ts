import { AIHealthInsight, HealthProfileModel, HealthCheckupModel, WellnessModel } from '../types/health';

export class MockHealthAIService {
  static getInsight(
    profile?: HealthProfileModel,
    checkup?: HealthCheckupModel,
    wellness?: WellnessModel
  ): AIHealthInsight {
    const memberName = profile?.memberName || 'Keluarga';
    const bmi = profile?.bmi || 22.5;

    let score = 88;
    if (bmi < 18.5 || bmi > 25) score -= 8;
    if (wellness && wellness.dailySteps < 6000) score -= 5;
    if (checkup && checkup.bloodPressureSystolic > 130) score -= 7;

    return {
      healthScore: Math.max(60, score),
      dailySummary: `Kondisi kebugaran ${memberName} secara umum terpantau stabil dengan skor kebugaran ${score}/100. Kebutuhan hidrasi dan aktivitas fisik harian dalam batas seimbang.`,
      lifestyleTips: [
        'Konsumsi minimal 2.5 Liter air putih per hari untuk menjaga metilasi dan stamina tubuh.',
        'Selingi aktivitas duduk lama dengan jalan santai 5 menit setiap 1 jam.',
        'Pertahankan jadwal tidur teratur sebelum pukul 22:30 malam.',
      ],
      activityRecommendations: [
        'Jalan cepat / Senam Pagi 20 menit bersama keluarga',
        'Latihan pernapasan rileksasi 10 menit sebelum tidur',
        'Peregangan otot ringan setelah sarapan pagi',
      ],
      motivationQuote: 'Tubuh yang sehat adalah rumah terbaik bagi jiwa yang tenang. Rawatlah kesehatan keluarga Anda hari ini.',
    };
  }
}
