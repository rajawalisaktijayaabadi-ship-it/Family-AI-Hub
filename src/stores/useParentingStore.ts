import { create } from 'zustand';
import {
  ChildModel,
  DevelopmentModel,
  HabitModel,
  RewardModel,
  ChoreModel,
  SchoolActivity,
  FamilyActivityModel,
  ScreenTimeModel,
  LearningGoalModel,
  FamilyChallenge,
  ParentingJournalModel,
  AIParentingInsight,
} from '../types/parenting';
import { ChildService } from '../services/ChildService';
import { HabitService } from '../services/HabitService';
import { ParentingService } from '../services/ParentingService';
import { MockParentingAIService } from '../services/MockParentingAIService';

interface ParentingStoreState {
  children: ChildModel[];
  selectedChildId: string | null;
  developmentMap: Record<string, DevelopmentModel>;
  habits: HabitModel[];
  rewards: RewardModel[];
  chores: ChoreModel[];
  schoolActivities: SchoolActivity[];
  familyActivities: FamilyActivityModel[];
  screenTimeMap: Record<string, ScreenTimeModel>;
  learningGoals: LearningGoalModel[];
  familyChallenges: FamilyChallenge[];
  journals: ParentingJournalModel[];
  aiInsight: AIParentingInsight | null;
  isLoading: boolean;
  totalFamilyPoints: number;

  // Actions
  initialize: () => Promise<void>;
  setSelectedChildId: (id: string) => void;
  toggleHabit: (habitId: string) => Promise<void>;
  addHabit: (habit: Omit<HabitModel, 'id' | 'streak' | 'completionRate' | 'completedDates'>) => Promise<void>;
  claimReward: (rewardId: string) => Promise<void>;
  addReward: (reward: Omit<RewardModel, 'id' | 'isUnlocked' | 'isClaimed'>) => Promise<void>;
  toggleChore: (choreId: string) => Promise<void>;
  addChore: (chore: Omit<ChoreModel, 'id' | 'status'>) => Promise<void>;
  toggleSchoolActivity: (id: string) => Promise<void>;
  addFamilyActivity: (act: Omit<FamilyActivityModel, 'id'>) => Promise<void>;
  updateScreenTime: (childId: string, updates: Partial<ScreenTimeModel>) => Promise<void>;
  addLearningGoal: (goal: Omit<LearningGoalModel, 'id'>) => Promise<void>;
  addJournal: (journal: Omit<ParentingJournalModel, 'id' | 'createdAt'>) => Promise<void>;
  addChild: (child: Omit<ChildModel, 'id' | 'createdAt'>) => Promise<void>;
  updateDevelopment: (childId: string, updates: Partial<DevelopmentModel>) => Promise<void>;
}

const childService = new ChildService();
const habitService = new HabitService();
const parentingService = new ParentingService();

