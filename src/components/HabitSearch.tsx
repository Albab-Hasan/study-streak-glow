
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '@/context/HabitContext';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';

type HabitSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const HabitSearch = ({ searchTerm, onSearchChange }: HabitSearchProps) => {
  const [open, setOpen] = useState(false);
  const { habits } = useHabits();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (habitId: string) => {
    navigate(`/habit/${habitId}`);
    setOpen(false);
    onSearchChange('');
  };

  return (
    <>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search habits..."
          value={searchTerm}
          onClick={() => setOpen(true)}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search habits..." 
          value={searchTerm}
          onValueChange={onSearchChange}
        />
        <CommandList>
          <CommandEmpty>No habits found.</CommandEmpty>
          <CommandGroup heading="Habits">
            {habits
              .filter(habit => 
                habit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                habit.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(habit => (
                <CommandItem
                  key={habit.id}
                  onSelect={() => handleSelect(habit.id)}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: habit.color }}
                  />
                  <span>{habit.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {habit.category}
                  </span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default HabitSearch;
