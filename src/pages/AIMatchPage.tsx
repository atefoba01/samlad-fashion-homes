import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronRight, Sparkles, Check } from 'lucide-react';
import PaletteCard from '../components/PaletteCard';
import { TRENDING_PALETTES, EVENT_TYPES } from '../data/palettes';
import { useApp } from '../context/AppContext';

const STEPS = ['Event Type', 'Style Preference', 'Results'];

const STYLE_OPTIONS = [
  { id: 'elegant', label: 'Elegant & Formal', icon: '✨' },
  { id: 'vibrant', label: 'Vibrant & Bold', icon: '🎨' },
  { id: 'traditional', label: 'Traditional & Cultural', icon: '🌿' },
  { id: 'modern', label: 'Modern & Minimal', icon: '◻️' },
  { id: 'romantic', label: 'Romantic & Soft', icon: '🌸' },
  { id: 'regal', label: 'Regal & Rich', icon: '👑' },
];

const EVENT_PALETTE_MAP: Record<string, string[]> = {
  wedding: ['1', '9', '11', '3'],
  engagement: ['11', '1', '3', '9'],
  traditional: ['2', '6', '12', '8'],
  birthday: ['7', '5', '12', '8'],
  'baby-naming': ['7', '11', '5', '1'],
  other: ['1', '2', '3', '4'],
};

export default function AIMatchPage() {
  const navigate = useNavigate();
  const { savePalette } = useApp();
  const [step, setStep] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<typeof TRENDING_PALETTES>([]);

  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const paletteIds = EVENT_PALETTE_MAP[selectedEvent] || ['1', '2', '3', '4'];
      const matched = paletteIds.map(id => TRENDING_PALETTES.find(p => p.id === id)).filter(Boolean) as typeof TRENDING_PALETTES;
      setResults(matched);
      setGenerating(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-cream-200">
        <div className="max-w-[480px] mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)}
            className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="font-serif font-semibold text-burgundy-950 text-base">AI Color Suggestion</h1>
          </div>
        </div>

        {/* Step indicator */}
        <div className="max-w-[480px] mx-auto px-4 pb-3">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i < step ? 'bg-burgundy-900 text-white' :
                  i === step ? 'bg-gold-500 text-white' :
                  'bg-cream-200 text-gray-400'
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`text-xs font-medium ${i === step ? 'text-burgundy-900' : 'text-gray-400'}`}>{s}</span>
                {i < STEPS.length - 1 && <ChevronRight size={12} className="text-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[480px] mx-auto px-4 py-5">
        {/* Step 0: Event Type */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-xl font-semibold text-burgundy-950 mb-1">What type of ceremony are you planning?</h2>
            <p className="text-gray-400 text-sm mb-5">Choose your event type for personalized color suggestions</p>
            <div className="grid grid-cols-3 gap-3">
              {EVENT_TYPES.map(event => (
                <button
                  key={event.id}
                  onClick={() => handleEventSelect(event.id)}
                  className={`relative overflow-hidden rounded-2xl aspect-square transition-all ${
                    selectedEvent === event.id ? 'ring-3 ring-gold-500 scale-95' : 'hover:scale-95'
                  }`}
                  style={{ boxShadow: selectedEvent === event.id ? '0 0 0 3px #C9A84C' : '' }}
                >
                  <img src={event.image} alt={event.label} className="w-full h-full object-cover" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-burgundy-950/80 to-transparent transition-opacity ${
                    selectedEvent === event.id ? 'opacity-100' : 'opacity-70'
                  }`} />
                  {selectedEvent === event.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
                      <Check size={11} className="text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-white text-[11px] font-semibold leading-tight block">{event.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => selectedEvent && setStep(1)}
              disabled={!selectedEvent}
              className={`w-full mt-6 py-4 rounded-2xl font-semibold text-sm transition-all ${
                selectedEvent ? 'btn-primary' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 1: Style */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-xl font-semibold text-burgundy-950 mb-1">What's your style preference?</h2>
            <p className="text-gray-400 text-sm mb-5">Select a style that matches your vision</p>
            <div className="grid grid-cols-2 gap-3">
              {STYLE_OPTIONS.map(style => (
                <button
                  key={style.id}
                  onClick={() => handleStyleSelect(style.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedStyle === style.id
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-cream-200 bg-white hover:border-cream-300'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{style.icon}</span>
                  <span className={`text-sm font-medium ${selectedStyle === style.id ? 'text-burgundy-900' : 'text-gray-700'}`}>
                    {style.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              disabled={!selectedStyle || generating}
              className={`w-full mt-6 py-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                selectedStyle && !generating ? 'btn-primary' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {generating ? (
                <>
                  <Sparkles size={16} className="animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Color Suggestions
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Results */}
        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-3">
                <Sparkles size={24} className="text-gold-500" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-burgundy-950">Your Color Suggestions</h2>
              <p className="text-gray-500 text-sm mt-1">
                AI-matched palettes for {EVENT_TYPES.find(e => e.id === selectedEvent)?.label}
              </p>
            </div>
            {results.map(palette => (
              <PaletteCard
                key={palette.id}
                palette={palette}
                onClick={() => navigate(`/app/palette/${palette.id}`)}
              />
            ))}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { setStep(0); setSelectedEvent(''); setSelectedStyle(''); setResults([]); }}
                className="flex-1 btn-outline text-sm py-3"
              >
                Start Over
              </button>
              <button
                onClick={() => results.forEach(p => savePalette(p))}
                className="flex-1 btn-primary text-sm py-3"
              >
                Save All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
