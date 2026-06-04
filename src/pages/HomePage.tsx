import { useNavigate } from 'react-router-dom';
import { Palette, Sparkles, Camera, Bookmark, Bell, Search, TrendingUp, ArrowRight } from 'lucide-react';
import PaletteCard from '../components/PaletteCard';
import { TRENDING_PALETTES, EVENT_TYPES } from '../data/palettes';

const QUICK_ACTIONS = [
  { icon: Palette, label: 'Find Colors', desc: 'Get combinations', to: '/app/color-picker', bg: 'bg-burgundy-900' },
  { icon: Sparkles, label: 'AI Suggest', desc: 'Let AI assist', to: '/app/ai-match', bg: 'bg-gold-600' },
  { icon: Camera, label: 'Upload Fabric', desc: 'Find matches', to: '/app/fabric-upload', bg: 'bg-burgundy-800' },
  { icon: Bookmark, label: 'My Boards', desc: 'Saved palettes', to: '/app/saved', bg: 'bg-gold-700' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs">Good day,</p>
            <h2 className="font-serif text-burgundy-950 font-semibold text-lg leading-tight">Fashion Explorer</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors">
              <Bell size={16} className="text-gray-600" />
            </button>
            <div className="w-9 h-9 rounded-full bg-burgundy-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-5 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search colors, palettes, themes..."
            className="input-field pl-9 text-sm"
            readOnly
            onClick={() => navigate('/app/trending')}
          />
        </div>

        {/* Quick actions */}
        <div>
          <p className="text-gray-700 font-semibold text-sm mb-3">What do you want to do?</p>
          <div className="grid grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(action => (
              <button
                key={action.label}
                onClick={() => navigate(action.to)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.bg} flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-all shadow-sm`}>
                  <action.icon size={22} className="text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.label}</span>
                <span className="text-[10px] text-gray-400 text-center leading-tight">{action.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-burgundy-900" />
              <p className="text-gray-700 font-semibold text-sm">Trending Palettes</p>
            </div>
            <button
              onClick={() => navigate('/app/trending')}
              className="flex items-center gap-1 text-xs text-gold-600 font-medium"
            >
              See all <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {TRENDING_PALETTES.filter(p => p.isTrending).slice(0, 4).map(palette => (
              <PaletteCard
                key={palette.id}
                palette={palette}
                onClick={() => navigate(`/app/palette/${palette.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Event categories */}
        <div>
          <p className="text-gray-700 font-semibold text-sm mb-3">Choose by Event</p>
          <div className="grid grid-cols-3 gap-2">
            {EVENT_TYPES.slice(0, 6).map(event => (
              <button
                key={event.id}
                onClick={() => navigate('/app/ai-match')}
                className="relative overflow-hidden rounded-xl aspect-square group"
              >
                <img src={event.image} alt={event.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 to-transparent flex items-end p-2">
                  <span className="text-white text-[11px] font-medium leading-tight">{event.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent palettes */}
        <div>
          <p className="text-gray-700 font-semibold text-sm mb-3">More Palettes</p>
          <div className="space-y-3">
            {TRENDING_PALETTES.slice(4, 8).map(palette => (
              <PaletteCard
                key={palette.id}
                palette={palette}
                onClick={() => navigate(`/app/palette/${palette.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
