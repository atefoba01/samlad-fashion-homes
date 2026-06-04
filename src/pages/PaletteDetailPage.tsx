import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, BookmarkCheck, Bookmark, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { TRENDING_PALETTES } from '../data/palettes';
import { useApp } from '../context/AppContext';
import { getContrastColor } from '../lib/colorUtils';

const WHATSAPP_NUM = '2348142805347';

export default function PaletteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { savePalette, removePalette, isPaletteSaved } = useApp();
  const [copied, setCopied] = useState<string | null>(null);

  const palette = TRENDING_PALETTES.find(p => p.id === id);
  const saved = palette ? isPaletteSaved(palette.id) : false;

  if (!palette) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Palette not found</p>
          <button onClick={() => navigate('/app')} className="btn-primary text-sm py-2 px-6">Go Home</button>
        </div>
      </div>
    );
  }

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleShare = () => {
    const text = `Check out this beautiful "${palette.name}" color palette!\n\nColors:\n${palette.colors.map(c => `• ${c.name}: ${c.hex}`).join('\n')}\n\nDiscover more at Samlad Fashion Homes!`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="font-serif font-semibold text-burgundy-950 flex-1">Your Color Palette</h1>
          <button
            onClick={() => saved ? removePalette(palette.id) : savePalette(palette)}
            className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center"
          >
            {saved ? <BookmarkCheck size={18} className="text-burgundy-900" /> : <Bookmark size={18} className="text-gray-500" />}
          </button>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-5 space-y-5">
        {/* Big palette display */}
        <div className="card overflow-hidden">
          <div className="flex h-28">
            {palette.colors.map((color, i) => (
              <div
                key={i}
                className="flex-1 relative group cursor-pointer"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyHex(color.hex)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/10">
                  <span className="text-[10px] font-medium" style={{ color: getContrastColor(color.hex) }}>
                    {copied === color.hex ? '✓' : 'Copy'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4">
            <h2 className="font-serif text-xl font-semibold text-burgundy-950 mb-1">{palette.name}</h2>
            <p className="text-gray-500 text-sm mb-2">{palette.description}</p>
            {palette.tags && (
              <div className="flex gap-2 flex-wrap">
                {palette.tags.map(tag => (
                  <span key={tag} className="badge bg-cream-100 text-gray-600">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inspiration image */}
        {palette.image && (
          <div className="card overflow-hidden">
            <p className="px-4 pt-4 text-sm font-semibold text-gray-700 mb-2">Fashion Inspiration</p>
            <div className="grid grid-cols-2 gap-1 px-4 pb-4">
              {[palette.image, palette.image].map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[3/4]">
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Color breakdown */}
        <div className="card p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Color Breakdown</p>
          <div className="space-y-3">
            {palette.colors.map((color, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl shadow-sm flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800">{color.name}</p>
                  <p className="text-xs font-mono text-gray-400">{color.hex.toUpperCase()}</p>
                  <p className="text-xs text-gray-400">RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})</p>
                </div>
                <button
                  onClick={() => copyHex(color.hex)}
                  className="w-8 h-8 rounded-xl bg-cream-100 hover:bg-cream-200 flex items-center justify-center transition-colors"
                >
                  {copied === color.hex ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-600" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => saved ? removePalette(palette.id) : savePalette(palette)}
            className={`py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              saved ? 'bg-green-50 text-green-600 border-2 border-green-200' : 'btn-primary'
            }`}
          >
            {saved ? <><BookmarkCheck size={16} /> Saved</> : <><Bookmark size={16} /> Save Palette</>}
          </button>
          <button
            onClick={handleShare}
            className="py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5c] transition-colors"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
