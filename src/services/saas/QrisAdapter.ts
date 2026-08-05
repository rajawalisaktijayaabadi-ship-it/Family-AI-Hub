import { PaymentProvider, CreatePaymentOptions, PaymentInstruction } from './PaymentProvider';
import { PaymentTransactionModel, PaymentMethodType } from '../../types/subscription';

export class QrisAdapter implements PaymentProvider {
  id = 'qris_national' as const;
  name = 'QRIS Nasional Instant Settlement';
  supportedMethods: PaymentMethodType[] = ['qris'];

  async createTransaction(options: CreatePaymentOptions): Promise<{
    transaction: PaymentTransactionModel;
    instruction: PaymentInstruction;
  }> {
    const trxId = `qris_nat_${Date.now()}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021226680016ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5920FAMILYAI_HUB_INDO6013JAKARTA_SELATAN62070703A016304`;

    const transaction: PaymentTransactionModel = {
      id: trxId,
      workspaceId: options.workspaceId,
      planId: options.planId,
      planName: options.planName,
      billingCycle: options.billingCycle,
      amount: options.amount,
      provider: 'qris_national',
      paymentMethod: 'qris',
      status: 'pending',
      qrCodeUrl,
      createdAt: new Date().toISOString(),
    };

    const instruction: PaymentInstruction = {
      qrCodeUrl,
      expiredAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      instructions: [
        'Buka BCA Mobile, Livin by Mandiri, GoPay, OVO, ShopeePay, DANA, LinkAja, atau aplikasi QRIS lainnya.',
        'Pilih menu Pindai / Scan QRIS.',
        'Arahkan kamera ke Kode QRIS di atas.',
        'Periksa Nama Merchant: FamilyAI Hub Indonesia.',
        'Masukkan PIN pembayaran untuk menyelesaikan.',
      ],
    };

    return { transaction, instruction };
  }

  async verifyWebhook(): Promise<boolean> {
    return true;
  }

  async checkTransactionStatus(): Promise<PaymentTransactionModel['status']> {
    return 'success';
  }
}
