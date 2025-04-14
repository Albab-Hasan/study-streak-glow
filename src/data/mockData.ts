
import { Habit, DailyProgress } from '@/types/habit';

export const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Study Calculus',
    description: 'Review calculus concepts for 30 minutes',
    category: 'study',
    icon: '📚',
    color: '#A3E4D7', // green
    frequency: 'daily',
    daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
    reminderTime: '16:00',
    notificationsEnabled: true,
    createdAt: '2025-04-01',
    streak: 5,
    completedDates: [
      '2025-04-08',
      '2025-04-09',
      '2025-04-10',
      '2025-04-11',
      '2025-04-12',
    ],
  },
  {
    id: '2',
    name: 'Drink Water',
    description: 'Drink 8 glasses of water throughout the day',
    category: 'health',
    icon: '💧',
    color: '#AED6F1', // blue
    frequency: 'daily',
    daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    notificationsEnabled: true,
    createdAt: '2025-04-02',
    streak: 14,
    completedDates: [
      '2025-04-01',
      '2025-04-02',
      '2025-04-03',
      '2025-04-04',
      '2025-04-05',
      '2025-04-06',
      '2025-04-07',
      '2025-04-08',
      '2025-04-09',
      '2025-04-10',
      '2025-04-11',
      '2025-04-12',
      '2025-04-13',
    ],
  },
  {
    id: '3',
    name: 'Read for Pleasure',
    description: 'Read a non-academic book for 20 minutes',
    category: 'personal',
    icon: '📖',
    color: '#D4C4FB', // purple
    frequency: 'weekly',
    daysOfWeek: ['tue', 'thu', 'sat'],
    reminderTime: '21:00',
    notificationsEnabled: false,
    createdAt: '2025-04-03',
    streak: 3,
    completedDates: [
      '2025-04-02',
      '2025-04-04',
      '2025-04-06',
      '2025-04-09',
      '2025-04-11',
    ],
  },
  {
    id: '4',
    name: 'Group Study Session',
    description: 'Weekly study group for Physics',
    category: 'social',
    icon: '👥',
    color: '#F9E79F', // yellow
    frequency: 'weekly',
    daysOfWeek: ['wed'],
    reminderTime: '17:00',
    notificationsEnabled: true,
    createdAt: '2025-04-05',
    streak: 2,
    completedDates: [
      '2025-04-03',
      '2025-04-10',
    ],
  }
];

export const weeklyProgress: DailyProgress[] = [
  { date: '2025-04-07', totalHabits: 3, completedHabits: 2 },
  { date: '2025-04-08', totalHabits: 3, completedHabits: 3 },
  { date: '2025-04-09', totalHabits: 4, completedHabits: 3 },
  { date: '2025-04-10', totalHabits: 4, completedHabits: 4 },
  { date: '2025-04-11', totalHabits: 3, completedHabits: 3 },
  { date: '2025-04-12', totalHabits: 2, completedHabits: 1 },
  { date: '2025-04-13', totalHabits: 2, completedHabits: 2 },
];

export const motivationalQuotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "The secret of getting ahead is getting started.",
  "Don't watch the clock; do what it does. Keep going.",
  "Habits are the compound interest of self-improvement.",
  "Small daily improvements are the key to staggering long-term results.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only bad workout is the one that didn't happen.",
  "You don't have to be great to start, but you have to start to be great.",
  "The difference between try and triumph is just a little umph!",
  "The future depends on what you do today."
];
