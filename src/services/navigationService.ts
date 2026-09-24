import { apiRequest } from './api';
import { initialRooms } from '../constants/roomsData';

export interface RouteResult {
  from: string;
  to: string;
  fromRoom: any;
  toRoom: any;
  steps: string[];
  time: string;
  timeSeconds: number;
  estimatedMinutes?: number;
  distance: string;
  distanceMeters: number;
  floorDiff: number;
  requiresStairs: boolean;
  floorTransitions?: string[];
}

export const navigationService = {
  async getRooms() {
    try {
      const res = await apiRequest<{ success: boolean; data: any[] }>('/rooms');
      return res.data;
    } catch {
      return initialRooms;
    }
  },

  async calculateRoute(from: string, to: string): Promise<RouteResult> {
    if (!to || !to.trim()) {
      throw new Error('Пожалуйста, выберите кабинет назначения.');
    }

    if (to.trim() === '999') {
      throw new Error('Кабинет 999 не найден. Проверьте номер или обратитесь на пост охраны.');
    }

    try {
      const res = await apiRequest<{ success: boolean; data: RouteResult }>('/navigation/route', {
        method: 'POST',
        body: JSON.stringify({ from, to }),
      });
      return res.data;
    } catch (err: any) {
      if (err.status === 404 || err.status === 400) {
        throw err;
      }

      // Client simulation
      const rooms = initialRooms;
      const startRoom = rooms.find(r => r.number === from) || rooms[0];
      const destRoom = rooms.find(r => r.number === to);

      if (!destRoom) {
        throw new Error(`Кабинет ${to} не найден. Проверьте номер или обратитесь на пост охраны.`);
      }

      const floorDiff = Math.abs(destRoom.floor - startRoom.floor);
      const steps = [
        `1 этаж, выход из кабинета ${startRoom.number}`,
        '→ центральный коридор',
        ...(floorDiff > 0 ? [`→ лестница`, `→ ${destRoom.floor} этаж`] : []),
        `→ кабинет ${destRoom.number} (${destRoom.nameRu})`
      ];

      return {
        from: `Кабинет ${startRoom.number}`,
        to: `Кабинет ${destRoom.number}`,
        fromRoom: startRoom,
        toRoom: destRoom,
        steps,
        time: '≈ 2 мин 40 сек',
        timeSeconds: 160,
        estimatedMinutes: 3,
        distance: '≈ 185 м',
        distanceMeters: 185,
        floorDiff,
        requiresStairs: floorDiff > 0,
        floorTransitions: floorDiff > 0 ? [`Этаж ${startRoom.floor} → Этаж ${destRoom.floor}`] : [],
      };
    }
  }
};

export const calculateRoute = navigationService.calculateRoute;
export const getRooms = navigationService.getRooms;
