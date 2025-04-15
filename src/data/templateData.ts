
import { HabitTemplate } from '@/types/template';
import { HabitCategory, WeekDay } from '@/types/habit';

const weekdays: WeekDay[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
const allDays: WeekDay[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const templateData: HabitTemplate[] = [
  {
    id: 'exam_crunch',
    name: 'Exam Crunch Mode',
    description: 'Intense but balanced routine for exam preparation',
    category: 'study',
    targetGroup: 'All students',
    goal: 'Maximize study efficiency while maintaining health',
    intensity: 'intense',
    createdAt: new Date().toISOString(),
    habits: [
      {
        name: 'Wake up at 6:30 AM',
        description: 'Start your day early to maximize productivity',
        category: 'personal',
        icon: '⏰',
        color: '#F9E79F',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '06:30'
      },
      {
        name: 'Morning Pomodoro session',
        description: '50 minutes of focused study, 10 minute break',
        category: 'study',
        icon: '📚',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '08:00'
      },
      {
        name: 'Short walk',
        description: '10-minute walk between study sessions',
        category: 'health',
        icon: '🏃',
        color: '#A3E4D7',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: false
      },
      {
        name: 'Practice past paper',
        description: 'Complete one past exam paper',
        category: 'study',
        icon: '📝',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '16:30'
      }
    ]
  },
  {
    id: 'daily_study_care',
    name: 'Daily Study + Self-Care',
    description: 'Balance productivity and mental health',
    category: 'self-care',
    targetGroup: 'Burned-out or anxious students',
    goal: 'Sustainable study habits with focus on wellbeing',
    intensity: 'light',
    createdAt: new Date().toISOString(),
    habits: [
      {
        name: 'Morning journaling',
        description: "Write 3 things you're grateful for",
        category: 'personal',
        icon: '📝',
        color: '#F9E79F',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '08:00'
      },
      {
        name: 'Light exercise',
        description: 'Walk, yoga, or gentle stretching',
        category: 'health',
        icon: '🧘',
        color: '#A3E4D7',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '12:00'
      },
      {
        name: 'Screen-free time',
        description: 'No screens after 9 PM',
        category: 'personal',
        icon: '📱',
        color: '#F9E79F',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '20:45'
      }
    ]
  }
];
