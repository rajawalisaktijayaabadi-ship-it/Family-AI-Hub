import { AIProvider } from './AIProvider';
import { GeminiProvider } from './GeminiProvider';

export class AIProviderFactory {
  private static instances: Map<string, AIProvider> = new Map();

  static getProvider(providerId: string = 'gemini'): AIProvider {
    if (!this.instances.has(providerId)) {
      switch (providerId) {
        case 'gemini':
        default:
          this.instances.set('gemini', new GeminiProvider());
          break;
      }
    }
    return this.instances.get(providerId) || new GeminiProvider();
  }
}
