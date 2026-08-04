import { MessageModel, ResponseType, Attachment } from '../types/ai';

export interface AIServiceResponse {
  text: string;
  responseType: ResponseType;
  checklistItems?: { id: string; text: string; done: boolean }[];
  tableData?: { headers: string[]; rows: string[][] };
}

export class MockAIService {
  /**
   * Abstracted method to generate AI response.
   * Can be replaced with GoogleGeminiService seamlessly in the future.
   */
  public static async generateResponse(
    prompt: string,
    context?: {
      familyName?: string;
      memberCount?: number;
      activeRole?: string;
      attachments?: Attachment[];
    },
    onChunk?: (chunk: string) => void
  ): Promise<AIServiceResponse> {
    const trimmed = prompt.trim();
    const familyName = context?.familyName || 'Keluarga Rahardjo';

    // 1. Check Quick Commands first
    if (trimmed.startsWith('/')) {
      return this.handleQuickCommand(trimmed, familyName);
    }

    // 2. Keyword matching for mock smart response
    const lower = trimmed.toLowerCase();

    let response: AIServiceResponse;

    if (lower.includes('makan') || lower.includes('resep') || lower.includes('menu')) {
      response = {
        responseType: 'checklist',
        text: `### 🍱 Rekomendasi Menu Bergizi (${familyName})\nBerikut ide menu makan siang & malam sehat yang lezat dan hemat:`,
        checklistItems: [
          { id: '1', text: 'Sup Ayam Kampung Bumbu Jahe & Brokoli', done: true },
          { id: '2', text: 'Ikan Bakar Gurame Bumbu Kuning & Sambal Terasi', done: false },
          { id: '3', text: 'Tumis Buncis Jagung Manis & Tahu Crispy', done: false },
          { id: '4', text: 'Buah Cuci Mulut: Semangka Merah Segar', done: false },
        ],
      };
    } else if (lower.includes('uang') || lower.includes('anggaran') || lower.includes('tagihan')) {
      response = {
        responseType: 'table',
        text: `### 💰 Ringkasan & Alokasi Anggaran (${familyName})\nSaran alokasi keuangan ideal 50/30/20 untuk bulan ini:`,
        tableData: {
          headers: ['Pos Kebutuhan', 'Alokasi (%)', 'Estimasi (Rp)'],
          rows: [
            ['Kebutuhan Pokok & Dapur', '50%', 'Rp 4.500.000'],
            ['Tabungan & Investasi', '20%', 'Rp 1.800.000'],
            ['Pendidikan & Les Anak', '20%', 'Rp 1.800.000'],
            ['Rekreasi & Dana Darurat', '10%', 'Rp 900.000'],
          ],
        },
      };
    } else if (lower.includes('anak') || lower.includes('parenting') || lower.includes('belajar')) {
      response = {
        responseType: 'markdown',
        text: `### 👨‍👩‍👧‍👦 Tips Parenting & Pendampingan Anak\n\n1. **Dengarkan Tanpa Menghakimi**: Berikan waktu 15 menit setiap malam untuk mendengar cerita harian anak.\n2. **Batasi Screen Time Secara Bijak**: Buat kesepakatan zona bebas gadget saat makan bersama.\n3. **Apresiasi Usaha, Bukan Hasil**: Puji ketekunan anak saat menyelesaikan tugas sekolah.`,
      };
    } else if (lower.includes('sehat') || lower.includes('sakit') || lower.includes('imunitas')) {
      response = {
        responseType: 'bullet',
        text: `### 🏥 Panduan Imunitas & Kesehatan Keluarga\n- Pastikan konsumsi air putih minimal 2 liter per hari.\n- Sediakan vitamin C & Vitamin D3 harian.\n- Istirahat cukup (7-8 jam untuk orang dewasa, 9-10 jam untuk anak-anak).\n- Rutin olahraga ringan 30 menit seperti jalan pagi bersama.`,
      };
    } else if (lower.includes('kata') || lower.includes('motivasi') || lower.includes('kutipan')) {
      response = {
        responseType: 'quote',
        text: `"Kehangatan keluarga bukan diukur dari megahnya rumah, melainkan dari ketulusan senyum dan rasa saling mendukung di setiap momen kehidupan."`,
      };
    } else {
      response = {
        responseType: 'markdown',
        text: `Terima kasih atas pertanyaannya! Berdasarkan konteks **${familyName}**, AI Family Assistant menyarankan Anda untuk terus berkoordinasi secara terbuka. \n\n*Tips*: Anda dapat menggunakan pintasan cepat seperti \`/summary\`, \`/meal\`, atau \`/finance\` untuk mendapatkan analisis otomatis.`,
      };
    }

    // Simulate Streaming UI progress if onChunk provided
    if (onChunk) {
      const fullText = response.text;
      const chunks = fullText.split(' ');
      let current = '';
      for (let i = 0; i < chunks.length; i++) {
        current += (i === 0 ? '' : ' ') + chunks[i];
        onChunk(current);
        await new Promise((res) => setTimeout(res, 40));
      }
    } else {
      await new Promise((res) => setTimeout(res, 600));
    }

    return response;
  }

