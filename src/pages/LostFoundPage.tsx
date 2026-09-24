import React, { useState, useEffect } from 'react';
import { lostFoundService, LostItemData, LostFoundPayload } from '../services/lostFoundService';
import { 
  FileBox, 
  Plus, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Sparkles,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LostFoundPage: React.FC = () => {
  const [data, setData] = useState<LostFoundPayload>({
    stats: { found: 24, returned: 17, pending: 7 },
    items: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('electronics');
  const [errors, setErrors] = useState<{ title?: string; location?: string }>({});
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadItems = () => {
    setIsLoading(true);
    lostFoundService.getLostItems().then((res: LostFoundPayload) => {
      setData(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; location?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Заттың атауын енгізіңіз.';
    }
    if (!location.trim()) {
      newErrors.location = 'Табылған орнын көрсетіңіз.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await lostFoundService.addLostItem({
        title,
        location,
        description,
        category,
        date: 'Бүгін, 24 қыркүйек',
      });

      setData((prev: LostFoundPayload) => ({
        stats: res.stats,
        items: [res.data, ...prev.items]
      }));

      setSuccessBanner('Жаңа жазба тізілімге сәтті қосылды.');
      setIsModalOpen(false);
      setTitle('');
      setLocation('');
      setDescription('');

      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      } catch { /* noop */ }

      setTimeout(() => setSuccessBanner(null), 5000);
    } catch (err: any) {
      setErrors({ title: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = data.items.filter((item: LostItemData) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Title */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
            <FileBox className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1F23]">
              Табылған заттар бюросы
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Мектеп ғимаратында жоғалған және табылған заттардың бірыңғай цифрлық тізілімі.
            </p>
          </div>
        </div>

        <button
          onClick={() => { setIsModalOpen(true); setErrors({}); }}
          className="btn-crimson text-xs py-2.5 px-5 flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Табылған затты қосу</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center justify-between animate-academic-fade">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-stone-400 hover:text-stone-700">✕</button>
        </div>
      )}

      {/* Stats Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="academic-card p-6 text-center">
          <span className="text-xs font-mono font-bold text-stone-500 block uppercase tracking-wider">Табылды</span>
          <span className="text-3xl sm:text-4xl font-serif font-bold text-[#7A1526] mt-1 block">
            {data.stats.found}
          </span>
          <span className="text-[11px] text-stone-500 font-mono">Тіркелген заттар саны</span>
        </div>

        <div className="academic-card p-6 text-center">
          <span className="text-xs font-mono font-bold text-stone-500 block uppercase tracking-wider">Қайтарылды</span>
          <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-700 mt-1 block">
            {data.stats.returned}
          </span>
          <span className="text-[11px] text-stone-500 font-mono">Иесіне қайтарылған заттар</span>
        </div>

        <div className="academic-card p-6 text-center">
          <span className="text-xs font-mono font-bold text-stone-500 block uppercase tracking-wider">Қаралуда</span>
          <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-700 mt-1 block">
            {data.stats.pending}
          </span>
          <span className="text-[11px] text-stone-500 font-mono">Иесін күтуде</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Заттың атауы немесе табылған орны бойынша іздеу..."
            className="w-full bg-[#FAF8F5] text-stone-800 placeholder-stone-400 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs font-mono focus:outline-none focus:border-[#7A1526]"
          />
        </div>
      </div>

      {/* Lost Items Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item: LostItemData) => (
          <div
            key={item.id}
            className="academic-card p-5 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-44 rounded-2xl overflow-hidden bg-stone-100 relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2.5 right-2.5">
                  <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border shadow-sm ${
                    item.status === 'returned'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {item.status === 'returned' ? 'Қайтарылды ✓' : 'Иесін күтуде'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-serif font-bold text-base text-[#1C1F23]">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="space-y-1 text-xs font-mono text-stone-500 pt-2 border-t border-stone-100">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7A1526] shrink-0" />
                  <span>{item.location}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{item.date}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD LOST ITEM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white border border-stone-200 rounded-[24px] p-6 sm:p-8 shadow-2xl z-10 animate-academic-fade space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1C1F23]">
                Табылған зат туралы мәлімет қосу
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="block text-stone-700 mb-1 font-semibold">
                  Заттың атауы: *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Мысалы: Қара түсті Nike рюкзагы"
                  className={`w-full bg-[#FAF8F5] text-stone-800 p-2.5 rounded-xl border focus:outline-none ${
                    errors.title ? 'border-rose-500 focus:border-rose-500' : 'border-stone-300 focus:border-[#7A1526]'
                  }`}
                />
                {errors.title && <p className="text-rose-600 text-[11px] mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-stone-700 mb-1 font-semibold">
                  Қай жерде табылды: *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Мысалы: Спорттық зал (115)"
                  className={`w-full bg-[#FAF8F5] text-stone-800 p-2.5 rounded-xl border focus:outline-none ${
                    errors.location ? 'border-rose-500 focus:border-rose-500' : 'border-stone-300 focus:border-[#7A1526]'
                  }`}
                />
                {errors.location && <p className="text-rose-600 text-[11px] mt-1">{errors.location}</p>}
              </div>

              <div>
                <label className="block text-stone-700 mb-1 font-semibold">
                  Санаты:
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-[#FAF8F5] text-stone-800 p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#7A1526]"
                >
                  <option value="electronics">Электроника & Гаджеттер</option>
                  <option value="clothes">Киім & Аяқ киім</option>
                  <option value="sports">Спорт жабдықтары</option>
                  <option value="books">Кітаптар & Дәптерлер</option>
                  <option value="other">Басқа</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 mb-1 font-semibold">
                  Сипаттамасы:
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Ерекше белгілері, түсі, ішіндегі заттар..."
                  className="w-full bg-[#FAF8F5] text-stone-800 p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#7A1526]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900"
                >
                  Болдырмау
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-crimson text-xs py-2 px-5"
                >
                  {isSubmitting ? 'Сақталуда...' : 'Жазбаны қосу'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
