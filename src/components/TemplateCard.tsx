
import { HabitTemplate } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHabits } from '@/context/HabitContext';
import { toast } from 'sonner';
import { X, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TemplateCardProps {
  template: HabitTemplate;
  onDisable?: () => void;
}

const TemplateCard = ({ template, onDisable }: TemplateCardProps) => {
  const { addHabit, habits, deleteHabit } = useHabits();
  const navigate = useNavigate();

  const handleApplyTemplate = () => {
    template.habits.forEach(habit => {
      addHabit(habit);
    });
    toast.success('Template habits added successfully!');
  };

  const handleDisableTemplate = () => {
    const templateHabits = habits.filter(habit => 
      template.habits.some(templateHabit => 
        templateHabit.name === habit.name && 
        templateHabit.description === habit.description
      )
    );
    
    templateHabits.forEach(habit => {
      deleteHabit(habit.id);
    });
    
    if (onDisable) {
      onDisable();
    }
    toast.success('Template habits removed successfully');
  };

  const handleCreateCustom = () => {
    navigate('/templates/create');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{template.name}</CardTitle>
          <Badge 
            variant={template.intensity === 'intense' ? 'destructive' : 
                    template.intensity === 'normal' ? 'default' : 
                    'secondary'}
          >
            {template.intensity}
          </Badge>
        </div>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>Target:</strong> {template.targetGroup}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Goal:</strong> {template.goal}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Habits:</strong> {template.habits.length} habits included
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex w-full gap-2">
          <Button onClick={handleApplyTemplate} className="flex-1">
            Apply Template
          </Button>
          <Button 
            variant="destructive" 
            size="icon"
            onClick={handleDisableTemplate}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleCreateCustom}
        >
          <Settings className="mr-2 h-4 w-4" />
          Create Custom Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
