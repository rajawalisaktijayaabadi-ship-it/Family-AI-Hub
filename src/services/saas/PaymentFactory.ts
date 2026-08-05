import { PaymentProvider } from './PaymentProvider';
import { MidtransAdapter } from './MidtransAdapter';
import { XenditAdapter } from './XenditAdapter';
import { QrisAdapter } from './QrisAdapter';
import { PaymentProviderType } from '../../types/subscription';

export class PaymentFactory {
  private static providers: Map<PaymentProviderType, PaymentProvider> = new Map();

  static getProvider(providerType: PaymentProviderType = 'midtrans'): PaymentProvider {
    if (!this.providers.has(providerType)) {
      switch (providerType) {
        case 'midtrans':
          this.providers.set('midtrans', new MidtransAdapter());
          break;
        case 'xendit':
          this.providers.set('xendit', new XenditAdapter());
          break;
        case 'qris_national':
          this.providers.set('qris_national', new QrisAdapter());
          break;
        default:
          this.providers.set('midtrans', new MidtransAdapter());
          break;
      }
    }
    return this.providers.get(providerType) || new MidtransAdapter();
  }
}
