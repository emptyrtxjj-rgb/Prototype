import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Calendar, 
  Sparkles, 
  Leaf, 
  Megaphone, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Users,
  Check,
  FileText,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { announcementService, AnnouncementItem } from '../services/announcementService';

export const DashboardPage: React.FC = () => {
  const { ecoMetrics, language } = useApp();
  const isKk = language === 'kk';

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [activeTab, setActiveTab] = useState<'diary' | 'quarter'>('diary');

  useEffect(() => {
    announcementService.getAnnouncements().then((data: AnnouncementItem[]) => setAnnouncements(data.slice(0, 3)));
  }, []);

  // Electronic Diary Real Data (Kundelik 1-10 Point Scale & BZB/TZB)
  const diarySubjects = [
    {
      id: 1,
      name: isKk ? 'Алгебра және анализ бастамалары' : 'Алгебра и начала анализа',
      teacher: isKk ? 'Ахметова Г.К.' : 'Ахметова Г.К.',
      formativeGrades: [10, 9, 10, 10, 9],
      bzb: '19/20 (95%)',
      tzb: '28/30 (93%)',
      average: '9.6',
      homework: isKk ? '№142, 145 (тригонометриялық теңдеулер)' : '№142, 145 (тригонометрические уравнения)',
      homeworkStatus: 'submitted',
      deadline: isKk ? 'Бүгін, 18:00' : 'Сегодня, 18:00'
    },
    {
      id: 2,
      name: isKk ? 'Информатика & AI' : 'Информатика и AI',
      teacher: isKk ? 'Ибраев С.Н.' : 'Ибраев С.Н.',
      formativeGrades: [10, 10, 10, 10],
      bzb: '20/20 (100%)',
      tzb: '30/30 (100%)',
      average: '10.0',
      homework: isKk ? 'Python нейрожүйе архитектурасы жобасы' : 'Проект архитектуры нейросети на Python',
      homeworkStatus: 'submitted',
      deadline: isKk ? 'Ертең, 20:00' : 'Завтра, 20:00'
    },
    {
      id: 3,
      name: isKk ? 'Физика (Бейіндік курс)' : 'Физика (Профильный курс)',
      teacher: isKk ? 'Сәрсенов Б.Т.' : 'Сарсенов Б.Т.',
      formativeGrades: [9, 8, 10, 9],
      bzb: '18/20 (90%)',
      tzb: '27/30 (90%)',
      average: '9.0',
      homework: isKk ? 'Кванттық оптика және фотоэффект есептері' : 'Задачи по квантовой оптике и фотоэффекту',
      homeworkStatus: 'pending',
      deadline: isKk ? 'Сәрсенбі, 15:00' : 'Среда, 15:00'
    },
    {
      id: 4,
      name: isKk ? 'Қазақ тілі мен әдебиеті' : 'Казахский язык и литература',
      teacher: isKk ? 'Қасымова Ә.М.' : 'Касымова А.М.',
      formativeGrades: [10, 10, 9, 10],
      bzb: '20/20 (100%)',
      tzb: '29/30 (97%)',
      average: '9.8',
      homework: isKk ? '«Абай жолы» роман-эпопеясы бойынша эссе' : 'Эссе по роману-эпопее «Путь Абая»',
      homeworkStatus: 'submitted',
      deadline: isKk ? 'Бейсенбі, 12:00' : 'Четверг, 12:00'
    },
    {
      id: 5,
      name: isKk ? 'Ағылшын тілі (C1 Advanced)' : 'Английский язык (C1 Advanced)',
      teacher: isKk ? 'Сүлейменова Д.Р.' : 'Сулейменова Д.Р.',
      formativeGrades: [10, 9, 10, 10, 9],
      bzb: '19/20 (95%)',
      tzb: '29/30 (97%)',
      average: '9.6',
      homework: isKk ? 'IELTS Academic Writing Task 2 (AI Mentor-ға жіберу)' : 'IELTS Academic Writing Task 2 (Отправить в AI Mentor)',
      homeworkStatus: 'submitted',
      deadline: isKk ? 'Жұма, 18:00' : 'Пятница, 18:00'
    },
    {
      id: 6,
      name: isKk ? 'Қазақстан тарихы' : 'История Казахстана',
      teacher: isKk ? 'Жұмабаев Е.О.' : 'Жумабаев Е.О.',
      formativeGrades: [10, 10, 9, 10],
      bzb: '20/20 (100%)',
      tzb: '30/30 (100%)',
      average: '9.8',
      homework: isKk ? 'Алаш-Орда қайраткерлерінің тарихи портреті' : 'Исторический портрет деятелей Алаш-Орды',
      homeworkStatus: 'submitted',
      deadline: isKk ? 'Дүйсенбі, 09:00' : 'Понедельник, 09:00'
    }
  ];

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Top Academic Greeting Banner with Climate Crisis & Pixel fonts */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-pixel text-[9px] text-[#7A1526] font-bold uppercase tracking-wider bg-[#7A1526]/10 px-2.5 py-1 rounded-full border border-[#7A1526]/20">
              {isKk ? 'KUNDELIK 2.0 • 11 «А» СЫНЫП • ЛИЦЕЙШІ' : 'KUNDELIK 2.0 • 11 «А» КЛАСС • ЛИЦЕИСТ'}
            </span>
          </div>

          <h1 className="font-climate text-2xl sm:text-3xl text-[#1C1F23] tracking-wide uppercase">
            {isKk ? 'Қайырлы күн, Әмина!' : 'Добрый день, Амина!'}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 font-serif">
            {isKk ? (
              <>
                Бүгінге: <strong className="text-[#7A1526] font-mono">4 сабақ</strong>, <strong className="text-emerald-700 font-mono">1 үйірме</strong>. Қазіргі тоқсандық орташа балл: <strong className="text-emerald-700 font-mono">9.6 / 10</strong> («Үздік»).
              </>
            ) : (
              <>
                На сегодня: <strong className="text-[#7A1526] font-mono">4 урока</strong>, <strong className="text-emerald-700 font-mono">1 секция</strong>. Текущий средний балл за четверть: <strong className="text-emerald-700 font-mono">9.6 / 10</strong> («Отлично»).
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/schedule"
            className="btn-crimson text-xs py-2.5 px-5 font-serif"
          >
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>{isKk ? 'Сабақ кестесі' : 'Расписание уроков'}</span>
          </Link>
          <Link
            to="/mentor"
            className="btn-crimson-outline text-xs py-2.5 px-5 font-serif"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#7A1526]" />
            <span>{isKk ? 'AI Ментор' : 'AI Ментор'}</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Key KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: GPA / Average Grade */}
        <div className="academic-card p-5 bg-white border border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
            <span>{isKk ? 'ОРТАША БАЛЛ' : 'СРЕДНИЙ БАЛЛ'}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="font-climate text-3xl text-emerald-800 block">9.63</span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">{isKk ? '10 баллдық жүйе' : '10-балльная шкала'}</span>
        </div>

        {/* KPI 2: Attendance */}
        <div className="academic-card p-5 bg-white border border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
            <span>{isKk ? 'ҚАТЫСУ' : 'ПОСЕЩАЕМОСТЬ'}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1526]" />
          </div>
          <span className="font-climate text-3xl text-[#1C1F23] block">100%</span>
          <span className="text-[10px] font-mono text-stone-500">{isKk ? '0 кешігу • 0 қалу' : '0 опозданий • 0 пропусков'}</span>
        </div>

        {/* KPI 3: BZB / Formative */}
        <div className="academic-card p-5 bg-white border border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-1">
            <span>{isKk ? 'БЖБ ТАПСЫРЫЛДЫ' : 'СОР СДАНО'}</span>
            <Award className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span className="font-climate text-3xl text-[#7A1526] block">14 / 14</span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">{isKk ? 'Барлығы тапсырылды' : 'Все закрыты вовремя'}</span>
        </div>

        {/* KPI 4: 11 «A» Class Eco Contribution */}
        <div className="academic-card p-5 bg-emerald-50/50 border border-emerald-200">
          <div className="flex items-center justify-between text-xs text-emerald-900 font-mono mb-1">
            <span>{isKk ? '11 «А» ЭКО-ҮЛЕСІ' : 'ЭКО-ВКЛАД 11 «А»'}</span>
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <span className="font-climate text-3xl text-emerald-800 block">1 200</span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">
            {isKk ? 'парақ үнемделді (3 ағаш)' : 'листов бумаги (3 дерева)'}
          </span>
        </div>
      </div>

      {/* Main Electronic Journal / Kundelik Gradebook */}
      <div className="academic-card p-6 sm:p-8 space-y-6 bg-white border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-[#7A1526]" />
              <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                {isKk ? 'РЕСПУБЛИКАЛЫҚ БАҒАЛАУ СТАНДАРТЫ' : 'РЕСПУБЛИКАНСКИЙ СТАНДАРТ ОЦЕНИВАНИЯ'}
              </span>
            </div>
            <h2 className="font-climate text-xl sm:text-2xl text-[#1C1F23] tracking-wide uppercase">
              {isKk ? 'Электронды күнделік & Бағалар журналы' : 'Электронный дневник и журнал оценок'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-stone-500">{isKk ? 'I Жартыжылдық / 2-тоқсан' : 'I Полугодие / 2-я четверть'}</span>
          </div>
        </div>

        {/* Diary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-stone-200 bg-[#FAF8F5] text-stone-700 font-mono uppercase text-[11px]">
                <th className="py-3 px-4 font-semibold">{isKk ? 'Пән атауы & Мұғалім' : 'Предмет и педагог'}</th>
                <th className="py-3 px-4 font-semibold">{isKk ? 'Формативті (1-10)' : 'Формативные (1-10)'}</th>
                <th className="py-3 px-4 font-semibold text-center">{isKk ? 'БЖБ (СОР)' : 'СОР'}</th>
                <th className="py-3 px-4 font-semibold text-center">{isKk ? 'ТЖБ (СОЧ)' : 'СОЧ'}</th>
                <th className="py-3 px-4 font-semibold text-center">{isKk ? 'Орташа' : 'Ср. балл'}</th>
                <th className="py-3 px-4 font-semibold">{isKk ? 'Үй тапсырмасы' : 'Домашнее задание'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans">
              {diarySubjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-serif font-bold text-stone-900 block text-sm">{sub.name}</span>
                    <span className="text-[11px] text-stone-500 font-mono">{sub.teacher}</span>
                  </td>

                  {/* Formative grades badges */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {sub.formativeGrades.map((g, i) => (
                        <span
                          key={i}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shadow-xs ${
                            g === 10
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : g === 9
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* BZB Score */}
                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-stone-800">
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                      {sub.bzb}
                    </span>
                  </td>

                  {/* TZB Score */}
                  <td className="py-3.5 px-4 text-center font-mono font-semibold text-stone-800">
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200">
                      {sub.tzb}
                    </span>
                  </td>

                  {/* Average Grade */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-sm text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {sub.average}
                    </span>
                  </td>

                  {/* Homework */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="space-y-1">
                      <p className="font-serif text-stone-800 line-clamp-1">{sub.homework}</p>
                      <div className="flex items-center gap-2 text-[10px] font-mono">
                        {sub.homeworkStatus === 'submitted' ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> {isKk ? 'Тапсырылды' : 'Сдано'}
                          </span>
                        ) : (
                          <span className="text-amber-700 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {isKk ? 'Орындауда' : 'В работе'}
                          </span>
                        )}
                        <span className="text-stone-400">• {sub.deadline}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Second Row: Latest Announcements + AI Mentor Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Announcements Timeline (2 cols) */}
        <div className="lg:col-span-2 academic-card p-6 space-y-4 bg-white border border-stone-200">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#7A1526]" />
              <h3 className="font-serif font-bold text-[#1C1F23] text-lg">
                {isKk ? 'Маңызды мектеп хабарландырулары' : 'Важные школьные уведомления'}
              </h3>
            </div>
            <Link to="/announcements" className="text-xs font-mono text-[#7A1526] hover:underline font-semibold">
              {isKk ? 'Барлық хабарландырулар →' : 'Все объявления →'}
            </Link>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#7A1526]/30 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#7A1526] bg-[#7A1526]/10 px-2 py-0.5 rounded border border-[#7A1526]/20">
                      {ann.date} • {ann.time}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">
                      {ann.location}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-[#1C1F23] font-serif">
                    {ann.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-1 font-serif">
                    {ann.description}
                  </p>
                </div>

                <Link
                  to="/announcements"
                  className="shrink-0 text-xs font-mono text-[#7A1526] hover:underline flex items-center gap-1 self-end sm:self-center font-semibold"
                >
                  <span>{isKk ? 'Толығырақ' : 'Подробнее'}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* AI Mentor Shortcut Card (1 col) */}
        <div className="academic-card p-6 bg-gradient-to-br from-white via-[#FAF8F5] to-white border border-[#7A1526]/20 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-[#1C1F23] text-lg">
                {isKk ? 'AI Академиялық Ментор' : 'AI Академический Ментор'}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed font-serif">
                {isKk
                  ? 'Эссе немесе ғылыми жұмысыңызды жүктеп, грамматика, лексика және логикалық құрылымы бойынша лезде сараптама алыңыз.'
                  : 'Загрузите эссе или научный проект для мгновенного аудита грамматики, академического стиля и аргументации.'}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[11px] font-mono text-stone-700 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isKk ? 'Мақсат: IELTS 7.5+ / БЖБ 20/20' : 'Цель: IELTS 7.5+ / СОР 20/20'}</span>
            </div>
            <Link
              to="/mentor"
              className="btn-crimson w-full text-xs font-semibold py-2.5 text-center block font-serif"
            >
              {isKk ? 'AI Менторды ашу →' : 'Открыть AI Ментор →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
