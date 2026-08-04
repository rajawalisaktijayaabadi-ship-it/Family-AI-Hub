import { AISettingsModel, FavoriteItemModel } from '../types/ai';
import { DEFAULT_AI_SETTINGS } from '../core/aiConstants';

const SETTINGS_CACHE_KEY = 'family_ai_settings_v1';
const FAVORITES_CACHE_KEY = 'family_ai_favorites_v1';

export class AIRepository {
  public static getSettings(): AISettingsModel {
    try {
      const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Error reading AI settings cache:', err);
    }
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(DEFAULT_AI_SETTINGS));
    return DEFAULT_AI_SETTINGS;
  }

  public static saveSettings(settings: AISettingsModel): void {
    try {
      localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error('Failed to save AI settings:', err);
    }
  }

  public static getFavorites(): FavoriteItemModel[] {
    try {
      const cached = localStorage.getItem(FAVORITES_CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Error reading AI favorites cache:', err);
    }
    const initial: FavoriteItemModel[] = [
      {
        id: 'fav_1',
        type: 'prompt',
        itemId: 'p1',
        title: 'Ringkasan Hari Ini',
        contentPreview: 'Tolong buatkan ringkasan agenda keluarga, pengingat penting...',
        createdAt: new Date().toISOString(),
        category: 'Keluarga',
      },
      {
        id: 'fav_2',
        type: 'response',
        itemId: 'm2',
        title: 'Rekomendasi Menu Sehat',
        contentPreview: 'Menu makan siang & malam sehat untuk 4 porsi selama seminggu',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        category: 'Makanan',
      },
    ];
    localStorage.setItem(FAVORITES_CACHE_KEY, JSON.stringify(initial));
    return initial;
  }

  public static saveFavorites(favorites: FavoriteItemModel[]): void {
    try {
      localStorage.setItem(FAVORITES_CACHE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save AI favorites:', err);
    }
  }

  public static addFavorite(fav: Omit<FavoriteItemModel, 'id' | 'createdAt'>): FavoriteItemModel {
    const favorites = this.getFavorites();
    const newFav: FavoriteItemModel = {
      ...fav,
      id: `fav_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newFav, ...favorites];
    this.saveFavorites(updated);
    return newFav;
  }

  public static removeFavorite(id: string): FavoriteItemModel[] {
    const favorites = this.getFavorites();
    const filtered = favorites.filter((f) => f.id !== id && f.itemId !== id);
    this.saveFavorites(filtered);
    return filtered;
  }
}
