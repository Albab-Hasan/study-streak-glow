
import React from 'react';
import { HabitCategory } from '@/types/habit';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Books, Heart, User, Users } from 'lucide-react';

type HabitFilterProps = {
  selectedCategory: HabitCategory | 'all';
  onSelectCategory: (category: HabitCategory | 'all') => void;
};

const HabitFilter = ({ selectedCategory, onSelectCategory }: HabitFilterProps) => {
  const navigate = useNavigate();
  const categories: Array<{ value: HabitCategory | 'all'; label: string; icon: React.ReactNode }> = [
    { value: 'all', label: 'All', icon: <Books className="h-3.5 w-3.5" /> },
    { value: 'study', label: 'Study', icon: <Books className="h-3.5 w-3.5" /> },
    { value: 'health', label: 'Health', icon: <Heart className="h-3.5 w-3.5" /> },
    { value: 'personal', label: 'Personal', icon: <User className="h-3.5 w-3.5" /> },
    { value: 'social', label: 'Social', icon: <Users className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          variant={selectedCategory === category.value ? "default" : "outline"}
          size="sm"
          className={cn(
            "rounded-full whitespace-nowrap",
            selectedCategory === category.value && "bg-accent text-accent-foreground"
          )}
        >
          {category.icon}
          <span className="ml-1">{category.label}</span>
        </Button>
      ))}
      <Button
        variant="default"
        size="sm"
        className="rounded-full ml-auto bg-primary text-primary-foreground whitespace-nowrap"
        onClick={() => navigate('/add')}
      >
        <PlusCircle className="mr-1 h-3.5 w-3.5" />
        New Habit
      </Button>
    </div>
  );
};

export default HabitFilter;
