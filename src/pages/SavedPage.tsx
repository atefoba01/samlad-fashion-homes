import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Trash2, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const WHATSAPP_NUM = '2348142805347';

export default function SavedPage() {
  const navigate = useNavigate();
  const { savedPalettes, removePalette } = useApp();

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="font-serif font-semibold text-burgundy-950 text-lg flex-1">My Board</h1>
          <span className="text-xs text-gray-400">{savedPalettes.length} saved</span>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-5">
        {savedPalettes.length > 0 ? (
          <div className="space-y-4">
            {savedPalettes.map(palette => (
              <div key={palette.id} className="card overflow-hidden">
                {/* Color strip */}
                <div className="flex h-12">
                  {palette.colors.map((c, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-serif font-semibold text-burgundy-950">{palette.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Saved {new Date(palette.savedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const text = `${palette.name} - Colors: ${palette.colors.map(c => c.name + ' ' + c.hex).join(', ')}`;
                          window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`, '_blank');
                        }}
                        className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors"
                      >
                        <Share2 size={14} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => removePalette(palette.id)}
                        className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Color details */}
                  <div className="space-y-1.5">
                    {palette.colors.slice(0, 3).map((color, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md" style={{ backgroundColor: color.hex }} />
                        <span className="text-xs text-gray-600 flex-1">{color.name}</span>
                        <span className="text-xs text-gray-400 font-mono">{color.hex.toUpperCase()}</span>
                      </div>
                    ))}
                    {palette.colors.length > 3 && (
                      <p className="text-xs text-gray-400">+{palette.colors.length - 3} more colors</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4">
              <Bookmark size={24} className="text-gray-300" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-gray-600 mb-2">No Saved Palettes</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto mb-5">
              Start saving your favorite color palettes by tapping the bookmark icon on any palette.
            </p>
            <button onClick={() => navigate('/app/trending')} className="btn-primary text-sm py-3 px-6">
              Explore Palettes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
