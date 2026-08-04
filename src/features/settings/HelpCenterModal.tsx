import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  HelpCircle,
  MessageSquare,
  Bug,
  Heart,
  FileText,
  Info,
  ChevronDown,
  Search,
  Send,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { useToastStore } from '../../stores/useToastStore';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type HelpTab = 'faq' | 'support' | 'bug' | 'feedback' | 'privacy' | 'about';

const FAQ_ITEMS = [
  {
    q: 'Apa itu FamilyAI Hub Indonesia?',
    a: 'FamilyAI Hub Indonesia adalah platform terpadu kecerdasan buatan berbasis mobile web untuk mendukung aktivitas, kesehatan, pendidikan, dan komunikasi keluarga Indonesia.',
  },
  {
    q: 'Bagaimana cara menambah atau mengundang anggota keluarga?',
    a: 'Masuk ke menu Profil atau Aktivitas Keluarga, lalu klik tombol "Undang Anggota". Anda dapat mengundang via Email, Tautan Link, atau Kode QR.',
  },
  {
    q: 'Apakah data keluarga saya aman?',
    a: 'Ya, seluruh data disimpan menggunakan arsitektur keamanan terenkripsi tinggi, kontrol privasi bertingkat (Profile & Family Visibility), dan enkripsi tingkat lanjut.',
  },
  {
    q: 'Bagaimana jika aplikasi sedang Offline?',
    a: 'Aplikasi dilengkapi fitur Offline First & Auto Sync. Seluruh pengaturan dan profil dapat diakses offline dan akan tersinkronisasi otomatis begitu koneksi internet terhubung kembali.',
  },
];

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState<HelpTab>('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Support Form
  const [supportMessage, setSupportMessage] = useState('');

  // Bug Form
  const [bugTitle, setBugTitle] = useState('');
  const [bugCategory, setBugCategory] = useState('UI / Tampilan');
  const [bugDescription, setBugDescription] = useState('');

  // Feedback Form
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  if (!isOpen) return null;

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    addToast('Pesan Anda telah dikirim ke Tim Dukungan FamilyAI!', 'success');
    setSupportMessage('');
  };

  const handleReportBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugTitle.trim() || !bugDescription.trim()) return;
    addToast('Laporan bug berhasil dikirim. Terima kasih bantuan Anda!', 'success');
    setBugTitle('');
    setBugDescription('');
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Ulasan dan masukan Anda sangat berharga bagi kami!', 'success');
    setFeedbackText('');
  };

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Pusat Bantuan & Dukungan
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 px-3 pt-2 gap-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
              { id: 'support', label: 'Dukungan', icon: MessageSquare },
              { id: 'bug', label: 'Lapor Bug', icon: Bug },
              { id: 'feedback', label: 'Ulasan', icon: Heart },
              { id: 'privacy', label: 'Privasi', icon: FileText },
              { id: 'about', label: 'Tentang', icon: Info },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as HelpTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 shadow-xs'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari pertanyaan FAQ..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-2">
                  {filteredFaqs.map((faq, idx) => {
                    const isExpanded = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800"
                      >
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                          className="w-full p-3.5 text-left text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between gap-2"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-indigo-500 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="px-3.5 pb-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-2 bg-slate-50/50 dark:bg-slate-900/30">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === 'support' && (
              <form onSubmit={handleSendSupport} className="space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ada kendala penggunaan? Tulis pesan Anda, tim customer care kami akan merespons dalam 1x24 jam.
                </p>
                <textarea
                  rows={4}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Deskripsikan pertanyaan atau permasalahan Anda..."
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  Kirim Pesan Dukungan
                </button>
              </form>
            )}

            {/* Bug Report Tab */}
            {activeTab === 'bug' && (
              <form onSubmit={handleReportBug} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Judul Masalah / Bug
                  </label>
                  <input
                    type="text"
                    value={bugTitle}
                    onChange={(e) => setBugTitle(e.target.value)}
                    placeholder="Contoh: Tombol tidak dapat diklik di layar Hp"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Kategori kendala
                  </label>
                  <select
                    value={bugCategory}
                    onChange={(e) => setBugCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  >
                    <option value="UI / Tampilan">UI / Tampilan</option>
                    <option value="Autentikasi & Login">Autentikasi & Login</option>
                    <option value="Workspace & Anggota">Workspace & Anggota</option>
                    <option value="Pengaturan Offline">Pengaturan Offline</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Deskripsi Lengkap
                  </label>
                  <textarea
                    rows={3}
                    value={bugDescription}
                    onChange={(e) => setBugDescription(e.target.value)}
                    placeholder="Langkah-langkah mereproduksi kendala..."
                    required
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <Bug className="w-4 h-4" />
                  Kirim Laporan Kendala
                </button>
              </form>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <form onSubmit={handleSendFeedback} className="space-y-3">
                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Beri Penilaian Pengalaman Anda:
                  </p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-2 rounded-xl transition-transform ${
                          rating >= star ? 'text-amber-500 scale-110' : 'text-slate-300'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tulis ulasan atau saran ide fitur..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                >
                  Kirim Ulasan
                </button>
              </form>
            )}

            {/* Privacy & Terms */}
            {activeTab === 'privacy' && (
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">
                  Kebijakan Privasi & Syarat Ketentuan
                </h3>
                <p>
                  FamilyAI Hub berkomitmen penuh menjaga keamanan data privasi keluarga Anda. Semua rekaman dan data interaksi dienkripsi secara ketat.
                </p>
                <p>
                  Anda memiliki kendali penuh atas visibilitas profil, perizinan lokasi, kamera, dan mikrofon melalui menu Pengaturan Privasi Mobile.
                </p>
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="text-center space-y-3 py-3">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold text-2xl rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  FAI
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">
                    FamilyAI Hub Indonesia
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    Mobile Web Edition v3.0.0 (Build 2026)
                  </p>
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Solusi kecerdasan buatan terpadu untuk pendampingan keluarga, koordinasi aktivitas, dan harmonisasi ruang tumbuh keluarga Indonesia.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
