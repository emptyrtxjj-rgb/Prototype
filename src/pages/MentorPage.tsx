import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mentorService, MentorAnalysis } from '../services/mentorService';
import { 
  Sparkles, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Lightbulb, 
  Check, 
  Layers,
  ArrowRight,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InlineAnnotation {
  phrase: string;
  type: 'grammar' | 'vocab' | 'style';
  suggestion: string;
  explanationKk: string;
  explanationRu: string;
}

const sampleTextEn = `In contemporary educational discourse, the integration of digital pedagogies has catalyzed profound transformations in student cognitive development. While traditionalists argue that conventional physical textbooks offer an irreplaceable empirical foundation, it is preponderantly evident that interactive virtual ecosystems significantly mitigate learning disparities. Furthermore, empirical investigations demonstrate that hybrid computational environments foster independent inquiry and critical reasoning. Consequently, educators should synthesize a balanced methodology where digital literacy and classical scholarship operate in dynamic synergy. Nevertheless, institutional policymakers must guarantee equitable infrastructure access to counteract socio-economic stratification across regional boundaries.`;

const sampleTextKk = `Қазіргі заманғы педагогикалық дискурста цифрлық технологияларды енгізу оқушылардың когнитивті дамуына түбегейлі өзгерістер әкелді. Дәстүрлі оқулықтардың маңызын жоққа шығармағанымен, интерактивті виртуалды экожүйелер білім берудегі теңсіздікті азайтуға зор үлес қосатыны айқын көрінеді. Сонымен қатар, эмпирикалық зерттеулер гибридті оқыту ортасы оқушылардың сыни ойлауын дамытатынын дәлелдейді. Сондықтан, ұстаздар цифрлық сауаттылық пен классикалық білімді үйлестіретін кешенді әдістемені қолдануы қажет. Дегенмен, мемлекет барлық өңірлердегі мектептерді сапалы интернетпен қамтамасыз етуі тиіс.`;

const annotationsList: InlineAnnotation[] = [
  {
    phrase: 'preponderantly evident',
    type: 'style',
    suggestion: 'demonstrably clear / predominantly evident',
    explanationKk: 'Артық сөзділік (pleonasm). Академиялық мәтінде «predominantly evident» немесе «it is demonstrably clear» формасы ықшам әрі нақты.',
    explanationRu: 'Стилистическая избыточность. В академическом эссе формы «predominantly evident» или «it is demonstrably clear» более точны.'
  },
  {
    phrase: 'catalyzed profound transformations',
    type: 'vocab',
    suggestion: 'C2 Academic Collocation (Үздік таңдау)',
    explanationKk: 'IELTS Band 8.5+ деңгейіндегі метафоралық ғылыми коллокация. Тақырыптық лексиканы күшейтеді.',
    explanationRu: 'Академическая коллокация уровня C2 (Band 8.5+). Отлично усиливает лексический критерий.'
  },
  {
    phrase: 'mitigate learning disparities',
    type: 'vocab',
    suggestion: 'Advanced Lexical Resource',
    explanationKk: '«Азайту» (reduce) сөзінің жоғары академиялық синонимі. Лексикалық баллды арттырады.',
    explanationRu: 'Высокоточный академический термин вместо разговорного «reduce differences».'
  },
  {
    phrase: 'synthesize a balanced methodology',
    type: 'grammar',
    suggestion: 'formulate / synthesize',
    explanationKk: 'Күрделі етістік пен толықтауыштың үйлесімі. Синтаксистік құрылым сауатты орындалған.',
    explanationRu: 'Грамотное синтаксическое согласование сложного глагола и дополнения.'
  },
  {
    phrase: 'түбегейлі өзгерістер әкелді',
    type: 'vocab',
    suggestion: 'трансформациялық серпіліс жасады',
    explanationKk: 'Ғылыми стильді тереңдету үшін бейнелі академиялық сөз тіркесін қолдану ұсынылады.',
    explanationRu: 'Рекомендуется усилить научный регистр статьи.'
  },
  {
    phrase: 'кешенді әдістемені қолдануы қажет',
    type: 'style',
    suggestion: 'кешенді әдіснамалық үлгіні жүзеге асыру маңызды',
    explanationKk: 'Ресми-іскерлік және ғылыми стиль талабына сәйкестендіру.',
    explanationRu: 'Приведение к строгому академическому регистру.'
  }
];

export const MentorPage: React.FC = () => {
  const { language } = useApp();
  const isKk = language === 'kk';

  const [inputText, setInputText] = useState<string>(isKk ? sampleTextKk : sampleTextEn);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<MentorAnalysis | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState<InlineAnnotation | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setLoadingProgress(20);

    const timer1 = setTimeout(() => setLoadingProgress(55), 300);
    const timer2 = setTimeout(() => setLoadingProgress(85), 650);

    try {
      const data = await mentorService.analyzeText(inputText);
      setLoadingProgress(100);
      setTimeout(() => {
        setAnalysisResult(data);
        setIsLoading(false);
        try {
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
        } catch { /* noop */ }
      }, 300);
    } catch {
      setIsLoading(false);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputText(inputText + `\n\n[Импортировано из файла: ${file.name}]`);
    }
  };

  // Helper to render text with inline interactive highlights
  const renderAnnotatedText = () => {
    let content: React.ReactNode[] = [];
    let remainingText = inputText;

    // Find occurrences of all annotations
    let keyIdx = 0;
    while (remainingText.length > 0) {
      let earliestMatch: { ann: InlineAnnotation; index: number } | null = null;

      for (const ann of annotationsList) {
        const idx = remainingText.indexOf(ann.phrase);
        if (idx !== -1 && (earliestMatch === null || idx < earliestMatch.index)) {
          earliestMatch = { ann, index: idx };
        }
      }

      if (!earliestMatch) {
        content.push(<span key={keyIdx++}>{remainingText}</span>);
        break;
      }

      // Add text before match
      if (earliestMatch.index > 0) {
        content.push(
          <span key={keyIdx++}>
            {remainingText.substring(0, earliestMatch.index)}
          </span>
        );
      }

      // Add highlighted match
      const matchedAnn = earliestMatch.ann;
      const typeStyles = {
        grammar: 'bg-amber-100/90 text-amber-950 border-b-2 border-amber-500 hover:bg-amber-200',
        vocab: 'bg-emerald-100/90 text-emerald-950 border-b-2 border-emerald-500 hover:bg-emerald-200',
        style: 'bg-purple-100/90 text-purple-950 border-b-2 border-purple-500 hover:bg-purple-200'
      };

      content.push(
        <button
          key={keyIdx++}
          type="button"
          onClick={() => setSelectedAnnotation(matchedAnn)}
          className={`inline-block px-1 py-0.5 rounded cursor-pointer transition-all font-semibold ${typeStyles[matchedAnn.type]}`}
          title="AI Сараптамасын көру"
        >
          {matchedAnn.phrase}
        </button>
      );

      remainingText = remainingText.substring(earliestMatch.index + matchedAnn.phrase.length);
    }

    return content;
  };

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Title */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[9px] text-[#7A1526] uppercase">
                  ACADEMIC AI AUDIT ENGINE v4.1
                </span>
              </div>
              <h1 className="font-climate text-2xl sm:text-3xl text-[#1C1F23] tracking-wide uppercase">
                {isKk ? 'AI Академиялық Ментор & Эссе Аудиті' : 'AI Академический Ментор & Аудит Эссе'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-serif">
                {isKk
                  ? 'Эссе мен жазба жұмыстарының грамматикасын, лексикалық қорын және академиялық стилін интерактивті тексеру.'
                  : 'Интерактивная проверка эссе и научных работ: подсветка грамматики, академического словарного запаса и стилистики.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="font-pixel text-[8px] bg-[#E6CA85]/20 text-[#7A1526] border border-[#E6CA85]/50 px-3 py-1.5 rounded-full font-bold">
              IELTS / БЖБ / ТЖБ СТАНДАРТЫ
            </span>
          </div>
        </div>
      </div>

      {/* Input & Upload Form */}
      <div className="academic-card p-6 sm:p-8 space-y-4 bg-white border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
            {isKk ? 'Жазба жұмысыңыз немесе эссені енгізіңіз:' : 'Введите текст эссе или научной статьи:'}
          </label>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-mono text-stone-700 hover:border-[#7A1526] transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#7A1526]" />
              <span>{isKk ? 'Файл жүктеу (DOCX/PDF)' : 'Загрузить файл'}</span>
              <input type="file" onChange={handleFileUploadSim} className="hidden" accept=".txt,.docx,.pdf" />
            </label>
            <button
              onClick={() => setInputText(isKk ? sampleTextKk : sampleTextEn)}
              className="text-xs font-mono text-[#7A1526] hover:underline font-semibold"
            >
              {isKk ? 'Үлгі мәтінді қою' : 'Вставить пример'}
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={8}
            placeholder={isKk ? 'Эссе немесе ғылыми жұмысыңыздың мәтінін осында жазыңыз (кемінде 25 сөз)...' : 'Вставьте текст эссе (минимум 25 слов)...'}
            className="w-full bg-[#FAF8F5] text-stone-800 placeholder-stone-400 border border-stone-300 rounded-2xl p-4 text-sm leading-relaxed focus:outline-none focus:border-[#7A1526] transition-colors font-serif"
          />
          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-stone-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
            {inputText.trim().split(/\s+/).filter(Boolean).length} {isKk ? 'сөз' : 'слов'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <span className="text-[11px] font-mono text-stone-500">
            {isKk ? 'Критерийлер: Task Response, Coherence, Lexical Resource, Grammatical Accuracy' : 'Критерии: Task Response, Coherence, Lexical Resource, Grammatical Accuracy'}
          </span>
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="btn-crimson text-xs uppercase tracking-wider py-3 px-7 disabled:opacity-50 flex items-center gap-2 font-serif font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? (isKk ? 'AI Ментор тексеруде...' : 'Аудит эссе...') : (isKk ? 'ЖҰМЫСТЫ ТЕКСЕРУ' : 'ПРОВЕРИТЬ ЭССЕ')}</span>
          </button>
        </div>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="space-y-2 pt-2 animate-academic-fade">
            <div className="flex justify-between text-xs font-mono text-[#7A1526] font-semibold">
              <span>{isKk ? 'Нейрожүйелік сараптама жүргізілуде...' : 'Нейросетевой аудит текста...'}</span>
              <span>{loadingProgress}%</span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#7A1526] h-full rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ANALYSIS RESULTS */}
      {analysisResult && (
        <div className="space-y-6 animate-academic-fade">
          {/* Top Score Summary Banner */}
          <div className="academic-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-[#7A1526] bg-white border border-stone-200">
            <div className="space-y-1 text-center md:text-left">
              <span className="font-pixel text-[9px] text-[#7A1526] tracking-wider uppercase block">
                {isKk ? 'ҚОРЫТЫНДЫ АКАДЕМИЯЛЫҚ АУДИТ' : 'ИТОГОВЫЙ АКАДЕМИЧЕСКИЙ АУДИТ'}
              </span>
              <h3 className="font-climate text-xl sm:text-2xl text-[#1C1F23] uppercase">
                {isKk ? 'AI Mentor Сараптама Нәтижесі' : 'Результаты AI Аудита'}
              </h3>
              <p className="text-xs text-stone-500 font-mono">
                {isKk ? `Мәтін көлемі: ${analysisResult.wordCount} сөз • Бағаланды: 100%` : `Объем текста: ${analysisResult.wordCount} слов • Проверено: 100%`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-[#7A1526] text-white text-center shadow-lg min-w-[130px]">
                <span className="text-[11px] font-mono text-white/80 block">{isKk ? 'Жалпы балл' : 'Общий балл'}</span>
                <span className="text-3xl sm:text-4xl font-climate text-[#E6CA85] block">
                  {analysisResult.overallScore}
                </span>
                <span className="font-pixel text-[8px] text-emerald-400 block mt-1">BAND 7.5+ ✓</span>
              </div>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="academic-card p-4 bg-white border border-stone-200">
              <span className="text-xs font-mono text-stone-500 block">{isKk ? 'Құрылымы (Structure)' : 'Структура'}</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.structure}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#7A1526] h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="academic-card p-4 bg-white border border-stone-200">
              <span className="text-xs font-mono text-stone-500 block">{isKk ? 'Грамматика (Grammar)' : 'Грамматика'}</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.grammar}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#7A1526] h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div className="academic-card p-4 bg-white border border-stone-200">
              <span className="text-xs font-mono text-stone-500 block">{isKk ? 'Лексика (Vocabulary)' : 'Словарный запас'}</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.vocabulary}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div className="academic-card p-4 bg-white border border-stone-200">
              <span className="text-xs font-mono text-stone-500 block">{isKk ? 'Академиялық стиль' : 'Академический стиль'}</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.academicStyle}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#C5A059] h-full rounded-full" style={{ width: '87%' }} />
              </div>
            </div>
          </div>

          {/* INTERACTIVE INLINE TEXT ANNOTATIONS VIEWER */}
          <div className="academic-card p-6 sm:p-8 space-y-4 bg-white border border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
              <div>
                <span className="font-pixel text-[8px] text-[#7A1526] uppercase">
                  {isKk ? 'ИНТЕРАКТИВТІ МӘТІН БЕЛГІЛЕУЛЕРІ' : 'ИНТЕРАКТИВНЫЕ АННОТАЦИИ В ТЕКСТЕ'}
                </span>
                <h4 className="font-climate text-lg text-[#1C1F23] uppercase">
                  {isKk ? 'Мәтіндегі қателер мен сапалы сөз тіркестері' : 'Ошибки и академические конструкции в тексте'}
                </h4>
              </div>

              {/* Color legend */}
              <div className="flex items-center gap-3 text-[11px] font-mono flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>{isKk ? 'Стилистика / Ықшамдау' : 'Стиль / Избыточность'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>{isKk ? 'Озық лексика (C2)' : 'Сильная лексика (C2)'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span>{isKk ? 'Синтаксис & Грамматика' : 'Синтаксис & Грамматика'}</span>
                </span>
              </div>
            </div>

            {/* Interactive Annotated Text Area */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-300 font-serif text-sm sm:text-base leading-relaxed text-stone-800">
              {renderAnnotatedText()}
            </div>

            <span className="text-[11px] font-mono text-stone-500 block">
              💡 {isKk ? 'Түспен белгіленген сөзді басып, AI Ментордың түсіндірмесін оқыңыз.' : 'Нажмите на любое выделенное слово, чтобы просмотреть рекомендацию AI Ментора.'}
            </span>

            {/* Popover Card for Selected Annotation */}
            {selectedAnnotation && (
              <div className="p-5 rounded-2xl bg-white border-2 border-[#7A1526] shadow-xl space-y-3 animate-academic-fade relative">
                <button
                  onClick={() => setSelectedAnnotation(null)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <span className={`font-pixel text-[8px] px-2 py-0.5 rounded uppercase font-bold ${
                    selectedAnnotation.type === 'grammar' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                    selectedAnnotation.type === 'vocab' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                    'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {selectedAnnotation.type.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    «{selectedAnnotation.phrase}»
                  </span>
                </div>

                <div className="space-y-1 font-serif text-xs">
                  <p className="text-stone-800">
                    <strong>{isKk ? 'Ұсыныс:' : 'Рекомендация:'}</strong> {selectedAnnotation.suggestion}
                  </p>
                  <p className="text-stone-600">
                    {isKk ? selectedAnnotation.explanationKk : selectedAnnotation.explanationRu}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Deep Qualitative Feedback: Strengths, Areas for Improvement, Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strengths */}
            <div className="academic-card p-6 border-t-4 border-t-emerald-600 space-y-3 bg-white border border-stone-200 font-serif">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-base text-[#1C1F23]">
                  {isKk ? 'Күшті тұстары' : 'Сильные стороны'}
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {analysisResult.strengths.map((str: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold shrink-0">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="academic-card p-6 border-t-4 border-t-amber-600 space-y-3 bg-white border border-stone-200 font-serif">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-base text-[#1C1F23]">
                  {isKk ? 'Жақсартуға болады' : 'Зоны роста'}
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {analysisResult.improvements.map((imp: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold shrink-0">⚠️</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concrete Actionable Recommendations */}
            <div className="academic-card p-6 border-t-4 border-t-[#7A1526] space-y-3 bg-white border border-stone-200 font-serif">
              <div className="flex items-center gap-2 text-[#7A1526]">
                <Lightbulb className="w-5 h-5" />
                <h4 className="font-bold text-base text-[#1C1F23]">
                  {isKk ? 'Нақты ұсыныстар' : 'Рекомендации'}
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {analysisResult.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7A1526] font-bold shrink-0">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
