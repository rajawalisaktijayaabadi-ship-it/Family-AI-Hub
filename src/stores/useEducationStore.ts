import { create } from 'zustand';
import {
  StudentModel,
  SchoolModel,
  SubjectModel,
  HomeworkModel,
  ExamModel,
  StudyPlanModel,
  ReadingModel,
  CourseModel,
  QuizModel,
  FlashcardModel,
  LearningGoalModel,
  KnowledgeModel,
  CertificateModel,
  AchievementModel,
  LearningReportModel,
  AILearningInsight,
} from '../types/education';
import { EducationService } from '../services/EducationService';
import { HomeworkService } from '../services/HomeworkService';
import { LearningService } from '../services/LearningService';
import { KnowledgeService } from '../services/KnowledgeService';
import { MockEducationAIService } from '../services/MockEducationAIService';

interface EducationState {
  students: StudentModel[];
  selectedStudent: StudentModel | null;
  schools: SchoolModel[];
  subjects: SubjectModel[];
  homeworks: HomeworkModel[];
  exams: ExamModel[];
  studyPlans: StudyPlanModel[];
  readings: ReadingModel[];
  courses: CourseModel[];
  quizzes: QuizModel[];
  flashcards: FlashcardModel[];
  goals: LearningGoalModel[];
  knowledgeArticles: KnowledgeModel[];
  certificates: CertificateModel[];
  achievements: AchievementModel[];
  report: LearningReportModel | null;
  aiInsight: AILearningInsight | null;
  isLoading: boolean;
  searchQuery: string;

  // Actions
  initialize: () => Promise<void>;
  setSelectedStudentId: (studentId: string) => void;
  setSearchQuery: (query: string) => void;
  addStudent: (student: Omit<StudentModel, 'id'>) => Promise<void>;
  addSubject: (subject: Omit<SubjectModel, 'id'>) => Promise<void>;
  addHomework: (hw: Omit<HomeworkModel, 'id'>) => Promise<void>;
  updateHomeworkStatus: (id: string, status: HomeworkModel['status']) => Promise<void>;
  addExam: (exam: Omit<ExamModel, 'id'>) => Promise<void>;
  addStudyPlan: (plan: Omit<StudyPlanModel, 'id'>) => Promise<void>;
  toggleStudyPlanCompleted: (id: string) => Promise<void>;
  addReading: (reading: Omit<ReadingModel, 'id'>) => Promise<void>;
  addFlashcard: (card: Omit<FlashcardModel, 'id'>) => Promise<void>;
  addGoal: (goal: Omit<LearningGoalModel, 'id'>) => Promise<void>;
  addCertificate: (cert: Omit<CertificateModel, 'id'>) => Promise<void>;
  toggleKnowledgeBookmark: (id: string) => Promise<void>;
}

const educationService = new EducationService();
const homeworkService = new HomeworkService();
const learningService = new LearningService();
const knowledgeService = new KnowledgeService();

