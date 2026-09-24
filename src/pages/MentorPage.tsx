import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

const sampleText = `In contemporary educational discourse, the integration of digital pedagogies has catalyzed profound transformations in student cognitive development. While traditionalists argue that conventional physical textbooks offer an irreplaceable empirical foundation, it is predominantly evident that interactive virtual ecosystems significantly mitigate learning disparities. Furthermore, empirical investigations demonstrate that hybrid computational environments foster independent inquiry and critical reasoning. Consequently, educators should synthesize a balanced methodology where digital literacy and classical scholarship operate in dynamic synergy. Nevertheless, institutional policymakers must guarantee equitable infrastructure access to counteract socio-economic stratification across regional boundaries.`;

export const MentorPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>(sampleText);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<MentorAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setLoadingProgress(15);

    const timer1 = setTimeout(() => setLoadingProgress(45), 300);
    const timer2 = setTimeout(() => setLoadingProgress(80), 700);

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
      setInputText(sampleText + `\n\n[Импортировано из файла: ${file.name}]`);
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-academic-fade">
      {/* Title */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#7A1526]/10 text-[#7A1526] border border-[#7A1526]/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1F23]">
              AI Академиялық Ментор
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Эссе мен жазба жұмыстарының күшті тұстарын көруге және академиялық сапасын жақсартуға көмектеседі.
            </p>
          </div>
        </div>
      </div>

      {/* Input & Upload Form */}
      <div className="academic-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
            Жазба жұмысыңыз немесе эссені енгізіңіз:
          </label>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-mono text-stone-700 hover:border-[#7A1526] transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#7A1526]" />
              <span>TXT / DOCX / PDF жүктеу</span>
              <input type="file" onChange={handleFileUploadSim} className="hidden" accept=".txt,.docx,.pdf" />
            </label>
            <button
              onClick={() => setInputText(sampleText)}
              className="text-xs font-mono text-[#7A1526] hover:underline font-semibold"
            >
              Үлгі мәтінді қою
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            rows={8}
            placeholder="Эссе немесе ғылыми жұмысыңыздың мәтінін осында жазыңыз (кемінде 25 сөз)..."
            className="w-full bg-[#FAF8F5] text-stone-800 placeholder-stone-400 border border-stone-300 rounded-2xl p-4 text-sm leading-relaxed focus:outline-none focus:border-[#7A1526] transition-colors"
          />
          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-stone-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
            {inputText.trim().split(/\s+/).filter(Boolean).length} сөз
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <span className="text-[11px] font-mono text-stone-500">
            Бағалау критерийлері: Task Response, Coherence, Lexical Resource, Grammar
          </span>
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="btn-crimson text-xs uppercase tracking-wider py-3 px-7 disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'AI Ментор талдауда...' : 'ЖҰМЫСТЫ ТЕКСЕРУ'}</span>
          </button>
        </div>

        {/* Loading Progress State */}
        {isLoading && (
          <div className="space-y-2 pt-2 animate-academic-fade">
            <div className="flex justify-between text-xs font-mono text-[#7A1526] font-semibold">
              <span>Академиялық аудит жүргізілуде...</span>
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
          <div className="academic-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-[#7A1526]">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-mono font-bold text-[#7A1526] tracking-wider uppercase">
                ҚОРЫТЫНДЫ АКАДЕМИЯЛЫҚ АУДИТ
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1F23]">
                AI Mentor Тексеру Қорытындысы
              </h3>
              <p className="text-xs text-stone-500">
                Мәтін көлемі: {analysisResult.wordCount} сөз • Оқу уақыты: ~1 мин
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-[#7A1526] text-white text-center shadow-lg min-w-[120px]">
                <span className="text-xs font-mono text-white/80 block">Жалпы балл</span>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-[#E6CA85]">
                  {analysisResult.overallScore}
                </span>
                <span className="text-[10px] font-mono text-white block mt-0.5 font-bold">TARGET MET ✓</span>
              </div>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="academic-card p-4">
              <span className="text-xs font-mono text-stone-500 block">Structure</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.structure}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#7A1526] h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="academic-card p-4">
              <span className="text-xs font-mono text-stone-500 block">Grammar</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.grammar}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#7A1526] h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div className="academic-card p-4">
              <span className="text-xs font-mono text-stone-500 block">Vocabulary</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.vocabulary}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div className="academic-card p-4">
              <span className="text-xs font-mono text-stone-500 block">Academic style</span>
              <span className="text-2xl font-serif font-bold text-[#1C1F23] mt-1 block">
                {analysisResult.breakdown.academicStyle}
              </span>
              <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#C5A059] h-full rounded-full" style={{ width: '87%' }} />
              </div>
            </div>
          </div>

          {/* Deep Qualitative Feedback: Strengths, Areas for Improvement, Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strengths */}
            <div className="academic-card p-6 border-t-4 border-t-emerald-600 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-serif font-bold text-base text-[#1C1F23]">
                  Күшті тұстары
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
            <div className="academic-card p-6 border-t-4 border-t-amber-600 space-y-3">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h4 className="font-serif font-bold text-base text-[#1C1F23]">
                  Жақсартуға болады
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
            <div className="academic-card p-6 border-t-4 border-t-[#7A1526] space-y-3">
              <div className="flex items-center gap-2 text-[#7A1526]">
                <Lightbulb className="w-5 h-5" />
                <h4 className="font-serif font-bold text-base text-[#1C1F23]">
                  Ұсыныстар
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
