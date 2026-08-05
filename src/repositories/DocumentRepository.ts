import { DocumentModel, FolderModel } from '../types/protection';

const initialFolders: FolderModel[] = [
  { id: 'fld-1', name: 'Dokumen Identitas', colorHex: '#0284c7' },
  { id: 'fld-2', name: 'Kesehatan & BPJS', colorHex: '#16a34a' },
  { id: 'fld-3', name: 'Polis Asuransi', colorHex: '#0d9488' },
  { id: 'fld-4', name: 'Sertifikat & Ijazah', colorHex: '#8b5cf6' },
];

const initialDocuments: DocumentModel[] = [
  {
    id: 'doc-1',
    title: 'KTP Suami - Hendra Wijaya',
    category: 'KTP',
    ownerName: 'Hendra Wijaya',
    documentNumber: '3174091802880001',
    expiryDate: 'Seumur Hidup',
    folderId: 'fld-1',
    tags: ['KTP', 'Ayah', 'Identitas'],
    isFavorite: true,
    isArchived: false,
    fileSizeKb: 840,
    uploadedAt: '2026-01-10',
  },
  {
    id: 'doc-2',
    title: 'KTP Istri - Ratna Saraswati',
    category: 'KTP',
    ownerName: 'Ratna Saraswati',
    documentNumber: '3174095504900003',
    expiryDate: 'Seumur Hidup',
    folderId: 'fld-1',
    tags: ['KTP', 'Ibu', 'Identitas'],
    isFavorite: true,
    isArchived: false,
    fileSizeKb: 910,
    uploadedAt: '2026-01-10',
  },
  {
    id: 'doc-3',
    title: 'Kartu Keluarga Utama 2025',
    category: 'KK',
    ownerName: 'Hendra Wijaya',
    documentNumber: '3174092201120005',
    folderId: 'fld-1',
    tags: ['KK', 'Keluarga', 'Penting'],
    isFavorite: true,
    isArchived: false,
    fileSizeKb: 1450,
    uploadedAt: '2026-01-12',
  },
  {
    id: 'doc-4',
    title: 'Kartu BPJS Kesehatan Rayhan',
    category: 'BPJS',
    ownerName: 'Rayhan Wijaya',
    documentNumber: '0001889922114',
    folderId: 'fld-2',
    tags: ['BPJS', 'Anak', 'Kesehatan'],
    isFavorite: false,
    isArchived: false,
    fileSizeKb: 620,
    uploadedAt: '2026-02-01',
  },
  {
    id: 'doc-5',
    title: 'Paspor RI - Hendra Wijaya',
    category: 'Paspor',
    ownerName: 'Hendra Wijaya',
    documentNumber: 'X1998223',
    expiryDate: '2028-11-20',
    folderId: 'fld-1',
    tags: ['Paspor', 'Travel'],
    isFavorite: false,
    isArchived: false,
    fileSizeKb: 1120,
    uploadedAt: '2026-03-05',
  },
  {
    id: 'doc-6',
    title: 'SIM A - Hendra Wijaya',
    category: 'SIM',
    ownerName: 'Hendra Wijaya',
    documentNumber: '8802-1928-00912',
    expiryDate: '2027-02-18',
    folderId: 'fld-1',
    tags: ['SIM', 'Kendaraan'],
    isFavorite: false,
    isArchived: false,
    fileSizeKb: 750,
    uploadedAt: '2026-04-10',
  },
];

export class DocumentRepository {
  private documents: DocumentModel[] = [...initialDocuments];
  private folders: FolderModel[] = [...initialFolders];

  async getDocuments(): Promise<DocumentModel[]> {
    return this.documents;
  }

  async addDocument(doc: Omit<DocumentModel, 'id' | 'uploadedAt'>): Promise<DocumentModel> {
    const newDoc: DocumentModel = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  async toggleFavorite(id: string): Promise<DocumentModel | undefined> {
    const doc = this.documents.find((d) => d.id === id);
    if (doc) {
      doc.isFavorite = !doc.isFavorite;
    }
    return doc;
  }

  async toggleArchive(id: string): Promise<DocumentModel | undefined> {
    const doc = this.documents.find((d) => d.id === id);
    if (doc) {
      doc.isArchived = !doc.isArchived;
    }
    return doc;
  }

  async getFolders(): Promise<FolderModel[]> {
    return this.folders;
  }
}
