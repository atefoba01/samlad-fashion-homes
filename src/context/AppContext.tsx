import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Palette, SavedPalette } from '../types';
import { supabase } from '../lib/supabase';

interface AppContextType {
  savedPalettes: SavedPalette[];
  savePalette: (palette: Palette) => void;
  removePalette: (id: string) => void;
  isPaletteSaved: (id: string) => boolean;
  customColors: string[];
  addCustomColor: (hex: string) => void;
  recentColors: string[];
  addRecentColor: (hex: string) => void;
  userId: string | null;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(() => {
    try {
      const stored = localStorage.getItem('samlad_saved_palettes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const [customColors, setCustomColors] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('samlad_custom_colors');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [recentColors, setRecentColors] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('samlad_recent_colors');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('samlad_saved_palettes', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  useEffect(() => {
    localStorage.setItem('samlad_custom_colors', JSON.stringify(customColors));
  }, [customColors]);

  useEffect(() => {
    localStorage.setItem('samlad_recent_colors', JSON.stringify(recentColors));
  }, [recentColors]);

  const savePalette = (palette: Palette) => {
    if (!savedPalettes.find(p => p.id === palette.id)) {
      setSavedPalettes(prev => [{ ...palette, savedAt: new Date().toISOString() }, ...prev]);
    }
  };

  const removePalette = (id: string) => {
    setSavedPalettes(prev => prev.filter(p => p.id !== id));
  };

  const isPaletteSaved = (id: string) => savedPalettes.some(p => p.id === id);

  const addCustomColor = (hex: string) => {
    setCustomColors(prev => {
      const updated = [hex, ...prev.filter(c => c !== hex)].slice(0, 20);
      return updated;
    });
  };

  const addRecentColor = (hex: string) => {
    setRecentColors(prev => {
      const updated = [hex, ...prev.filter(c => c !== hex)].slice(0, 10);
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{
      savedPalettes,
      savePalette,
      removePalette,
      isPaletteSaved,
      customColors,
      addCustomColor,
      recentColors,
      addRecentColor,
      userId,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
