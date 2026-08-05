import React, { useState } from 'react';
import { useProtectionStore } from '../../stores/useProtectionStore';
import {
  Folder,
  FileText,
  Search,
  Plus,
  Star,
  Archive,
  Shield,
  Lock,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { DocumentCategory, DocumentModel } from '../../types/protection';

interface Props {
  onOpenAddDocument: () => void;
}

export const DocumentVaultTab: React.FC<Props> = ({ onOpenAddDocument }) => {
  const {
    documents,
    folders,
    searchQuery,
    setSearchQuery,
    toggleDocumentFavorite,
    toggleDocumentArchive,
  } = useProtectionStore();

  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'ALL'>('ALL');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocumentModel | null>(null);

  const categories: Array<DocumentCategory | 'ALL'> = [
    'ALL',
    'KTP',
    'KK',
    'Paspor',
    'SIM',
    'NPWP',
    'BPJS',
    'Polis',
    'Akta',
    'Ijazah',
    'Sertifikat',
    'Dokumen Medis',
    'Surat Penting',
    'Lainnya',
  ];

  const filteredDocs = documents.filter((doc) => {
    if (doc.isArchived) return false;
    if (showOnlyFavorites && !doc.isFavorite) return false;
    if (selectedFolderId && doc.folderId !== selectedFolderId) return false;
    if (selectedCategory !== 'ALL' && doc.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchOwner = doc.ownerName.toLowerCase().includes(q);
      const matchNum = doc.documentNumber?.toLowerCase().includes(q);
      const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchOwner || matchNum || matchTags;
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Security Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-4 text-white shadow-md flex items-center justify-between border border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Digital Vault Encrypted</h3>
            <p className="text-[11px] text-indigo-200">Diuji & Diperkuat PIN Keamanan 6-Digit</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
          Aman & Privat
        </span>
      </div>

      {/* Header Search & Actions */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari KTP, KK, Paspor, No. Dokumen..."
            className="w-full rounded-2xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <button
          onClick={onOpenAddDocument}
          className="flex items-center gap-1.5 rounded-2xl bg-teal-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Unggah</span>
        </button>
      </div>

      {/* Folder Chips */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-800">Folder Kategori Dokumen:</p>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedFolderId(null)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
              selectedFolderId === null
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Folder
          </button>
          {folders.map((fld) => (
            <button
              key={fld.id}
              onClick={() => setSelectedFolderId(fld.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                selectedFolderId === fld.id
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Folder className="h-3.5 w-3.5" style={{ color: selectedFolderId === fld.id ? '#fff' : fld.colorHex }} />
              <span>{fld.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-3 py-1 font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-teal-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Favorite Filter Toggle */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-slate-500 font-medium">
          Menampilkan {filteredDocs.length} Dokumen Vault
        </span>
        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl transition ${
            showOnlyFavorites
              ? 'bg-amber-100 text-amber-800'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${showOnlyFavorites ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>Favorit Sahaja</span>
        </button>
      </div>

      {/* Documents Grid / List */}
      <div className="space-y-3">
        {filteredDocs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center bg-white">
            <FileText className="mx-auto h-8 w-8 text-slate-300 mb-2" />
            <p className="text-xs font-bold text-slate-700">Tidak ada dokumen ditemukan</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Coba ubah kata kunci pencarian atau kategori filter.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-700">
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{doc.uploadedAt}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{doc.title}</h4>
                    <p className="text-[11px] text-slate-500">
                      Pemilik: <span className="font-semibold text-slate-700">{doc.ownerName}</span>
                    </p>
                    {doc.documentNumber && (
                      <p className="text-[11px] text-teal-800 font-mono mt-0.5">
                        No: {doc.documentNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleDocumentFavorite(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-amber-500 transition"
                  >
                    <Star
                      className={`h-4 w-4 ${doc.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
                    />
                  </button>
                  <button
                    onClick={() => setViewingDoc(doc)}
                    className="p-1.5 text-slate-400 hover:text-teal-600 transition"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {doc.tags.map((t) => (
                  <span key={t} className="rounded-md bg-slate-50 px-2 py-0.5 text-[9px] font-medium text-slate-500">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document View Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">Detail Dokumen Vault</h3>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                Tutup
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-center space-y-1">
                <p className="font-bold text-slate-900 text-sm">{viewingDoc.title}</p>
                <p className="text-slate-500 text-[11px]">Kategori: {viewingDoc.category}</p>
                {viewingDoc.documentNumber && (
                  <p className="text-teal-800 font-mono font-bold text-xs">
                    {viewingDoc.documentNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>
                  <span>Pemilik Dokumen:</span>
                  <p className="font-bold text-slate-900">{viewingDoc.ownerName}</p>
                </div>
                <div>
                  <span>Masa Berlaku:</span>
                  <p className="font-bold text-slate-900">{viewingDoc.expiryDate || 'Seumur Hidup'}</p>
                </div>
              </div>

              <div className="rounded-xl bg-teal-50 p-3 text-[11px] text-teal-900 border border-teal-100 flex items-center gap-2">
                <Shield className="h-4 w-4 text-teal-700 shrink-0" />
                <span>Salinan Digital Tersimpan Aman dengan Enkripsi Vault.</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Mengunduh salinan digital ${viewingDoc.title}...`);
                setViewingDoc(null);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-3 text-xs font-bold text-white shadow-md hover:bg-teal-700"
            >
              <Download className="h-4 w-4" />
              <span>Unduh File Digital</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
