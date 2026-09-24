import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { initialRooms } from '../../constants/roomsData';
import { 
  Search, 
  Layers, 
  Compass, 
  Sparkles, 
  Leaf, 
  FileBox, 
  MapPin, 
  PhoneCall, 
  ArrowRight,
  Activity,
  Megaphone,
  LifeBuoy,
  FlaskConical,
  Info
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setCommandPaletteOpen, 
    language, 
    setEmergencyOpen,
    setSelectedRoomForNav 
  } = useApp();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const items: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      // Navigation
      {
        id: 'nav-dashboard',
        title: language === 'kk' ? 'Құзыреттер матрицасы & Оқушы кабинеті' : 'Матрица компетенций и Кабинет ученика',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <Layers className="w-4 h-4 text-cyan-400" />,
        action: () => { navigate('/dashboard'); setCommandPaletteOpen(false); },
        badge: 'Ctrl+1'
      },
      {
        id: 'nav-eco',
        title: language === 'kk' ? 'Эко-мониторинг & Қағазсыз мектеп' : 'Эко-мониторинг и зеленая школа',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <Compass className="w-4 h-4 text-emerald-400" />,
        action: () => { navigate('/eco'); setCommandPaletteOpen(false); },
        badge: 'Ctrl+2'
      },
      {
        id: 'nav-schedule',
        title: language === 'kk' ? 'Ақылды ИИ: Кесте құрастырушы' : 'Smart AI: Генератор расписания',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <Sparkles className="w-4 h-4 text-amber-400" />,
        action: () => { navigate('/schedule'); setCommandPaletteOpen(false); },
        badge: 'Ctrl+3'
      },
      {
        id: 'nav-mentor',
        title: language === 'kk' ? 'AI Академиялық Ментор & Зерттеулер' : 'AI Академический Ментор и Исследования',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <Sparkles className="w-4 h-4 text-purple-400" />,
        action: () => { navigate('/mentor'); setCommandPaletteOpen(false); },
        badge: 'AI'
      },
      {
        id: 'nav-announcements',
        title: language === 'kk' ? 'Мектеп хабарландырулары' : 'Школьные объявления',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <Megaphone className="w-4 h-4 text-blue-400" />,
        action: () => { navigate('/announcements'); setCommandPaletteOpen(false); },
        badge: 'Feed'
      },
      {
        id: 'nav-lostfound',
        title: language === 'kk' ? 'Табылған заттар бюросы' : 'Бюро находок школы',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <FileBox className="w-4 h-4 text-emerald-400" />,
        action: () => { navigate('/lost-found'); setCommandPaletteOpen(false); },
        badge: 'Items'
      },
      {
        id: 'nav-activity',
        title: language === 'kk' ? 'Белсенділік, Тау жорықтары & Денсаулық' : 'Активность, Походы & Здоровье',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <Activity className="w-4 h-4 text-rose-400" />,
        action: () => { navigate('/activity'); setCommandPaletteOpen(false); },
        badge: 'Health'
      },
      {
        id: 'nav-help',
        title: language === 'kk' ? '«Қайда жүгіну керек?» сервисі' : 'Служба «Куда обратиться?»',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <LifeBuoy className="w-4 h-4 text-amber-400" />,
        action: () => { navigate('/help'); setCommandPaletteOpen(false); },
        badge: 'Help'
      },
      {
        id: 'nav-demo',
        title: language === 'kk' ? 'Қазылар алқасы Тест-панелі (Жюри Демо)' : 'Панель тестирования жюри (Demo)',
        category: language === 'kk' ? 'Хакатон' : 'Хакатон',
        icon: <FlaskConical className="w-4 h-4 text-cyan-400" />,
        action: () => { navigate('/demo'); setCommandPaletteOpen(false); },
        badge: 'Tests'
      },
      {
        id: 'nav-about',
        title: language === 'kk' ? 'Жоба туралы (eGov концепциясы)' : 'О проекте (концепция eGov)',
        category: language === 'kk' ? 'Ақпарат' : 'Информация',
        icon: <Info className="w-4 h-4 text-slate-400" />,
        action: () => { navigate('/about'); setCommandPaletteOpen(false); },
        badge: 'About'
      },
      {
        id: 'nav-contacts',
        title: language === 'kk' ? 'Байланыс және Қабылдау бөлмесі' : 'Контакты и Канцелярия',
        category: language === 'kk' ? 'Бөлімдер' : 'Разделы',
        icon: <PhoneCall className="w-4 h-4 text-[#7A1526]" />,
        action: () => { navigate('/contacts'); setCommandPaletteOpen(false); },
        badge: 'Directory'
      },

      // Emergency
      {
        id: 'action-emergency',
        title: language === 'kk' ? 'Шұғыл байланыс және Көмек орталығы' : 'Экстренная связь и Центр помощи',
        category: language === 'kk' ? 'Жедел көмек' : 'Экстренно',
        icon: <PhoneCall className="w-4 h-4 text-rose-400" />,
        action: () => { setEmergencyOpen(true); setCommandPaletteOpen(false); },
        badge: 'SOS 111'
      }
    ];

    // Add school rooms
    initialRooms.forEach(room => {
      list.push({
        id: `room-${room.number}`,
        title: `${room.number} — ${language === 'kk' ? room.nameKk : room.nameRu} (${room.floor}-${language === 'kk' ? 'қабат' : 'этаж'})`,
        category: language === 'kk' ? 'Кабинеттер & Пәндер' : 'Кабинеты и дисциплины',
        icon: <MapPin className="w-4 h-4 text-cyan-400" />,
        action: () => {
          setSelectedRoomForNav(room.number);
          navigate('/schedule');
          setCommandPaletteOpen(false);
        },
        badge: room.currentStatus.toUpperCase()
      });
    });

    return list;
  }, [language, navigate, setCommandPaletteOpen, setEmergencyOpen, setSelectedRoomForNav]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Command Palette Box */}
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-[20px] shadow-2xl overflow-hidden z-10 animate-fade-in font-sans">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#7A1526] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              language === 'kk' 
                ? 'Платформа бойынша іздеу, кабинет нөмірі немесе команда...' 
                : 'Поиск по платформе, номер кабинета или команда...'
            }
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm focus:outline-none"
          />
          <kbd className="font-mono text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded border border-stone-300">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-sm font-sans">
              {language === 'kk' ? 'Ешқандай сәйкестік табылмады' : 'Ничего не найдено'}
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'bg-[#7A1526]/10 text-stone-900 border border-[#7A1526]/30 shadow-xs' 
                      : 'text-stone-700 hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-2 rounded-lg bg-stone-100 border border-stone-200 shrink-0 text-stone-700">
                      {item.icon}
                    </span>
                    <div className="truncate">
                      <p className="text-sm font-medium truncate text-stone-900">{item.title}</p>
                      <p className="text-xs text-stone-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
                        {item.badge}
                      </span>
                    )}
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[#7A1526]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-[#FAF8F5] border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-sans">
          <div className="flex items-center gap-3">
            <span>↑↓ Навигация</span>
            <span>↵ Выбрать</span>
          </div>
          <span className="font-serif font-bold text-stone-700">Smart School KZ Quick Command</span>
        </div>
      </div>
    </div>
  );
};
