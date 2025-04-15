
export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type HabitCategory = 'study' | 'health' | 'personal' | 'social';

export type Habit = {
  name: string;
  description: string;
  category: HabitCategory;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  daysOfWeek: WeekDay[];
  notificationsEnabled: boolean;
  reminderTime?: string;
};
