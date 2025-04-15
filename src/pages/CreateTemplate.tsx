
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, ArrowLeft, Check, Pencil } from 'lucide-react';
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
    <div className="min-h-screen pb-20 animate-fade-in">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Create Custom Template</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Template Name</Label>
              <Input
                id="name"
                value={template.name}
                onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                placeholder="e.g., My Study Routine"
                required
                className="bg-secondary/50 border-white/10 focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Textarea
                id="description"
                value={template.description}
                onChange={(e) => setTemplate({ ...template, description: e.target.value })}
                placeholder="Describe your template"
                required
                className="bg-secondary/50 border-white/10 resize-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Category</Label>
              <Input
                id="category"
                value={template.category}
                onChange={(e) => setTemplate({ ...template, category: e.target.value })}
                placeholder="e.g., study, health, personal"
                required
                className="bg-secondary/50 border-white/10 focus:border-accent"
              />
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetGroup" className="text-sm font-medium">Target Group</Label>
              <Input
                id="targetGroup"
                value={template.targetGroup}
                onChange={(e) => setTemplate({ ...template, targetGroup: e.target.value })}
                placeholder="Who is this template for?"
                className="bg-secondary/50 border-white/10 focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="text-sm font-medium">Goal</Label>
              <Input
                id="goal"
                value={template.goal}
                onChange={(e) => setTemplate({ ...template, goal: e.target.value })}
                placeholder="What's the main goal?"
                className="bg-secondary/50 border-white/10 focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intensity" className="text-sm font-medium">Intensity</Label>
              <Select
                value={template.intensity}
                onValueChange={(value: 'light' | 'normal' | 'intense') => 
                  setTemplate({ ...template, intensity: value })
                }
              >
                <SelectTrigger className="bg-secondary/50 border-white/10">
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="intense">Intense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="text-accent mr-2">·</span> Template Habits
            </h2>
            
            <div className="stagger-list">
              {template.habits?.map((habit, index) => (
                <div 
                  key={index} 
                  className="glass-card flex items-center gap-2 p-4 rounded-xl mb-3 backdrop-blur-lg"
                >
                  <div 
                    className="w-2 h-full rounded-full"
                    style={{ backgroundColor: habit.color }}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{habit.name}</p>
                    <p className="text-sm text-muted-foreground">{habit.description}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveHabit(index)}
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="neo-card p-6 rounded-xl">
              <h3 className="text-lg font-medium flex items-center mb-4">
                <Plus className="h-4 w-4 mr-2 text-accent" /> 
                Add New Habit
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="habitName" className="text-sm font-medium">Habit Name</Label>
                  <Input
                    id="habitName"
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                    placeholder="e.g., Study for 2 hours"
                    className="bg-secondary/50 border-white/10 focus:border-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="habitDescription" className="text-sm font-medium">Description</Label>
                  <Textarea
                    id="habitDescription"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                    placeholder="Describe the habit"
                    className="bg-secondary/50 border-white/10 resize-none focus:border-accent h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="habitCategory" className="text-sm font-medium">Category</Label>
                  <Select
                    value={newHabit.category}
                    onValueChange={(value: HabitCategory) => 
                      setNewHabit({ ...newHabit, category: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary/50 border-white/10">
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
                  className="w-full accent-gradient"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Habit to Template
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full accent-gradient py-6 font-semibold">
            <Check className="mr-2 h-5 w-5" />
            Create Template
          </Button>
        </form>
      </div>
      <NavBar />
    </div>
  );
};

export default CreateTemplate;
