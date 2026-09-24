import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';
import { ScheduleItem, EssayAnalysisResult, EssayHighlightedToken } from '../../types';
import { initialSchedule } from '../../constants/scheduleData';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';
import { Skeleton } from '../ui/Skeleton';
import { 
  Sparkles, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Bot, 
  FileCheck, 
  RotateCcw,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const sampleEssayText = `In contemporary society, the ubiquitous integration of digital technologies has revolutionized modern pedagogy. While some traditionalists argue that conventional textbooks offer an indispensable methodology, it is predominantly evident that interactive platforms significantly mitigate learning barriers. Furthermore, empirical research demonstrates that multimedia infrastructures enhance cognitive retention among students. Consequently, educators should establish a comprehensive paradigm where digital literacy and classical literature operate in synergy. Nevertheless, governments must ensure equitable access to prevent socio-economic disparity in remote regions.`;

export const AiSchedulePage: React.FC = () => {
  const { t, language, addToast } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'mentor'>('schedule');

  // AI Schedule State
  const [schedulePrompt, setSchedulePrompt] = useState<string>('');
  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>(initialSchedule);
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState<boolean>(false);
  const [scheduleSuccessMsg, setScheduleSuccessMsg] = useState<string | null>(null);

  // AI Mentor State
  const [essayText, setEssayText] = useState<string>(sampleEssayText);
  const [isAnalyzingEssay, setIsAnalyzingEssay] = useState<boolean>(false);
  const [essayResult, setEssayResult] = useState<EssayAnalysisResult | null>(null);
  const [selectedTokenNote, setSelectedTokenNote] = useState<string | null>(null);

  // Quick preset handlers
  const handleApplyPreset = (presetText: string) => {
    setSchedulePrompt(presetText);
  };

  const handleGenerateSchedule = async () => {
    if (!schedulePrompt.trim()) {
      addToast(
        language === 'kk' ? 'Өтініш, сұраныс мәтінін енгізіңіз' : 'Введите текст запроса для AI',
        '',
        'warning'
      );
      return;
    }

    setIsGeneratingSchedule(true);
    setScheduleSuccessMsg(null);

    try {
      const res = await mockApi.generateOptimizedSchedule(schedulePrompt);
      setScheduleList(res.schedule);
      setScheduleSuccessMsg(
        language === 'kk'
          ? `Кесте сәтті оңтайландырылды! Тиімділік: ${res.stats.optimizationScore}%. Қақтығыстар саны: 0.`
          : `Расписание успешно оптимизировано! Эффективность: ${res.stats.optimizationScore}%. Конфликтов: 0.`
      );
      addToast(
        language === 'kk' ? 'Кесте жаңартылды' : 'Расписание обновлено',
        language === 'kk' ? 'Барлық бөлмелер мен мұғалімдер сәйкестендірілді' : 'Конфликты устранены',
        'success'
      );
      try {
        confetti({ particleCount: 35, spread: 70, origin: { y: 0.7 } });
      } catch { /* noop */ }
    } catch {
      addToast(language === 'kk' ? 'Қате орын алды' : 'Ошибка генерации', '', 'error');
    } finally {
      setIsGeneratingSchedule(false);
    }
  };

  const handleAnalyzeEssay = async () => {
    if (!essayText.trim()) {
      addToast(
        language === 'kk' ? 'Талдау үшін мәтін енгізіңіз' : 'Введите текст эссе для проверки',
        '',
        'warning'
      );
      return;
    }

    setIsAnalyzingEssay(true);
    setSelectedTokenNote(null);

    try {
      const result = await mockApi.analyzeAcademicEssay(essayText);
      setEssayResult(result);
      addToast(
        language === 'kk' ? 'Эссе сәтті тексерілді!' : 'Эссе успешно проанализировано!',
        `Estimated Band: ${result.overallBand}`,
        'success'
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error';
      addToast(language === 'kk' ? 'Тексеру қатесі' : 'Ошибка анализа', msg, 'error');
    } finally {
      setIsAnalyzingEssay(false);
    }
  };

  // Group schedule items by day
  const days: Array<{ key: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'; labelKk: string; labelRu: string }> = [
    { key: 'Mon', labelKk: 'Дүйсенбі (Пн)', labelRu: 'Понедельник (Пн)' },
    { key: 'Tue', labelKk: 'Сейсенбі (Вт)', labelRu: 'Вторник (Вт)' },
    { key: 'Wed', labelKk: 'Сәрсенбі (Ср)', labelRu: 'Среда (Ср)' },
    { key: 'Thu', labelKk: 'Бейсенбі (Чт)', labelRu: 'Четверг (Чт)' },
    { key: 'Fri', labelKk: 'Жұма (Пт)', labelRu: 'Пятница (Пт)' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2.5">
              <Sparkles className="w-7 h-7 text-cyan-400" />
              {t.aiSchedule.title}
            </h1>
            <Badge variant="cyan" size="sm">Gemini / Claude Core</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {language === 'kk' 
              ? 'Табиғи тілдегі сұраныстармен кесте құру және оқушылардың академиялық жазбаларын бағалау'
              : 'Генерация расписания без конфликтов и анализ академических эссе на базе AI'}
          </p>
        </div>

        {/* Sub-tabs switcher */}
        <div className="flex items-center bg-dark-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'schedule'
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.aiSchedule.tabSchedule}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('mentor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'mentor'
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.aiSchedule.tabMentor}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: AI SCHEDULE GENERATOR */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-6 animate-fade-in">
          {/* Prompt Input Box */}
          <Card glow="cyan">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                {t.aiSchedule.promptLabel}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="relative">
                <textarea
                  value={schedulePrompt}
                  onChange={e => setSchedulePrompt(e.target.value)}
                  placeholder={t.aiSchedule.promptPlaceholder}
                  rows={3}
                  className="w-full bg-dark-950 text-slate-100 placeholder-slate-500 border border-slate-700/80 rounded-xl p-3.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-mono">Дайын мысалдар:</span>
                {[t.aiSchedule.preset1, t.aiSchedule.preset2, t.aiSchedule.preset3].map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => handleApplyPreset(preset)}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-dark-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                  >
                    💡 {preset}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Алгоритм: Conflict-Free Multi-Agent Solver</span>
                </div>

                <Button
                  variant="primary"
                  isLoading={isGeneratingSchedule}
                  onClick={handleGenerateSchedule}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  {t.aiSchedule.generateButton}
                </Button>
              </div>

              {scheduleSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 font-mono animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{scheduleSuccessMsg}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timetable Grid View */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <CardTitle>11 «А» Сыныбының апталық оқу кестесі</CardTitle>
              </div>
              <Badge variant="emerald" size="sm" hasDot>
                {t.aiSchedule.noClashesDetected}
              </Badge>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <div className="min-w-[760px] grid grid-cols-5 divide-x divide-slate-800/80">
                {days.map(day => {
                  const dayItems = scheduleList.filter(s => s.dayOfWeek === day.key);
                  return (
                    <div key={day.key} className="p-4 space-y-3">
                      <div className="text-center pb-2 border-b border-slate-800">
                        <p className="text-xs font-bold text-slate-200">
                          {language === 'kk' ? day.labelKk : day.labelRu}
                        </p>
                        <span className="text-[10px] text-slate-500 font-mono">{dayItems.length} сабақ</span>
                      </div>

                      <div className="space-y-2.5">
                        {dayItems.map(item => {
                          const borderColors = {
                            cyan: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
                            blue: 'border-blue-500/30 bg-blue-950/20 text-blue-300',
                            emerald: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300',
                            amber: 'border-amber-500/30 bg-amber-950/20 text-amber-300',
                            violet: 'border-purple-500/30 bg-purple-950/20 text-purple-300',
                          };

                          return (
                            <div
                              key={item.id}
                              className={`p-3 rounded-xl border ${borderColors[item.colorScheme]} transition-transform hover:scale-[1.02] shadow-sm`}
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                                <span>{item.timeSlot}</span>
                                <span className="font-bold text-cyan-400">№{item.roomNumber}</span>
                              </div>
                              <p className="text-xs font-bold text-slate-100 leading-snug">
                                {language === 'kk' ? item.subjectKk : item.subjectRu}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono mt-1">
                                👤 {item.teacher}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: AI ACADEMIC MENTOR (IELTS & SHORT STORY ANALYZER) */}
      {activeSubTab === 'mentor' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Text Input and Annotated Output */}
            <div className="lg:col-span-2 space-y-4">
              <Card glow="cyan">
                <CardHeader>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      {t.aiSchedule.mentorTitle}
                    </CardTitle>
                    <p className="text-xs text-slate-400 mt-0.5">{t.aiSchedule.mentorSub}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  <div className="relative">
                    <textarea
                      value={essayText}
                      onChange={e => setEssayText(e.target.value)}
                      placeholder={t.aiSchedule.pastePlaceholder}
                      rows={7}
                      className="w-full bg-dark-950 text-slate-100 placeholder-slate-500 border border-slate-700/80 rounded-xl p-4 text-sm font-sans leading-relaxed focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 font-mono text-xs text-slate-500 bg-dark-900/90 px-2 py-1 rounded border border-slate-800">
                      <span>Сөз саны: {essayText.trim().split(/\s+/).filter(Boolean).length}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setEssayText(sampleEssayText)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-mono underline"
                    >
                      {language === 'kk' ? 'Үлгі мәтінді қайтару' : 'Вставить пример IELTS эссе'}
                    </button>

                    <Button
                      variant="primary"
                      isLoading={isAnalyzingEssay}
                      onClick={handleAnalyzeEssay}
                      leftIcon={<Sparkles className="w-4 h-4" />}
                    >
                      {t.aiSchedule.analyzeEssayBtn}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tokenized Interactive Text Highlighted Preview */}
              {essayResult && (
                <Card>
                  <CardHeader className="flex items-center justify-between pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      Интерактивті лексикалық және грамматикалық талдау
                    </CardTitle>
                    <span className="text-[11px] text-slate-400 font-mono">Сөзге басып, кеңесті көріңіз</span>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 leading-loose text-sm">
                      {essayResult.tokens.map((token, idx) => {
                        let tokenStyles = 'text-slate-200';
                        if (token.type === 'academic') {
                          tokenStyles = 'bg-emerald-500/20 text-emerald-300 font-semibold px-1 rounded border border-emerald-500/40 cursor-pointer hover:bg-emerald-500/30';
                        } else if (token.type === 'connector') {
                          tokenStyles = 'bg-blue-500/20 text-cyan-300 font-semibold px-1 rounded border border-blue-500/40 cursor-pointer hover:bg-blue-500/30';
                        } else if (token.type === 'error') {
                          tokenStyles = 'bg-amber-500/20 text-amber-300 underline decoration-wavy decoration-amber-500 px-1 rounded cursor-pointer hover:bg-amber-500/30';
                        }

                        return (
                          <span
                            key={idx}
                            onClick={() => token.note && setSelectedTokenNote(token.note)}
                            className={`inline-block mr-1.5 transition-all ${tokenStyles}`}
                          >
                            {token.text}
                          </span>
                        );
                      })}
                    </div>

                    {/* Note Drawer for clicked token */}
                    {selectedTokenNote && (
                      <div className="p-3.5 rounded-xl bg-dark-900 border border-cyan-500/40 flex items-start justify-between gap-3 animate-fade-in">
                        <div className="flex items-start gap-2.5">
                          <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-200 font-mono">{selectedTokenNote}</p>
                        </div>
                        <button
                          onClick={() => setSelectedTokenNote(null)}
                          className="text-xs text-slate-500 hover:text-slate-300 font-mono"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    <p className="text-[11px] text-slate-500 font-mono">
                      {t.aiSchedule.highlightLegend}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column: Score Breakdown & Recommendations */}
            <div className="space-y-4">
              {isAnalyzingEssay ? (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-36 w-full" />
                    <Skeleton className="h-36 w-full" />
                  </CardContent>
                </Card>
              ) : essayResult ? (
                <>
                  {/* Overall Band Card */}
                  <Card glow="emerald">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-mono text-slate-400">
                        IELTS ACADEMIC WRITING
                      </CardTitle>
                      <Badge variant="emerald" size="sm" hasDot>
                        TARGET 6.5+ MET
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-2 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 shadow-glow-emerald my-2">
                        <div className="text-center">
                          <span className="text-3xl font-bold font-mono text-emerald-300">
                            {essayResult.overallBand}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-400">/ 9.0</span>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 mt-1">
                        {essayResult.overallBand >= 7.0 ? 'Жоғары академиялық деңгей (Good User)' : 'Жақсы орташа деңгей (Competent User)'}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs font-mono">
                        <div className="p-2 rounded-lg bg-dark-950">
                          <span className="text-slate-400 block text-[10px]">{t.aiSchedule.wordCount}</span>
                          <span className="font-bold text-slate-100">{essayResult.wordCount} сөз</span>
                        </div>
                        <div className="p-2 rounded-lg bg-dark-950">
                          <span className="text-slate-400 block text-[10px]">{t.aiSchedule.readingTime}</span>
                          <span className="font-bold text-slate-100">~{essayResult.readingTimeMin} мин</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 4 Assessment Criteria */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xs font-mono text-slate-300">
                        Критерийлер бойынша бағалау
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-1 text-xs">
                      <div>
                        <div className="flex justify-between mb-1 font-mono">
                          <span className="text-slate-400">{t.aiSchedule.criteriaTR}</span>
                          <span className="font-bold text-cyan-400">{essayResult.bandBreakdown.taskAchievement}.0</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-400 h-full" style={{ width: `${(essayResult.bandBreakdown.taskAchievement / 9) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 font-mono">
                          <span className="text-slate-400">{t.aiSchedule.criteriaCC}</span>
                          <span className="font-bold text-blue-400">{essayResult.bandBreakdown.coherenceCohesion}.0</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-400 h-full" style={{ width: `${(essayResult.bandBreakdown.coherenceCohesion / 9) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 font-mono">
                          <span className="text-slate-400">{t.aiSchedule.criteriaLR}</span>
                          <span className="font-bold text-emerald-400">{essayResult.bandBreakdown.lexicalResource}.5</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full" style={{ width: `${(essayResult.bandBreakdown.lexicalResource / 9) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 font-mono">
                          <span className="text-slate-400">{t.aiSchedule.criteriaGRA}</span>
                          <span className="font-bold text-purple-400">{essayResult.bandBreakdown.grammaticalAccuracy}.0</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-400 h-full" style={{ width: `${(essayResult.bandBreakdown.grammaticalAccuracy / 9) * 100}%` }} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Recommendations */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs font-mono text-slate-300">
                        {t.aiSchedule.suggestionsTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-1 text-xs">
                      {(language === 'kk' ? essayResult.suggestionsKk : essayResult.suggestionsRu).map((sug, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-dark-950 border border-slate-800 flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span className="text-slate-300 leading-relaxed">{sug}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-slate-500 text-xs">
                    {language === 'kk' 
                      ? 'Мәтінді тексеру үшін «Мәтінді ИИ арқылы тексеру» батырмасын басыңыз' 
                      : 'Нажмите «Анализировать текст через AI» для получения детального отчета'}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
