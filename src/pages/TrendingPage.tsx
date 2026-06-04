import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Search, Loader } from 'lucide-react';
import PaletteCard from '../components/PaletteCard';
import { CATEGORIES } from '../data/palettes';
import { getPalettes } from '../lib/supabase';
import type { Palette } from '../types';

export default function TrendingPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPalettes = async () => {
      setLoading(true);
      const { data } = await getPalettes(activeCategory);
      if (data) {
        const typed = data as unknown as Palette[];
        setPalettes(typed);
      }
      setLoading(false);
    };
    loadPalettes();
  }, [activeCategory]);

  const filtered = palettes.filter(p => {
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()));
    return matchQ;
  });

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <h1 className="font-serif font-semibold text-burgundy-950 text-lg flex-1">Explore Palettes</h1>
            <Filter size={16} className="text-gray-500" />
          </div>
          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search palettes..."
              className="input-field pl-9 text-sm"
            />
          </div>
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-burgundy-900 text-white'
                    : 'bg-cream-100 text-gray-600 hover:bg-cream-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader size={24} className="text-burgundy-900 animate-spin" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map(palette => (
              <PaletteCard
                key={palette.id}
                palette={palette}
                onClick={() => navigate(`/app/palette/${palette.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm">No palettes found</p>
            <button onClick={() => { setQuery(''); setActiveCategory('all'); }} className="mt-3 text-gold-600 text-sm font-medium">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
