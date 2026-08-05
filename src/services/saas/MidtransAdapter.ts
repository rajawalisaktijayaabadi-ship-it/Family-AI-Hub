import { PaymentProvider, CreatePaymentOptions, PaymentInstruction } from './PaymentProvider';
import { PaymentTransactionModel, PaymentMethodType } from '../../types/subscription';

export class MidtransAdapter implements PaymentProvider {
  id = 'midtrans' as const;
  name = 'Midtrans Snap Payment Gateway';
  supportedMethods: PaymentMethodType[] = [
    'qris',
    'va_bca',
    'va_mandiri',
    'va_bri',
    'gopay',
    'shopeepay',
    'credit_card',
  ];

  async createTransaction(options: CreatePaymentOptions): Promise<{
    transaction: PaymentTransactionModel;
    instruction: PaymentInstruction;
  }> {
    const trxId = `midtrans_trx_${Date.now()}`;
    const snapToken = `SNAP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    let vaNumber = '';
    let qrCodeUrl = '';
    let instructions: string[] = [];

    if (options.paymentMethod.startsWith('va_')) {
      const bank = options.paymentMethod.replace('va_', '').toUpperCase();
      vaNumber = `88012${Math.floor(100000000 + Math.random() * 900000000)}`;
      instructions = [
        `Buka aplikasi Mobile Banking / ATM ${bank}.`,
        `Pilih Transfer -> Virtual Account / Bayar Tagihan.`,
        `Masukkan Nomor VA: ${vaNumber}`,
        `Konfirmasi jumlah pembayaran: Rp ${options.amount.toLocaleString('id-ID')}`,
        `Selesaikan transaksi sebelum batas waktu.`,
      ];
    } else if (options.paymentMethod === 'qris' || options.paymentMethod === 'gopay') {
      qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=QRIS_MIDTRANS_DEMO_${trxId}`;
      instructions = [
        `Buka aplikasi e-Wallet (GoPay, OVO, ShopeePay, DANA) atau Mobile Banking.`,
        `Pilih menu Scan / QRIS.`,
        `Scan kode QR yang tampil di layar.`,
        `Periksa nama penerima: FamilyAI Hub Indonesia.`,
        `Tekan Bayar dan masukkan PIN e-Wallet Anda.`,
      ];
    } else {
      instructions = [
        `Ikuti petunjuk pembayaran aman di pop-up Midtrans Snap.`,
        `Gunakan kartu kredit / debit online terverifikasi 3D Secure.`,
      ];
    }

    const transaction: PaymentTransactionModel = {
      id: trxId,
      workspaceId: options.workspaceId,
      planId: options.planId,
      planName: options.planName,
      billingCycle: options.billingCycle,
      amount: options.amount,
      provider: 'midtrans',
      paymentMethod: options.paymentMethod,
      status: 'pending',
      snapToken,
      vaNumber: vaNumber || undefined,
      qrCodeUrl: qrCodeUrl || undefined,
      createdAt: new Date().toISOString(),
    };

    const instruction: PaymentInstruction = {
      qrCodeUrl,
      vaNumber,
      expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      instructions,
    };

    return { transaction, instruction };
  }

  async verifyWebhook(payload: any): Promise<boolean> {
    // Simulated signature check
    return payload && payload.order_id && payload.status_code;
  }

  async checkTransactionStatus(transactionId: string): Promise<PaymentTransactionModel['status']> {
    return 'success';
  }
}
