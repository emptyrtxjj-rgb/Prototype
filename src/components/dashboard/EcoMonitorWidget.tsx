import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  TreePine, 
  Zap, 
  Droplet, 
  FileText, 
  TrendingUp, 
  Leaf, 
  FileCheck2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EcoMonitorWidget: React.FC = () => {
  const { ecoMetrics, recordCertificateIssued, t, language, addToast } = useApp();
  const [simulatedCertCount, setSimulatedCertCount] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateBatch = () => {
    setIsSimulating(true);
    for (let i = 0; i < simulatedCertCount; i++) {
      recordCertificateIssued();
    }
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10B981', '#06B6D4', '#34D399']
      });
    } catch {
      // noop
    }
    setTimeout(() => {
      setIsSimulating(false);
      addToast(
        language === 'kk' ? 'Эко-үнемдеу есептелді!' : 'Эко-экономия рассчитана!',
        language === 'kk' 
          ? `+${simulatedCertCount * 4} парақ қағаз және ${(simulatedCertCount * 0.72).toFixed(1)}л таза су үнемделді.`
          : `+${simulatedCertCount * 4} листов бумаги и ${(simulatedCertCount * 0.72).toFixed(1)}л чистой воды сбережено.`,
        'success'
      );
    }, 400);
  };

  const statCards = [
    {
      id: 'trees',
      icon: <TreePine className="w-5 h-5 text-emerald-400" />,
      label: t.dashboard.treesSaved,
      value: ecoMetrics.treesSaved.toLocaleString(),
      subtext: language === 'kk' ? 'Жылдық өсім: +28 түп' : 'Прирост за год: +28 деревьев',
      color: 'emerald',
      glow: 'glow-emerald',
    },
    {
      id: 'energy',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      label: t.dashboard.kwhSaved,
      value: `${ecoMetrics.kwhSaved.toLocaleString()} кВт/сағ`,
      subtext: language === 'kk' ? 'Ақылды жарықтандыру' : 'Умное LED освещение',
      color: 'amber',
      glow: '',
    },
    {
      id: 'water',
      icon: <Droplet className="w-5 h-5 text-cyan-400" />,
      label: t.dashboard.waterSaved,
      value: `${ecoMetrics.waterLitersSaved.toLocaleString()} л`,
      subtext: language === 'kk' ? 'Сенсорлы шүмектерден' : 'От сенсорных смесителей',
      color: 'cyan',
      glow: 'glow-cyan',
    },
    {
      id: 'paper',
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      label: t.dashboard.paperSaved,
      value: ecoMetrics.paperSheetsSaved.toLocaleString(),
      subtext: language === 'kk' ? 'eGov интеграциясы' : 'Интеграция eGov Mektep',
      color: 'blue',
      glow: '',
    },
  ];

  return (
    <Card glow="emerald" className="bg-gradient-to-br from-dark-850/90 via-dark-900/90 to-emerald-950/20 border-emerald-500/30">
      <CardHeader className="border-b border-emerald-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Leaf className="w-4 h-4" />
            </span>
            <CardTitle className="text-emerald-300">
              {t.dashboard.ecoTitle}
            </CardTitle>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.dashboard.ecoSubtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="emerald" size="md" hasDot>
            +{ecoMetrics.monthlyGrowthPercent}% {language === 'kk' ? 'осы айда' : 'в этом месяце'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-5">
        {/* Metric tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(s => (
            <div
              key={s.id}
              className="p-4 rounded-xl bg-dark-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-dark-900 border border-slate-800">
                  {s.icon}
                </span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400 truncate">{s.label}</p>
              <h4 className="text-xl sm:text-2xl font-mono font-bold text-slate-100 mt-1 tracking-tight">
                {s.value}
              </h4>
              <p className="text-[11px] text-emerald-400/90 font-mono mt-1">{s.subtext}</p>
            </div>
          ))}
        </div>

        {/* Interactive eco impact simulation box */}
        <div className="p-4 rounded-xl bg-dark-900/80 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                {language === 'kk' ? 'Цифрлық қызметтердің үнемдеу симуляторы' : 'Симулятор эко-эффекта цифровых справок'}
              </p>
              <p className="text-xs text-slate-400">
                {language === 'kk' 
                  ? 'Әрбір цифрлық анықтама 4 парақ қағаз бен 0.72 л таза суды үнемдейді'
                  : 'Каждая онлайн-справка сберегает 4 листа бумаги и 0.72 л чистой воды'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <select
              value={simulatedCertCount}
              onChange={e => setSimulatedCertCount(Number(e.target.value))}
              className="bg-dark-950 text-slate-200 text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
            >
              <option value={1}>+1 анықтама (справка)</option>
              <option value={5}>+5 анықтама (справок)</option>
              <option value={20}>+20 топтық пакет</option>
            </select>
            <Button
              variant="emerald"
              size="sm"
              isLoading={isSimulating}
              onClick={handleSimulateBatch}
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              {language === 'kk' ? 'Есептеу' : 'Рассчитать'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
