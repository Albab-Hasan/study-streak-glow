
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!template.name || !template.description || !template.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newTemplate: HabitTemplate = {
      ...template as HabitTemplate,
      id: `custom_${Date.now()}`,
      createdAt: new Date().toISOString(),
      habits: []
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
