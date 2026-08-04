import React, { useState } from 'react';
import { useMoodStore } from '../../stores/useMoodStore';
import { useToastStore } from '../../stores/useToastStore';
import { Activity, ShieldCheck, CheckCircle2, History, RotateCcw, AlertCircle } from 'lucide-react';

const QUESTIONS = [
  { id: 'q1', text: 'Seberapa sering Anda merasa cemas, tertekan, atau kewalahan oleh pekerjaan/tugas harian?' },
  { id: 'q2', text: 'Seberapa sering Anda mengalami gangguan tidur atau merasa lelah saat bangun pagi?' },
  { id: 'q3', text: 'Seberapa sering Anda merasa sulit berkonsentrasi atau mudah emosi terhadap keluarga?' },
  { id: 'q4', text: 'Seberapa sering Anda merasa kurang memiliki waktu luang pribadi untuk beristirahat?' },
  { id: 'q5', text: 'Seberapa sering Anda merasa ketegangan otot pada bahu, leher, atau pusing akibat beban pikiran?' },
];

const OPTIONS = [
  { label: 'Tidak Pernah', value: 0 },
  { label: 'Jarang', value: 1 },
  { label: 'Kadang', value: 2 },
  { label: 'Sering', value: 3 },
  { label: 'Sangat Sering', value: 4 },
];

export const StressCheckModule: React.FC = () => {
  const { stressHistory, submitStressTest } = useMoodStore();
  const { addToast } = useToastStore();

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [userName, setUserName] = useState('Ayah (Budi)');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (qId: string, val: number) => {
    setAnswers({ ...answers, [qId]: val });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < QUESTIONS.length) {
      addToast('Harap jawab semua 5 pertanyaan tes stres!', 'error');
      return;
    }

    submitStressTest(userName, answers);
    addToast('Hasil evaluasi tingkat stres berhasil dihitung!', 'success');
    setIsCompleted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setIsCompleted(false);
  };

  const latestResult = stressHistory[0];

  return (
    <div className="space-y-4 font-sans">
      {!isCompleted ? (
        <form
          onSubmit={handleCalculate}
          className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading">
                  Kuesioner Cek Stres & Burnout
                </h3>
                <p className="text-[10px] text-slate-400">Evaluasi tingkat tekanan emosional harian</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Pilih Anggota Keluarga:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nama Lengkap"
              className="w-full px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-3">
            {QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-3 bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2"
              >
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {idx + 1}. {q.text}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {OPTIONS.map((opt) => {
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => handleSelectOption(q.id, opt.value)}
                        className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition"
          >
            Hitung Skor Stres & Rekomendasi AI
          </button>
        </form>
      ) : (
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Hasil Evaluasi Stres
            </h3>
            <button
              onClick={handleReset}
              className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Tes Ulang
            </button>
          </div>

          {latestResult && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white space-y-2 text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-200">
                  Skor Tingkat Stres ({latestResult.userName})
                </span>
                <div className="text-3xl font-black font-mono">{latestResult.score} / 100</div>
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold">
                  Level: {latestResult.level}
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Rekomendasi Tindakan AI:
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {latestResult.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 font-heading flex items-center gap-1.5">
            <History className="w-4 h-4 text-purple-500" /> Riwayat Evaluasi Stres
          </h4>
          <span className="text-[10px] font-bold text-slate-400">{stressHistory.length} Catatan</span>
        </div>

        <div className="space-y-2">
          {stressHistory.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-extrabold text-slate-800 dark:text-slate-200 block">
                  {item.userName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(item.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="text-right">
                <span className="font-mono font-black text-purple-600 dark:text-purple-400 block">
                  Skor: {item.score}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                  {item.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
