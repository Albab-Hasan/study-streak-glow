
import { Habit } from './habit';

export type HabitTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  targetGroup: string;
  goal: string;
  intensity: 'light' | 'normal' | 'intense';
  createdAt: string;
  habits: Habit[];
};
