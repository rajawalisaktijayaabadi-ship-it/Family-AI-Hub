import React, { useState } from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const AddHomeworkModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selectedStudent, subjects, addHomework } = useEducationStore();
  const [subjectName, setSubjectName] = useState('Matematika Terapan');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('2026-08-15');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedStudent) return;
    await addHomework({
      studentId: selectedStudent.id,
      subjectId: 'sbj-1',
      subjectName,
      title,
      description,
      deadlineDate,
      status: 'Belum Dikerjakan',
      priority,
      isOfflineAvailable: true,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Tambah Tugas Sekolah Baru">
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="font-bold text-slate-700">Mata Pelajaran</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
            required
          />
        </div>
        <div>
          <label className="font-bold text-slate-700">Judul Tugas / PR</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Latihan Soal Bab 2"
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
            required
          />
        </div>
        <div>
          <label className="font-bold text-slate-700">Deskripsi / Detail Instuksi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-bold text-slate-700">Tenggat Waktu</label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Prioritas</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            >
              <option value="High">Tinggi (High)</option>
              <option value="Medium">Sedang (Medium)</option>
              <option value="Low">Rendah (Low)</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-md hover:bg-indigo-700 mt-2"
        >
          Simpan Tugas
        </button>
      </form>
    </BaseModal>
  );
};

export const AddStudyPlanModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selectedStudent, addStudyPlan } = useEducationStore();
  const [title, setTitle] = useState('');
  const [focusSubject, setFocusSubject] = useState('Matematika Terapan');
  const [startTime, setStartTime] = useState('16:00');
  const [endTime, setEndTime] = useState('17:00');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedStudent) return;
    await addStudyPlan({
      studentId: selectedStudent.id,
      title,
      date: new Date().toISOString().split('T')[0],
      startTime,
      endTime,
      focusSubject,
      durationMinutes: 60,
      isCompleted: false,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Jadwalkan Sesi Belajar">
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="font-bold text-slate-700">Nama Sesi Belajar</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Belajar Rumus Aljabar"
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
            required
          />
        </div>
        <div>
          <label className="font-bold text-slate-700">Fokus Mata Pelajaran</label>
          <input
            type="text"
            value={focusSubject}
            onChange={(e) => setFocusSubject(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-bold text-slate-700">Jam Mulai</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Jam Selesai</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-md hover:bg-indigo-700 mt-2"
        >
          Simpan Jadwal
        </button>
      </form>
    </BaseModal>
  );
};

export const AddExamModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selectedStudent, addExam } = useEducationStore();
  const [subjectName, setSubjectName] = useState('IPA Terpadu');
  const [examType, setExamType] = useState('PTS (Tengah Semester)');
  const [examDate, setExamDate] = useState('2026-09-20');
  const [targetScore, setTargetScore] = useState(90);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    await addExam({
      studentId: selectedStudent.id,
      subjectId: 'sbj-2',
      subjectName,
      examType,
      examDate,
      targetScore,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Tambah Jadwal Ujian">
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="font-bold text-slate-700">Mata Pelajaran</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
          />
        </div>
        <div>
          <label className="font-bold text-slate-700">Jenis Ujian</label>
          <input
            type="text"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-bold text-slate-700">Tanggal Ujian</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Target Nilai</label>
            <input
              type="number"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-md hover:bg-indigo-700 mt-2"
        >
          Simpan Jadwal Ujian
        </button>
      </form>
    </BaseModal>
  );
};

export const AddReadingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { selectedStudent, addReading } = useEducationStore();
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Sains');
  const [totalPages, setTotalPages] = useState(200);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle || !selectedStudent) return;
    await addReading({
      studentId: selectedStudent.id,
      bookTitle,
      author,
      category,
      totalPages,
      pagesRead: 0,
      rating: 5,
      isCompleted: false,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Tambah Buku Bacaan Baru">
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="font-bold text-slate-700">Judul Buku</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
            required
          />
        </div>
        <div>
          <label className="font-bold text-slate-700">Penulis</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-bold text-slate-700">Kategori</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700">Total Halaman</label>
            <input
              type="number"
              value={totalPages}
              onChange={(e) => setTotalPages(Number(e.target.value))}
              className="w-full mt-1 rounded-xl border border-slate-200 p-2 font-semibold"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-md hover:bg-indigo-700 mt-2"
        >
          Simpan Buku
        </button>
      </form>
    </BaseModal>
  );
};

export const AddFlashcardModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addFlashcard } = useEducationStore();
  const [subjectName, setSubjectName] = useState('Bahasa Inggris');
  const [category, setCategory] = useState('Vocabulary');
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontText || !backText) return;
    await addFlashcard({
      subjectName,
      category,
      frontText,
      backText,
      isFavorite: false,
    });
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Tambah Flashcard">
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="font-bold text-slate-700">Mata Pelajaran</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
          />
        </div>
        <div>
          <label className="font-bold text-slate-700">Pertanyaan / Istilah (Sisi Depan)</label>
          <input
            type="text"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            placeholder="Contoh: Photosynthesis"
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
            required
          />
        </div>
        <div>
          <label className="font-bold text-slate-700">Jawaban / Penjelasan (Sisi Belakang)</label>
          <textarea
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            placeholder="Contoh: Proses pembuatan makanan pada tumbuhan hijau..."
            rows={2}
            className="w-full mt-1 rounded-xl border border-slate-200 p-2.5 font-semibold"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-600 py-3 font-bold text-white shadow-md hover:bg-indigo-700 mt-2"
        >
          Simpan Flashcard
        </button>
      </form>
    </BaseModal>
  );
};
