import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';
import { Room, SchoolServiceRequest } from '../../types';
import { EcoMonitorWidget } from './EcoMonitorWidget';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Skeleton } from '../ui/Skeleton';
import { 
  Building2, 
  Cpu, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Filter, 
  MapPin, 
  Sparkles,
  ArrowUpRight,
  MonitorCheck,
  Printer,
  Bot
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { t, language, addToast, setSelectedRoomForNav } = useApp();
  const navigateToRoomIn3D = (room: string) => setSelectedRoomForNav(room);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [requests, setRequests] = useState<SchoolServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isUpdatingStatusId, setIsUpdatingStatusId] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedRooms, fetchedRequests] = await Promise.all([
        mockApi.getRooms(),
        mockApi.getRequests(),
      ]);
      setRooms(fetchedRooms);
      setRequests(fetchedRequests);
    } catch {
      addToast(
        language === 'kk' ? 'Деректерді жүктеу қатесі' : 'Ошибка загрузки данных',
        '',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdvanceStatus = async (req: SchoolServiceRequest) => {
    setIsUpdatingStatusId(req.id);
    let nextStatus: SchoolServiceRequest['status'] = 'in_progress';
    if (req.status === 'new') nextStatus = 'in_progress';
    else if (req.status === 'in_progress') nextStatus = 'resolved';
    else nextStatus = 'new';

    try {
      const updated = await mockApi.updateRequestStatus(req.id, nextStatus);
      setRequests(prev => prev.map(item => item.id === req.id ? updated : item));
      addToast(
        language === 'kk' ? 'Өтінім күйі жаңартылды' : 'Статус заявки обновлен',
        `${req.id} → ${nextStatus.toUpperCase()}`,
        'success'
      );
    } catch {
      addToast(
        language === 'kk' ? 'Қате орын алды' : 'Произошла ошибка',
        '',
        'error'
      );
    } finally {
      setIsUpdatingStatusId(null);
    }
  };

  const availableRoomsCount = rooms.filter(r => r.currentStatus === 'available').length;
  const filteredRequests = requests.filter(r => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
              {t.dashboard.overviewTitle}
            </h1>
            <Badge variant="cyan" size="sm" hasDot>
              LIVE
            </Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {t.dashboard.overviewSub}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadData}
            isLoading={isLoading}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            {t.common.refresh}
          </Button>
        </div>
      </div>

      {/* Primary KPI Stats */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-dark-850/80 border border-slate-800 shadow-sm relative overflow-hidden glow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{t.dashboard.availableRooms}</span>
              <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Building2 className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                {availableRoomsCount}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ {rooms.length} бөлме</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {language === 'kk' ? 'Қазір сабақ жоқ, кіруге ашық' : 'Свободны для занятий'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-850/80 border border-slate-800 shadow-sm relative overflow-hidden glow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{t.dashboard.activeEquipment}</span>
              <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">
                128
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 134 желіде</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {language === 'kk' ? '98.5% жабдық толық іске қосулы' : '98.5% устройств онлайн'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-850/80 border border-slate-800 shadow-sm relative overflow-hidden glow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{t.dashboard.pendingRequests}</span>
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                {requests.filter(r => r.status !== 'resolved').length}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {language === 'kk' ? 'өңделуде' : 'в работе'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {language === 'kk' ? 'Орташа орындалу: 24 мин' : 'Среднее время закрытия: 24 мин'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-850/80 border border-slate-800 shadow-sm relative overflow-hidden glow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{t.dashboard.activeStudents}</span>
              <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-blue-400">
                842
              </span>
              <span className="text-xs text-slate-500 font-mono">FaceID / Карточка</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {language === 'kk' ? 'Қауіпсіз турникеттен өткен' : 'Зафиксировано турникетами'}
            </p>
          </div>
        </div>
      )}

      {/* Eco-Monitor Widget */}
      <EcoMonitorWidget />

      {/* Two Column Layout: Live Requests Feed + Equipment Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Service Requests Feed (2 cols wide) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <CardTitle>{t.dashboard.liveRequestsTitle}</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'kk' ? 'Мұғалімдер мен оқушылардың жедел тапсырмалары' : 'Оперативные задачи педагогов и учащихся'}
                </p>
              </div>

              {/* Status filter pills */}
              <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-lg border border-slate-800 text-xs">
                {[
                  { id: 'all', label: t.dashboard.allStatuses },
                  { id: 'new', label: t.dashboard.statusNew },
                  { id: 'in_progress', label: t.dashboard.statusProgress },
                  { id: 'resolved', label: t.dashboard.statusResolved },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterStatus(tab.id)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      filterStatus === tab.id
                        ? 'bg-blue-600/30 text-cyan-300 font-medium border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-3">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                  {language === 'kk' ? 'Таңдалған санатта өтінімдер жоқ' : 'В выбранной категории нет заявок'}
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {filteredRequests.map(req => {
                    const statusVariant = 
                      req.status === 'resolved' ? 'emerald' :
                      req.status === 'in_progress' ? 'cyan' :
                      req.status === 'rejected' ? 'rose' : 'amber';

                    const priorityVariant = 
                      req.priority === 'urgent' ? 'rose' :
                      req.priority === 'high' ? 'amber' : 'slate';

                    return (
                      <div
                        key={req.id}
                        className="p-4 sm:p-5 hover:bg-dark-900/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                              {req.id}
                            </span>
                            <Badge variant={statusVariant} size="sm" hasDot>
                              {req.status.toUpperCase()}
                            </Badge>
                            <Badge variant={priorityVariant} size="sm">
                              {req.priority.toUpperCase()}
                            </Badge>
                            <button
                              onClick={() => navigateToRoomIn3D(req.roomNumber)}
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-300 bg-dark-950 px-2 py-0.5 rounded border border-slate-800 hover:border-cyan-500/40 transition-colors"
                            >
                              <MapPin className="w-3 h-3 text-cyan-400" />
                              <span>{language === 'kk' ? `${req.roomNumber}-кабинет (3D)` : `Кабинет ${req.roomNumber} (3D)`}</span>
                            </button>
                          </div>

                          <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                            {language === 'kk' ? req.titleKk : req.titleRu}
                          </h4>

                          <p className="text-xs text-slate-400 line-clamp-1">
                            {req.description}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                            <span>👤 {req.requesterName}</span>
                            <span>•</span>
                            <span>⏱ {req.timestamp}</span>
                          </div>
                        </div>

                        {/* Action status advance button */}
                        <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                          <Button
                            variant={req.status === 'resolved' ? 'outline' : 'secondary'}
                            size="sm"
                            isLoading={isUpdatingStatusId === req.id}
                            onClick={() => handleAdvanceStatus(req)}
                          >
                            {req.status === 'new' && (language === 'kk' ? 'Қабылдау →' : 'Принять →')}
                            {req.status === 'in_progress' && (language === 'kk' ? 'Шешілді ✓' : 'Завершить ✓')}
                            {req.status === 'resolved' && (language === 'kk' ? 'Қайта қарау' : 'Переоткрыть')}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Innovation Equipment Inventory */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.dashboard.inventoryTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3.5 rounded-xl bg-dark-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Bot className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{t.dashboard.roboticsKits}</p>
                      <p className="text-[11px] text-slate-500 font-mono">301-шеберхана</p>
                    </div>
                  </div>
                  <Badge variant="cyan" size="sm">24 дана</Badge>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <MonitorCheck className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{t.dashboard.smartBoards}</p>
                      <p className="text-[11px] text-slate-500 font-mono">Барлық кабинеттер</p>
                    </div>
                  </div>
                  <Badge variant="blue" size="sm">36 дана</Badge>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: '97%' }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Printer className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{t.dashboard.laptops3D}</p>
                      <p className="text-[11px] text-slate-500 font-mono">Bambu Lab & iMac</p>
                    </div>
                  </div>
                  <Badge variant="violet" size="sm">48 дана</Badge>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Server status tile */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-300">Серверлер & Wi-Fi 6</p>
                    <p className="text-[11px] text-slate-400 font-mono">99.98% uptime</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">ОНЛАЙН</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
