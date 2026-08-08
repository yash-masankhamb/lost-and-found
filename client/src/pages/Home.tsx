import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import type { LostFoundItem, ItemType } from '@/types';
import ItemGrid from '@/components/ItemGrid';

interface HomeProps {
  items: LostFoundItem[];
}

export default function Home({ items }: HomeProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | ItemType>('all');

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const filterBtn = (val: 'all' | ItemType, label: string) => (
    <button
      onClick={() => setFilter(val)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        filter === val ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          Lost something? Found something?
        </h1>
        <p className="text-gray-500 text-base">
          Browse community posts and help reunite people with their belongings.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, location, or description..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
          {filterBtn('all', 'All')}
          {filterBtn('lost', 'Lost')}
          {filterBtn('found', 'Found')}
        </div>
      </div>

      <ItemGrid items={filtered} />
    </div>
  );
}
