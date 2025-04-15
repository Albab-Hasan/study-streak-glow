
import React from 'react';
import { TemplateCategory } from '@/types/template';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Books, Brain, Code, Heart, Stethoscope } from 'lucide-react';

type TemplateFilterProps = {
  selectedCategory: TemplateCategory | 'all';
  onSelectCategory: (category: TemplateCategory | 'all') => void;
};

const TemplateFilter = ({ selectedCategory, onSelectCategory }: TemplateFilterProps) => {
  const categories: Array<{ value: TemplateCategory | 'all'; label: string; icon: React.ReactNode }> = [
    { value: 'all', label: 'All', icon: <Books className="h-3.5 w-3.5" /> },
    { value: 'study', label: 'Study', icon: <Books className="h-3.5 w-3.5" /> },
    { value: 'engineering', label: 'Engineering', icon: <Brain className="h-3.5 w-3.5" /> },
    { value: 'programming', label: 'Programming', icon: <Code className="h-3.5 w-3.5" /> },
    { value: 'medical', label: 'Medical', icon: <Stethoscope className="h-3.5 w-3.5" /> },
    { value: 'self-care', label: 'Self-Care', icon: <Heart className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
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
    </div>
  );
};

export default TemplateFilter;
