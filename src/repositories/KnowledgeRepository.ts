import { KnowledgeModel } from '../types/education';

const initialKnowledge: KnowledgeModel[] = [
  {
    id: 'knw-1',
    title: 'Panduan Membantu Anak Menghadapi Ujian Tanpa Stres',
    category: 'Parenting Study',
    summary: 'Tips praktis bagi orang tua dalam mendukung persiapan ujian anak tanpa memberikan tekanan berlebihan.',
    content: '1. Buat suasana belajar yang tenang dan nyaman.\n2. Bantu anak menyusun jadwal belajar berkala.\n3. Berikan apresiasi terhadap usaha, bukan sekadar hasil nilai akhir.',
    readTimeMinutes: 4,
    isFavorite: true,
    isBookmarked: true,
  },
  {
    id: 'knw-2',
    title: 'Cara Efektif Menggunakan Flashcard & Pomodoro untuk Pelajar',
    category: 'Tips Belajar AI',
    summary: 'Teknik pengulangan teratur (Spaced Repetition) untuk meningkatkan daya ingat ingatan jangka panjang anak.',
    content: 'Spaced repetition terbukti meningkatkan retensi memori hingga 80%. Gunakan flashcard untuk kata sulit atau rumus dasar.',
    readTimeMinutes: 5,
    isFavorite: true,
    isBookmarked: false,
  },
  {
    id: 'knw-3',
    title: 'Pentingnya Literasi Keuangan Sejak Dini untuk Anak Sekolah',
    category: 'Literasi Keuangan Anak',
    summary: 'Mengajarkan konsep menabung, membedakan kebutuhan vs keinginan, dan mengelola uang saku.',
    content: 'Ajak anak mencatat pengeluaran uang saku harian di aplikasi FamilyAI agar tumbuh sikap bertanggung jawab terhadap uang.',
    readTimeMinutes: 6,
    isFavorite: false,
    isBookmarked: true,
  },
];

export class KnowledgeRepository {
  private articles: KnowledgeModel[] = [...initialKnowledge];

  async getArticles(): Promise<KnowledgeModel[]> {
    return this.articles;
  }

  async toggleFavorite(id: string): Promise<KnowledgeModel | undefined> {
    const art = this.articles.find((a) => a.id === id);
    if (art) art.isFavorite = !art.isFavorite;
    return art;
  }

  async toggleBookmark(id: string): Promise<KnowledgeModel | undefined> {
    const art = this.articles.find((a) => a.id === id);
    if (art) art.isBookmarked = !art.isBookmarked;
    return art;
  }
}
