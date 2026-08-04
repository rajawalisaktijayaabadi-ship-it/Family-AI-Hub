import {
  HealthProfileModel,
  HealthCheckupModel,
  WellnessModel,
  SleepModel,
  WaterModel,
  HealthGoalModel,
} from '../types/health';

const initialHealthProfiles: HealthProfileModel[] = [
  {
    id: 'hp-1',
    memberId: 'm-1',
    memberName: 'Ayah Hendra',
    bloodType: 'O+',
    heightCm: 173,
    weightKg: 68,
    bmi: 22.7,
    bmiCategory: 'Normal',
    allergies: ['Debu', 'Seafood'],
    medicalHistory: ['Hipertensi Ringan (Terkontrol)'],
    surgeries: [],
    hospitalizations: [],
    notes: 'Rutin olahraga pagi dan cek tensi berkala.',
  },
  {
    id: 'hp-2',
    memberId: 'm-2',
    memberName: 'Ibu Ratna',
    bloodType: 'A+',
    heightCm: 160,
    weightKg: 55,
    bmi: 21.5,
    bmiCategory: 'Normal',
    allergies: ['Dingin'],
    medicalHistory: ['Anemia Ringan (2023)'],
    surgeries: ['Operasi Caesar (2017)'],
    hospitalizations: ['Rawat Inap Demam Berdarah (2021)'],
    notes: 'Menjaga asupan zat besi dan tidur cukup.',
  },
  {
    id: 'hp-3',
    memberId: 'm-3',
    memberName: 'Rayhan',
    bloodType: 'O+',
    heightCm: 132,
    weightKg: 28,
    bmi: 16.1,
    bmiCategory: 'Normal',
    allergies: ['Kacang Tanah'],
    medicalHistory: ['Asma Anak (Dulu)'],
    surgeries: [],
    hospitalizations: [],
    notes: 'Anak aktif suka berenang.',
  },
];

const initialCheckups: HealthCheckupModel[] = [
  {
    id: 'hc-1',
    memberId: 'm-1',
    date: '2026-08-01',
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    bloodSugarMgDl: 95,
    cholesterolMgDl: 180,
    uricAcidMgDl: 5.4,
    oxygenSaturationPercent: 98,
  },
  {
    id: 'hc-2',
    memberId: 'm-2',
    date: '2026-08-02',
    bloodPressureSystolic: 115,
    bloodPressureDiastolic: 75,
    bloodSugarMgDl: 88,
    cholesterolMgDl: 172,
    uricAcidMgDl: 4.2,
    oxygenSaturationPercent: 99,
  },
];

const initialWellness: WellnessModel[] = [
  {
    id: 'well-1',
    memberId: 'm-1',
    date: '2026-08-04',
    dailySteps: 8420,
    stepTarget: 10000,
    caloriesBurned: 450,
    activeMinutes: 45,
    exerciseType: 'Jogging Pagi',
  },
];

const initialSleep: SleepModel[] = [
  {
    id: 'slp-1',
    memberId: 'm-1',
    date: '2026-08-04',
    sleepTime: '22:15',
    wakeTime: '05:30',
    durationHours: 7.25,
    quality: 'Sangat Baik',
  },
];

const initialWater: WaterModel[] = [
  {
    id: 'wtr-1',
    memberId: 'm-1',
    date: '2026-08-04',
    targetMl: 2500,
    consumedMl: 1850,
  },
];

const initialGoals: HealthGoalModel[] = [
  {
    id: 'hg-1',
    memberId: 'm-1',
    targetWeightKg: 65,
    targetDailySteps: 10000,
    targetSleepHours: 7.5,
    targetWaterMl: 2500,
    targetDailyCalories: 2100,
  },
];

export class HealthRepository {
  private profiles: HealthProfileModel[] = [...initialHealthProfiles];
  private checkups: HealthCheckupModel[] = [...initialCheckups];
  private wellnessList: WellnessModel[] = [...initialWellness];
  private sleepList: SleepModel[] = [...initialSleep];
  private waterList: WaterModel[] = [...initialWater];
  private goals: HealthGoalModel[] = [...initialGoals];

  async getHealthProfiles(): Promise<HealthProfileModel[]> {
    return this.profiles;
  }

  async updateHealthProfile(profile: HealthProfileModel): Promise<HealthProfileModel> {
    const idx = this.profiles.findIndex((p) => p.id === profile.id);
    if (idx >= 0) {
      this.profiles[idx] = profile;
    } else {
      this.profiles.push(profile);
    }
    return profile;
  }

  async getCheckups(memberId: string): Promise<HealthCheckupModel[]> {
    return this.checkups.filter((c) => c.memberId === memberId);
  }

  async addCheckup(checkup: Omit<HealthCheckupModel, 'id'>): Promise<HealthCheckupModel> {
    const newHc: HealthCheckupModel = {
      ...checkup,
      id: `hc-${Date.now()}`,
    };
    this.checkups.unshift(newHc);
    return newHc;
  }

  async getWellness(memberId: string): Promise<WellnessModel | undefined> {
    return this.wellnessList.find((w) => w.memberId === memberId);
  }

  async addWellnessSteps(memberId: string, steps: number): Promise<WellnessModel> {
    let item = this.wellnessList.find((w) => w.memberId === memberId);
    if (!item) {
      item = {
        id: `well-${Date.now()}`,
        memberId,
        date: new Date().toISOString().split('T')[0],
        dailySteps: steps,
        stepTarget: 10000,
        caloriesBurned: Math.round(steps * 0.04),
        activeMinutes: Math.round(steps / 150),
        exerciseType: 'Jalan Santai',
      };
      this.wellnessList.push(item);
    } else {
      item.dailySteps += steps;
      item.caloriesBurned += Math.round(steps * 0.04);
      item.activeMinutes += Math.round(steps / 150);
    }
    return item;
  }

  async getSleep(memberId: string): Promise<SleepModel | undefined> {
    return this.sleepList.find((s) => s.memberId === memberId);
  }

  async getWater(memberId: string): Promise<WaterModel | undefined> {
    return this.waterList.find((w) => w.memberId === memberId);
  }

  async addWater(memberId: string, amountMl: number): Promise<WaterModel> {
    let item = this.waterList.find((w) => w.memberId === memberId);
    if (!item) {
      item = {
        id: `wtr-${Date.now()}`,
        memberId,
        date: new Date().toISOString().split('T')[0],
        targetMl: 2500,
        consumedMl: amountMl,
      };
      this.waterList.push(item);
    } else {
      item.consumedMl += amountMl;
    }
    return item;
  }

  async getGoal(memberId: string): Promise<HealthGoalModel | undefined> {
    return this.goals.find((g) => g.memberId === memberId);
  }

  async saveGoal(goal: HealthGoalModel): Promise<HealthGoalModel> {
    const idx = this.goals.findIndex((g) => g.memberId === goal.memberId);
    if (idx >= 0) {
      this.goals[idx] = goal;
    } else {
      this.goals.push(goal);
    }
    return goal;
  }
}
