import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Bookmark, User, Plus } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/app', label: 'Home', icon: Home },
  { to: '/app/trending', label: 'Explore', icon: Compass },
  { to: '/app/saved', label: 'Boards', icon: Bookmark },
  { to: '/app/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-cream-200 safe-area-pb">
      <div className="max-w-[480px] mx-auto px-2">
        <div className="flex items-center justify-around py-2 relative">
          {NAV_ITEMS.slice(0, 2).map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} className={`nav-item ${active ? 'active' : ''}`}>
                <Icon size={20} className={active ? 'text-burgundy-900' : 'text-gray-400'} />
                <span className={`text-[10px] font-medium ${active ? 'text-burgundy-900' : 'text-gray-400'}`}>
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Center add button */}
          <Link
            to="/app/color-picker"
            className="w-12 h-12 rounded-full bg-burgundy-900 flex items-center justify-center shadow-lg shadow-burgundy-900/30 -mt-4 hover:bg-burgundy-800 transition-colors active:scale-95"
          >
            <Plus size={22} className="text-white" />
          </Link>

          {NAV_ITEMS.slice(2).map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} className={`nav-item ${active ? 'active' : ''}`}>
                <Icon size={20} className={active ? 'text-burgundy-900' : 'text-gray-400'} />
                <span className={`text-[10px] font-medium ${active ? 'text-burgundy-900' : 'text-gray-400'}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
