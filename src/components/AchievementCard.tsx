
import { Achievement } from '@/types/achievement';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trophy, Lock } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const isUnlocked = !!achievement.unlockedAt;

  return (
    <Card className={`p-4 ${isUnlocked ? 'neo-card' : 'opacity-50'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isUnlocked ? 'bg-accent/20' : 'bg-muted'}`}>
          {isUnlocked ? (
            <Trophy className="h-6 w-6 text-accent" />
          ) : (
            <Lock className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{achievement.name}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
        {isUnlocked && (
          <Badge variant="secondary" className="ml-auto">
            Unlocked
          </Badge>
        )}
      </div>
    </Card>
  );
};

export default AchievementCard;
