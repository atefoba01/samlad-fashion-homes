import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/palettes';

interface HeroSliderProps {
  onCTAClick?: () => void;
}

export default function HeroSlider({ onCTAClick }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setTransitioning(false);
    }, 300);
  }, [transitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background images */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover animate-ken-burns"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className={`transition-all duration-700 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 backdrop-gold border border-gold-400/30 text-gold-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
            AI-Powered Color Matching
          </div>

          {/* Brand */}
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white mb-2 text-shadow">
            Samlad
          </h1>
          <p className="text-gold-400 tracking-[0.3em] uppercase text-sm font-medium mb-6">
            Fashion Homes
          </p>

          {/* Slide title */}
          <h2 className="font-serif text-2xl md:text-4xl text-white/90 mb-2 text-shadow">
            {slide.title}
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-md mx-auto mb-10">
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onCTAClick} className="btn-gold text-sm min-w-[160px]">
              Get Started
            </button>
            <a href="#explore" className="border-2 border-white/40 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all text-sm min-w-[160px]">
              Explore Palettes
            </a>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-8 h-2 bg-gold-400' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Arrow controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors hidden md:flex"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors hidden md:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
