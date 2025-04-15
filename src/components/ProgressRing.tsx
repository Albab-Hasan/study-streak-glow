
import { useState, useEffect } from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  bgColor?: string;
  showAnimation?: boolean;
}

const ProgressRing = ({
  progress,
  size = 150,
  strokeWidth = 10,
  className = "",
  children,
  color = "currentColor",
  bgColor = "currentColor",
  showAnimation = true,
}: ProgressRingProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, showAnimation]);
  
  // Calculate the properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;
  
  return (
    <div className={`progress-ring-container ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={bgColor}
          strokeWidth={strokeWidth}
          className="text-muted opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-accent transition-all duration-700 ease-out"
          filter="url(#glow)"
        />
      </svg>
      <div className="progress-ring-text">
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;
