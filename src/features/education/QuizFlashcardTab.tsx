import React, { useState } from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import { HelpCircle, Layers, BookOpenCheck, Plus, CheckCircle, RotateCw, Trophy } from 'lucide-react';

interface Props {
  onOpenAddFlashcard: () => void;
}

export const QuizFlashcardTab: React.FC<Props> = ({ onOpenAddFlashcard }) => {
  const { quizzes, flashcards, courses } = useEducationStore();
  const [activeSub, setActiveSub] = useState<'quiz' | 'flashcard' | 'course'>('quiz');

  // Interactive Quiz Mock State
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Interactive Flashcard Flip State
  const [currentFcIdx, setCurrentFcIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const mockQuestions = [
    {
      q: 'Jika 3x + 5 = 20, berapakah nilai x?',
      options: ['3', '5', '7', '15'],
      answer: 1, // '5'
    },
    {
      q: 'Organel sel yang berfungsi sebagai tempat terjadinya respirasi sel adalah?',
      options: ['Ribosom', 'Mitokondria', 'Kloroplas', 'Lisosom'],
      answer: 1, // 'Mitokondria'
    },
  ];

  const handleSelectAnswer = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNextQuestion = () => {
    if (selectedOption === mockQuestions[currentQuestionIdx].answer) {
      setQuizScore((prev) => (prev || 0) + 50);
    } else {
      setQuizScore((prev) => (prev || 0));
    }

    if (currentQuestionIdx + 1 < mockQuestions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
    } else {
      // Finished
      setActiveQuizId(null);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Sub Tabs Header */}
      <div className="flex rounded-2xl bg-slate-100 p-1">
        <button
          onClick={() => setActiveSub('quiz')}
          className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
            activeSub === 'quiz' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          Kuis Latihan ({quizzes.length})
        </button>
        <button
          onClick={() => setActiveSub('flashcard')}
          className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
            activeSub === 'flashcard' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          Flashcard ({flashcards.length})
        </button>
        <button
          onClick={() => setActiveSub('course')}
          className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
            activeSub === 'course' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
          }`}
        >
          Course ({courses.length})
        </button>
      </div>

      {activeSub === 'quiz' && (
        <div className="space-y-4">
          {activeQuizId ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-xs font-extrabold text-indigo-600">
                  Soal {currentQuestionIdx + 1} dari {mockQuestions.length}
                </span>
                <button
                  onClick={() => setActiveQuizId(null)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Keluar Kuis
                </button>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {mockQuestions[currentQuestionIdx].q}
              </h4>

              <div className="space-y-2">
                {mockQuestions[currentQuestionIdx].options.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left rounded-2xl border p-3.5 text-xs font-bold transition ${
                      selectedOption === idx
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm'
                        : 'border-slate-100 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  disabled={selectedOption === null}
                  onClick={handleNextQuestion}
                  className="rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md disabled:opacity-50"
                >
                  {currentQuestionIdx + 1 === mockQuestions.length ? 'Selesai Kuis' : 'Soal Berikutnya'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {quizScore !== null && (
                <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-emerald-600" />
                    <span>Hasil Kuis Terakhir Anda: <strong>{quizScore} / 100</strong></span>
                  </div>
                  <button onClick={() => setQuizScore(null)} className="text-[11px] font-bold text-emerald-700 underline">Tutup</button>
                </div>
              )}

              {quizzes.map((qz) => (
                <div key={qz.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between text-xs">
                  <div>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                      {qz.subjectCategory} • {qz.difficulty}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{qz.title}</h4>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {qz.totalQuestions} Soal • Skor Terakhir: <strong className="text-indigo-600">{qz.lastScore}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveQuizId(qz.id);
                      setCurrentQuestionIdx(0);
                      setSelectedOption(null);
                      setQuizScore(0);
                    }}
                    className="rounded-xl bg-indigo-600 px-3.5 py-2 font-bold text-white shadow-sm hover:bg-indigo-700"
                  >
                    Mulai Kuis
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSub === 'flashcard' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Kartu Belajar Cepat (Flashcard)</h3>
            <button
              onClick={onOpenAddFlashcard}
              className="flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Tambah Flashcard</span>
            </button>
          </div>

          {flashcards.length > 0 && (
            <div className="space-y-4">
              {/* Interactive Flippable Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[180px] rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-950 p-6 text-white shadow-xl flex flex-col items-center justify-center text-center space-y-3 relative border border-indigo-500/30 transition transform hover:scale-[1.01]"
              >
                <span className="absolute top-4 left-4 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-indigo-200">
                  {flashcards[currentFcIdx].subjectName} ({flashcards[currentFcIdx].category})
                </span>

                <span className="absolute top-4 right-4 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <RotateCw className="h-3.5 w-3.5" />
                  Klik kartu untuk balik
                </span>

                <div className="pt-4">
                  <p className="text-[10px] text-indigo-300 font-bold tracking-widest uppercase">
                    {isFlipped ? 'JAWABAN / ARTI' : 'PERTANYAAN / ISTILAH'}
                  </p>
                  <h3 className="text-lg font-black text-white mt-1">
                    {isFlipped ? flashcards[currentFcIdx].backText : flashcards[currentFcIdx].frontText}
                  </h3>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <button
                  disabled={currentFcIdx === 0}
                  onClick={() => {
                    setCurrentFcIdx(currentFcIdx - 1);
                    setIsFlipped(false);
                  }}
                  className="rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-700 disabled:opacity-40"
                >
                  Sebelumnya
                </button>
                <span className="font-bold text-slate-500">
                  {currentFcIdx + 1} dari {flashcards.length}
                </span>
                <button
                  disabled={currentFcIdx === flashcards.length - 1}
                  onClick={() => {
                    setCurrentFcIdx(currentFcIdx + 1);
                    setIsFlipped(false);
                  }}
                  className="rounded-xl bg-indigo-600 px-4 py-2 font-bold text-white disabled:opacity-40"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSub === 'course' && (
        <div className="space-y-3">
          {courses.map((crs) => {
            const pct = Math.round((crs.completedModules / crs.totalModules) * 100);
            return (
              <div key={crs.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      {crs.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{crs.title}</h4>
                    <p className="text-slate-500 text-[11px]">{crs.providerPlaceholder}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600">
                    <span>Progres: {crs.completedModules} dari {crs.totalModules} Modul</span>
                    <span className="text-indigo-600">{pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
