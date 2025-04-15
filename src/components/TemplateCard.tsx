
import { HabitTemplate } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHabits } from '@/context/HabitContext';
import { toast } from 'sonner';
import { X, Trash2 } from 'lucide-react';

interface TemplateCardProps {
  template: HabitTemplate;
  onDisable?: () => void;
  allowDelete?: boolean;
  onDelete?: () => void;
}

const TemplateCard = ({ template, onDisable, allowDelete, onDelete }: TemplateCardProps) => {
  const { addHabit, habits, deleteHabit } = useHabits();

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

  const handleDeleteTemplate = () => {
    if (onDelete) {
      onDelete();
      toast.success('Custom template deleted successfully');
    }
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
      <CardFooter className="flex gap-2">
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
        {allowDelete && (
          <Button 
            variant="destructive" 
            size="icon"
            onClick={handleDeleteTemplate}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
