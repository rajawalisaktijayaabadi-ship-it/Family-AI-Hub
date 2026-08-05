import {
  StudentModel,
  HomeworkModel,
  ExamModel,
  ReadingModel,
  QuizModel,
  AILearningInsight,
  LearningReportModel,
} from '../types/education';

export class MockEducationAIService {
  static generateLearningInsight(
    student: StudentModel,
    homeworks: HomeworkModel[],
    exams: ExamModel[],
    readings: ReadingModel[],
    quizzes: QuizModel[]
  ): { report: LearningReportModel; insight: AILearningInsight } {
    const completedHomeworks = homeworks.filter((h) => h.status === 'Selesai').length;
    const totalHomeworks = homeworks.length;
    const homeworkCompletionRate = totalHomeworks > 0 ? Math.round((completedHomeworks / totalHomeworks) * 100) : 100;

    const completedReadings = readings.filter((r) => r.isCompleted).length;

    const quizScores = quizzes.filter((q) => q.lastScore !== undefined).map((q) => q.lastScore || 0);
    const avgQuizScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 85;

    const report: LearningReportModel = {
      studentId: student.id,
      totalStudyHoursThisWeek: 14.5,
      homeworkCompletionRatePercent: homeworkCompletionRate,
      averageQuizScore: avgQuizScore,
      booksReadCount: completedReadings,
      achievementsCount: 5,
    };

    const recs: string[] = [];
    const pendingHomeworks = homeworks.filter((h) => h.status !== 'Selesai');
    if (pendingHomeworks.length > 0) {
      recs.push(`Fokus selesaikan tugas ${pendingHomeworks[0].subjectName}: "${pendingHomeworks[0].title}" sebelum tenggat ${pendingHomeworks[0].deadlineDate}.`);
    } else {
      recs.push('Seluruh tugas sekolah telah selesai tepat waktu. Kerja bagus!');
    }

    if (exams.length > 0) {
      const upcomingExam = exams[0];
      recs.push(`Persiapkan latihan soal untuk ${upcomingExam.examType} ${upcomingExam.subjectName} pada ${upcomingExam.examDate}. Target nilai: ${upcomingExam.targetScore}.`);
    }

    const readingSuggestions: string[] = [
      'Laskar Pelangi - Andrea Hirata (Literasi & Pembentukan Karakter)',
      'Sains Populer: Ensiklopedia Alam Semesta untuk Pelajar',
      'Teknik Belajar Cepat & Pemetaan Pikiran (Mind Mapping) untuk Siswa',
    ];

    const learningTips: string[] = [
      'Gunakan teknik Pomodoro: 25 menit fokus belajar tanpa gadget, lalu istirahat 5 menit.',
      'Buat rangkuman visual atau flashcard untuk rumus penting sebelum ujian.',
      'Ulas kembali materi pelajaran di malam hari selama 15 menit agar daya ingat jangka panjang meningkat.',
    ];

    return {
      report,
      insight: {
        learningSummary: `Progres belajar ${student.name} (${student.gradeLevel}) sangat konsisten minggu ini dengan tingkat penyelesaian tugas ${homeworkCompletionRate}% dan rata-rata skor kuis ${avgQuizScore}.`,
        studyRecommendations: recs,
        readingSuggestions,
        motivationQuote: 'Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan Anda dapat mengubah dunia. - Nelson Mandela',
        learningTips,
      },
    };
  }
}
