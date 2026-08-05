import { PDPConsentModel, SecurityAuditModel } from '../../types/security';

export class SecurityService {
  private static instance: SecurityService;

  private constructor() {}

  static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  // Input Sanitization (XSS & Injection Protection)
  sanitizeInput(input: string): string {
    if (!input) return '';
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Prompt Injection Guard
  sanitizePromptForAI(prompt: string): { safePrompt: string; isMalicious: boolean } {
    const maliciousPatterns = [
      /ignore previous instructions/i,
      /bypass system rules/i,
      /reveal api key/i,
      /act as root/i,
      /drop database/i,
    ];

    let isMalicious = false;
    for (const pattern of maliciousPatterns) {
      if (pattern.test(prompt)) {
        isMalicious = true;
        break;
      }
    }

    const safePrompt = isMalicious
      ? '[BLOCKED_SECURITY_ALERT: Upaya Prompt Injection Terdeteksi & Diblokir Sistem Keamanan]'
      : this.sanitizeInput(prompt);

    return { safePrompt, isMalicious };
  }

  // Field-Level AES-256 Mock Encryption / Hashing
  encryptSensitiveField(value: string): string {
    if (!value) return '';
    // Simulating AES-256 GCM Base64 Token
    const prefix = 'ENC_AES256_';
    return `${prefix}${btoa(value)}`;
  }

  decryptSensitiveField(encryptedValue: string): string {
    if (!encryptedValue.startsWith('ENC_AES256_')) return encryptedValue;
    try {
      const base64 = encryptedValue.replace('ENC_AES256_', '');
      return atob(base64);
    } catch {
      return encryptedValue;
    }
  }

  // Mask sensitive data (e.g., NIK KTP, Bank Account, Phone)
  maskSensitiveData(val: string, type: 'phone' | 'ktp' | 'email'): string {
    if (!val) return '';
    if (type === 'phone') {
      return val.replace(/^(\+?62|0)(\d{3})\d+(\d{3})$/, '$1$2-****-$3');
    }
    if (type === 'ktp') {
      return val.replace(/^(\d{4})\d{8}(\d{4})$/, '$1-########-$2');
    }
    if (type === 'email') {
      const parts = val.split('@');
      if (parts.length < 2) return val;
      const name = parts[0];
      const maskedName = name.length > 2 ? name.slice(0, 2) + '***' : name + '***';
      return `${maskedName}@${parts[1]}`;
    }
    return val;
  }

  // Generate UU PDP Law Data Export File
  generatePDPDataExport(userId: string, workspaceData: any): string {
    const exportObject = {
      complianceStandard: 'Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP Indonesia)',
      exportedAt: new Date().toISOString(),
      userId,
      workspaceData,
      rightsGranted: [
        'Hak Akses Data Pribadi (Pasal 5)',
        'Hak Pembetulan Data (Pasal 6)',
        'Hak Pengakhiran Pemrosesan & Penghapusan (Pasal 8)',
        'Hak Portabilitas Data (Pasal 11)',
      ],
    };

    return JSON.stringify(exportObject, null, 2);
  }
}
