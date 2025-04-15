
import { HabitCategory } from './habit';

export interface HabitTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  targetGroup: string;
  goal: string;
  intensity: 'light' | 'normal' | 'intense';
  createdAt: string;
  habits: Array<{
    name: string;
    description: string;
    category: HabitCategory;
    icon: string;
    color: string;
    frequency: 'daily' | 'weekly' | 'custom';
    daysOfWeek: Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>;
    notificationsEnabled: boolean;
    reminderTime?: string;
  }>;
}
