import { useState } from 'react';
import { Heart, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Palette } from '../types';
import { getContrastColor } from '../lib/colorUtils';
import { useApp } from '../context/AppContext';

interface PaletteCardProps {
  palette: Palette;
  onClick?: () => void;
  showActions?: boolean;
}

const WHATSAPP_NUM = '2348142805347';

export default function PaletteCard({ palette, onClick, showActions = true }: PaletteCardProps) {
  const { savePalette, removePalette, isPaletteSaved } = useApp();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(palette.likes);
  const saved = isPaletteSaved(palette.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      removePalette(palette.id);
    } else {
      savePalette(palette);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Check out this beautiful "${palette.name}" color palette! Colors: ${palette.colors.map(c => c.name).join(', ')}`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      onClick={onClick}
      className="card cursor-pointer group"
    >
      {/* Palette preview */}
      <div className="flex h-16">
        {palette.colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 first:rounded-tl-2xl last:rounded-tr-2xl transition-all duration-300 group-hover:first:rounded-tl-2xl"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-serif font-semibold text-burgundy-950 text-base leading-tight">
              {palette.name}
            </h3>
            {palette.description && (
              <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{palette.description}</p>
            )}
          </div>
          {palette.isTrending && (
            <span className="badge bg-burgundy-50 text-burgundy-700 ml-2 flex-shrink-0">
              Trending
            </span>
          )}
        </div>

        {/* Color chips */}
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {palette.colors.slice(0, 5).map((color, i) => (
            <div
              key={i}
              className="group/chip relative"
              title={`${color.name} ${color.hex}`}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm color-swatch"
                style={{ backgroundColor: color.hex }}
              />
            </div>
          ))}
          <span className="text-xs text-gray-400 self-center ml-1 font-mono">
            {palette.colors[0]?.hex}
          </span>
        </div>

        {showActions && (
          <div className="flex items-center justify-between pt-2 border-t border-cream-200">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart
                size={14}
                className={liked ? 'fill-red-500 text-red-500' : ''}
              />
              <span>{likeCount.toLocaleString()}</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-7 h-7 rounded-lg bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors"
              >
                <Share2 size={13} className="text-gray-600" />
              </button>
              <button
                onClick={handleSave}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  saved ? 'bg-burgundy-900 text-white' : 'bg-cream-100 hover:bg-cream-200 text-gray-600'
                }`}
              >
                {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
