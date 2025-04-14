
import { Trophy } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
  className?: string;
}

const StreakDisplay = ({ streak, className = '' }: StreakDisplayProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
      <span className="font-medium">{streak} day{streak !== 1 ? 's' : ''}</span>
    </div>
  );
};

export default StreakDisplay;
