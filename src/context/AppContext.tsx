import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Language, 
  ToastMessage, 
  EcoMetrics 
} from '../types';
import { translations } from '../constants/translations';
import { initialEcoMetrics } from '../constants/ecoData';

export type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  t: typeof translations.ru;
  
  // Theme (Dark / Light)
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Modals & Panels
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isEmergencyOpen: boolean;
  setEmergencyOpen: (open: boolean) => void;
  
  // Navigation deep links
  selectedRoomForNav: string | null;
  setSelectedRoomForNav: (room: string | null) => void;

  // Eco State
  ecoMetrics: EcoMetrics;
  recordCertificateIssued: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru'); // default Russian for hackathon jury readability, easily switchable to KK
  const [role, setRole] = useState<UserRole>('student');
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('smart_school_theme');
    return (saved as Theme) || 'dark';
  });
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setEmergencyOpen] = useState<boolean>(false);
  const [selectedRoomForNav, setSelectedRoomForNav] = useState<string | null>(null);
  const [ecoMetrics, setEcoMetrics] = useState<EcoMetrics>(() => {
    const cached = localStorage.getItem('smart_school_eco');
    if (cached) {
      try { return JSON.parse(cached); } catch { /* noop */ }
    }
    return initialEcoMetrics;
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const t = translations[language] || translations.ru;

  // Sync theme with DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('smart_school_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Hotkey listener for CMD+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const recordCertificateIssued = () => {
    setEcoMetrics(prev => {
      const updated: EcoMetrics = {
        ...prev,
        totalDigitizedCertificates: prev.totalDigitizedCertificates + 1,
        paperSheetsSaved: prev.paperSheetsSaved + 4,
        waterLitersSaved: Math.round(prev.waterLitersSaved + 0.72),
        co2KgReduced: parseFloat((prev.co2KgReduced + 0.12).toFixed(1)),
      };
      localStorage.setItem('smart_school_eco', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        t,
        theme,
        toggleTheme,
        setTheme,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isEmergencyOpen,
        setEmergencyOpen,
        selectedRoomForNav,
        setSelectedRoomForNav,
        ecoMetrics,
        recordCertificateIssued,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
