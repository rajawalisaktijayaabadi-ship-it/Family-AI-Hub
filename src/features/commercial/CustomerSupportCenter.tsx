import React, { useState } from 'react';
import { useCommercialStore } from '../../stores/useCommercialStore';
import { SupportTicketModel, FeedbackModel } from '../../types/commercial';
import { HelpCircle, MessageSquare, Send, BookOpen, Star, MessageCircle, AlertCircle, CheckCircle2, Search, LifeBuoy } from 'lucide-react';

export const CustomerSupportCenter: React.FC = () => {
  const { tickets, knowledgeBase, submitSupportTicket, submitFeedback } = useCommercialStore();

  const [activeSubTab, setActiveSubTab] = useState<'faq' | 'tickets' | 'feedback' | 'livechat'>('faq');
  const [searchTerm, setSearchTerm] = useState('');

  // Ticket Form state
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<SupportTicketModel['category']>('technical');
  const [priority, setPriority] = useState<SupportTicketModel['priority']>('medium');
  const [message, setMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Feedback Form state
  const [rating, setRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState<FeedbackModel['category']>('ai_quality');
  const [comment, setComment] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    submitSupportTicket(subject, category, priority, message);
    setSubject('');
    setMessage('');
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 4000);
  };

  const handleCreateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    submitFeedback(rating, feedbackCategory, comment);
    setComment('');
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  const filteredKB = knowledgeBase.filter(
    (kb) =>
      kb.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kb.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Support Sub-Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('faq')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition shrink-0 ${
            activeSubTab === 'faq'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Pusat Bantuan & FAQ
        </button>

        <button
          onClick={() => setActiveSubTab('tickets')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition shrink-0 ${
            activeSubTab === 'tickets'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800'
          }`}
        >
          <LifeBuoy className="w-3.5 h-3.5" /> Tiket Dukungan Pelanggan ({tickets.length})
        </button>

        <button
          onClick={() => setActiveSubTab('feedback')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition shrink-0 ${
            activeSubTab === 'feedback'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800'
          }`}
        >
          <Star className="w-3.5 h-3.5" /> Feedback & Rating Aplikasi
        </button>

        <button
          onClick={() => setActiveSubTab('livechat')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition shrink-0 ${
            activeSubTab === 'livechat'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" /> Live Chat Agent (Placeholder)
        </button>
      </div>

      {/* FAQ & Knowledge Base View */}
      {activeSubTab === 'faq' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari panduan, tutorial, atau pertanyaan..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredKB.map((kb) => (
              <div key={kb.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold">
                    {kb.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{kb.readTimeMin} mnt baca</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{kb.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{kb.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Support Tickets View & Creation */}
      {activeSubTab === 'tickets' && (
        <div className="space-y-6">
          {/* Create New Ticket Form */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" /> Buat Tiket Bantuan Bantuan Teknis / Billing
            </h3>

            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Subjek Permasalahan</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Misal: Kendala integrasi API Gemini / Pertanyaan Tagihan QRIS..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Kategori Kendala</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="technical">Kendala Teknis Aplikasi</option>
                    <option value="billing">Pembayaran & Langganan</option>
                    <option value="feature_request">Usulan Fitur Baru</option>
                    <option value="bug_report">Laporan Bug / Error</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Prioritas Tiket</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="low">Rendah (Pertanyaan Umum)</option>
                    <option value="medium">Sedang (Kendala Non-Kritis)</option>
                    <option value="high">Tinggi (Fitur Terganggu)</option>
                    <option value="urgent">Mendesak (Aplikasi Mati)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Detail Rincian Masalah</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Jelaskan kronologi kendala yang Anda alami..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
              >
                Kirim Tiket Support <Send className="w-3.5 h-3.5" />
              </button>

              {ticketSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> Tiket bantuan berhasil dibuat! Tim Support akan merespons dalam 1x24 jam.
                </div>
              )}
            </form>
          </div>

          {/* Ticket List Stream */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300">Riwayat Tiket Anda</h4>
            <div className="space-y-2">
              {tickets.map((tkt) => (
                <div key={tkt.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] text-slate-400">{tkt.id}</span>
                      <h5 className="text-xs font-bold text-slate-100">{tkt.subject}</h5>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        tkt.status === 'resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {tkt.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                    {tkt.messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg text-xs max-w-[85%] ${
                          m.sender === 'user'
                            ? 'bg-emerald-950/40 border border-emerald-800/30 text-emerald-200 ml-auto'
                            : 'bg-slate-950 border border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-bold block mb-0.5 opacity-70">
                          {m.sender === 'user' ? 'Anda' : 'Tim Support FamilyAI'}
                        </span>
                        <p>{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* App Rating & Feedback Form */}
      {activeSubTab === 'feedback' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4 max-w-xl mx-auto">
          <h3 className="text-sm font-semibold text-slate-200 text-center">
            Bantu Kami Meningkatkan Kualitas Aplikasi
          </h3>

          <form onSubmit={handleCreateFeedback} className="space-y-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-xl transition ${
                    rating >= star ? 'text-amber-400 bg-amber-500/10' : 'text-slate-600 bg-slate-800/40'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Kategori Masukan</label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
              >
                <option value="ai_quality">Kualitas Respon AI Gemini</option>
                <option value="ui_ux">Kemudahan Desain UI / UX</option>
                <option value="features">Kelengkapan Fitur Keluarga</option>
                <option value="performance">Kecepatan & Performa</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Komentar & Saran Tambahan</label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tuliskan ide atau pengalaman Anda..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition"
            >
              Kirim Feedback
            </button>

            {feedbackSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 text-center">
                Terima kasih atas masukan berharga Anda!
              </div>
            )}
          </form>
        </div>
      )}

      {/* Live Chat Placeholder */}
      {activeSubTab === 'livechat' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200">Live Chat Agent Placeholder</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Fitur obrolan langsung (Live Chat) siap dihubungkan dengan adapter layanan seperti WhatsApp Business API atau Zendesk pada fase peluncuran komersial penuh.
          </p>
        </div>
      )}
    </div>
  );
};
