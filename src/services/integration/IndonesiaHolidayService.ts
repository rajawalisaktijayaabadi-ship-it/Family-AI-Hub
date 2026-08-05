import { HolidayModel } from '../../types/integration';

export class IndonesiaHolidayService {
  private static holidays: HolidayModel[] = [
    {
      date: '2026-01-01',
      name: 'Tahun Baru 2026 Masehi',
      type: 'Hari Libur Nasional',
      description: 'Perayaan tahun baru Masehi.',
    },
    {
      date: '2026-03-20',
      name: 'Hari Raya Idul Fitri 1447 H',
      type: 'Hari Libur Nasional',
      description: 'Perayaan Idul Fitri umat Islam.',
    },
    {
      date: '2026-03-21',
      name: 'Hari Raya Idul Fitri 1447 H (Hari Kedua)',
      type: 'Hari Libur Nasional',
      description: 'Hari kedua Idul Fitri.',
    },
    {
      date: '2026-03-22',
      name: 'Cuti Bersama Idul Fitri 1447 H',
      type: 'Cuti Bersama',
      description: 'Cuti bersama pemerintah Indonesia.',
    },
    {
      date: '2026-05-01',
      name: 'Hari Buruh Internasional',
      type: 'Hari Libur Nasional',
      description: 'May Day.',
    },
    {
      date: '2026-08-17',
      name: 'Hari Kemerdekaan Republik Indonesia',
      type: 'Hari Libur Nasional',
      description: 'HUT Ke-81 RI.',
    },
    {
      date: '2026-12-25',
      name: 'Hari Raya Natal',
      type: 'Hari Libur Nasional',
      description: 'Perayaan Natal.',
    },
  ];

  static getHolidays(): HolidayModel[] {
    return this.holidays;
  }
}
