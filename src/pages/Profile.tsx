import { useState } from 'react';
import { useHabits } from '@/context/HabitContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import NavBar from '@/components/NavBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Sun, 
  Moon, 
  Bell, 
  Download, 
  ExternalLink,
  Clock,
  Settings,
  LogOut,
  Trophy,
} from 'lucide-react';
import PomodoroTimer from '@/components/PomodoroTimer';
import { toast } from 'sonner';
import AchievementCard from '@/components/AchievementCard';
import { Achievement } from '@/types/achievement';

const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: '7-Day Warrior',
    description: 'Maintain a 7-day streak in any habit',
    icon: '🏆',
    type: 'streak',
    threshold: 7,
    unlockedAt: '2024-04-15',
  },
  {
    id: '2',
    name: 'Habit Master',
    description: 'Complete all daily habits for 5 consecutive days',
    icon: '⭐',
    type: 'completion',
    threshold: 5,
  },
  {
    id: '3',
    name: 'Early Bird',
    description: 'Complete a morning routine for 3 days straight',
    icon: '🌅',
    type: 'challenge',
    threshold: 3,
    unlockedAt: '2024-04-16',
  },
];

const Profile = () => {
  const { habits } = useHabits();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gamificationEnabled, setGamificationEnabled] = useState(true);

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(habits, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `habit-data-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Data exported successfully', {
        description: 'Your habit data has been downloaded as a JSON file',
      });
    } catch (error) {
      toast.error('Export failed', {
        description: 'There was an error exporting your data',
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      <header className="pt-6 px-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your preferences</p>
      </header>
      
      <div className="px-4 mt-6">
        <div className="flex items-center gap-4 p-6 glass-card rounded-xl mb-8">
          <Avatar className="h-16 w-16 border-2 border-accent">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>{user?.email?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user?.email?.split('@')[0] || 'User'}</h2>
            <p className="text-muted-foreground">{user?.email || ''}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
        
        <Tabs defaultValue="settings" className="px-4 mt-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the app looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <Label htmlFor="theme-mode">
                      {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </Label>
                  </div>
                  <Switch
                    id="theme-mode"
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <Label htmlFor="gamification">Gamification</Label>
                  </div>
                  <Switch
                    id="gamification"
                    checked={gamificationEnabled}
                    onCheckedChange={setGamificationEnabled}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <Label htmlFor="notifications">Push Notifications</Label>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <Label htmlFor="reminders">Daily Reminder</Label>
                  </div>
                  <Switch
                    id="reminders"
                    checked={reminderEnabled}
                    onCheckedChange={setReminderEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <Label htmlFor="sounds">Sound Effects</Label>
                  </div>
                  <Switch
                    id="sounds"
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data</CardTitle>
                <CardDescription>
                  Export or manage your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <Label>Export Data</Label>
                  </div>
                  <Button variant="outline" size="sm" onClick={exportData}>
                    Export
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-5 w-5" />
                    <Label>Privacy Policy</Label>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <p className="text-xs text-muted-foreground">
                  Loop v1.0 • Created with ❤️ by Albab Hasan
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements">
            {gamificationEnabled ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>
                      Track your progress and unlock rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockAchievements.map((achievement) => (
                      <AchievementCard 
                        key={achievement.id} 
                        achievement={achievement}
                      />
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Gamification is disabled</h3>
                  <p className="text-muted-foreground mb-4">
                    Enable gamification in settings to track achievements and unlock rewards
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setGamificationEnabled(true)}
                  >
                    Enable Gamification
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="pomodoro">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Pomodoro Timer</CardTitle>
                <CardDescription>
                  Use the Pomodoro technique to improve focus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PomodoroTimer />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <NavBar />
    </div>
  );
};

export default Profile;
