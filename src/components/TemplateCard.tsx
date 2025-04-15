
import { HabitTemplate } from '@/types/template';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHabits } from '@/context/HabitContext';
import { toast } from 'sonner';

interface TemplateCardProps {
  template: HabitTemplate;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const { addHabit } = useHabits();

  const handleApplyTemplate = () => {
    template.habits.forEach(habit => {
      addHabit(habit);
    });
    toast.success('Template habits added successfully!');
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
      <CardFooter>
        <Button onClick={handleApplyTemplate} className="w-full">
          Apply Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
