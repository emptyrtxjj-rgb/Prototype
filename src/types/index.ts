// Smart School KZ (Mektep Hub) - TypeScript Core Types

export type UserRole = 'student' | 'teacher' | 'admin';
export type Language = 'kk' | 'ru';
export type NavigationTab = 'dashboard' | 'navigator' | 'ai-schedule' | 'health-eco' | 'digital-services';

export type RoomType = 
  | 'classroom' 
  | 'lab' 
  | 'medical' 
  | 'canteen' 
  | 'sports' 
  | 'library' 
  | 'admin'
  | 'robotics';

export type RoomStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';
export type WingType = 'west' | 'center' | 'east';

export interface Room {
  id: string;
  number: string;
  nameKk: string;
  nameRu: string;
  floor: 1 | 2 | 3;
  wing: WingType;
  type: RoomType;
  capacity: number;
  currentStatus: RoomStatus;
  teacherInCharge: string;
  teacherRoleKk: string;
  teacherRoleRu: string;
  nextAvailableTime?: string;
  equipment: string[];
  coordinates: { x: number; y: number; z: number };
  descriptionKk: string;
  descriptionRu: string;
}

export interface EcoMetrics {
  treesSaved: number;
  kwhSaved: number;
  waterLitersSaved: number;
  paperSheetsSaved: number;
  totalDigitizedCertificates: number;
  co2KgReduced: number;
  monthlyGrowthPercent: number;
}

export type RequestStatus = 'new' | 'in_progress' | 'resolved' | 'rejected';
export type RequestPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SchoolServiceRequest {
  id: string;
  titleKk: string;
  titleRu: string;
  category: 'it_support' | 'maintenance' | 'document' | 'cleaning' | 'supplies';
  requesterName: string;
  requesterRole: UserRole;
  timestamp: string;
  status: RequestStatus;
  priority: RequestPriority;
  roomNumber: string;
  description: string;
}

export interface ScheduleItem {
  id: string;
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  dayIndex: number; // 0 to 4
  timeSlot: string; // e.g. "08:30 - 09:15"
  periodIndex: number; // 1 to 7
  subjectKk: string;
  subjectRu: string;
  roomNumber: string;
  teacher: string;
  gradeGroup: string;
  isConflict?: boolean;
  colorScheme: 'cyan' | 'blue' | 'emerald' | 'amber' | 'violet';
}

export interface EssayHighlightedToken {
  text: string;
  type: 'academic' | 'error' | 'connector' | 'normal';
  note?: string;
}

export interface EssayAnalysisResult {
  wordCount: number;
  readingTimeMin: number;
  overallBand: number; // e.g. 7.0
  targetMet: boolean;
  bandBreakdown: {
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalAccuracy: number;
  };
  keyMetrics: {
    academicWordsCount: number;
    complexSentencesPercent: number;
    lexicalDiversityPercent: number;
  };
  strengthsKk: string[];
  strengthsRu: string[];
  suggestionsKk: string[];
  suggestionsRu: string[];
  tokens: EssayHighlightedToken[];
}

export type LostCategory = 'electronics' | 'clothes' | 'documents' | 'sports' | 'books' | 'other';
export type LostItemStatus = 'unclaimed' | 'claimed' | 'archived';

export interface LostItem {
  id: string;
  title: string;
  category: LostCategory;
  description: string;
  locationFound: string;
  dateFound: string;
  reporterName: string;
  reporterPhone: string;
  status: LostItemStatus;
  imageUrl: string;
  secretVerificationQuestion: string;
}

export interface GearItem {
  id: string;
  nameKk: string;
  nameRu: string;
  categoryKk: string;
  categoryRu: string;
  weightGrams: number;
  isEssential: boolean;
  packed: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
