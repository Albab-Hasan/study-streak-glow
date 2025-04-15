
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useHabits } from '@/context/HabitContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { getTodayStr } from '@/lib/habitUtils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { habits } = useHabits();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // Fetch notifications when popover opens
  const fetchNotifications = async () => {
    if (!user) return;
    try {
      // This would normally come from a Supabase table, but for now we'll generate them
      const today = getTodayStr();
      const pendingHabits = habits.filter(habit => 
        !habit.completedDates.includes(today) && 
        habit.notificationsEnabled
      );
      
      const generatedNotifications: Notification[] = pendingHabits.map(habit => ({
        id: habit.id,
        title: `Don't forget: ${habit.name}`,
        message: `You haven't completed "${habit.name}" today yet. Keep your streak going!`,
        createdAt: new Date().toISOString(),
        read: false
      }));
      
      setNotifications(generatedNotifications);
      setUnreadCount(generatedNotifications.filter(n => !n.read).length);
    } catch (error: any) {
      console.error("Error fetching notifications:", error.message);
    }
  };

  useEffect(() => {
    // Generate notifications for demo purposes
    fetchNotifications();
    
    // Set up subscription for real-time updates (in a real app)
    if (user) {
      const channel = supabase
        .channel('notifications-changes')
        .on('broadcast', { event: 'notification' }, payload => {
          // In a real implementation, this would update notifications in real-time
          fetchNotifications();
          toast.info(payload.payload.title, {
            description: payload.payload.message,
          });
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, habits]);

  // Mark a notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-auto py-1"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                  !notification.read ? 'bg-accent/10' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