export const useEducationStore = create<EducationState>((set, get) => ({
  students: [],
  selectedStudent: null,
  schools: [],
  subjects: [],
  homeworks: [],
  exams: [],
  studyPlans: [],
  readings: [],
  courses: [],
  quizzes: [],
  flashcards: [],
  goals: [],
  knowledgeArticles: [],
  certificates: [],
  achievements: [],
  report: null,
  aiInsight: null,
  isLoading: false,
  searchQuery: '',

  initialize: async () => {
    set({ isLoading: true });
    try {
      const students = await educationService.fetchStudents();
      const selectedStudent = students[0] || null;
      const schools = await educationService.fetchSchools();
      const subjects = await educationService.fetchSubjects();
      const homeworks = await homeworkService.fetchHomeworks();
      const exams = await homeworkService.fetchExams();
      const studyPlans = await learningService.fetchStudyPlans();
      const readings = await learningService.fetchReadings();
      const courses = await learningService.fetchCourses();
      const quizzes = await learningService.fetchQuizzes();
      const flashcards = await learningService.fetchFlashcards();
      const goals = await learningService.fetchGoals();
      const certificates = await learningService.fetchCertificates();
      const achievements = await learningService.fetchAchievements();
      const knowledgeArticles = await knowledgeService.fetchArticles();

      let report: LearningReportModel | null = null;
      let aiInsight: AILearningInsight | null = null;

      if (selectedStudent) {
        const result = MockEducationAIService.generateLearningInsight(
          selectedStudent,
          homeworks,
          exams,
          readings,
          quizzes
        );
        report = result.report;
        aiInsight = result.insight;
      }

      set({
        students,
        selectedStudent,
        schools,
        subjects,
        homeworks,
        exams,
        studyPlans,
        readings,
        courses,
        quizzes,
        flashcards,
        goals,
        certificates,
        achievements,
        knowledgeArticles,
        report,
        aiInsight,
        isLoading: false,
      });
    } catch (e) {
      console.error('Failed initializing education store:', e);
      set({ isLoading: false });
    }
  },

  setSelectedStudentId: (studentId) => {
    const { students, homeworks, exams, readings, quizzes } = get();
    const student = students.find((s) => s.id === studentId) || null;
    if (student) {
      const { report, insight } = MockEducationAIService.generateLearningInsight(
        student,
        homeworks,
        exams,
        readings,
        quizzes
      );
      set({ selectedStudent: student, report, aiInsight: insight });
    }
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  addStudent: async (student) => {
    const newStudent = await educationService.addStudent(student);
    set((state) => ({ students: [...state.students, newStudent] }));
  },

  addSubject: async (subject) => {
    const newSub = await educationService.addSubject(subject);
    set((state) => ({ subjects: [newSub, ...state.subjects] }));
  },

  addHomework: async (hw) => {
    const newHw = await homeworkService.addHomework(hw);
    set((state) => {
      const updatedHw = [newHw, ...state.homeworks];
      let report = state.report;
      let insight = state.aiInsight;
      if (state.selectedStudent) {
        const res = MockEducationAIService.generateLearningInsight(
          state.selectedStudent,
          updatedHw,
          state.exams,
          state.readings,
          state.quizzes
        );
        report = res.report;
        insight = res.insight;
      }
      return { homeworks: updatedHw, report, aiInsight: insight };
    });
  },

  updateHomeworkStatus: async (id, status) => {
    const updated = await homeworkService.updateHomeworkStatus(id, status);
    if (updated) {
      set((state) => {
        const updatedHw = state.homeworks.map((h) => (h.id === id ? updated : h));
        let report = state.report;
        let insight = state.aiInsight;
        if (state.selectedStudent) {
          const res = MockEducationAIService.generateLearningInsight(
            state.selectedStudent,
            updatedHw,
            state.exams,
            state.readings,
            state.quizzes
          );
          report = res.report;
          insight = res.insight;
        }
        return { homeworks: updatedHw, report, aiInsight: insight };
      });
    }
  },

  addExam: async (exam) => {
    const newExam = await homeworkService.addExam(exam);
    set((state) => ({ exams: [newExam, ...state.exams] }));
  },

  addStudyPlan: async (plan) => {
    const newPlan = await learningService.addStudyPlan(plan);
    set((state) => ({ studyPlans: [newPlan, ...state.studyPlans] }));
  },

  toggleStudyPlanCompleted: async (id) => {
    const updated = await learningService.toggleStudyPlanCompleted(id);
    if (updated) {
      set((state) => ({
        studyPlans: state.studyPlans.map((p) => (p.id === id ? updated : p)),
      }));
    }
  },

  addReading: async (reading) => {
    const newReading = await learningService.addReading(reading);
    set((state) => ({ readings: [newReading, ...state.readings] }));
  },

  addFlashcard: async (card) => {
    const newFc = await learningService.addFlashcard(card);
    set((state) => ({ flashcards: [newFc, ...state.flashcards] }));
  },

  addGoal: async (goal) => {
    const newGoal = await learningService.addGoal(goal);
    set((state) => ({ goals: [newGoal, ...state.goals] }));
  },

  addCertificate: async (cert) => {
    const newCert = await learningService.addCertificate(cert);
    set((state) => ({ certificates: [newCert, ...state.certificates] }));
  },

  toggleKnowledgeBookmark: async (id) => {
    const updated = await knowledgeService.toggleBookmark(id);
    if (updated) {
      set((state) => ({
        knowledgeArticles: state.knowledgeArticles.map((k) => (k.id === id ? updated : k)),
      }));
    }
  },
}));
