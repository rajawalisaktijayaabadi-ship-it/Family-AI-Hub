import { DocumentRepository } from '../repositories/DocumentRepository';
import { DocumentModel, FolderModel } from '../types/protection';

export class DocumentService {
  private repo = new DocumentRepository();

  async fetchDocuments(): Promise<DocumentModel[]> {
    return this.repo.getDocuments();
  }

  async addDocument(doc: Omit<DocumentModel, 'id' | 'uploadedAt'>): Promise<DocumentModel> {
    return this.repo.addDocument(doc);
  }

  async toggleFavorite(id: string): Promise<DocumentModel | undefined> {
    return this.repo.toggleFavorite(id);
  }

  async toggleArchive(id: string): Promise<DocumentModel | undefined> {
    return this.repo.toggleArchive(id);
  }

  async fetchFolders(): Promise<FolderModel[]> {
    return this.repo.getFolders();
  }
}
