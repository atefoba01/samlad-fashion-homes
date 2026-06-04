import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Heart, Eye, Download, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WHATSAPP_NUM = '2348142805347';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { savedPalettes } = useApp();

  const MENU_ITEMS = [
    { icon: Bookmark, label: 'My Boards', desc: `${savedPalettes.length} saved palettes`, to: '/app/saved' },
    { icon: Heart, label: 'Liked Palettes', desc: 'Your liked color palettes', to: '/app/trending' },
    { icon: Eye, label: 'Recently Viewed', desc: 'Palettes you viewed recently', to: '/app/trending' },
    { icon: Download, label: 'Download History', desc: 'Palettes you downloaded', to: '/app' },
    { icon: Settings, label: 'Settings', desc: 'App preferences', to: '/app' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="font-serif font-semibold text-burgundy-950 text-lg">Profile</h1>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-5 space-y-5">
        {/* Profile card */}
        <div className="card p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-burgundy-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-bold font-serif">F</span>
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-burgundy-950">Fashion Explorer</h2>
              <p className="text-gray-400 text-xs">fashion@example.com</p>
            </div>
          </div>
        </div>

        {/* Premium banner */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #D4AF37 50%, #8B7355 100%)' }}>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👑</span>
              <div className="flex-1">
                <p className="font-serif font-bold text-white text-base">Samlad Fashion Premium</p>
                <p className="text-white/80 text-xs mt-1">Unlock unlimited palettes, AI suggestions, HD downloads and more.</p>
              </div>
            </div>
            <button className="mt-4 bg-white text-gold-700 font-semibold text-sm py-2.5 px-5 rounded-full hover:bg-cream-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Saved', value: savedPalettes.length },
            { label: 'Liked', value: 12 },
            { label: 'Shared', value: 5 },
          ].map(stat => (
            <div key={stat.label} className="card p-4 text-center">
              <p className="font-serif text-2xl font-bold text-burgundy-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div className="card divide-y divide-cream-100">
          {MENU_ITEMS.map(({ icon: Icon, label, desc, to }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className="w-full flex items-center gap-4 p-4 hover:bg-cream-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-burgundy-900" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <span className="text-gray-300">›</span>
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className="card p-5 text-center">
          <p className="text-sm text-gray-600 mb-3">Need help with colors for your event?</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUM}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold text-sm py-3 px-6 rounded-full hover:bg-[#1ebe5c] transition-colors"
          >
            Chat with Samlad
          </a>
        </div>
      </div>
    </div>
  );
}
