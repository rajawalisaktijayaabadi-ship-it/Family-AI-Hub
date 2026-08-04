import { PsychologyRepository } from '../repositories/PsychologyRepository';
import {
  StressModel,
  ReflectionModel,
  GratitudeModel,
  RelationshipModel,
} from '../types/psychology';

export class PsychologyService {
  static calculateStressScore(answers: Record<string, number>): {
    score: number;
    level: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
    recommendations: string[];
  } {
    const values = Object.values(answers);
    const sum = values.reduce((a, b) => a + b, 0);
    const maxPoss = Math.max(values.length * 4, 1);
    const score = Math.min(100, Math.round((sum / maxPoss) * 100));

    let level: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi' = 'Rendah';
    let recommendations: string[] = [];

    if (score < 30) {
      level = 'Rendah';
      recommendations = [
        'Tingkat stres stabil. Pertahankan ritme istirahat & olahraga harian.',
        'Lakukan kegiatan hobimu untuk menjaga motivasi emosional.',
      ];
    } else if (score < 60) {
      level = 'Sedang';
      recommendations = [
        'Terdeteksi tekanan sedang. Lakukan pernapasan relaksasi 4-4-4 selama 5 menit.',
        'Batasi konsumsi berita berlebih dan layar gadget sebelum tidur.',
      ];
    } else if (score < 80) {
      level = 'Tinggi';
      recommendations = [
        'Tingkat stres tinggi. Luangkan waktu khusus untuk istirahat tanpa gangguan.',
        'Ceritakan beban pikiran ke pasangan atau keluarga terdekat.',
        'Jadwalkan konsultasi atau bimbingan konseling bila berlanjut.',
      ];
    } else {
      level = 'Sangat Tinggi';
      recommendations = [
        'Tingkat stres sangat tinggi (Burnout). Hentikan beban kerja sementara.',
        'Sangat disarankan menghubungi profesional psikolog/konselor kesehatan jiwa.',
        'Lakukan teknik grounding relaksasi dan dampingi anggota keluarga.',
      ];
    }

    return { score, level, recommendations };
  }

  static submitStressTest(
    userName: string,
    answers: Record<string, number>
  ): StressModel[] {
    const { score, level, recommendations } = this.calculateStressScore(answers);
    const test: StressModel = {
      id: `s_${Date.now()}`,
      userId: `u_${userName.toLowerCase().replace(/\s+/g, '_')}`,
      userName,
      score,
      level,
      answers,
      recommendations,
      createdAt: new Date().toISOString(),
    };
    return PsychologyRepository.saveStressTest(test);
  }

  static saveReflection(
    userName: string,
    dailyReflection: string,
    achievements: string[],
    lessonsLearned: string
  ): ReflectionModel[] {
    const ref: ReflectionModel = {
      id: `r_${Date.now()}`,
      userId: `u_${userName.toLowerCase().replace(/\s+/g, '_')}`,
      userName,
      dailyReflection,
      achievements,
      lessonsLearned,
      createdAt: new Date().toISOString(),
    };
    return PsychologyRepository.saveReflection(ref);
  }

  static saveGratitude(
    userName: string,
    content: string,
    isSharedWithFamily: boolean
  ): GratitudeModel[] {
    const grat: GratitudeModel = {
      id: `g_${Date.now()}`,
      userId: `u_${userName.toLowerCase().replace(/\s+/g, '_')}`,
      userName,
      content,
      isSharedWithFamily,
      createdAt: new Date().toISOString(),
    };
    return PsychologyRepository.saveGratitude(grat);
  }

  static getRelationshipData(): RelationshipModel {
    return PsychologyRepository.getRelationship();
  }
}
