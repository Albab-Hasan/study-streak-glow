
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useHabits } from '@/context/HabitContext';
import { templateData } from '@/data/templateData';
import { HabitTemplate, TemplateCategory } from '@/types/template';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TemplateFilter from '@/components/TemplateFilter';

const Templates = () => {
  const navigate = useNavigate();
  const { addHabit } = useHabits();
  const [selectedTemplate, setSelectedTemplate] = useState<HabitTemplate | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');

  const filteredTemplates = templateData.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  );

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;
    
    try {
      selectedTemplate.habits.forEach(habitTemplate => {
        addHabit(habitTemplate);
      });
      
      toast.success('Template applied successfully', {
        description: `${selectedTemplate.habits.length} habits added to your routine`,
      });
      
      setPreviewOpen(false);
      navigate('/');
    } catch (error) {
      toast.error('Failed to apply template');
      console.error('Error applying template:', error);
    }
  };

  const handleOpenPreview = (template: HabitTemplate) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
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
        <h1 className="text-xl font-bold">Templates</h1>
        <div className="w-9"></div> {/* Spacer for centered title */}
      </header>
      
      <div className="px-4 mt-6">
        <p className="text-muted-foreground mb-6">
          Choose a pre-built routine to jumpstart your habit journey. These templates are designed 
          for specific needs and can be customized after applying.
        </p>
        
        <TemplateFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {template.intensity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target:</p>
                      <p className="font-medium">{template.targetGroup}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Goal:</p>
                      <p className="font-medium">{template.goal}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-muted-foreground text-sm mb-2">Habits included:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.habits.slice(0, 3).map((habit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {habit.name}
                        </Badge>
                      ))}
                      {template.habits.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.habits.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleOpenPreview(template)}
                  >
                    <Info className="mr-1 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleOpenPreview(template)}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="popular" className="space-y-4">
            {templateData.filter(t => ['exam_crunch', 'daily_study_care'].includes(t.id)).map(template => (
              <Card key={template.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {template.intensity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Target:</p>
                      <p className="font-medium">{template.targetGroup}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Goal:</p>
                      <p className="font-medium">{template.goal}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-muted-foreground text-sm mb-2">Habits included:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.habits.slice(0, 3).map((habit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {habit.name}
                        </Badge>
                      ))}
                      {template.habits.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.habits.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleOpenPreview(template)}
                  >
                    <Info className="mr-1 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleOpenPreview(template)}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        {selectedTemplate && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedTemplate.name}</DialogTitle>
              <DialogDescription>
                {selectedTemplate.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Target Group:</p>
                  <p className="font-medium">{selectedTemplate.targetGroup}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Goal:</p>
                  <p className="font-medium">{selectedTemplate.goal}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Intensity:</p>
                  <p className="font-medium capitalize">{selectedTemplate.intensity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Habits:</p>
                  <p className="font-medium">{selectedTemplate.habits.length}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Habits included:</h4>
                <ul className="space-y-1.5">
                  {selectedTemplate.habits.map((habit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">{habit.icon}</span>
                      <div>
                        <p className="font-medium">{habit.name}</p>
                        {habit.description && (
                          <p className="text-xs text-muted-foreground">{habit.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>Cancel</Button>
              <Button onClick={handleApplyTemplate}>Apply Template</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <NavBar />
    </div>
  );
};

export default Templates;
