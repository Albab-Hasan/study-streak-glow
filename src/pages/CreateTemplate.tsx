
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { templateData } from '@/data/templateData';
import { HabitTemplate } from '@/types/template';
import { HabitCategory, WeekDay } from '@/types/habit';
import NavBar from '@/components/NavBar';

const CreateTemplate = () => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Partial<HabitTemplate>>({
    name: '',
    description: '',
    category: '',
    targetGroup: '',
    goal: '',
    intensity: 'normal',
    habits: []
  });

  // Define a mutable array of weekdays
  const allWeekDays: WeekDay[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'personal' as HabitCategory,
    icon: '📝',
    color: '#F9E79F',
    frequency: 'daily' as const,
    daysOfWeek: [...allWeekDays] as WeekDay[], // Create a new mutable array
    notificationsEnabled: false
  });

  const handleAddHabit = () => {
    if (!newHabit.name) {
      toast.error('Please enter a habit name');
      return;
    }

    setTemplate(prev => ({
      ...prev,
      habits: [...(prev.habits || []), { ...newHabit }] // Create a new object with spread to avoid readonly issues
    }));

    setNewHabit({
      name: '',
      description: '',
      category: 'personal',
      icon: '📝',
      color: '#F9E79F',
      frequency: 'daily',
      daysOfWeek: [...allWeekDays], // Create a new mutable array
      notificationsEnabled: false
    });

    toast.success('Habit added to template');
  };

  const handleRemoveHabit = (index: number) => {
    setTemplate(prev => ({
      ...prev,
      habits: prev.habits?.filter((_, i) => i !== index)
    }));
    toast.success('Habit removed from template');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!template.name || !template.description || !template.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!template.habits?.length) {
      toast.error('Please add at least one habit to the template');
      return;
    }

    const newTemplate: HabitTemplate = {
      ...template as HabitTemplate,
      id: `custom_${Date.now()}`,
      createdAt: new Date().toISOString(),
      habits: template.habits
    };

    templateData.push(newTemplate);
    toast.success('Template created successfully!');
    navigate('/templates');
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Create Custom Template</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={template.name}
              onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              placeholder="e.g., My Study Routine"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={template.description}
              onChange={(e) => setTemplate({ ...template, description: e.target.value })}
              placeholder="Describe your template"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={template.category}
              onChange={(e) => setTemplate({ ...template, category: e.target.value })}
              placeholder="e.g., study, health, personal"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetGroup">Target Group</Label>
            <Input
              id="targetGroup"
              value={template.targetGroup}
              onChange={(e) => setTemplate({ ...template, targetGroup: e.target.value })}
              placeholder="Who is this template for?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Input
              id="goal"
              value={template.goal}
              onChange={(e) => setTemplate({ ...template, goal: e.target.value })}
              placeholder="What's the main goal?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity</Label>
            <Select
              value={template.intensity}
              onValueChange={(value: 'light' | 'normal' | 'intense') => 
                setTemplate({ ...template, intensity: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="intense">Intense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Template Habits</h2>
            
            {template.habits?.map((habit, index) => (
              <div key={index} className="flex items-center gap-2 p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{habit.name}</p>
                  <p className="text-sm text-muted-foreground">{habit.description}</p>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveHabit(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium">Add New Habit</h3>
              
              <div className="space-y-2">
                <Label htmlFor="habitName">Habit Name</Label>
                <Input
                  id="habitName"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  placeholder="e.g., Study for 2 hours"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="habitDescription">Description</Label>
                <Textarea
                  id="habitDescription"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  placeholder="Describe the habit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="habitCategory">Category</Label>
                <Select
                  value={newHabit.category}
                  onValueChange={(value: HabitCategory) => 
                    setNewHabit({ ...newHabit, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="study">Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="button"
                onClick={handleAddHabit}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Habit to Template
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Template
          </Button>
        </form>
      </div>
      <NavBar />
    </div>
  );
};

export default CreateTemplate;
