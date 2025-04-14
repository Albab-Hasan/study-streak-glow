
import { useState, useEffect } from 'react';
import { useHabits } from '@/context/HabitContext';
import { getHabitsForDate, calculateCompletionPercentage, getRandomQuote } from '@/lib/habitUtils';
import HabitCard from '@/components/HabitCard';
import ProgressRing from '@/components/ProgressRing';
import DateSelector from '@/components/DateSelector';
import { Bell, Search } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { motivationalQuotes } from '@/data/mockData';

const Index = () => {
  const { habits, selectedDate } = useHabits();
  const [quote, setQuote] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const habitsForDate = getHabitsForDate(habits, selectedDate);
  
  useEffect(() => {
    setQuote(getRandomQuote(motivationalQuotes));
    setCompletionPercentage(calculateCompletionPercentage(habits, selectedDate));
  }, [habits, selectedDate]);
  
  return (
    <div className="min-h-screen pb-20">
      <header className="pt-6 px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">StudyStreak</h1>
          <p className="text-muted-foreground">Track your study habits</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </header>
      
      <div className="px-4 mt-6">
        <div className="glass-card rounded-xl p-4 mb-6">
          <p className="text-sm italic text-center">{quote}</p>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <ProgressRing progress={completionPercentage} size={160} strokeWidth={12}>
            <div className="text-center">
              <span className="text-4xl font-bold">{completionPercentage}%</span>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </ProgressRing>
        </div>
        
        <DateSelector />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Today's habits</h2>
            <span className="text-sm text-muted-foreground">
              {habitsForDate.length} habit{habitsForDate.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {habitsForDate.length > 0 ? (
            habitsForDate.map(habit => (
              <HabitCard key={habit.id} habit={habit} date={selectedDate} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No habits scheduled for today</p>
            </div>
          )}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
