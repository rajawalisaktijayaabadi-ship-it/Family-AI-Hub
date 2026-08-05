/**
 * Intelligent AI Response Generator
 * Provides rich, structured, domain-aware answers in clean Bahasa Indonesia.
 */

export function generateSmartFallbackResponse(
  prompt: string,
  category: string = 'Umum',
  context?: any
): string {
  const p = prompt.toLowerCase();
  const familyName = context?.familyName || 'Keluarga';

  // 1. Parenting & Children Education
  if (
    p.includes('baca') ||
    p.includes('anak') ||
    p.includes('belajar') ||
    p.includes('sekolah') ||
    p.includes('didik') ||
    p.includes(' parenting') ||
    category === 'Pendidikan'
  ) {
    return `Berikut adalah langkah-langkah praktis dan efektif untuk mendukung perkembangan anak serta membangun kebiasaan positif dalam ${familyName}:

1. **Sediakan Ruang & Sudut Membaca yang Nyaman**
   - Tempatkan rak buku kecil setinggi mata anak.
   - Pilih buku bergambar interaktif dan cerita pendek yang menarik perhatian anak.

2. **Jadikan Rutinitas Harian yang Menyenangkan**
   - Luangkan waktu 15–20 menit setiap hari (misalnya sebelum tidur untuk *bedtime story*).
   - Konsistensi harian jauh lebih efektif dibanding membaca lama hanya sekali seminggu.

3. **Berikan Teladan Nyata (*Lead by Example*)**
   - Anak adalah peniru yang ulung. Saat melihat orang tua menikmati membaca buku, anak akan merasa penasaran dan tertarik untuk meniru.

4. **Biarkan Anak Memilih Ceritanya Sendiri**
   - Berikan kebebasan anak memilih buku sesuai minat mereka (fantasi, hewan, petualangan, sains sederhana).

5. **Ajak Berdiskusi & Berinteraksi**
   - Tanyakan pendapat anak seputar cerita ("Menurutmu kenapa tokoh ini bersedih?", "Bagian mana yang paling kamu suka?"). Ini melatih kemampuan analisis dan berbahasa anak.

💡 **Tips Tambahan FamilyAI**: Gabungkan dengan poin bintang atau *reward chart* sederhana di FamilyAI Hub untuk mengapresiasi setiap kali anak berhasil menyelesaikan satu buku!`;
  }

  // 2. Health & Nutrition
  if (
    p.includes('sehat') ||
    p.includes('obat') ||
    p.includes('nutrisi') ||
    p.includes('makan') ||
    p.includes('sakit') ||
    p.includes('gizi') ||
    p.includes('vitamin') ||
    p.includes('tidur') ||
    category === 'Kesehatan'
  ) {
    return `Berikut saran kesehatan dan gaya hidup sehat untuk ${familyName}:

1. **Pola Makan Bergizi Seimbang**: Pastikan asupan karbohidrat kompleks, protein tinggi, serat sayur, dan buah segar tercukupi setiap hari.
2. **Hidrasi Cukup**: Minum air putih minimal 2 liter (8 gelas) per hari untuk menjaga metabolisme tubuh.
3. **Kualitas Tidur Terjaga**: Tidur 7-8 jam untuk dewasa dan 8-10 jam untuk anak-anak demi pemulihan daya tahan tubuh.
4. **Aktivitas Fisik Bersama**: Sempatkan berolahraga ringan atau jalan pagi bersama keluarga 3x seminggu.

⚠️ *Catatan Kesehatan*: Rekomendasi ini bersifat edukasi umum. Jika ada gejala fisik atau gangguan kesehatan berlanjut, harap segera berkonsultasi dengan dokter atau tenaga medis profesional.`;
  }

  // 3. Finance & Budgeting
  if (
    p.includes('uang') ||
    p.includes('keuangan') ||
    p.includes('anggaran') ||
    p.includes('tabungan') ||
    p.includes('belanja') ||
    p.includes('dana') ||
    p.includes('investasi') ||
    category === 'Keuangan'
  ) {
    return `Berikut rekomendasi perencanaan keuangan keluarga untuk ${familyName}:

1. **Alokasi Rumus 50/30/20**:
   - 50% untuk kebutuhan pokok (makanan, tagihan, cicilan).
   - 30% untuk keinginan & rekreasi keluarga.
   - 20% untuk tabungan, dana darurat, & investasi.
2. **Siapkan Dana Darurat**: Targetkan 6-12 kali pengeluaran bulanan sebagai jaring pengaman keuangan keluarga.
3. **Catat Setiap Transaksi**: Gunakan modul Keuangan di FamilyAI Hub untuk memantau *cash flow* dan mendeteksi pemborosan sejak dini.
4. **Evaluasi Anggaran Bulanan**: Lakukan diskusi santai bersama pasangan di akhir bulan untuk meninjau efisiensi pengeluaran.

⚠️ *Catatan Keuangan*: Informasi ini bertujuan untuk perencanaan dan edukasi literasi keuangan keluarga, bukan nasehat investasi legal.`;
  }

  // 4. Mood & Psychology
  if (
    p.includes('mood') ||
    p.includes('cemas') ||
    p.includes('stres') ||
    p.includes('emosi') ||
    p.includes('marah') ||
    p.includes('sedih') ||
    p.includes('hubungan') ||
    category === 'Psikologi'
  ) {
    return `Salam hangat dari FamilyAI Assistant. Berikut langkah untuk merawat kesejahteraan emosional keluarga:

1. **Praktikkan Validasi Emosi**: Dengarkan perasaan anggota keluarga tanpa buru-buru menghakimi atau menyanggah.
2. **Waktu Luang Tanpa Gadget (*Digital Detox*)**: Jadwalkan 30 menit malam hari khusus untuk mengobrol santai tanpa diselingi layar HP.
3. **Relaksasi & Napas Dalam**: Lakukan teknik pernapasan 4-7-8 saat merasa kewalahan untuk menenangkan sistem saraf.
4. **Saling Memberi Apresiasi**: Ucapkan terima kasih dan pujian sederhana atas kontribusi harian masing-masing anggota keluarga.

Mari jaga ikatan hangat dan ruang aman bagi seluruh anggota ${familyName}!`;
  }

  // 5. Smart Home & Energy
  if (
    p.includes('rumah') ||
    p.includes('lampu') ||
    p.includes('ac') ||
    p.includes('cctv') ||
    p.includes('listrik') ||
    p.includes('otomasi') ||
    category === 'Smart Home'
  ) {
    return `Berikut panduan optimasi Smart Home untuk hunian ${familyName}:

1. **Otomasi Jadwal Pencahayaan**: Atur lampu teras dan ruang utama menyala otomatis pukul 18.00 dan mati pukul 06.00 untuk menghemat listrik.
2. **Manajemen Temperatur AC**: Set suhu AC ideal di 24–25°C dengan mode *Eco* agar ruangan tetap sejuk tanpa menguras daya listrik.
3. **Keamanan CCTV & Sensor**: Pastikan sensor pintu/jendela aktif saat malam hari dan tautkan notifikasi darurat ke HP Anda.
4. **Monitoring Energi**: Pantau modul Smart Home FamilyAI secara berkala untuk melihat grafik konsumsi daya harian.`;
  }

  // 6. General Intelligent Fallback
  return `Terima kasih atas pertanyaannya! Berikut adalah analisis dan jawaban terstruktur dari FamilyAI Assistant untuk Anda:

📌 **Poin Utama**:
- Pertanyaan Anda: "${prompt}"
- Fokus Solusi: Meningkatkan efisiensi, keharmonisan, dan kenyamanan seluruh anggota ${familyName}.

💡 **Rekomendasi Langkah Nyata**:
1. **Analisis Kebutuhan**: Petakan kebutuhan utama dan tentukan prioritas tindakan yang paling berdampak positif.
2. **Implementasi Bertahap**: Mulai dari langkah-langkah kecil yang konsisten agar mudah dijalankan seluruh anggota keluarga.
3. **Evaluasi & Penyesuaian**: Tinjau hasil secara berkala melalui catatan atau diskusi keluarga di FamilyAI Hub.

Jika ada topik spesifik atau bantuan tambahan yang Anda perlukan mengenai kesehatan, pendidikan, keuangan, atau produktivitas rumah tangga, silakan tanyakan lagi kapan saja!`;
}
