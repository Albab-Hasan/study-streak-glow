
import { useState } from 'react';
import { useHabits } from '@/context/HabitContext';
import NavBar from '@/components/NavBar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { format, subDays } from 'date-fns';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Analytics = () => {
  const { habits, progress } = useHabits();
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Prepare data for weekly completion chart
  const weeklyData = progress.map(day => ({
    date: format(new Date(day.date), 'EEE'),
    rate: Math.round((day.completedHabits / Math.max(1, day.totalHabits)) * 100),
    completed: day.completedHabits,
    total: day.totalHabits,
  }));
  
  // Prepare streak data
  const streakData = habits.map(habit => ({
    name: habit.name,
    streak: habit.streak,
    color: habit.color,
  })).sort((a, b) => b.streak - a.streak);
  
  // Prepare data for category distribution
  const categoryData = habits.reduce((acc, habit) => {
    const existing = acc.find(item => item.category === habit.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        category: habit.category,
        count: 1,
        color: getCategoryColor(habit.category),
      });
    }
    return acc;
  }, [] as { category: string; count: number; color: string }[]);
  
  function getCategoryColor(category: string): string {
    switch (category) {
      case 'study': return '#A3E4D7';
      case 'health': return '#AED6F1';
      case 'personal': return '#D4C4FB';
      case 'social': return '#F9E79F';
      default: return '#CCCCCC';
    }
  }
  
  return (
    <div className="min-h-screen pb-20">
      <header className="pt-6 px-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your progress</p>
      </header>
      
      <Tabs 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="px-4 mt-6"
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, 'Completion Rate']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Bar 
                      dataKey="rate" 
                      fill="hsl(var(--accent))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {weeklyData.reduce((acc, day) => acc + day.rate, 0) / Math.max(1, weeklyData.length)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  7-day average
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Habits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {habits.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {categoryData.length} categories
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Daily Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="hsl(var(--accent))" 
                      name="Completed"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeDasharray="5 5"
                      name="Total"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="streaks">
          <Card>
            <CardHeader>
              <CardTitle>Habit Streaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={streakData} 
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={100}
                      tickFormatter={(value) => 
                        value.length > 12 ? `${value.substring(0, 12)}...` : value
                      }
                    />
                    <Tooltip />
                    <Bar 
                      dataKey="streak" 
                      fill="hsl(var(--accent))"
                      radius={[0, 4, 4, 0]}
                    >
                      {streakData.map((entry, index) => (
                        <Bar key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Streak Leaders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {streakData.slice(0, 3).map((habit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-secondary">
                      {index + 1}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="font-medium">{habit.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Habit Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <XAxis 
                      dataKey="category" 
                      tickFormatter={(value) => 
                        value.charAt(0).toUpperCase() + value.slice(1)
                      } 
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="count" 
                      radius={[4, 4, 0, 0]}
                    >
                      {categoryData.map((entry, index) => (
                        <Bar key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                {categoryData.map((cat) => (
                  <div 
                    key={cat.category}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${cat.color}30` }}
                  >
                    <div className="font-medium capitalize">{cat.category}</div>
                    <div className="text-2xl font-bold">{cat.count}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((cat.count / habits.length) * 100)}% of total
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <NavBar />
    </div>
  );
};

export default Analytics;
