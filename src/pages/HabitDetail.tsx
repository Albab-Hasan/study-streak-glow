
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHabits } from '@/context/HabitContext';
import { ArrowLeft, Edit2, Trash2, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressRing from '@/components/ProgressRing';
import CategoryBadge from '@/components/CategoryBadge';
import StreakDisplay from '@/components/StreakDisplay';
import { format, subDays } from 'date-fns';
import NavBar from '@/components/NavBar';
import { getTodayStr } from '@/lib/habitUtils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

const HabitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { habits, toggleHabitCompletion, deleteHabit } = useHabits();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  const habit = habits.find(h => h.id === id);
  
  if (!habit) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Habit not found</h2>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }
  
  const today = getTodayStr();
  const isCompletedToday = habit.completedDates.includes(today);
  
  // Get completion data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  }).reverse();
  
  const completionData = last7Days.map(date => ({
    date,
    dayName: format(new Date(date), 'EEE'),
    completed: habit.completedDates.includes(date)
  }));
  
  const calculateCompletionRate = () => {
    const completedDays = completionData.filter(d => d.completed).length;
    return (completedDays / 7) * 100;
  };

  const handleToggleToday = () => {
    toggleHabitCompletion(habit.id, today);
    toast(
      isCompletedToday ? 'Habit marked as incomplete' : 'Habit marked as complete', 
      {
        description: isCompletedToday ? 'Progress updated' : `Streak: ${habit.streak + 1} days`,
      }
    );
  };
  
  const handleDelete = () => {
    deleteHabit(habit.id);
    toast('Habit deleted', { description: 'The habit has been permanently removed' });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen pb-20">
      <header className="pt-6 px-4 flex justify-between items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/edit/${habit.id}`)}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setDeleteConfirmOpen(true)}
            className="p-2 rounded-full hover:bg-secondary text-destructive transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </header>
      
      <div className="px-4 mt-6">
        <div className="flex items-center mb-2">
          <div className="text-3xl mr-2">{habit.icon}</div>
          <h1 className="text-2xl font-bold">{habit.name}</h1>
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <CategoryBadge category={habit.category} />
          <StreakDisplay streak={habit.streak} />
          {habit.notificationsEnabled ? (
            <Bell className="h-4 w-4 text-muted-foreground" />
          ) : (
            <BellOff className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        <p className="text-muted-foreground mb-8">{habit.description}</p>
        
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Weekly Completion</h2>
            <span className="text-sm">{Math.round(calculateCompletionRate())}%</span>
          </div>
          
          <div className="flex justify-between mb-4">
            {completionData.map((day) => (
              <div key={day.date} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                    ${day.completed 
                      ? 'bg-accent text-white' 
                      : 'bg-secondary text-muted-foreground'}`}
                >
                  {day.completed ? '✓' : ''}
                </div>
                <span className="text-xs">{day.dayName}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="neo-card rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Habit Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frequency</span>
              <span className="font-medium capitalize">{habit.frequency}</span>
            </div>
            
            {habit.frequency !== 'daily' && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Days</span>
                <span className="font-medium">
                  {habit.daysOfWeek.map(d => d[0].toUpperCase() + d.slice(1)).join(', ')}
                </span>
              </div>
            )}
            
            {habit.reminderTime && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reminder</span>
                <span className="font-medium">{habit.reminderTime}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Started</span>
              <span className="font-medium">
                {format(new Date(habit.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleToggleToday}
          className="w-full py-6 text-lg"
          variant={isCompletedToday ? "outline" : "default"}
        >
          {isCompletedToday ? 'Mark as Incomplete' : 'Mark as Complete'}
        </Button>
      </div>
      
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Habit</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this habit? This action cannot be undone
              and all tracking history will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <NavBar />
    </div>
  );
};

export default HabitDetail;
