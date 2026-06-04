import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ColorPickerPage from './pages/ColorPickerPage';
import FabricUploadPage from './pages/FabricUploadPage';
import AIMatchPage from './pages/AIMatchPage';
import TrendingPage from './pages/TrendingPage';
import SavedPage from './pages/SavedPage';
import ProfilePage from './pages/ProfilePage';
import PaletteDetailPage from './pages/PaletteDetailPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function AppContent() {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/app');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${isAppRoute ? 'pt-0' : 'pt-16 md:pt-20'}`}>
        <Routes>
          {/* Public site routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* App routes (mobile app feel) */}
          <Route path="/app" element={<HomePage />} />
          <Route path="/app/color-picker" element={<ColorPickerPage />} />
          <Route path="/app/fabric-upload" element={<FabricUploadPage />} />
          <Route path="/app/ai-match" element={<AIMatchPage />} />
          <Route path="/app/trending" element={<TrendingPage />} />
          <Route path="/app/saved" element={<SavedPage />} />
          <Route path="/app/profile" element={<ProfilePage />} />
          <Route path="/app/palette/:id" element={<PaletteDetailPage />} />
        </Routes>
      </main>
      {isAppRoute ? <BottomNav /> : <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
