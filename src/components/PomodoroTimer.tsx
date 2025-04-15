
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressRing from './ProgressRing';

interface TimerProps {
  workTime?: number;
  breakTime?: number;
}

const PomodoroTimer = ({ workTime = 25, breakTime = 5 }: TimerProps) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [active, setActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [cycles, setCycles] = useState(0);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (active && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (active && timeLeft === 0) {
      // Time is up, switch modes
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(breakTime * 60);
        setCycles(c => c + 1);
      } else {
        setMode('work');
        setTimeLeft(workTime * 60);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [active, timeLeft, mode, workTime, breakTime]);
  
  const toggleTimer = () => {
    setActive(!active);
  };
  
  const resetTimer = () => {
    setActive(false);
    setMode('work');
    setTimeLeft(workTime * 60);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const calcProgress = (): number => {
    const total = mode === 'work' ? workTime * 60 : breakTime * 60;
    return Math.round(((total - timeLeft) / total) * 100);
  };
  
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col items-center shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        {mode === 'work' ? 'Focus Time' : 'Break Time'}
      </h2>
      
      <ProgressRing
        progress={calcProgress()}
        size={200}
        strokeWidth={12}
        className={`my-4 ${mode === 'work' ? 'text-accent' : 'text-category-purple'}`}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
          <span className="text-sm text-muted-foreground mt-2">
            Cycle: {cycles + 1}
          </span>
        </div>
      </ProgressRing>
      
      <div className="flex gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={resetTimer}
          disabled={active && timeLeft === workTime * 60}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button onClick={toggleTimer} className="px-6">
          {active ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
          {active ? 'Pause' : 'Start'}
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
