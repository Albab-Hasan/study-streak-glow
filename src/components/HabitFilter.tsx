
import React from 'react';
import { HabitCategory } from '@/types/habit';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HabitFilterProps = {
  selectedCategory: HabitCategory | 'all';
  onSelectCategory: (category: HabitCategory | 'all') => void;
};

const HabitFilter = ({ selectedCategory, onSelectCategory }: HabitFilterProps) => {
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
            "rounded-full",
            selectedCategory === category.value && "bg-accent text-accent-foreground"
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default HabitFilter;
