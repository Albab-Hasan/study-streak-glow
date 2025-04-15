
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabits } from '@/context/HabitContext';
import { Search as SearchIcon, X, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import { HabitCategory } from '@/types/habit';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { habits } = useHabits();
  const navigate = useNavigate();
  const [filteredHabits, setFilteredHabits] = useState(habits);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredHabits(habits);
    } else {
      const filtered = habits.filter(habit => 
        habit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        habit.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHabits(filtered);
    }
  }, [searchTerm, habits]);
  
  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 flex items-center gap-2 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search habits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10"
            autoFocus
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-2.5"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>
      
      <div className="p-4">
        {searchTerm.trim() !== '' && (
          <p className="text-sm text-muted-foreground mb-4">
            {filteredHabits.length} result{filteredHabits.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        )}
        
        {filteredHabits.length > 0 ? (
          <div className="space-y-3">
            {filteredHabits.map(habit => (
              <div 
                key={habit.id}
                className="p-4 border rounded-lg flex items-center cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => navigate(`/habit/${habit.id}`)}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: habit.color }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{habit.name}</h3>
                  {habit.description && (
                    <p className="text-sm text-muted-foreground truncate">{habit.description}</p>
                  )}
                </div>
                <div className="ml-3">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">{habit.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm.trim() !== '' ? (
          <div className="text-center py-12">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">No habits found</p>
            <p className="text-muted-foreground">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-medium text-lg mb-3">All Habits</h3>
            {habits.map(habit => (
              <div 
                key={habit.id}
                className="p-4 border rounded-lg flex items-center cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => navigate(`/habit/${habit.id}`)}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: habit.color }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{habit.name}</h3>
                  {habit.description && (
                    <p className="text-sm text-muted-foreground truncate">{habit.description}</p>
                  )}
                </div>
                <div className="ml-3">
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full">{habit.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Search;
