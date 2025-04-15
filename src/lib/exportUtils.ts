
import { Habit } from '@/types/habit';

/**
 * Generates a CSV file from habit data and triggers a download
 */
export function exportHabitsToCSV(habits: Habit[]): void {
  // Define CSV headers
  const headers = [
    'Name',
    'Description',
    'Category',
    'Frequency',
    'Days of Week',
    'Current Streak',
    'Created At',
    'Completed Dates'
  ].join(',');
  
  // Generate rows for each habit
  const rows = habits.map(habit => {
    return [
      `"${habit.name.replace(/"/g, '""')}"`,
      `"${habit.description.replace(/"/g, '""')}"`,
      habit.category,
      habit.frequency,
      habit.daysOfWeek.join(' | '),
      habit.streak,
      new Date(habit.createdAt).toLocaleDateString(),
      habit.completedDates.join(' | ')
    ].join(',');
  });
  
  // Combine headers and rows
  const csvContent = [headers, ...rows].join('\n');
  
  // Create a blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set up the download
  link.setAttribute('href', url);
  link.setAttribute('download', `habits_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.display = 'none';
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Formats habit data for display or export
 */
export function formatHabitForExport(habit: Habit): Record<string, string | number> {
  return {
    name: habit.name,
    description: habit.description,
    category: habit.category,
    frequency: habit.frequency,
    daysOfWeek: habit.daysOfWeek.join(', '),
    streak: habit.streak,
    createdAt: new Date(habit.createdAt).toLocaleDateString(),
    completedCount: habit.completedDates.length
  };
}
