
import { useState, useEffect } from 'react';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useHabits } from '@/context/HabitContext';
import { getWeekDates, formatDate } from '@/lib/habitUtils';

const DateSelector = () => {
  const { selectedDate, setSelectedDate } = useHabits();
  const currentDate = new Date(selectedDate);
  const weekDates = getWeekDates(currentDate);
  const today = formatDate(new Date());
  
  const handlePrevDay = () => {
    const newDate = subDays(currentDate, 1);
    setSelectedDate(formatDate(newDate));
  };
  
  const handleNextDay = () => {
    const newDate = addDays(currentDate, 1);
    setSelectedDate(formatDate(newDate));
  };
  
  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(formatDate(date));
    }
  };
  
  const handleToday = () => {
    setSelectedDate(today);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevDay}
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[160px]">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{format(currentDate, 'MMM d, yyyy')}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <CalendarComponent
                mode="single"
                selected={currentDate}
                onSelect={handleSelectDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextDay}
            aria-label="Next day"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        {!isSameDay(currentDate, new Date()) && (
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
        )}
      </div>
      
      <div className="flex justify-between mb-4">
        {weekDates.map((date) => {
          const dayDate = new Date(date);
          const isSelected = date === selectedDate;
          const isToday = date === today;
          
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all
                ${isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-secondary'}
                ${isToday && !isSelected ? 'border border-accent' : ''}
              `}
            >
              <span className="text-xs font-medium">
                {format(dayDate, 'EEE')}
              </span>
              <span className={`text-base mt-1 ${isSelected ? 'font-bold' : ''}`}>
                {format(dayDate, 'd')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
