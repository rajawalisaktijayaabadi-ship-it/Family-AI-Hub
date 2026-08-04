import React from 'react';
import { motion } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { useToastStore } from '../../stores/useToastStore';
import { FileText, Sparkles, X, ChevronRight, Send } from 'lucide-react';

interface PromptTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const PromptTemplateModal: React.FC<PromptTemplateModalProps> = ({
  isOpen,
  onClose,
  onOpenChat,
}) => {
  const { createNewConversation, setActiveConversationId, sendMessage } = useAIStore();
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  const dummyTemplates = [
    {
      id: 'tmpl_1',
      title: 'Ringkasan Hari Ini',
      category: 'Keluarga',
      prompt: 'Tolong buatkan ringkasan agenda keluarga, pengingat penting, dan prioritas tugas untuk hari ini.',
      desc: 'Sintesis jadwal rutin, pengingat tagihan, dan tugas keluarga harian.',
    },
    {
      id: 'tmpl_2',
      title: 'Tips Parenting',
      category: 'Parenting',
      prompt: 'Bagaimana cara terbaik mendampingi anak umur 7-10 tahun saat belajar membagi waktu antara gadget dan tugas sekolah?',
      desc: 'Panduan empati pendampingan emosi dan aturan waktu layar anak.',
    },
    {
      id: 'tmpl_3',
      title: 'Rencana Menu Mingguan',
      category: 'Makanan',
      prompt: 'Tolong susunkan rencana menu makan siang & malam selama 7 hari untuk 4 porsi dengan anggaran terjangkau.',
      desc: 'Daftar masakan bergizi imbang dan variasi kuliner keluarga.',
    },
    {
      id: 'tmpl_4',
      title: 'Ide Aktivitas Keluarga',
      category: 'Keluarga',
      prompt: 'Berikan 5 ide aktivitas outdoor & indoor menyenangkan untuk akhir pekan bersama anak dan pasangan.',
      desc: 'Inspirasi rekreasi bonding dan edukasi di rumah atau taman.',
    },
    {
      id: 'tmpl_5',
      title: 'Pengingat Tagihan',
      category: 'Keuangan',
      prompt: 'Bantu cek alokasi keuangan keluarga 50/30/20 dan susun daftar pengingat tagihan bulanan.',
      desc: 'Audit keuangan dan jatuh tempo pembayaran operasional rumah.',
    },
    {
      id: 'tmpl_6',
      title: 'Motivasi Hari Ini',
      category: 'Mood',
      prompt: 'Berikan pesan motivasi hangat dan tips menjaga komunikasi harmonis suami istri hari ini.',
      desc: 'Penguat suasana hati dan keharmonisan rumah tangga.',
    },
    {
      id: 'tmpl_7',
      title: 'Rencana Belajar Anak',
      category: 'Pendidikan',
      prompt: 'Buatkan rencana jadwal belajar dan latihan soal harian yang menyenangkan untuk persiapan ujian anak.',
      desc: 'Strategi belajar santai dan efektif tanpa paksaan.',
    },
  ];

  const handleExecuteTemplate = async (tmpl: (typeof dummyTemplates)[0]) => {
    const convId = createNewConversation(tmpl.title, tmpl.category as any);
    setActiveConversationId(convId);
    onOpenChat();
    onClose();
    addToast(`Menjalankan Template: ${tmpl.title}...`, 'info');
    await sendMessage(tmpl.prompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 font-heading">
                Template Prompt Utama
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">7 Modul Standar AI Family</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 no-scrollbar pr-1">
          {dummyTemplates.map((t) => (
            <div
              key={t.id}
              onClick={() => handleExecuteTemplate(t)}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200 dark:border-slate-700 cursor-pointer transition flex items-center justify-between group"
            >
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    {t.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                    {t.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {t.desc}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
