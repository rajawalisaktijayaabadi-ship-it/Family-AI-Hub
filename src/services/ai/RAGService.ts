import { RAGSearchResult } from '../../types/ai';

export class RAGService {
  private static mockKnowledgeBase: RAGSearchResult[] = [
    {
      id: 'rag_1',
      title: 'Panduan Gizi Seimbang Keluarga Indonesia',
      content:
        'Kementerian Kesehatan menganjurkan porsi "Isi Piringku": 50% buah & sayur, 50% makanan pokok & lauk pauk, kecukupan air 8 gelas sehari.',
      sourceModule: 'Health Knowledge Base',
      score: 0.95,
      citationMetadata: { date: '2026-01-10', author: 'Tim Medis FamilyAI' },
    },
    {
      id: 'rag_2',
      title: 'Prinsip Keuangan 50/30/20 untuk Rumah Tangga',
      content:
        '50% kebutuhan pokok (dapur, listrik, pendidikan), 30% keinginan & hiburan keluarga, 20% tabungan, investasi & dana darurat.',
      sourceModule: 'Finance Knowledge Base',
      score: 0.92,
      citationMetadata: { date: '2026-02-01', author: 'Konsultan Keuangan' },
    },
    {
      id: 'rag_3',
      title: 'Tips Parenting Positif & Regulasi Emosi Anak',
      content:
        'Dengarkan emosi anak dengan empati tanpa langsung mengkritik. Berikan jeda tenang (time-in) dan validasi perasaan anak.',
      sourceModule: 'Parenting Guide',
      score: 0.9,
      citationMetadata: { date: '2026-03-15', author: 'Psikolog Anak' },
    },
  ];

  static retrieveRelevantDocs(query: string, limit: number = 3): RAGSearchResult[] {
    if (!query.trim()) return this.mockKnowledgeBase.slice(0, limit);
    const lower = query.toLowerCase();
    const matches = this.mockKnowledgeBase.filter(
      (doc) =>
        doc.title.toLowerCase().includes(lower) ||
        doc.content.toLowerCase().includes(lower) ||
        doc.sourceModule.toLowerCase().includes(lower)
    );
    return matches.length > 0 ? matches.slice(0, limit) : this.mockKnowledgeBase.slice(0, limit);
  }
}
