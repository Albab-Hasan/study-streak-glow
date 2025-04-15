
export type HabitCategory = 'study' | 'health' | 'personal' | 'social';
export type HabitFrequency = 'daily' | 'weekly' | 'custom';
export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: HabitCategory;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  daysOfWeek: WeekDay[];
  reminderTime?: string;
  notificationsEnabled: boolean;
  createdAt: string;
  streak: number;
  completedDates: string[];
}

export interface DailyProgress {
  date: string;
  totalHabits: number;
  completedHabits: number;
}
