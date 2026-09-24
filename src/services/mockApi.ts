import { 
  Room, 
  SchoolServiceRequest, 
  LostItem, 
  ScheduleItem, 
  EssayAnalysisResult, 
  EssayHighlightedToken 
} from '../types';
import { initialRooms } from '../constants/roomsData';
import { initialRequests } from '../constants/requestsData';
import { initialLostItems } from '../constants/lostFoundData';
import { initialSchedule } from '../constants/scheduleData';

// Helper to simulate network latency
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // ROOMS
  async getRooms(): Promise<Room[]> {
    await sleep(350);
    const cached = localStorage.getItem('smart_school_rooms');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return initialRooms;
  },

  async updateRoomStatus(roomId: string, newStatus: Room['currentStatus']): Promise<Room> {
    await sleep(400);
    const rooms = await this.getRooms();
    const room = rooms.find(r => r.id === roomId);
    if (!room) throw new Error('Бөлме табылмады / Room not found');
    room.currentStatus = newStatus;
    localStorage.setItem('smart_school_rooms', JSON.stringify(rooms));
    return room;
  },

  // REQUESTS / TICKETS
  async getRequests(): Promise<SchoolServiceRequest[]> {
    await sleep(300);
    const cached = localStorage.getItem('smart_school_requests');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return initialRequests;
  },

  async updateRequestStatus(requestId: string, status: SchoolServiceRequest['status']): Promise<SchoolServiceRequest> {
    await sleep(350);
    const requests = await this.getRequests();
    const item = requests.find(r => r.id === requestId);
    if (!item) throw new Error('Өтінім табылмады / Request not found');
    item.status = status;
    localStorage.setItem('smart_school_requests', JSON.stringify(requests));
    return item;
  },

  // LOST & FOUND
  async getLostItems(): Promise<LostItem[]> {
    await sleep(350);
    const cached = localStorage.getItem('smart_school_lost_items');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // fallback
      }
    }
    return initialLostItems;
  },

  async createLostItem(itemData: Omit<LostItem, 'id' | 'status' | 'dateFound'>): Promise<LostItem> {
    await sleep(650);
    const items = await this.getLostItems();
    const newItem: LostItem = {
      ...itemData,
      id: `LOST-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'unclaimed',
      dateFound: 'Жаңа ғана қосылды (Just now)',
    };
    items.unshift(newItem);
    localStorage.setItem('smart_school_lost_items', JSON.stringify(items));
    return newItem;
  },

  async claimLostItem(itemId: string, answer: string): Promise<boolean> {
    await sleep(500);
    if (!answer || answer.trim().length < 3) {
      throw new Error('Иелікті растау үшін құпия сұраққа толық жауап беріңіз.');
    }
    const items = await this.getLostItems();
    const item = items.find(i => i.id === itemId);
    if (!item) throw new Error('Зат табылмады / Item not found');
    item.status = 'claimed';
    localStorage.setItem('smart_school_lost_items', JSON.stringify(items));
    return true;
  },

  // AI SCHEDULE GENERATOR
  async generateOptimizedSchedule(prompt: string): Promise<{ schedule: ScheduleItem[]; stats: { clashesResolved: number; optimizationScore: number } }> {
    await sleep(1400); // simulate deep AI processing
    const current = [...initialSchedule];

    // If prompt mentions "терезе" or "окно" or "Wednesday", simulate a clean gap and repositioning
    const lower = prompt.toLowerCase();
    if (lower.includes('окно') || lower.includes('терезе') || lower.includes('13:00') || lower.includes('15:00')) {
      // mark wednesday slots and add optimal spacing
      const wednesdayItems = current.filter(s => s.dayOfWeek === 'Wed');
      wednesdayItems.forEach((item, idx) => {
        if (idx === 2) {
          item.timeSlot = '11:20 - 12:05';
        }
      });
    }

    return {
      schedule: current,
      stats: {
        clashesResolved: 3,
        optimizationScore: 99.4,
      }
    };
  },

  // AI ACADEMIC MENTOR (IELTS & SHORT STORY ANALYZER)
  async analyzeAcademicEssay(text: string): Promise<EssayAnalysisResult> {
    await sleep(1500); // simulate LLM token evaluation

    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    if (wordCount < 40) {
      throw new Error('Талдау жүргізу үшін кем дегенде 40 сөз енгізіңіз (Please provide at least 40 words for rigorous assessment).');
    }

    // Dynamic NLP mock evaluation
    const academicKeywords = [
      'subsequently', 'nevertheless', 'predominantly', 'furthermore', 'ubiquitous',
      'catalyst', 'paradigm', 'empirical', 'infrastructure', 'sustainable',
      'methodology', 'comprehensive', 'dichotomy', 'exacerbate', 'mitigate',
      'correlation', 'implication', 'crucial', 'inherent', 'perspective'
    ];

    const connectors = [
      'however', 'therefore', 'in contrast', 'moreover', 'on the other hand',
      'in addition', 'consequently', 'as a result', 'firstly', 'secondly'
    ];

    const tokens: EssayHighlightedToken[] = [];
    let academicHits = 0;

    words.forEach(rawWord => {
      const clean = rawWord.toLowerCase().replace(/[^a-zа-яәіңғүұқөһ]/gi, '');
      if (academicKeywords.includes(clean)) {
        academicHits++;
        tokens.push({
          text: rawWord,
          type: 'academic',
          note: `Академиялық C1/C2 лексика («${clean}» - жоғары деңгейлі тіркес)`
        });
      } else if (connectors.includes(clean)) {
        tokens.push({
          text: rawWord,
          type: 'connector',
          note: `Логикалық байлам сөз («${clean}» - Cohesion үстемесі)`
        });
      } else if (clean.length > 9 && Math.random() < 0.15) {
        tokens.push({
          text: rawWord,
          type: 'academic',
          note: `Күрделі морфологиялық құрылым («${clean}»)`
        });
      } else if (Math.random() < 0.05 && wordCount > 80) {
        tokens.push({
          text: rawWord,
          type: 'error',
          note: `Стильдік кеңес: бұл сөзді неғұрлым ресми синониммен ауыстыру ұсынылады.`
        });
      } else {
        tokens.push({
          text: rawWord,
          type: 'normal'
        });
      }
    });

    const lexicalDiversity = Math.min(88, Math.max(58, Math.round(55 + (academicHits * 4))));
    const tr = wordCount >= 150 ? 7.5 : wordCount >= 100 ? 7.0 : 6.0;
    const cc = 7.0;
    const lr = academicHits >= 3 ? 7.5 : 6.5;
    const gra = 7.0;
    const overallBand = parseFloat(((tr + cc + lr + gra) / 4).toFixed(1));

    return {
      wordCount,
      readingTimeMin: Math.max(1, Math.ceil(wordCount / 180)),
      overallBand,
      targetMet: overallBand >= 6.5,
      bandBreakdown: {
        taskAchievement: tr,
        coherenceCohesion: cc,
        lexicalResource: lr,
        grammaticalAccuracy: gra,
      },
      keyMetrics: {
        academicWordsCount: Math.max(academicHits, 4),
        complexSentencesPercent: 68,
        lexicalDiversityPercent: lexicalDiversity,
      },
      strengthsKk: [
        'Мәтіннің кіріспесі мен негізгі идеясы арасында айқын логикалық байланыс бар.',
        'Тақырыптық C1 деңгейіндегі академиялық лексика мен күрделі сөйлем құрылымдары сәтті қолданылған.',
        'Абзацтардың ішкі байланысы (Coherence & Cohesion) жақсы деңгейде қамтамасыз етілген.'
      ],
      strengthsRu: [
        'Четкая структура тезиса с логичным переходом между абзацами.',
        'Использование широкого спектра академических коллокаций уровня B2+/C1.',
        'Хорошая связность текста с уместным использованием дискурсивных маркеров.'
      ],
      suggestionsKk: [
        'Қорытынды абзацта негізгі ойларды парафраз жасап, қосымша нақты тұжырым қосыңыз.',
        'Кейбір қайталанатын жалпы сөздерді баламалы терминдермен байыту ұсынылады.'
      ],
      suggestionsRu: [
        'В заключении рекомендуется более выразительно перефразировать основной тезис.',
        'Обратите внимание на разнообразие пунктуации в сложноподчиненных предложениях.'
      ],
      tokens
    };
  }
};
