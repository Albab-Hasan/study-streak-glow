
import { HabitCategory, HabitFrequency, WeekDay } from './habit';

export type TemplateCategory = 'study' | 'engineering' | 'programming' | 'medical' | 'self-care';

export interface HabitTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  targetGroup: string;
  goal: string;
  habits: TemplateHabit[];
  intensity: 'light' | 'normal' | 'intense';
  createdAt: string;
}

export interface TemplateHabit {
  name: string;
  description: string;
  category: HabitCategory;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  daysOfWeek: WeekDay[];
  reminderTime?: string;
  notificationsEnabled: boolean;
}
