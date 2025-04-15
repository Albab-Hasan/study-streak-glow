
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useHabits } from '@/context/HabitContext';
import { exportHabitsToCSV } from '@/lib/exportUtils';
import { toast } from 'sonner';

const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { habits } = useHabits();
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      if (habits.length === 0) {
        toast.error('No habits to export');
        return;
      }
      
      exportHabitsToCSV(habits);
      toast.success('Export successful', {
        description: 'Your habits have been exported to CSV'
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed', {
        description: 'There was a problem exporting your habits'
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Button 
      onClick={handleExport} 
      variant="outline" 
      className="w-full flex items-center justify-center gap-2"
      disabled={isExporting}
    >
      <Download className="h-4 w-4" />
      {isExporting ? 'Exporting...' : 'Export Habits Data'}
    </Button>
  );
};

export default ExportButton;
