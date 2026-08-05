import {
  PaymentProviderType,
  PaymentMethodType,
  PaymentTransactionModel,
  PlanId,
  BillingCycle,
} from '../../types/subscription';

export interface CreatePaymentOptions {
  workspaceId: string;
  planId: PlanId;
  planName: string;
  amount: number;
  billingCycle: BillingCycle;
  paymentMethod: PaymentMethodType;
  customerEmail: string;
  customerName: string;
}

export interface PaymentInstruction {
  qrCodeUrl?: string;
  vaNumber?: string;
  bankName?: string;
  deeplinkUrl?: string;
  checkoutUrl?: string;
  expiredAt: string;
  instructions: string[];
}

export interface PaymentProvider {
  id: PaymentProviderType;
  name: string;
  supportedMethods: PaymentMethodType[];
  createTransaction(options: CreatePaymentOptions): Promise<{
    transaction: PaymentTransactionModel;
    instruction: PaymentInstruction;
  }>;
  verifyWebhook(payload: any, signatureHeader?: string): Promise<boolean>;
  checkTransactionStatus(transactionId: string): Promise<PaymentTransactionModel['status']>;
}
