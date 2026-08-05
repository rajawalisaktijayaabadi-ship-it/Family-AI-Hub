import React, { useState } from 'react';
import { useEducationStore } from '../../stores/useEducationStore';
import { BookOpen, Bookmark, Search, Clock, Sparkles } from 'lucide-react';

export const KnowledgeHubTab: React.FC = () => {
  const { knowledgeArticles, toggleKnowledgeBookmark, searchQuery, setSearchQuery } = useEducationStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Parenting Study', 'Tips Belajar AI', 'Literasi Keuangan Anak'];

  const filteredArticles = knowledgeArticles.filter((art) => {
    const matchesCat = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari tips belajar, panduan parenting..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-extrabold text-indigo-700">
                {art.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                  <Clock className="h-3 w-3" />
                  {art.readTimeMinutes} Min Baca
                </span>
                <button
                  onClick={() => toggleKnowledgeBookmark(art.id)}
                  className="p-1 text-slate-400 hover:text-indigo-600"
                >
                  <Bookmark
                    className={`h-4 w-4 ${art.isBookmarked ? 'text-indigo-600 fill-indigo-600' : ''}`}
                  />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">{art.title}</h4>
              <p className="text-slate-600 text-[11px] mt-1">{art.summary}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 text-[11px] text-slate-700 leading-relaxed border border-slate-100">
              {art.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
