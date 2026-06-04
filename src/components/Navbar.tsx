import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/app', label: 'App' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const transparent = isLanding && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              transparent ? 'bg-gold-500/20' : 'bg-burgundy-900'
            }`}>
              <Sparkles size={16} className={transparent ? 'text-gold-400' : 'text-gold-400'} />
            </div>
            <div>
              <p className={`font-serif font-semibold text-sm leading-none transition-colors ${
                transparent ? 'text-white' : 'text-burgundy-900'
              }`}>
                Samlad
              </p>
              <p className={`text-[10px] tracking-widest uppercase font-medium transition-colors ${
                transparent ? 'text-gold-400' : 'text-gold-600'
              }`}>
                Fashion Homes
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-burgundy-900 text-white'
                    : transparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-burgundy-900 hover:bg-burgundy-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/app"
              className="ml-2 btn-gold text-sm py-2 px-5"
            >
              Explore Colors
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              transparent ? 'text-white hover:bg-white/10' : 'text-burgundy-900 hover:bg-burgundy-50'
            }`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-cream-200 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-burgundy-900 text-white'
                    : 'text-gray-700 hover:bg-cream-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/app" className="block btn-gold text-sm py-3 text-center mt-2">
              Explore Colors
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
