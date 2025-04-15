
import { useState, useEffect } from 'react';
import { useHabits } from '@/context/HabitContext';
import { getHabitsForDate, calculateCompletionPercentage, getRandomQuote } from '@/lib/habitUtils';
import HabitCard from '@/components/HabitCard';
import ProgressRing from '@/components/ProgressRing';
import DateSelector from '@/components/DateSelector';
import HabitFilter from '@/components/HabitFilter';
import HabitSearch from '@/components/HabitSearch';
import HabitStats from '@/components/HabitStats';
import NotificationCenter from '@/components/NotificationCenter';
import NavBar from '@/components/NavBar';
import { motivationalQuotes } from '@/data/mockData';
import { HabitCategory } from '@/types/habit';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { habits, selectedDate } = useHabits();
  const [quote, setQuote] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory | 'all'>('all');
  const navigate = useNavigate();
  
  // Apply filters to habits
  const filteredHabits = getHabitsForDate(habits, selectedDate)
    .filter(habit => 
      selectedCategory === 'all' || habit.category === selectedCategory
    )
    .filter(habit => 
      habit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      habit.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  useEffect(() => {
    setQuote(getRandomQuote(motivationalQuotes));
    setCompletionPercentage(calculateCompletionPercentage(habits, selectedDate));
  }, [habits, selectedDate]);
  
  return (
    <div className="min-h-screen pb-20">
      <header className="pt-6 px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Loop</h1>
          <p className="text-muted-foreground">Track your daily habits</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => navigate('/search')}
          >
            <Search className="h-5 w-5" />
          </button>
          <NotificationCenter />
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
        
        <HabitStats />
        
        <DateSelector />
        
        <div className="mt-6">
          <HabitSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <HabitFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Today's habits</h2>
            <span className="text-sm text-muted-foreground">
              {filteredHabits.length} habit{filteredHabits.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {filteredHabits.length > 0 ? (
            filteredHabits.map(habit => (
              <HabitCard key={habit.id} habit={habit} date={selectedDate} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No habits match your filters' 
                  : 'No habits scheduled for today'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
