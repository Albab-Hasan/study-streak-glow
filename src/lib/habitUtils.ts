
import { Habit, WeekDay, HabitCategory, HabitFrequency } from '@/types/habit';

export function calculateCompletionPercentage(habits: Habit[], date: string): number {
  if (!habits.length) return 0;
  
  const habitsForToday = habits.filter(habit => 
    isHabitActiveOnDate(habit, date)
  );
  
  if (!habitsForToday.length) return 0;
  
  const completedToday = habitsForToday.filter(habit => 
    habit.completedDates.includes(date)
  );
  
  return Math.round((completedToday.length / habitsForToday.length) * 100);
}

export function isHabitActiveOnDate(habit: Habit, dateStr: string): boolean {
  const date = new Date(dateStr);
  const dayIndex = date.getDay();
  const weekDays: WeekDay[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayOfWeek = weekDays[dayIndex] as WeekDay;
  
  if (habit.frequency === 'daily') {
    return true;
  } else if (habit.frequency === 'weekly') {
    return habit.daysOfWeek.includes(dayOfWeek);
  } else if (habit.frequency === 'custom') {
    return habit.daysOfWeek.includes(dayOfWeek);
  }
  
  return false;
}

export function getHabitsForDate(habits: Habit[], dateStr: string): Habit[] {
  return habits.filter(habit => isHabitActiveOnDate(habit, dateStr));
}

export function getRandomQuote(quotes: string[]): string {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTodayStr(): string {
  return formatDate(new Date());
}

export function getDayName(dateStr: string): string {
  const date = new Date(dateStr);
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
}

export function getWeekDates(currentDate: Date = new Date()): string[] {
  const dates: string[] = [];
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(formatDate(date));
  }
  
  return dates;
}

// Helper function to cast database category string to HabitCategory
export function castToHabitCategory(category: string): HabitCategory {
  if (category === 'study' || category === 'health' || 
      category === 'personal' || category === 'social') {
    return category as HabitCategory;
  }
  return 'personal'; // Default fallback
}

// Helper function to cast database frequency string to HabitFrequency
export function castToHabitFrequency(frequency: string): HabitFrequency {
  if (frequency === 'daily' || frequency === 'weekly' || frequency === 'custom') {
    return frequency as HabitFrequency;
  }
  return 'daily'; // Default fallback
}

// Helper function to cast string array to WeekDay array
export function castToWeekDayArray(days: string[]): WeekDay[] {
  return days.filter(day => 
    ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].includes(day)
  ) as WeekDay[];
}
