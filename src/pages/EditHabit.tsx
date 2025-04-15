
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHabits } from '@/context/HabitContext';
import { ArrowLeft } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { HabitCategory, HabitFrequency, WeekDay } from '@/types/habit';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const EMOJIS = ['📚', '💧', '📝', '🏃', '🧘', '🍎', '💤', '💻', '🏋️', '🎯', '🧠', '👥'];
const COLORS = ['#A3E4D7', '#D4C4FB', '#F9E79F', '#AED6F1'];

const EditHabit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { habits, updateHabit } = useHabits();
  
  const habit = habits.find(h => h.id === id);
  
  // Initialize form state with habit data or defaults
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<HabitCategory>('study');
  const [selectedIcon, setSelectedIcon] = useState('📚');
  const [selectedColor, setSelectedColor] = useState('#A3E4D7');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [daysOfWeek, setDaysOfWeek] = useState<WeekDay[]>(['mon', 'tue', 'wed', 'thu', 'fri']);
  const [reminderTime, setReminderTime] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Load habit data when component mounts
  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
      setCategory(habit.category);
      setSelectedIcon(habit.icon);
      setSelectedColor(habit.color);
      setFrequency(habit.frequency);
      setDaysOfWeek(habit.daysOfWeek);
      setReminderTime(habit.reminderTime || '');
      setNotificationsEnabled(habit.notificationsEnabled);
    }
  }, [habit]);
  
  if (!habit) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Habit not found</h2>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }
  
  const handleDaysChange = (value: string[]) => {
    setDaysOfWeek(value as WeekDay[]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a habit name');
      return;
    }
    
    const updatedHabit = {
      ...habit,
      name,
      description,
      category,
      icon: selectedIcon,
      color: selectedColor,
      frequency,
      daysOfWeek,
      reminderTime: reminderTime || undefined,
      notificationsEnabled,
    };
    
    updateHabit(updatedHabit);
    toast.success('Habit updated', {
      description: 'Your changes have been saved successfully',
    });
    navigate(`/habit/${habit.id}`);
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
        <h1 className="text-xl font-bold">Edit Habit</h1>
        <div className="w-9"></div> {/* Spacer for centered title */}
      </header>
      
      <form onSubmit={handleSubmit} className="px-4 mt-6 space-y-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Study Calculus"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's your goal with this habit?"
              className="resize-none"
            />
          </div>
        </div>
        
        <div>
          <Label className="mb-2 block">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as HabitCategory)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="mb-2 block">Icon</Label>
          <div className="grid grid-cols-6 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedIcon(emoji)}
                className={`p-3 text-2xl rounded-md transition-colors
                  ${selectedIcon === emoji ? 'bg-accent bg-opacity-20' : 'bg-secondary'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="mb-2 block">Color</Label>
          <div className="flex gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full transition-transform
                  ${selectedColor === color ? 'ring-2 ring-accent scale-110' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        
        <div>
          <Label className="mb-2 block">Frequency</Label>
          <RadioGroup
            value={frequency}
            onValueChange={(value) => setFrequency(value as HabitFrequency)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom days</Label>
            </div>
          </RadioGroup>
        </div>
        
        {frequency !== 'daily' && (
          <div>
            <Label className="mb-2 block">Days of week</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              value={daysOfWeek}
              onValueChange={handleDaysChange}
              className="justify-between"
            >
              <ToggleGroupItem value="mon" className="w-10">M</ToggleGroupItem>
              <ToggleGroupItem value="tue" className="w-10">T</ToggleGroupItem>
              <ToggleGroupItem value="wed" className="w-10">W</ToggleGroupItem>
              <ToggleGroupItem value="thu" className="w-10">T</ToggleGroupItem>
              <ToggleGroupItem value="fri" className="w-10">F</ToggleGroupItem>
              <ToggleGroupItem value="sat" className="w-10">S</ToggleGroupItem>
              <ToggleGroupItem value="sun" className="w-10">S</ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
        
        <div>
          <Label htmlFor="reminder" className="mb-2 block">Reminder Time (optional)</Label>
          <Input
            id="reminder"
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable notifications</Label>
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>
        
        <Button type="submit" className="w-full py-6">Save Changes</Button>
      </form>
      
      <NavBar />
    </div>
  );
};

export default EditHabit;
