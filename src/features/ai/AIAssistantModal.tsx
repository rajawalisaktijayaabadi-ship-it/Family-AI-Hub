import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowLeft, RefreshCw } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<
    { sender: 'ai' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'ai',
      text: 'Halo! Saya Asisten AI Keluarga Indonesia. Ada yang bisa saya bantu hari ini? Anda bisa bertanya tentang ide menu masakan, jadwal les anak, pengatur anggaran, atau tips penguat harmoni keluarga.',
      time: 'Baru saja',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    const timeNow = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, time: timeNow },
    ]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = 'Terima kasih pertanyaannya! Berdasarkan konteks keluarga Anda, saya menyarankan untuk mengoordinasikan jadwal dengan Ibu & Ayah via kalender keluarga.';
      
      if (userMsg.toLowerCase().includes('makan') || userMsg.toLowerCase().includes('resep')) {
        aiResponse = 'Rekomendasi Menu Malam Ini: Sop Buntut Organik dengan Wortel & Buncis. Bergizi imbang, hangat, dan sangat cocok untuk suasana malam keluarga.';
      } else if (userMsg.toLowerCase().includes('liburan') || userMsg.toLowerCase().includes('jalan')) {
        aiResponse = 'Ide Aktivitas Akhir Pekan: Piknik di Taman Kota atau Mengunjungi Museum Sains Interaktif. Edukatif dan mempererat ikatan orang tua & anak.';
      } else if (userMsg.toLowerCase().includes('anggaran') || userMsg.toLowerCase().includes('uang')) {
        aiResponse = 'Tips Keuangan: Alokasikan 50% untuk kebutuhan pokok rumah tangga, 30% tabungan/investasi, dan 20% dana rekreasi keluarga.';
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: aiResponse, time: timeNow },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 flex flex-col font-sans select-none max-w-md mx-auto">
      {/* Header */}
      <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white leading-tight">
                Asisten AI Keluarga
              </h3>
              <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-ping" /> Gemini Family Engine
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                sender: 'ai',
                text: 'Halo! Percakapan telah diperbarui. Ada yang bisa saya bantu untuk keluarga hari ini?',
                time: 'Baru saja',
              },
            ])
          }
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-slate-100/50 dark:bg-slate-950/50">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs text-white ${
                m.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-tr from-indigo-600 to-teal-500'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-tl-none'
              }`}
            >
              <p>{m.text}</p>
              <span
                className={`text-[9px] block text-right mt-1 font-medium ${
                  m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <Sparkles className="w-4 h-4 animate-spin text-teal-400" />
            <span>AI sedang mengetik jawaban...</span>
          </div>
        )}
      </div>

      {/* Input Box Bar */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ketik pertanyaan untuk keluarga Anda..."
          className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-2xl shadow-md active-press"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
