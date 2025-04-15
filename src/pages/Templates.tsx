
import { templateData } from '@/data/templateData';
import TemplateCard from '@/components/TemplateCard';
import NavBar from '@/components/NavBar';

const Templates = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Habit Templates</h1>
        <p className="text-muted-foreground mb-6">
          Choose a pre-built routine to get started quickly
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templateData.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Templates;
