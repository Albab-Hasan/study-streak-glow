
import React from 'react';
import { useHabits } from '@/context/HabitContext';
import { getTodayStr } from '@/lib/habitUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Flame, Calendar } from 'lucide-react';

const HabitStats = () => {
  const { habits } = useHabits();
  
  // Calculate total habits
  const totalHabits = habits.length;
  
  // Calculate total habits completed today
  const today = getTodayStr();
  const completedToday = habits.filter(habit => 
    habit.completedDates.includes(today)
  ).length;
  
  // Calculate streak (find habit with highest streak)
  const highestStreak = habits.reduce((max, habit) => 
    habit.streak > max ? habit.streak : max, 0
  );
  
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <Card>
        <CardContent className="pt-6 text-center">
          <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-500" />
          <p className="text-2xl font-bold">{totalHabits}</p>
          <p className="text-xs text-muted-foreground">Total Habits</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6 text-center">
          <Trophy className="h-6 w-6 mx-auto mb-2 text-green-500" />
          <p className="text-2xl font-bold">{completedToday}</p>
          <p className="text-xs text-muted-foreground">Done Today</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6 text-center">
          <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
          <p className="text-2xl font-bold">{highestStreak}</p>
          <p className="text-xs text-muted-foreground">Best Streak</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitStats;
