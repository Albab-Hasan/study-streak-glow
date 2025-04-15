
import { templateData } from '@/data/templateData';
import TemplateCard from '@/components/TemplateCard';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();

  const handleCreateTemplate = () => {
    navigate('/templates/create');
  };

  const defaultTemplates = templateData.filter(template => !template.id.startsWith('custom_'));
  const customTemplates = templateData.filter(template => template.id.startsWith('custom_'));

  return (
    <div className="min-h-screen pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Habit Templates</h1>
            <p className="text-muted-foreground">
              Choose a pre-built routine to get started quickly
            </p>
          </div>
          <Button onClick={handleCreateTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Custom Template
          </Button>
        </div>

        {customTemplates.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Custom Templates</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {customTemplates.map(template => (
                <TemplateCard 
                  key={template.id} 
                  template={template} 
                  allowDelete={true}
                  onDelete={() => {
                    const index = templateData.findIndex(t => t.id === template.id);
                    if (index !== -1) {
                      templateData.splice(index, 1);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">Pre-built Templates</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {defaultTemplates.map(template => (
              <TemplateCard 
                key={template.id} 
                template={template} 
              />
            ))}
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Templates;
