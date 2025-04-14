
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, DailyProgress, WeekDay, HabitCategory, HabitFrequency } from '@/types/habit';
import { 
  getTodayStr, 
  formatDate, 
  castToHabitCategory, 
  castToHabitFrequency, 
  castToWeekDayArray 
} from '@/lib/habitUtils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface HabitContextType {
  habits: Habit[];
  progress: DailyProgress[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  isLoading: boolean;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [progress, setProgress] = useState<DailyProgress[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayStr());
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchHabits = async () => {
    if (!user) return;
    
    try {
      // Fetch all habits for the current user
      const { data: habitsData, error: habitsError } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id);
      
      if (habitsError) throw habitsError;

      // Fetch all habit completions for the current user
      const { data: completionsData, error: completionsError } = await supabase
        .from('habit_completions')
        .select('*')
        .eq('user_id', user.id);
      
      if (completionsError) throw completionsError;

      // Map database fields to our TypeScript model
      const habitsWithCompletions = habitsData.map((habit) => {
        // Find all completions for this habit
        const habitCompletions = completionsData.filter(
          (completion) => completion.habit_id === habit.id
        );
        
        // Extract just the dates from the completions
        const completedDates = habitCompletions.map(
          (completion) => completion.completed_date
        );
        
        // Transform database model to our TypeScript model with proper type casting
        const transformedHabit: Habit = {
          id: habit.id,
          name: habit.name,
          description: habit.description || '',
          category: castToHabitCategory(habit.category),
          icon: habit.icon,
          color: habit.color,
          frequency: castToHabitFrequency(habit.frequency),
          daysOfWeek: castToWeekDayArray(habit.days_of_week),
          reminderTime: habit.reminder_time,
          notificationsEnabled: habit.notifications_enabled || false,
          createdAt: habit.created_at || new Date().toISOString(),
          streak: habit.streak || 0,
          completedDates: completedDates
        };
        
        return transformedHabit;
      });

      setHabits(habitsWithCompletions);
      updateProgressForAll(habitsWithCompletions);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching habits:', error.message);
      toast.error('Failed to load your habits');
      setIsLoading(false);
    }
  };

  // Setup realtime subscription
  useEffect(() => {
    if (!user) return;

    fetchHabits();

    // Set up realtime subscriptions
    const habitsChannel = supabase
      .channel('habits-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'habits', filter: `user_id=eq.${user.id}` },
        () => {
          fetchHabits();
        }
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'habit_completions', filter: `user_id=eq.${user.id}` },
        () => {
          fetchHabits();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(habitsChannel);
    };
  }, [user]);

  const addHabit = async (
    newHabit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>
  ) => {
    if (!user) return;
    
    try {
      // Transform our TypeScript model to database model
      const dbHabit = {
        user_id: user.id,
        name: newHabit.name,
        description: newHabit.description,
        category: newHabit.category,
        icon: newHabit.icon,
        color: newHabit.color,
        frequency: newHabit.frequency,
        days_of_week: newHabit.daysOfWeek,
        reminder_time: newHabit.reminderTime,
        notifications_enabled: newHabit.notificationsEnabled,
        streak: 0
      };
      
      const { data, error } = await supabase
        .from('habits')
        .insert([dbHabit])
        .select();
      
      if (error) throw error;
      
      // Add the new habit to state
      if (data && data.length > 0) {
        const habit = data[0];
        
        const createdHabit: Habit = {
          id: habit.id,
          name: habit.name,
          description: habit.description || '',
          category: castToHabitCategory(habit.category),
          icon: habit.icon,
          color: habit.color,
          frequency: castToHabitFrequency(habit.frequency),
          daysOfWeek: castToWeekDayArray(habit.days_of_week),
          reminderTime: habit.reminder_time,
          notificationsEnabled: habit.notifications_enabled || false,
          createdAt: habit.created_at || new Date().toISOString(),
          streak: habit.streak || 0,
          completedDates: []
        };
        
        setHabits([...habits, createdHabit]);
        toast.success('Habit created successfully');
        updateProgressForAll([...habits, createdHabit]);
      }
    } catch (error: any) {
      console.error('Error adding habit:', error.message);
      toast.error('Failed to create habit');
    }
  };

  const updateHabit = async (updatedHabit: Habit) => {
    if (!user) return;
    
    try {
      // Transform our TypeScript model to database model
      const dbHabit = {
        name: updatedHabit.name,
        description: updatedHabit.description,
        category: updatedHabit.category,
        icon: updatedHabit.icon,
        color: updatedHabit.color,
        frequency: updatedHabit.frequency,
        days_of_week: updatedHabit.daysOfWeek,
        reminder_time: updatedHabit.reminderTime,
        notifications_enabled: updatedHabit.notificationsEnabled,
        streak: updatedHabit.streak
      };
      
      const { error } = await supabase
        .from('habits')
        .update(dbHabit)
        .eq('id', updatedHabit.id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setHabits(
        habits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
      );
      
      toast.success('Habit updated successfully');
    } catch (error: any) {
      console.error('Error updating habit:', error.message);
      toast.error('Failed to update habit');
    }
  };

  const deleteHabit = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      const updatedHabits = habits.filter((habit) => habit.id !== id);
      setHabits(updatedHabits);
      updateProgressForAll(updatedHabits);
      
      toast.success('Habit deleted successfully');
    } catch (error: any) {
      console.error('Error deleting habit:', error.message);
      toast.error('Failed to delete habit');
    }
  };

  const toggleHabitCompletion = async (id: string, date: string) => {
    if (!user) return;
    
    try {
      const habit = habits.find(h => h.id === id);
      if (!habit) return;
      
      const isCompleted = habit.completedDates.includes(date);
      
      if (isCompleted) {
        // Remove completion
        const { error } = await supabase
          .from('habit_completions')
          .delete()
          .eq('habit_id', id)
          .eq('user_id', user.id)
          .eq('completed_date', date);
        
        if (error) throw error;
        
        // Update local state
        setHabits(habits.map(h => {
          if (h.id === id) {
            const completedDates = h.completedDates.filter(d => d !== date);
            let streak = h.streak;
            
            // If we're removing today's completion, reduce streak
            if (date === getTodayStr()) {
              streak = Math.max(0, streak - 1);
            }
            
            return { ...h, completedDates, streak };
          }
          return h;
        }));
        
        toast.success('Habit marked as incomplete');
      } else {
        // Add completion
        const { error } = await supabase
          .from('habit_completions')
          .insert([
            {
              habit_id: id,
              user_id: user.id,
              completed_date: date
            }
          ]);
        
        if (error) throw error;
        
        // Update local state
        setHabits(habits.map(h => {
          if (h.id === id) {
            const completedDates = [...h.completedDates, date].sort();
            let streak = h.streak;
            
            // If we're completing today, increment streak
            if (date === getTodayStr()) {
              streak += 1;
              
              // Also update streak in database
              supabase
                .from('habits')
                .update({ streak })
                .eq('id', id)
                .eq('user_id', user.id)
                .then(({ error }) => {
                  if (error) console.error('Error updating streak:', error);
                });
            }
            
            return { ...h, completedDates, streak };
          }
          return h;
        }));
        
        toast.success('Habit marked as complete');
      }
      
      // Update progress data
      updateProgressForDate(date);
    } catch (error: any) {
      console.error('Error toggling habit completion:', error.message);
      toast.error('Failed to update habit completion');
    }
  };
  
  const updateProgressForDate = (date: string) => {
    const habitDate = new Date(date);
    const dayIndex = habitDate.getDay();
    const weekDays: WeekDay[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayOfWeek = weekDays[dayIndex] as WeekDay;
    
    const habitsForDate = habits.filter(habit => {
      if (habit.frequency === 'daily') return true;
      return habit.daysOfWeek.includes(dayOfWeek);
    });
    
    const totalHabits = habitsForDate.length;
    const completedHabits = habitsForDate.filter(habit => 
      habit.completedDates.includes(date)
    ).length;
    
    setProgress(prev => {
      const existingIndex = prev.findIndex(p => p.date === date);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { date, totalHabits, completedHabits };
        return updated;
      } else {
        return [...prev, { date, totalHabits, completedHabits }];
      }
    });
  };
  
  const updateProgressForAll = (habitsData: Habit[]) => {
    // Calculate progress data for the last 7 days
    const today = new Date();
    const dates = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }
    
    const progressData = dates.map(date => {
      const habitDate = new Date(date);
      const dayIndex = habitDate.getDay();
      const weekDays: WeekDay[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const dayOfWeek = weekDays[dayIndex] as WeekDay;
      
      const habitsForDate = habitsData.filter(habit => {
        if (habit.frequency === 'daily') return true;
        return habit.daysOfWeek.includes(dayOfWeek);
      });
      
      const totalHabits = habitsForDate.length;
      const completedHabits = habitsForDate.filter(habit => 
        habit.completedDates.includes(date)
      ).length;
      
      return { date, totalHabits, completedHabits };
    });
    
    setProgress(progressData);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        progress,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitCompletion,
        selectedDate,
        setSelectedDate,
        isLoading
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