  private static handleQuickCommand(command: string, familyName: string): AIServiceResponse {
    const cmd = command.toLowerCase().split(' ')[0];

    switch (cmd) {
      case '/summary':
        return {
          responseType: 'markdown',
          text: `### 📋 Ringkasan Harian (${familyName})\n\n- **Agenda Hari Ini**: Rapat sekolah jam 10:00 & Belanja mingguan.\n- **Pengingat Tagihan**: Tagihan Listrik & WiFi jatuh tempo dalam 3 hari.\n- **Status Nutrisi**: Rencana menu hari ini: Sup Ayam & Tempe Bacem.`,
        };
      case '/reminder':
        return {
          responseType: 'checklist',
          text: `### ⏰ Checklist Pengingat Penting Keluarga`,
          checklistItems: [
            { id: 'rem1', text: 'Bayar Listrik PLN & Internet WiFi', done: false },
            { id: 'rem2', text: 'Beli obat flu anak di apotek', done: true },
            { id: 'rem3', text: 'Konfirmasi jadwal dokter gigi Sabut besok', done: false },
          ],
        };
      case '/calendar':
        return {
          responseType: 'table',
          text: `### 📅 Kalender Agenda Minggu Ini`,
          tableData: {
            headers: ['Hari', 'Waktu', 'Kegiatan', 'Penanggung Jawab'],
            rows: [
              ['Senin', '08:00', 'Antar Anak Sekolah', 'Ayah'],
              ['Rabu', '16:00', 'Les Bahasa Inggris Anak', 'Ibu'],
              ['Sabtu', '10:00', 'Arisan RT & Rekreasi Taman', 'Seluruh Keluarga'],
            ],
          },
        };
      case '/meal':
        return {
          responseType: 'checklist',
          text: `### 🍳 Ide Menu Makan Hari Ini`,
          checklistItems: [
            { id: 'm1', text: 'Sarapan: Nasi Goreng Telur & Jus Alpukat', done: true },
            { id: 'm2', text: 'Makan Siang: Sayur Asem, Tahu Tempe & Ikan Asin', done: false },
            { id: 'm3', text: 'Makan Malam: Soto Ayam Bening & Perkedel', done: false },
          ],
        };
      case '/health':
        return {
          responseType: 'bullet',
          text: `### 🌿 Tips Kesehatan & Kebugaran Harian\n- Minum 1 gelas air hangat setiap pagi setelah bangun tidur.\n- Luangkan 10 menit untuk stretching bersama.\n- Siapkan buah-buahan potong untuk camilan sehat anak.`,
        };
      case '/finance':
        return {
          responseType: 'table',
          text: `### 💸 Laporan Singkat Keuangan Minggu Ini`,
          tableData: {
            headers: ['Kategori', 'Anggaran', 'Realisasi', 'Sisa'],
            rows: [
              ['Belanja Dapur', 'Rp 1.000.000', 'Rp 750.000', 'Rp 250.000'],
              ['Bensin & Transport', 'Rp 400.000', 'Rp 300.000', 'Rp 100.000'],
              ['Camilan & Hiburan', 'Rp 300.000', 'Rp 200.000', 'Rp 100.000'],
            ],
          },
        };
      case '/mood':
        return {
          responseType: 'quote',
          text: `"Keluarga adalah tempat di mana cinta tidak pernah berakhir dan dukungan senantiasa mengalir."`,
        };
      case '/help':
      default:
        return {
          responseType: 'markdown',
          text: `### 🤖 Panduan Perintah Cepat AI Family Assistant\n\nGunakan perintah berikut di kolom obrolan:\n- \`/summary\`: Lihat ringkasan aktivitas harian\n- \`/reminder\`: Buat pengingat penting\n- \`/calendar\`: Cek agenda kalender\n- \`/meal\`: Rekomendasi masakan & menu\n- \`/health\`: Panduan kesehatan & gizi\n- \`/finance\`: Ringkasan anggaran keluarga\n- \`/mood\`: Kata mutiara & motivasi\n- \`/help\`: Tampilkan panduan ini`,
        };
    }
  }
}
