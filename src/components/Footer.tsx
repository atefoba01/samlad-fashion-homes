import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Instagram, Facebook, MapPin, Mail, Sparkles } from 'lucide-react';

const WHATSAPP_NUM = '2348142805347';
const DISPLAY_NUM = '08142805347';

export default function Footer() {
  return (
    <footer className="bg-burgundy-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                <Sparkles size={18} className="text-gold-400" />
              </div>
              <div>
                <p className="font-serif font-semibold text-lg leading-none text-white">Samlad</p>
                <p className="text-[10px] tracking-widest uppercase font-medium text-gold-400">Fashion Homes</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              Discover beautiful color combinations for fashion, weddings, parties, and special events across Nigeria and Africa.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366]/40 transition-colors"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={16} className="text-white/70" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={16} className="text-white/70" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-gold-400 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/app', label: 'Color App' },
                { to: '/app/trending', label: 'Trending Palettes' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/about', label: 'About Samlad' },
                { to: '/contact', label: 'Contact Us' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 text-sm hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-gold-400 font-medium mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-gold-400 transition-colors group"
                >
                  <MessageCircle size={15} className="group-hover:text-[#25D366] transition-colors" />
                  WhatsApp: {DISPLAY_NUM}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${DISPLAY_NUM}`}
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-gold-400 transition-colors group"
                >
                  <Phone size={15} className="group-hover:text-gold-400 transition-colors" />
                  Call: {DISPLAY_NUM}
                </a>
              </li>
              <li>
                <a
                  href="mailto:samlad@fashionhomes.com"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-gold-400 transition-colors"
                >
                  <Mail size={15} />
                  samlad@fashionhomes.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>Ilorin, Kwara State, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Samlad Fashion Homes. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Designed with love for Nigerian fashion
          </p>
        </div>
      </div>
    </footer>
  );
}
