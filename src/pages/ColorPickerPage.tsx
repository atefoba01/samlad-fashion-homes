import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Shuffle, Plus, X } from 'lucide-react';
import { generateMatchingColors, hexToRgb, getContrastColor, findNearestColorName } from '../lib/colorUtils';
import { useApp } from '../context/AppContext';
import type { ColorInfo, Palette } from '../types';

const PRESET_COLORS = [
  '#4A1020', '#C9A84C', '#064E3B', '#0A1931', '#C65D2A',
  '#E8A0BF', '#D62828', '#2D4A27', '#FF6B6B', '#8B1A1A',
  '#6B0F1A', '#003049', '#4B1D4D', '#2E8B57', '#D4AF37',
];

export default function ColorPickerPage() {
  const navigate = useNavigate();
  const { savePalette, addRecentColor, recentColors } = useApp();
  const [selectedColor, setSelectedColor] = useState('#C9A84C');
  const [matchingColors, setMatchingColors] = useState<ColorInfo[]>(() => generateMatchingColors('#C9A84C'));
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const updateColor = useCallback((hex: string) => {
    setSelectedColor(hex);
    setMatchingColors(generateMatchingColors(hex));
    addRecentColor(hex);
    setSaved(false);
  }, [addRecentColor]);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  const randomColor = () => {
    const random = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
    updateColor(random);
  };

  const addToCustom = (hex: string) => {
    if (!customColors.includes(hex) && customColors.length < 8) {
      setCustomColors(prev => [...prev, hex]);
    }
  };

  const removeFromCustom = (hex: string) => {
    setCustomColors(prev => prev.filter(c => c !== hex));
  };

  const handleSavePalette = () => {
    const palette: Palette = {
      id: `custom-${Date.now()}`,
      name: `Custom Palette - ${findNearestColorName(selectedColor)}`,
      description: 'My custom color combination',
      colors: matchingColors.slice(0, 5).map(c => ({ ...c, name: findNearestColorName(c.hex) })),
      category: 'casual',
      likes: 0,
      tags: ['Custom', 'My Palette'],
    };
    savePalette(palette);
    setSaved(true);
  };

  const { r, g, b } = hexToRgb(selectedColor);
  const textColor = getContrastColor(selectedColor);

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center transition-colors">
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <h1 className="font-serif font-semibold text-burgundy-950 text-lg">Color Picker</h1>
          <button onClick={randomColor} className="ml-auto w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center transition-colors" title="Random color">
            <Shuffle size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-5 space-y-5">
        {/* Color display */}
        <div
          className="rounded-3xl p-6 transition-all duration-500 relative overflow-hidden"
          style={{ backgroundColor: selectedColor }}
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white, transparent 60%)' }} />
          <p className="font-serif text-2xl font-semibold mb-1 relative" style={{ color: textColor }}>
            {findNearestColorName(selectedColor)}
          </p>
          <div className="flex items-center gap-3 relative">
            <p className="font-mono text-lg font-bold" style={{ color: textColor }}>
              {selectedColor.toUpperCase()}
            </p>
            <button
              onClick={() => copyHex(selectedColor)}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: `${textColor}20` }}
            >
              {copied === selectedColor ? (
                <Check size={13} style={{ color: textColor }} />
              ) : (
                <Copy size={13} style={{ color: textColor }} />
              )}
            </button>
          </div>
          <p className="text-xs mt-1 opacity-70 font-mono" style={{ color: textColor }}>
            RGB({r}, {g}, {b})
          </p>
        </div>

        {/* Color picker input */}
        <div className="card p-4">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Pick Your Color</p>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => updateColor(e.target.value)}
                className="w-16 h-16 rounded-2xl cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{6}$/.test(val)) updateColor(val);
                  else setSelectedColor(val);
                }}
                className="input-field font-mono text-sm"
                placeholder="#000000"
                maxLength={7}
              />
              <p className="text-[11px] text-gray-400 mt-1">Enter HEX code or use the color picker</p>
            </div>
          </div>
        </div>

        {/* Preset colors */}
        <div className="card p-4">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map(color => (
              <button
                key={color}
                onClick={() => updateColor(color)}
                className={`w-9 h-9 rounded-xl color-swatch transition-all ${
                  selectedColor === color ? 'ring-2 ring-gold-500 ring-offset-2 scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Recent colors */}
        {recentColors.length > 0 && (
          <div className="card p-4">
            <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Recently Used</p>
            <div className="flex flex-wrap gap-2">
              {recentColors.map(color => (
                <button
                  key={color}
                  onClick={() => updateColor(color)}
                  className="w-9 h-9 rounded-xl color-swatch"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Matching colors */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">Matching Colors</p>
          <div className="space-y-2">
            {matchingColors.map((color, i) => (
              <div key={i} className="card p-3 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex-shrink-0 color-swatch"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => updateColor(color.hex)}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800">{color.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{color.hex.toUpperCase()}</p>
                  <p className="text-xs text-gray-400">RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => addToCustom(color.hex)}
                    className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-cream-200 flex items-center justify-center transition-colors"
                    title="Add to custom palette"
                  >
                    <Plus size={13} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => copyHex(color.hex)}
                    className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-cream-200 flex items-center justify-center transition-colors"
                  >
                    {copied === color.hex ? (
                      <Check size={13} className="text-green-600" />
                    ) : (
                      <Copy size={13} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom palette builder */}
        {customColors.length > 0 && (
          <div className="card p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Custom Palette ({customColors.length}/8)</p>
            <div className="flex gap-2 mb-3 flex-wrap">
              {customColors.map(color => (
                <div key={color} className="relative group">
                  <div
                    className="w-10 h-10 rounded-xl color-swatch"
                    style={{ backgroundColor: color }}
                  />
                  <button
                    onClick={() => removeFromCustom(color)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const palette: Palette = {
                  id: `custom-${Date.now()}`,
                  name: 'My Custom Palette',
                  description: 'Handpicked color combination',
                  colors: customColors.slice(0, 5).map(hex => ({
                    hex,
                    rgb: hexToRgb(hex),
                    name: findNearestColorName(hex),
                  })),
                  category: 'casual',
                  likes: 0,
                };
                savePalette(palette);
                setCustomColors([]);
              }}
              className="btn-primary text-sm py-2.5 w-full"
            >
              Save Custom Palette
            </button>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSavePalette}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'btn-primary'
          }`}
        >
          {saved ? '✓ Palette Saved!' : 'Save This Palette'}
        </button>
      </div>
    </div>
  );
}
