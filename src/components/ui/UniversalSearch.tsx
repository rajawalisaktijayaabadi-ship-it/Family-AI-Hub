import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Chip } from './Chip';
import { Button } from './Button';
import { useUIStore } from '../../stores/useUIStore';

export interface UniversalSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  activeFilterCount?: number;
}

export const UniversalSearch: React.FC<UniversalSearchProps> = ({
  placeholder = 'Cari resep, kegiatan anak, catatan keluarga...',
  onSearch,
  onFilterClick,
  activeFilterCount = 0,
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative flex-1 flex items-center">
        <Search className="w-4 h-4 absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full min-h-[48px] pl-10 pr-9 py-2.5 text-xs rounded-2xl bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200/80 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className="relative min-w-[48px] min-h-[48px] rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition active-press border border-slate-200/80 dark:border-slate-700/80"
          aria-label="Filter Pencarian"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export const FilterPanel: React.FC<{
  categories?: string[];
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  onReset?: () => void;
}> = ({
  categories = ['Semua', 'Keuangan', 'Aktivitas Anak', 'Resep Dapur', 'Kesehatan', 'Safe Zone'],
  selectedCategory = 'Semua',
  onSelectCategory,
  onReset,
}) => {
  const { setFilterOpen } = useUIStore();

  return (
    <div className="space-y-4 font-sans">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
          Kategori Fitur
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              variant="selection"
              selected={selectedCategory === cat}
              onSelect={() => onSelectCategory && onSelectCategory(cat)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
          Rentang Waktu
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Hari Ini', 'Minggu Ini', 'Bulan Ini'].map((time) => (
            <button
              key={time}
              className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition"
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Button variant="ghost" size="sm" fullWidth onClick={onReset}>
          Reset Filter
        </Button>
        <Button size="sm" fullWidth onClick={() => setFilterOpen(false)}>
          Terapkan
        </Button>
      </div>
    </div>
  );
};