export const useParentingStore = create<ParentingStoreState>((set, get) => ({
  children: [],
  selectedChildId: null,
  developmentMap: {},
  habits: [],
  rewards: [],
  chores: [],
  schoolActivities: [],
  familyActivities: [],
  screenTimeMap: {},
  learningGoals: [],
  familyChallenges: [],
  journals: [],
  aiInsight: null,
  isLoading: false,
  totalFamilyPoints: 180,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const children = await childService.fetchChildren();
      const habits = await habitService.fetchHabits();
      const rewards = await habitService.fetchRewards();
      const chores = await habitService.fetchChores();
      const schoolActivities = await parentingService.fetchSchoolActivities();
      const familyActivities = await parentingService.fetchFamilyActivities();
      const learningGoals = await parentingService.fetchLearningGoals();
      const familyChallenges = await parentingService.fetchChallenges();
      const journals = await parentingService.fetchJournals();

      const devMap: Record<string, DevelopmentModel> = {};
      const stMap: Record<string, ScreenTimeModel> = {};

      for (const c of children) {
        const dev = await childService.fetchDevelopment(c.id);
        if (dev) devMap[c.id] = dev;

        const st = await parentingService.fetchScreenTime(c.id);
        if (st) stMap[c.id] = st;
      }

      const activeId = children.length > 0 ? children[0].id : null;
      const activeChild = children.find((c) => c.id === activeId);

      let insight: AIParentingInsight | null = null;
      if (activeChild) {
        const birthYear = new Date(activeChild.birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        insight = MockParentingAIService.getInsight(
          activeChild.nickname,
          currentYear - birthYear
        );
      }

      set({
        children,
        selectedChildId: activeId,
        developmentMap: devMap,
        habits,
        rewards,
        chores,
        schoolActivities,
        familyActivities,
        screenTimeMap: stMap,
        learningGoals,
        familyChallenges,
        journals,
        aiInsight: insight,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  setSelectedChildId: (id: string) => {
    const { children } = get();
    const child = children.find((c) => c.id === id);
    let insight: AIParentingInsight | null = null;
    if (child) {
      const birthYear = new Date(child.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      insight = MockParentingAIService.getInsight(child.nickname, currentYear - birthYear);
    }
    set({ selectedChildId: id, aiInsight: insight });
  },

  toggleHabit: async (habitId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updated = await habitService.toggleHabit(habitId, todayStr);
    if (updated) {
      const habits = await habitService.fetchHabits();
      // add points if checked today
      const isDoneToday = updated.completedDates.includes(todayStr);
      set((state) => ({
        habits,
        totalFamilyPoints: isDoneToday
          ? state.totalFamilyPoints + updated.pointsReward
          : Math.max(0, state.totalFamilyPoints - updated.pointsReward),
      }));
    }
  },

  addHabit: async (habit) => {
    await habitService.createHabit(habit);
    const habits = await habitService.fetchHabits();
    set({ habits });
  },

  claimReward: async (rewardId: string) => {
    const claimed = await habitService.claimReward(rewardId);
    if (claimed) {
      const rewards = await habitService.fetchRewards();
      set({ rewards });
    }
  },

  addReward: async (reward) => {
    await habitService.createReward(reward);
    const rewards = await habitService.fetchRewards();
    set({ rewards });
  },

  toggleChore: async (choreId: string) => {
    const updated = await habitService.toggleChore(choreId);
    if (updated) {
      const chores = await habitService.fetchChores();
      set((state) => ({
        chores,
        totalFamilyPoints:
          updated.status === 'completed'
            ? state.totalFamilyPoints + updated.rewardPoints
            : state.totalFamilyPoints,
      }));
    }
  },

  addChore: async (chore) => {
    await habitService.createChore(chore);
    const chores = await habitService.fetchChores();
    set({ chores });
  },

  toggleSchoolActivity: async (id: string) => {
    await parentingService.toggleSchoolActivity(id);
    const schoolActivities = await parentingService.fetchSchoolActivities();
    set({ schoolActivities });
  },

  addFamilyActivity: async (act) => {
    await parentingService.createFamilyActivity(act);
    const familyActivities = await parentingService.fetchFamilyActivities();
    set({ familyActivities });
  },

  updateScreenTime: async (childId: string, updates: Partial<ScreenTimeModel>) => {
    const updated = await parentingService.updateScreenTime(childId, updates);
    set((state) => ({
      screenTimeMap: { ...state.screenTimeMap, [childId]: updated },
    }));
  },

  addLearningGoal: async (goal) => {
    await parentingService.createLearningGoal(goal);
    const learningGoals = await parentingService.fetchLearningGoals();
    set({ learningGoals });
  },

  addJournal: async (journal) => {
    await parentingService.createJournal(journal);
    const journals = await parentingService.fetchJournals();
    set({ journals });
  },

  addChild: async (childData) => {
    const newChild = await childService.createChild(childData);
    const children = await childService.fetchChildren();
    set({ children, selectedChildId: newChild.id });
  },

  updateDevelopment: async (childId, updates) => {
    const updated = await childService.saveDevelopment(childId, updates);
    set((state) => ({
      developmentMap: { ...state.developmentMap, [childId]: updated },
    }));
  },
}));
