
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'streak' | 'completion' | 'challenge';
  threshold: number;
  unlockedAt?: string;
}
