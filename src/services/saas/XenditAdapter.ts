import { PaymentProvider, CreatePaymentOptions, PaymentInstruction } from './PaymentProvider';
import { PaymentTransactionModel, PaymentMethodType } from '../../types/subscription';

export class XenditAdapter implements PaymentProvider {
  id = 'xendit' as const;
  name = 'Xendit Payments Indonesia';
  supportedMethods: PaymentMethodType[] = [
    'qris',
    'va_bca',
    'va_mandiri',
    'va_bri',
    'va_bni',
    'ovo',
    'dana',
    'shopeepay',
  ];

  async createTransaction(options: CreatePaymentOptions): Promise<{
    transaction: PaymentTransactionModel;
    instruction: PaymentInstruction;
  }> {
    const trxId = `xendit_invoice_${Date.now()}`;
    const checkoutUrl = `https://checkout.xendit.co/web/${trxId}`;

    const transaction: PaymentTransactionModel = {
      id: trxId,
      workspaceId: options.workspaceId,
      planId: options.planId,
      planName: options.planName,
      billingCycle: options.billingCycle,
      amount: options.amount,
      provider: 'xendit',
      paymentMethod: options.paymentMethod,
      status: 'pending',
      redirectUrl: checkoutUrl,
      createdAt: new Date().toISOString(),
    };

    const instruction: PaymentInstruction = {
      checkoutUrl,
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      instructions: [
        'Klik tombol Bayar Sekarang untuk membuka Halaman Invoice Xendit.',
        'Pilih metode pembayaran favorit Anda (VA / QRIS / e-Wallet).',
        'Selesaikan pembayaran sebelum batas waktu.',
      ],
    };

    return { transaction, instruction };
  }

  async verifyWebhook(payload: any): Promise<boolean> {
    return !!payload;
  }

  async checkTransactionStatus(transactionId: string): Promise<PaymentTransactionModel['status']> {
    return 'success';
  }
}
