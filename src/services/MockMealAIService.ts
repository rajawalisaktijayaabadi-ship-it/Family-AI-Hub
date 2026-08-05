import {
  MealPlanModel,
  EventModel,
  AICalendarPlannerInsight,
  RecipeModel,
} from '../types/calendar';

export class MockMealAIService {
  static generatePlannerInsight(
    events: EventModel[],
    mealPlans: MealPlanModel[]
  ): AICalendarPlannerInsight {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayEvents = events.filter((e) => e.date === todayStr);
    const todayMeals = mealPlans.filter((m) => m.date === todayStr);

    let summary = `Hari ini terdapat ${todayEvents.length} agenda keluarga dan ${todayMeals.length} perencanaan menu makanan.`;
    if (todayEvents.length > 3) {
      summary += ' Jadwal lumayan padat, pastikan mengatur jeda istirahat dan hidrasi yang cukup.';
    } else {
      summary += ' Jadwal hari ini relatif longgar dan cocok untuk sesi produktif atau quality time keluarga.';
    }

    const mealSuggestions = [
      'Sarapan: Oatmeal Pisang Madu & Telur Rebus (Energi Tahan Lama)',
      'Makan Siang: Sup Ayam Kampung Bumbu Jahe & Tempe Goreng Khas Indonesia',
      'Makan Malam: Tumis Buncis Daging Cincang & Buah Pepaya Segar',
      'Snack Anak: Smoothies Buah Naga & Biskuit Gandum',
    ];

    const scheduleSuggestions = [
      'Alokasikan waktu 30 menit di pagi hari untuk review daftar belanja & persiapan menu.',
      'Selesaikan agenda prioritas utama sebelum jam 12:00 siang.',
      'Gunakan sesi sore (16:30 - 17:30) untuk olahraga ringan atau berjalan santai bersama anak.',
    ];

    const activitySuggestions = [
      'Lakukan sesi dongeng/membaca buku bersama anak jam 19:30.',
      'Sesi pengecekan stok bahan makanan di kulkas agar tidak ada sayur yang terbuang.',
      'Pukul 21:00: Waktu keluarga off gadget & persiapan tidur berkualitas.',
    ];

    const motivationQuote =
      'Keteraturan dan perencanaan yang baik hari ini adalah investasi kedamaian keluarga di masa depan.';

    return {
      dailySummary: summary,
      mealSuggestions,
      scheduleSuggestions,
      activitySuggestions,
      motivationQuote,
    };
  }

  static getRecommendedRecipes(): RecipeModel[] {
    return [
      {
        id: 'rec-1',
        name: 'Sup Ayam Kampung Bumbu Jahe Penambah Imun',
        category: 'Healthy Menu',
        ingredients: ['500g Daging Ayam', '2 Wortel', '1 Kentang', 'Jahe 2cm', 'Bawang Putih 4 siung', 'Daun Bawang & Seledri'],
        steps: [
          'Rebus ayam kampung hingga empuk dan mengeluarkan kaldu gurih.',
          'Tumis bawang putih dan jahe yang dimemarkan hingga wangi.',
          'Masukkan wortel dan kentang ke dalam kuah kaldu, tambahkan bumbu tumis.',
          'Bumbui garam, merica, dan taburi daun bawang. Sajikan hangat.',
        ],
        durationMinutes: 35,
        calories: 320,
        photoUrl: '',
      },
      {
        id: 'rec-2',
        name: 'Nasi Goreng Sayur Pelangi Favorit Anak',
        category: 'Kids Menu',
        ingredients: ['3 Piring Nasi', 'Jagung Manis', 'Wortel Dadu', 'Buncis Potong', '2 Telur Ayam', 'Kecap Manis Secukupnya'],
        steps: [
          'Orak-arik telur di wajan hangat hingga matang.',
          'Tumis bumbu halus dan masukkan sayuran pelangi hingga sedikit layu.',
          'Masukkan nasi, bumbui kecap manis dan sedikit garam.',
          'Aduk rata dengan api sedang hingga harum dan matang merata.',
        ],
        durationMinutes: 20,
        calories: 410,
        photoUrl: '',
      },
      {
        id: 'rec-3',
        name: 'Tumis Tempe Tahu Bumbu Kecap Hemat',
        category: 'Budget Menu',
        ingredients: ['1 Papan Tempe', '2 Kotak Tahu', '3 Cabe Merah', '4 Bawang Merah', 'Kecap Manis & Saus Tiram'],
        steps: [
          'Potong tempe dan tahu menjadi dadu kecil lalu goreng setengah matang.',
          'Tumis irisan bawang dan cabe hingga wangi.',
          'Masukkan tahu tempe, tambahkan kecap manis dan sedikit air.',
          'Masak hingga kuah meresap dan bumbu mengental.',
        ],
        durationMinutes: 15,
        calories: 280,
        photoUrl: '',
      },
      {
        id: 'rec-4',
        name: 'Omelet Telur Buncis Cepat Saji (Quick Meal)',
        category: 'Quick Meal',
        ingredients: ['3 Telur Ayam', '5 Buncis Iris Halus', '1/2 Tomat Potong Dadu', 'Garam & Merica Bubuk'],
        steps: [
          'Kocok telur bersama irisan buncis dan tomat.',
          'Bumbui dengan garam dan merica secukupnya.',
          'Goreng di wajan anti lengket dengan sedikit minyak hingga matang keemasan.',
        ],
        durationMinutes: 10,
        calories: 230,
        photoUrl: '',
      },
    ];
  }
}
