import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademicCrest } from '../common/AcademicCrest';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  Calendar,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full">
      {/* 01. PRE-FOOTER CRIMSON NEWSLETTER STRIP (from template image) */}
      <section className="w-full bg-[#7A1526] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Don't Miss Awesome Stories From Our School
            </h3>
            <p className="text-white/80 text-xs sm:text-sm">
              Мектеп жаңалықтары, олимпиада нәтижелері және маңызды хабарландыруларды поштаңызға алыңыз.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-md gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full h-11 px-4 rounded-full bg-white/10 border border-white/25 text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:bg-white/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-6 rounded-full bg-white text-[#7A1526] font-semibold text-xs sm:text-sm hover:bg-stone-100 transition-all shrink-0 flex items-center gap-1.5 shadow-md"
            >
              <span>{subscribed ? 'Жазылдыңыз!' : 'Subscribe'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* 02. MAIN ACADEMIC DARK FOOTER */}
      <div className="w-full bg-[#121417] text-[#9A9EAB] py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Crest & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AcademicCrest size={44} light />
              <div>
                <span className="font-serif font-bold text-white text-lg tracking-tight block">
                  SMART SCHOOL KZ
                </span>
                <span className="text-[10px] font-mono text-[#C5A059] tracking-wider uppercase">
                  National Digital Academia
                </span>
              </div>
            </div>
            <p className="text-xs text-[#9A9EAB] leading-relaxed">
              Қазақстан мектептеріне арналған бірыңғай цифрлық білім платформасы. Академиялық бағдарламалар, 3D навигация, сабақ кестесі және AI ментор.
            </p>
            <div className="flex items-center gap-3 pt-2 text-white">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7A1526] hover:border-[#7A1526] transition-colors cursor-pointer">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7A1526] hover:border-[#7A1526] transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#7A1526] hover:border-[#7A1526] transition-colors cursor-pointer">
                <Phone className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Col 2: Services / Academics */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide border-b border-stone-800 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/navigation" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>3D Навигация және кампус картасы</span>
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>AI Ақылды сабақ кестесі</span>
                </Link>
              </li>
              <li>
                <Link to="/mentor" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>AI Ментор (Эссе & IELTS дайындығы)</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>Оқушы мен мұғалім дашборды</span>
                </Link>
              </li>
              <li>
                <Link to="/lost-found" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C5A059]" />
                  <span>Табылған заттардың бірыңғай бюросы</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide border-b border-stone-800 pb-2">
              Our Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/announcements" className="hover:text-white hover:underline transition-colors">
                  Мектеп хабарландырулары
                </Link>
              </li>
              <li>
                <Link to="/eco" className="hover:text-white hover:underline transition-colors">
                  Эко-мониторинг & Қағаз үнемдеу
                </Link>
              </li>
              <li>
                <Link to="/activity" className="hover:text-white hover:underline transition-colors">
                  Дене белсенділігі & Денсаулық
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white hover:underline transition-colors">
                  «Қайда жүгіну керек?» сервисі
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-[#E6CA85] hover:underline font-semibold">
                  Жюри Демо-панель (Test Bench)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Recent Posts (as shown in template image) */}
          <div className="space-y-3">
            <h4 className="font-serif text-white font-semibold text-sm tracking-wide border-b border-stone-800 pb-2">
              Recent Posts
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=120&q=80"
                  alt="news thumbnail"
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-700"
                />
                <div>
                  <span className="text-[10px] text-[#C5A059] font-mono block">August 24, 2026</span>
                  <Link to="/announcements" className="text-xs text-white hover:text-[#E6CA85] line-clamp-2 leading-snug">
                    Халықаралық ғылыми олимпиадаға қатысушыларды іріктеу
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=120&q=80"
                  alt="news thumbnail"
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-700"
                />
                <div>
                  <span className="text-[10px] text-[#C5A059] font-mono block">September 02, 2026</span>
                  <Link to="/announcements" className="text-xs text-white hover:text-[#E6CA85] line-clamp-2 leading-snug">
                    Жаңа оқу жылына арналған цифрлық AI Ментор модулі іске қосылды
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Smart School KZ. Барлық құқықтар қорғалған. SMART SCHOOL HACKATHON 2026.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-stone-300">Біз туралы</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-stone-300">Құпиялылық саясаты</Link>
            <span>•</span>
            <Link to="/demo" className="text-[#C5A059] hover:underline">Жюри бағалау панелі</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
