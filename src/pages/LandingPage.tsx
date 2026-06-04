import { useNavigate } from 'react-router-dom';
import { Sparkles, Palette, Camera, TrendingUp, Heart, Share2, Zap, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import PaletteCard from '../components/PaletteCard';
import ReviewSlider from '../components/ReviewSlider';
import { TRENDING_PALETTES } from '../data/palettes';

const FEATURES = [
  { icon: Zap, title: 'AI Color Matching', desc: 'Instant intelligent color combinations powered by AI algorithms.' },
  { icon: Palette, title: 'Nigerian Ceremony Inspired', desc: 'Palettes crafted for Yoruba, Igbo, Hausa, and pan-African celebrations.' },
  { icon: Share2, title: 'Save & Share Easily', desc: 'Share palettes directly to WhatsApp, Instagram, and more.' },
  { icon: Camera, title: 'Fabric Upload', desc: 'Upload your fabric photo and extract dominant colors automatically.' },
  { icon: Globe, title: 'Find Perfect Matches', desc: 'Discover complementary colors for clothing, shoes, and accessories.' },
  { icon: Heart, title: 'Trusted by Planners', desc: 'Used by top fashion designers and event planners across Nigeria.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-cream-50 overflow-x-hidden">
      {/* Hero */}
      <HeroSlider onCTAClick={() => navigate('/app')} />

      {/* Features strip */}
      <div className="bg-white border-b border-cream-200 py-6" id="explore">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {FEATURES.map(({ icon: Icon, title }) => (
              <div key={title} className="flex flex-col items-center gap-2 p-3">
                <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center">
                  <Icon size={18} className="text-burgundy-900" />
                </div>
                <p className="text-xs font-medium text-gray-700 leading-tight">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App intro section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-3">Color Intelligence</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-burgundy-950 leading-tight mb-5">
              Perfect Colors for<br />
              <span className="gold-text">Every Occasion</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-7">
              Samlad Fashion Homes brings AI-powered color intelligence to Nigerian fashion. Whether you're planning a wedding, coordinating Aso Ebi, or styling for a birthday — we help you find the perfect color harmony.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Discover color combinations for Ankara, George, Lace & Silk fabrics',
                'AI recommendations for weddings, traditional ceremonies & parties',
                'Coordinate matching shoes, bags & accessories',
                'Trending palettes inspired by Nigerian fashion',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/app')} className="btn-primary flex items-center gap-2 justify-center">
                Start Exploring
                <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/gallery')} className="btn-outline flex items-center gap-2 justify-center">
                View Gallery
              </button>
            </div>
          </div>

          {/* App mockup */}
          <div className="relative flex justify-center">
            <div className="relative w-64 h-[520px]">
              <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900 to-burgundy-950 rounded-[3rem] shadow-2xl overflow-hidden border-4 border-gray-800">
                <div className="p-4 pt-8">
                  <p className="text-gold-400 text-xs tracking-widest uppercase font-medium text-center mb-1">Trending Now</p>
                  <h3 className="font-serif text-white text-xl font-semibold text-center mb-4">Royal Elegance</h3>
                  <div className="flex gap-1 mb-4 rounded-xl overflow-hidden">
                    {TRENDING_PALETTES[0].colors.map((c, i) => (
                      <div key={i} className="flex-1 h-16" style={{ backgroundColor: c.hex }} />
                    ))}
                  </div>
                  <div className="space-y-2">
                    {TRENDING_PALETTES.slice(1, 4).map((p) => (
                      <div key={p.id} className="flex items-center gap-2 bg-white/10 rounded-xl p-2">
                        <div className="flex gap-0.5">
                          {p.colors.slice(0, 3).map((c, i) => (
                            <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: c.hex }} />
                          ))}
                        </div>
                        <span className="text-white text-xs font-medium truncate">{p.name}</span>
                        <span className="text-gold-400 text-xs ml-auto">{p.likes}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gold-500/20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-burgundy-900/30 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick action cards */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-2">Features</p>
            <h2 className="section-title">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: 'Find Colors', desc: 'Pick any color and get instant matching combinations', to: '/app/color-picker', color: 'bg-burgundy-900' },
              { icon: Sparkles, title: 'AI Suggest', desc: 'Get AI-generated palettes for your specific event type', to: '/app/ai-match', color: 'bg-gold-600' },
              { icon: Camera, title: 'Upload Fabric', desc: 'Extract colors from your fabric photo automatically', to: '/app/fabric-upload', color: 'bg-burgundy-800' },
              { icon: TrendingUp, title: 'My Boards', desc: 'Save and organize your favorite color palettes', to: '/app/saved', color: 'bg-gold-700' },
            ].map(item => (
              <button
                key={item.title}
                onClick={() => navigate(item.to)}
                className="card p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={22} className="text-white" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-burgundy-950 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-gold-600 text-sm font-medium">
                  Try now <ArrowRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trending palettes */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-2">Popular</p>
            <h2 className="section-title">Trending Palettes</h2>
          </div>
          <button
            onClick={() => navigate('/app/trending')}
            className="flex items-center gap-1 text-burgundy-900 font-medium text-sm hover:text-gold-600 transition-colors"
          >
            See all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING_PALETTES.slice(0, 6).map(palette => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              onClick={() => navigate(`/app/palette/${palette.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <ReviewSlider />

      {/* Gallery preview */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold-600 text-sm tracking-widest uppercase font-medium mb-2">Our Work</p>
            <h2 className="section-title">Fashion Gallery</h2>
          </div>
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-1 text-burgundy-900 font-medium text-sm hover:text-gold-600 transition-colors"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/3943878/pexels-photo-3943878.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
          ].map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer" onClick={() => navigate('/gallery')}>
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-burgundy-950/0 group-hover:bg-burgundy-950/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">View Work</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-burgundy-950 via-burgundy-900 to-burgundy-800 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-serif text-3xl md:text-5xl text-white font-semibold mb-4">
            Ready to Find Your<br />
            <span className="gold-text">Perfect Palette?</span>
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
            Join thousands of fashion lovers, event planners, and designers who use Samlad Fashion Homes to create stunning color combinations.
          </p>
          <button
            onClick={() => navigate('/app')}
            className="btn-gold text-base py-4 px-10"
          >
            Start For Free
          </button>
        </div>
      </section>
    </div>
  );
}
