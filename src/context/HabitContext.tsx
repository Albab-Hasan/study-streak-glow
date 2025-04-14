
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, DailyProgress } from '@/types/habit';
import { mockHabits, weeklyProgress } from '@/data/mockData';
import { getTodayStr, formatDate } from '@/lib/habitUtils';

interface HabitContextType {
  habits: Habit[];
  progress: DailyProgress[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [progress, setProgress] = useState<DailyProgress[]>(weeklyProgress);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayStr());

  const addHabit = (
    newHabit: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>
  ) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      createdAt: getTodayStr(),
      streak: 0,
      completedDates: [],
    };
    setHabits([...habits, habit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(
      habits.map((habit) => (habit.id === updatedHabit.id ? updatedHabit : habit))
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const toggleHabitCompletion = (id: string, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDates.includes(date);
        let completedDates = [...habit.completedDates];
        let streak = habit.streak;
        
        if (isCompleted) {
          // Remove the date from completedDates
          completedDates = completedDates.filter(d => d !== date);
          // If we're removing today's completion, reduce streak
          if (date === getTodayStr()) {
            streak = Math.max(0, streak - 1);
          }
        } else {
          // Add the date to completedDates
          completedDates.push(date);
          // Sort dates chronologically
          completedDates.sort();
          
          // If we're completing today, increment streak
          if (date === getTodayStr()) {
            streak += 1;
          }
        }
        
        return { ...habit, completedDates, streak };
      }
      return habit;
    }));
    
    // Also update progress data
    updateProgressForDate(date);
  };
  
  const updateProgressForDate = (date: string) => {
    const habitsForDate = habits.filter(habit => {
      const habitDate = new Date(date);
      const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][habitDate.getDay()];
      
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
