import { VaultModel } from '../types/memories';

const STORAGE_KEY = 'familyai_vault_v1';

const INITIAL_VAULT: VaultModel[] = [
  {
    id: 'vlt_1',
    title: 'Sertifikat Tanah & Rumah Utama',
    category: 'Secure Folder',
    fileUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    isEncrypted: true,
    lockedPin: '1234',
    sizeMb: 5.4,
    addedAt: '2026-03-10T11:00:00Z',
  },
  {
    id: 'vlt_2',
    title: 'Polis Asuransi Jiwa & Kesehatan Keluarga',
    category: 'Document',
    fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    isEncrypted: true,
    lockedPin: '1234',
    sizeMb: 2.1,
    addedAt: '2026-04-15T14:30:00Z',
  },
  {
    id: 'vlt_3',
    title: 'Album Kenangan Pribadi Ayah & Ibu',
    category: 'Private Album',
    fileUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    isEncrypted: true,
    lockedPin: '1234',
    sizeMb: 18.2,
    addedAt: '2026-05-01T08:00:00Z',
  },
];

export class VaultRepository {
  static getVaultItems(): VaultModel[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_VAULT;
    } catch {
      return INITIAL_VAULT;
    }
  }

  static saveVaultItems(items: VaultModel[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save vault items', e);
    }
  }

  static addVaultItem(item: VaultModel): VaultModel[] {
    const list = this.getVaultItems();
    const updated = [item, ...list];
    this.saveVaultItems(updated);
    return updated;
  }

  static deleteVaultItem(id: string): VaultModel[] {
    const list = this.getVaultItems().filter((v) => v.id !== id);
    this.saveVaultItems(list);
    return list;
  }
}
