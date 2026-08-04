import { HabitModel, RewardModel, ChoreModel } from '../types/parenting';

const MOCK_HABITS: HabitModel[] = [
  {
    id: 'habit-1',
    childId: 'child-1',
    title: 'Membaca Buku 15 Menit',
    category: 'Belajar',
    frequency: 'daily',
    streak: 5,
    completionRate: 85,
    completedDates: ['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-04'],
    pointsReward: 10,
  },
  {
    id: 'habit-2',
    childId: 'child-1',
    title: 'Shalat Tepat Waktu & Doa',
    category: 'Karakter',
    frequency: 'daily',
    streak: 8,
    completionRate: 92,
    completedDates: ['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-04'],
    pointsReward: 15,
  },
  {
    id: 'habit-3',
    childId: 'child-1',
    title: 'Merapikan Tempat Tidur',
    category: 'Rutinitas',
    frequency: 'daily',
    streak: 4,
    completionRate: 78,
    completedDates: ['2026-08-02', '2026-08-03', '2026-08-04'],
    pointsReward: 10,
  },
  {
    id: 'habit-4',
    childId: 'child-2',
    title: 'Minum Susu Pagi & Malam',
    category: 'Kesehatan',
    frequency: 'daily',
    streak: 6,
    completionRate: 90,
    completedDates: ['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-04'],
    pointsReward: 10,
  },
  {
    id: 'habit-5',
    childId: 'child-2',
    title: 'Merapikan Kotak Mainan',
    category: 'Rutinitas',
    frequency: 'daily',
    streak: 3,
    completionRate: 70,
    completedDates: ['2026-08-03', '2026-08-04'],
    pointsReward: 10,
  },
];

const MOCK_REWARDS: RewardModel[] = [
  {
    id: 'rew-1',
    childId: 'child-1',
    title: 'Buku Cerita Bergambar Baru',
    pointsRequired: 100,
    isUnlocked: true,
    isClaimed: false,
    iconName: 'BookOpen',
  },
  {
    id: 'rew-2',
    childId: 'child-1',
    title: 'Tiket Ke Kebun Binatang',
    pointsRequired: 250,
    isUnlocked: false,
    isClaimed: false,
    iconName: 'Compass',
  },
  {
    id: 'rew-3',
    childId: 'child-2',
    title: 'Set Balok Plastik Seri Baru',
    pointsRequired: 80,
    isUnlocked: true,
    isClaimed: true,
    iconName: 'Box',
  },
  {
    id: 'rew-4',
    childId: 'child-2',
    title: 'Es Krim Favorit Weekend',
    pointsRequired: 50,
    isUnlocked: true,
    isClaimed: false,
    iconName: 'IceCream',
  },
];

const MOCK_CHORES: ChoreModel[] = [
  {
    id: 'chore-1',
    childId: 'child-1',
    title: 'Menyiram Tanaman Halaman Depan',
    assignedChildName: 'Aisyah',
    deadline: 'Hari ini, 17:00',
    status: 'pending',
    rewardPoints: 15,
  },
  {
    id: 'chore-2',
    childId: 'child-1',
    title: 'Membantu Mengelap Meja Makan',
    assignedChildName: 'Aisyah',
    deadline: 'Kemarin',
    status: 'completed',
    rewardPoints: 10,
  },
  {
    id: 'chore-3',
    childId: 'child-2',
    title: 'Memasukkan Sepatu Ke Rak',
    assignedChildName: 'Fathan',
    deadline: 'Hari ini, 18:00',
    status: 'pending',
    rewardPoints: 10,
  },
];

export class HabitRepository {
  private habits: HabitModel[] = MOCK_HABITS;
  private rewards: RewardModel[] = MOCK_REWARDS;
  private chores: ChoreModel[] = MOCK_CHORES;

  public async getHabits(childId?: string): Promise<HabitModel[]> {
    if (childId) {
      return this.habits.filter((h) => h.childId === childId);
    }
    return this.habits;
  }

  public async toggleHabitCompletion(habitId: string, dateStr: string): Promise<HabitModel | undefined> {
    const habit = this.habits.find((h) => h.id === habitId);
    if (!habit) return undefined;

    const isCompleted = habit.completedDates.includes(dateStr);
    if (isCompleted) {
      habit.completedDates = habit.completedDates.filter((d) => d !== dateStr);
      habit.streak = Math.max(0, habit.streak - 1);
    } else {
      habit.completedDates.push(dateStr);
      habit.streak += 1;
    }
    return habit;
  }

  public async addHabit(habit: Omit<HabitModel, 'id' | 'streak' | 'completionRate' | 'completedDates'>): Promise<HabitModel> {
    const newHabit: HabitModel = {
      ...habit,
      id: `habit-${Date.now()}`,
      streak: 0,
      completionRate: 0,
      completedDates: [],
    };
    this.habits.push(newHabit);
    return newHabit;
  }

  public async getRewards(childId?: string): Promise<RewardModel[]> {
    if (childId) {
      return this.rewards.filter((r) => r.childId === childId);
    }
    return this.rewards;
  }

  public async claimReward(rewardId: string): Promise<RewardModel | undefined> {
    const rew = this.rewards.find((r) => r.id === rewardId);
    if (rew) {
      rew.isClaimed = true;
    }
    return rew;
  }

  public async addReward(reward: Omit<RewardModel, 'id' | 'isUnlocked' | 'isClaimed'>): Promise<RewardModel> {
    const newRew: RewardModel = {
      ...reward,
      id: `rew-${Date.now()}`,
      isUnlocked: false,
      isClaimed: false,
    };
    this.rewards.push(newRew);
    return newRew;
  }

  public async getChores(childId?: string): Promise<ChoreModel[]> {
    if (childId) {
      return this.chores.filter((c) => c.childId === childId);
    }
    return this.chores;
  }

  public async toggleChoreStatus(choreId: string): Promise<ChoreModel | undefined> {
    const chore = this.chores.find((c) => c.id === choreId);
    if (chore) {
      chore.status = chore.status === 'completed' ? 'pending' : 'completed';
    }
    return chore;
  }

  public async addChore(chore: Omit<ChoreModel, 'id' | 'status'>): Promise<ChoreModel> {
    const newChore: ChoreModel = {
      ...chore,
      id: `chore-${Date.now()}`,
      status: 'pending',
    };
    this.chores.push(newChore);
    return newChore;
  }
}
