
import React from 'react';
import { HabitCategory } from '@/types/habit';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

type HabitFilterProps = {
  selectedCategory: HabitCategory | 'all';
  onSelectCategory: (category: HabitCategory | 'all') => void;
};

const HabitFilter = ({ selectedCategory, onSelectCategory }: HabitFilterProps) => {
  const navigate = useNavigate();
  const categories: Array<{ value: HabitCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'study', label: 'Study' },
    { value: 'health', label: 'Health' },
    { value: 'personal', label: 'Personal' },
    { value: 'social', label: 'Social' },
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
          {category.label}
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
