

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Search, Loader } from 'lucide-react';
import PaletteCard from '../components/PaletteCard';
import { CATEGORIES, TRENDING_PALETTES } from '../data/palettes';
import { getPalettes } from '../lib/supabase';
import type { Palette } from '../types';

function mapSupabasePalette(raw: Record<string, unknown>): Palette {
  return {
    id: String(raw.id ?? ''),
    name: String(raw.name ?? ''),
    description: String(raw.description ?? ''),
    colors: Array.isArray(raw.colors) ? raw.colors as Palette['colors'] : [],
    category: (raw.category as Palette['category']) ?? 'wedding',
    likes: Number(raw.likes ?? raw.likes_count ?? 0),
    isTrending: Boolean(raw.isTrending ?? raw.is_trending ?? false),
    image: raw.image ? String(raw.image) : undefined,
    tags: Array.isArray(raw.tags) ? raw.tags as string[] : undefined,
  };
}

export default function TrendingPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [palettes, setPalettes] = useState<Palette[]>(TRENDING_PALETTES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPalettes = async () => {
      setLoading(true);
      try {
        const { data } = await getPalettes(activeCategory);
        if (data && data.length > 0) {
          setPalettes(data.map(mapSupabasePalette));
        } else {
          const filtered = activeCategory === 'all'
            ? TRENDING_PALETTES
            : activeCategory === 'trending'
              ? TRENDING_PALETTES.filter(p => p.isTrending)
              : TRENDING_PALETTES.filter(p => p.category === activeCategory);
          setPalettes(filtered);
        }
      } catch {
        const filtered = activeCategory === 'all'
          ? TRENDING_PALETTES
          : activeCategory === 'trending'
            ? TRENDING_PALETTES.filter(p => p.isTrending)
            : TRENDING_PALETTES.filter(p => p.category === activeCategory);
        setPalettes(filtered);
      }
      setLoading(false);
    };
    loadPalettes();
  }, [activeCategory]);

  const filtered = useMemo(() => palettes.filter(p => {
    const q = query.toLowerCase();
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q));
  }), [palettes, query]);

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
