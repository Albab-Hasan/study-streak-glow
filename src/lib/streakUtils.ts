
import { Habit } from '@/types/habit';
import { formatDate } from '@/lib/habitUtils';

/**
 * Calculates if a habit's streak is still active based on completion history
 */
export function isStreakActive(habit: Habit): boolean {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const todayStr = formatDate(today);
  const yesterdayStr = formatDate(yesterday);
  
  // If completed today, streak is active
  if (habit.completedDates.includes(todayStr)) {
    return true;
  }
  
  // If completed yesterday, streak is still active
  if (habit.completedDates.includes(yesterdayStr)) {
    return true;
  }
  
  return false;
}

/**
 * Determines the maximum streak achieved for a habit
 */
export function calculateMaxStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  
  // Sort dates chronologically
  const sortedDates = [...completedDates].sort();
  
  let currentStreak = 1;
  let maxStreak = 1;
  
  for (let i = 1; i < sortedDates.length; i++) {
    const current = new Date(sortedDates[i]);
    const previous = new Date(sortedDates[i-1]);
    
    // Calculate difference in days
    const diffTime = current.getTime() - previous.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // If consecutive days, increase streak
    if (Math.round(diffDays) === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else if (Math.round(diffDays) > 1) {
      // Reset streak if days are not consecutive
      currentStreak = 1;
    }
  }
  
  return maxStreak;
}
