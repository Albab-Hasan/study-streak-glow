
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type HabitSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const HabitSearch = ({ searchTerm, onSearchChange }: HabitSearchProps) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search habits..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default HabitSearch;
