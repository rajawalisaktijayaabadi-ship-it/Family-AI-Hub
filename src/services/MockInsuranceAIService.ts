import {
  InsurancePolicyModel,
  DocumentModel,
  EmergencyContactModel,
  EmergencyInfoModel,
  AIInsuranceInsight,
  ProtectionScoreModel,
} from '../types/protection';

export class MockInsuranceAIService {
  static evaluateProtection(
    policies: InsurancePolicyModel[],
    documents: DocumentModel[],
    contacts: EmergencyContactModel[],
    emergencyInfo: EmergencyInfoModel
  ): { score: ProtectionScoreModel; insight: AIInsuranceInsight } {
    let coverageScore = 20;
    if (policies.length > 0) coverageScore += 30;
    if (policies.some((p) => p.category === 'Kesehatan')) coverageScore += 25;
    if (policies.some((p) => p.category === 'Jiwa')) coverageScore += 25;
    coverageScore = Math.min(100, coverageScore);

    let docScore = Math.min(100, documents.length * 15);
    let emergencyScore = 20;
    if (contacts.length >= 2) emergencyScore += 40;
    if (emergencyInfo.bloodType) emergencyScore += 20;
    if (emergencyInfo.hospitalPreference) emergencyScore += 20;

    const totalScore = Math.round(coverageScore * 0.4 + docScore * 0.3 + emergencyScore * 0.3);

    const alerts: string[] = [];
    policies.forEach((p) => {
      if (p.status === 'Pending Renewal') {
        alerts.push(`Polis ${p.policyName} (${p.companyName}) membutuhkan perpanjangan sebelum ${p.endDate}.`);
      }
      if (!p.premium.isPaid) {
        alerts.push(`Tagihan premi ${p.policyName} sebesar Rp ${p.premium.amount.toLocaleString('id-ID')} jatuh tempo pada ${p.premium.dueDate}.`);
      }
    });

    if (alerts.length === 0) {
      alerts.push('Semua polis & pembayaran premi keluarga dalam kondisi aktif dan lancar.');
    }

    const docRecs: string[] = [];
    if (!documents.some((d) => d.category === 'BPJS')) {
      docRecs.push('Tambahkan salinan Kartu BPJS Kesehatan seluruh anggota keluarga ke dalam Vault.');
    }
    if (!documents.some((d) => d.category === 'KK')) {
      docRecs.push('Unggah Kartu Keluarga (KK) digital terbaru untuk kemudahan verifikasi admin.');
    }
    if (!documents.some((d) => d.category === 'Paspor')) {
      docRecs.push('Simpan scan Paspor untuk kesiapan perjalanan luar negeri dan pengurusan visa.');
    }

    if (docRecs.length === 0) {
      docRecs.push('Arsip dokumen keluarga Anda sudah sangat lengkap dan terorganisir dengan rapi.');
    }

    return {
      score: {
        totalScore,
        policyCount: policies.length,
        documentsCount: documents.length,
        emergencyReadinessScore: emergencyScore,
        coverageScore,
        lastEvaluatedAt: new Date().toISOString(),
      },
      insight: {
        protectionSummary: `Skor Perlindungan Keluarga Anda berada pada tingkat ${
          totalScore >= 80 ? 'Sangat Aman' : totalScore >= 60 ? 'Cukup Terlindungi' : 'Perlu Ditingkatkan'
        } (${totalScore}/100). Keluarga Anda memiliki ${policies.length} polis aktif dan ${documents.length} dokumen penting tersimpan.`,
        documentRecommendations: docRecs,
        policyAlerts: alerts,
        protectionMotivation: 'Melindungi keluarga dengan perlindungan finansial dan dokumen yang lengkap memberikan kedamaian pikiran tanpa cemas.',
      },
    };
  }
}
