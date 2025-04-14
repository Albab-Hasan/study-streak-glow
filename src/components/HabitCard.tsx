
import { useState } from 'react';
import { Habit } from '@/types/habit';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { useHabits } from '@/context/HabitContext';
import { isHabitActiveOnDate } from '@/lib/habitUtils';
import { useNavigate } from 'react-router-dom';

interface HabitCardProps {
  habit: Habit;
  date: string;
}

const HabitCard = ({ habit, date }: HabitCardProps) => {
  const { toggleHabitCompletion } = useHabits();
  const navigate = useNavigate();
  const isCompleted = habit.completedDates.includes(date);
  const isActive = isHabitActiveOnDate(habit, date);
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleHabitCompletion(habit.id, date);
  };
  
  const handleCardClick = () => {
    navigate(`/habit/${habit.id}`);
  };
  
  return (
    <div
      className={`relative flex items-center rounded-xl p-4 mb-3 cursor-pointer transition-all duration-200 animate-fade-in neo-card
        ${!isActive ? 'opacity-50' : ''}`}
      onClick={handleCardClick}
      style={{ 
        borderLeft: `4px solid ${habit.color}`,
      }}
    >
      <div className="flex items-center flex-1">
        <div className="flex-shrink-0 text-2xl mr-3">{habit.icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">{habit.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{habit.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isActive && (
          <button
            onClick={handleToggle}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
          >
            {isCompleted ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground" />
            )}
          </button>
        )}
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default HabitCard;
