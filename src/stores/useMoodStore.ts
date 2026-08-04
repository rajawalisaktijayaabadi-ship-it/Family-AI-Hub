import { create } from 'zustand';
import { MoodModel, MoodJournalModel, AIMoodInsight } from '../types/mood';
import {
  StressModel,
  ReflectionModel,
  GratitudeModel,
  RelationshipModel,
  PsychologyRecommendation,
  RecommendationCategory,
} from '../types/psychology';
import { MoodRepository } from '../repositories/MoodRepository';
import { JournalRepository } from '../repositories/JournalRepository';
import { PsychologyRepository } from '../repositories/PsychologyRepository';
import { MoodService } from '../services/MoodService';
import { JournalService } from '../services/JournalService';
import { MockMoodAIService } from '../services/MockMoodAIService';
import { PsychologyService } from '../services/PsychologyService';
import { RecommendationService } from '../services/RecommendationService';

interface MoodStoreState {
  moods: MoodModel[];
  journals: MoodJournalModel[];
  stressHistory: StressModel[];
  reflections: ReflectionModel[];
  gratitudes: GratitudeModel[];
  relationship: RelationshipModel;
  aiInsight: AIMoodInsight;
  recommendations: PsychologyRecommendation[];
  filterTimeRange: 'today' | '7d' | '30d' | '90d' | '1y';
  filterMember: 'all' | 'Ayah' | 'Ibu' | 'Anak';
  isMoodReminderActive: boolean;
  isReflectionReminderActive: boolean;
  isBreathingReminderActive: boolean;
  isOfflineCached: boolean;

  // Actions
  loadInitialData: () => void;
  addMoodCheckIn: (
    userName: string,
    userRole: 'Ayah' | 'Ibu' | 'Anak' | 'Lainnya',
    category: string,
    intensity: number,
    colorHex: string,
    note?: string,
    tags?: string[],
    activities?: string[],
    photoUrl?: string,
    location?: string
  ) => void;
  deleteMood: (id: string) => void;
  addJournalEntry: (
    userName: string,
    title: string,
    note: string,
    tags?: string[],
    activity?: string,
    photoUrl?: string,
    location?: string,
    moodId?: string
  ) => void;
  deleteJournalEntry: (id: string) => void;
  submitStressTest: (userName: string, answers: Record<string, number>) => void;
  addReflection: (
    userName: string,
    dailyReflection: string,
    achievements: string[],
    lessonsLearned: string
  ) => void;
  addGratitude: (userName: string, content: string, isSharedWithFamily: boolean) => void;
  setFilterTimeRange: (range: 'today' | '7d' | '30d' | '90d' | '1y') => void;
  setFilterMember: (member: 'all' | 'Ayah' | 'Ibu' | 'Anak') => void;
  toggleMoodReminder: () => void;
  toggleReflectionReminder: () => void;
  toggleBreathingReminder: () => void;
  getFilteredRecommendations: (category?: RecommendationCategory) => PsychologyRecommendation[];
}

export const useMoodStore = create<MoodStoreState>((set, get) => ({
  moods: [],
  journals: [],
  stressHistory: [],
  reflections: [],
  gratitudes: [],
  relationship: {
    communicationScore: 88,
    familyBondScore: 92,
    qualityTimeHours: 14.5,
    trustScore: 95,
    updatedAt: new Date().toISOString(),
  },
  aiInsight: {
    summary: 'Sistem siap menganalisis suasana emosi keluarga.',
    triggers: [],
    recommendations: [],
    motivationQuote: 'Keharmonisan keluarga dimulai dari saling memahami emosi.',
    reflectionPrompt: 'Apa momen paling membahagiakan bersama keluarga hari ini?',
  },
  recommendations: [],
  filterTimeRange: 'today',
  filterMember: 'all',
  isMoodReminderActive: true,
  isReflectionReminderActive: true,
  isBreathingReminderActive: false,
  isOfflineCached: true,

  loadInitialData: () => {
    const moods = MoodRepository.getAllMoods();
    const journals = JournalRepository.getAllJournals();
    const stressHistory = PsychologyRepository.getStressHistory();
    const reflections = PsychologyRepository.getReflections();
    const gratitudes = PsychologyRepository.getGratitudes();
    const relationship = PsychologyRepository.getRelationship();
    const aiInsight = MockMoodAIService.generateMoodInsight(moods);
    const recommendations = RecommendationService.getAllRecommendations();

    set({
      moods,
      journals,
      stressHistory,
      reflections,
      gratitudes,
      relationship,
      aiInsight,
      recommendations,
    });
  },

  addMoodCheckIn: (
    userName,
    userRole,
    category,
    intensity,
    colorHex,
    note,
    tags = [],
    activities = [],
    photoUrl,
    location
  ) => {
    const updatedMoods = MoodService.addMoodCheckIn(
      userName,
      userRole,
      category,
      intensity,
      colorHex,
      note,
      tags,
      activities,
      photoUrl,
      location
    );
    const newInsight = MockMoodAIService.generateMoodInsight(updatedMoods);

    set({
      moods: updatedMoods,
      aiInsight: newInsight,
    });
  },

  deleteMood: (id) => {
    const updated = MoodRepository.deleteMood(id);
    const newInsight = MockMoodAIService.generateMoodInsight(updated);
    set({ moods: updated, aiInsight: newInsight });
  },

  addJournalEntry: (
    userName,
    title,
    note,
    tags = [],
    activity = 'Lainnya',
    photoUrl,
    location,
    moodId
  ) => {
    const updated = JournalService.addJournal(
      userName,
      title,
      note,
      tags,
      activity,
      photoUrl,
      location,
      moodId
    );
    set({ journals: updated });
  },

  deleteJournalEntry: (id) => {
    const updated = JournalService.deleteJournal(id);
    set({ journals: updated });
  },

  submitStressTest: (userName, answers) => {
    const updatedHistory = PsychologyService.submitStressTest(userName, answers);
    set({ stressHistory: updatedHistory });
  },

  addReflection: (userName, dailyReflection, achievements, lessonsLearned) => {
    const updated = PsychologyService.saveReflection(
      userName,
      dailyReflection,
      achievements,
      lessonsLearned
    );
    set({ reflections: updated });
  },

  addGratitude: (userName, content, isSharedWithFamily) => {
    const updated = PsychologyService.saveGratitude(userName, content, isSharedWithFamily);
    set({ gratitudes: updated });
  },

  setFilterTimeRange: (range) => set({ filterTimeRange: range }),
  setFilterMember: (member) => set({ filterMember: member }),

  toggleMoodReminder: () => set((state) => ({ isMoodReminderActive: !state.isMoodReminderActive })),
  toggleReflectionReminder: () =>
    set((state) => ({ isReflectionReminderActive: !state.isReflectionReminderActive })),
  toggleBreathingReminder: () =>
    set((state) => ({ isBreathingReminderActive: !state.isBreathingReminderActive })),

  getFilteredRecommendations: (category) => {
    if (!category) return RecommendationService.getAllRecommendations();
    return RecommendationService.getRecommendationsByCategory(category);
  },
}));
