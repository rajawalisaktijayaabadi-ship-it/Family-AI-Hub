import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAIStore } from '../../stores/useAIStore';
import { useToastStore } from '../../stores/useToastStore';
import { RecommendationService } from '../../services/RecommendationService';
import { Attachment, AttachmentType } from '../../types/ai';
import {
  Send,
  Sparkles,
  User,
  Bot,
  RefreshCw,
  Copy,
  Trash2,
  Edit2,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Mic,
  MapPin,
  CheckSquare,
  Square,
  ArrowDown,
  Bookmark,
  Share2,
  Command,
  ChevronLeft,
  Sliders,
  X,
  Building2,
  Users,
} from 'lucide-react';

interface AIChatScreenProps {
  onBack?: () => void;
  onOpenSettings?: () => void;
}

export const AIChatScreen: React.FC<AIChatScreenProps> = ({ onBack, onOpenSettings }) => {
  const {
    activeConversationId,
    conversations,
    messages,
    isTyping,
    streamingText,
    sendMessage,
    regenerateLastResponse,
    editMessage,
    deleteMessage,
    addFavorite,
    resetChat,
  } = useAIStore();

  const { addToast } = useToastStore();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [showQuickCommandMenu, setShowQuickCommandMenu] = useState(false);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editInputText, setEditInputText] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const quickCommands = RecommendationService.getQuickCommands();

  const activeConv = conversations.find((c) => c.id === activeConversationId);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingText]);

  // Handle Input Change & Quick Command trigger
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.startsWith('/')) {
      setShowQuickCommandMenu(true);
    } else {
      setShowQuickCommandMenu(false);
    }
  };

  // Select Quick Command
  const handleSelectQuickCommand = (cmd: string) => {
    setInput(`${cmd} `);
    setShowQuickCommandMenu(false);
  };

  // Add dummy attachment
  const handleAddAttachment = (type: AttachmentType) => {
    const newAtt: Attachment = {
      id: `att_${Date.now()}`,
      type,
      name:
        type === 'photo'
          ? 'Foto_Keluarga_01.jpg'
          : type === 'document'
          ? 'Tagihan_Listrik_Agustus.pdf'
          : type === 'voice'
          ? 'Catatan_Suara_Ibu.m4a'
          : 'Lokasi_Taman_Kota.gmap',
      url: '#',
      size: type === 'photo' ? '1.2 MB' : '450 KB',
    };
    setAttachments((prev) => [...prev, newAtt]);
    setIsAttachmentOpen(false);
    addToast(`Lampiran ${type} berhasil ditambahkan (Placeholder)`, 'info');
  };

  // Handle Send
  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0) return;
    const textToSend = input.trim();
    const attToSend = [...attachments];

    setInput('');
    setAttachments([]);
    setShowQuickCommandMenu(false);

    await sendMessage(textToSend, attToSend);
  };

  // Copy text helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Teks berhasil disalin ke clipboard!', 'success');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] max-w-md mx-auto bg-slate-50 dark:bg-slate-950 font-sans relative overflow-hidden">
      {/* 1. Chat Header Bar with Context Placeholder */}
      <div className="px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <Bot className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-xs font-extrabold font-heading text-slate-900 dark:text-white line-clamp-1">
              {activeConv?.title || 'AI Family Assistant'}
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
              <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-ping" />
                Context Active:
              </span>
              <span>Keluarga Rahardjo (4)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={resetChat}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            title="Reset Chat"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              title="Pengaturan AI"
            >
              <Sliders className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Context Badge Bar */}
      <div className="px-4 py-1.5 bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-[10px] font-semibold text-blue-700 dark:text-blue-300">
        <div className="flex items-center gap-2 truncate">
          <Building2 className="w-3 h-3 shrink-0" />
          <span className="truncate">Workspace: Rumah Utama • Role: Kepala Keluarga</span>
        </div>
        <span className="shrink-0 bg-blue-200/50 dark:bg-blue-900 px-2 py-0.5 rounded-full font-bold">
          Mock AI
        </span>
      </div>

      {/* 2. Messages List Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-100/40 dark:bg-slate-950/40">
        {messages.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-3xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Mulai Obrolan Baru
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                Ketik pertanyaan Anda atau pilih perintah cepat seperti <code className="text-blue-600">/summary</code> atau <code className="text-blue-600">/meal</code>.
              </p>
            </div>
          </div>
        ) : (
          messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 max-w-[88%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-xs ${
                    isUser
                      ? 'bg-blue-600'
                      : 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-teal-500'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-3xl text-xs leading-relaxed shadow-sm relative group ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 rounded-tl-none'
                    }`}
                  >
                    {/* Render Edit Input Mode */}
                    {editingMsgId === m.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editInputText}
                          onChange={(e) => setEditInputText(e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none"
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setEditingMsgId(null)}
                            className="text-[10px] px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => {
                              editMessage(m.id, editInputText);
                              setEditingMsgId(null);
                            }}
                            className="text-[10px] px-2 py-1 rounded-lg bg-blue-500 text-white font-bold"
                          >
                            Simpan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Render Main Content based on responseType */}
                        <div className="space-y-2">
                          <p className="whitespace-pre-line font-medium leading-relaxed">
                            {m.text}
                          </p>

                          {/* Render Checklist Response Type */}
                          {m.responseType === 'checklist' && m.metadata?.checklistItems && (
                            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/80 space-y-1.5">
                              {m.metadata.checklistItems.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-slate-700 dark:text-slate-300 font-semibold text-[11px]"
                                >
                                  {item.done ? (
                                    <CheckSquare className="w-3.5 h-3.5 text-teal-500" />
                                  ) : (
                                    <Square className="w-3.5 h-3.5 text-slate-400" />
                                  )}
                                  <span className={item.done ? 'line-through text-slate-400' : ''}>
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Render Table Response Type */}
                          {m.responseType === 'table' && m.metadata?.tableData && (
                            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/80 overflow-x-auto no-scrollbar">
                              <table className="w-full text-left text-[11px]">
                                <thead>
                                  <tr className="border-b border-slate-300 dark:border-slate-700">
                                    {m.metadata.tableData.headers.map((h, idx) => (
                                      <th key={idx} className="pb-1 px-1 font-bold">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {m.metadata.tableData.rows.map((row, rIdx) => (
                                    <tr
                                      key={rIdx}
                                      className="border-b border-slate-100 dark:border-slate-800"
                                    >
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="py-1 px-1 text-slate-600 dark:text-slate-300">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Render Quote Response Type */}
                          {m.responseType === 'quote' && (
                            <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 rounded-r-2xl italic text-amber-900 dark:text-amber-200">
                              {m.text}
                            </div>
                          )}

                          {/* Render Attachments if present */}
                          {m.attachments && m.attachments.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1">
                              {m.attachments.map((att) => (
                                <div
                                  key={att.id}
                                  className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300"
                                >
                                  <Paperclip className="w-3 h-3 text-blue-500" />
                                  <span className="truncate">{att.name}</span>
                                  <span className="text-[9px] text-slate-400">{att.size}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="flex items-center justify-between gap-3 mt-2 text-[9px] text-slate-400 font-medium">
                          <span>{m.timestamp}</span>
                          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition">
                            <button
                              onClick={() => handleCopy(m.text)}
                              className="p-1 hover:text-slate-600 dark:hover:text-slate-200"
                              title="Salin Pesan"
                            >
                              <Copy className="w-3 h-3" />
                            </button>

                            {!isUser && (
                              <button
                                onClick={() => {
                                  addFavorite({
                                    type: 'response',
                                    itemId: m.id,
                                    title: 'Jawaban AI Favorit',
                                    contentPreview: m.text.substring(0, 40),
                                  });
                                  addToast('Jawaban disimpan ke Favorit!', 'success');
                                }}
                                className="p-1 hover:text-amber-500"
                                title="Favoritkan"
                              >
                                <Bookmark className="w-3 h-3" />
                              </button>
                            )}

                            {isUser && (
                              <button
                                onClick={() => {
                                  setEditingMsgId(m.id);
                                  setEditInputText(m.text);
                                }}
                                className="p-1 hover:text-blue-500"
                                title="Edit Pesan"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            )}

                            <button
                              onClick={() => deleteMessage(m.id)}
                              className="p-1 hover:text-rose-500"
                              title="Hapus"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Streaming & Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl rounded-tl-none max-w-[85%] text-xs text-slate-600 dark:text-slate-300 shadow-xs">
            <Sparkles className="w-4 h-4 text-teal-500 animate-spin shrink-0" />
            <span>{streamingText || 'AI sedang menyusun jawaban...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Regenerate & Action Floating Bar */}
      {messages.length > 0 && !isTyping && (
        <div className="px-4 py-1.5 flex justify-center bg-transparent">
          <button
            onClick={regenerateLastResponse}
            className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3 h-3 text-blue-500" />
            Buat Ulang Jawaban (Regenerate)
          </button>
        </div>
      )}

      {/* 4. Quick Command Auto-complete Dropdown */}
      <AnimatePresence>
        {showQuickCommandMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mx-3 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-1 max-h-40 overflow-y-auto no-scrollbar"
          >
            <div className="text-[10px] font-bold text-slate-400 px-2 py-0.5 uppercase tracking-wider">
              Pilih Pintasan Perintah (/command)
            </div>
            {quickCommands.map((qc) => (
              <button
                key={qc.command}
                onClick={() => handleSelectQuickCommand(qc.command)}
                className="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition"
              >
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                  {qc.command}
                </span>
                <span className="text-[10px] text-slate-400">{qc.description}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachments Preview Pill */}
      {attachments.length > 0 && (
        <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shrink-0"
            >
              <Paperclip className="w-3 h-3 text-blue-500" />
              <span className="truncate max-w-[100px]">{att.name}</span>
              <button
                onClick={() => setAttachments((prev) => prev.filter((a) => a.id !== att.id))}
                className="text-slate-400 hover:text-rose-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 5. Input Bar with Attachment Drawer */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
            className={`p-2.5 rounded-2xl border transition ${
              isAttachmentOpen
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
            title="Tambah Lampiran"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tulis pesan atau ketik / untuk pintasan..."
            className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() && attachments.length === 0}
            className="p-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-2xl shadow-md disabled:opacity-40 transition active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Attachment Options Drawer */}
        <AnimatePresence>
          {isAttachmentOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pt-2 grid grid-cols-4 gap-2"
            >
              <button
                onClick={() => handleAddAttachment('photo')}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 transition"
              >
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span>Foto</span>
              </button>

              <button
                onClick={() => handleAddAttachment('document')}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>Dokumen</span>
              </button>

              <button
                onClick={() => handleAddAttachment('voice')}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 transition"
              >
                <Mic className="w-4 h-4 text-teal-500" />
                <span>Suara</span>
              </button>

              <button
                onClick={() => handleAddAttachment('location')}
                className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950 transition"
              >
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Lokasi</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
