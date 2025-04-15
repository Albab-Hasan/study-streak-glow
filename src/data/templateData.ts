import { HabitTemplate } from '@/types/template';
import { HabitCategory, WeekDay } from '@/types/habit';

const weekdays: WeekDay[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
const allDays: WeekDay[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const alternatingDays: WeekDay[] = ['mon', 'wed', 'fri', 'sun'];

export const templateData: HabitTemplate[] = [
  {
    id: 'exam_crunch',
    name: 'Exam Crunch Mode',
    description: 'Intense but balanced routine for exam preparation',
    category: 'study',
    targetGroup: 'All students',
    goal: 'Maximize study efficiency',
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
        name: 'Morning stretch',
        description: '5-minute stretch to energize your body',
        category: 'health',
        icon: '🧘',
        color: '#AED6F1',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '06:35'
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
        name: 'Midday Pomodoro session',
        description: '50 minutes of focused study, 10 minute break',
        category: 'study',
        icon: '📚',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '11:00'
      },
      {
        name: 'Afternoon Pomodoro session',
        description: '50 minutes of focused study, 10 minute break',
        category: 'study',
        icon: '📚',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '15:00'
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
      },
      {
        name: 'Sleep by 10:30 PM',
        description: 'Ensure 8 hours of rest for next day',
        category: 'health',
        icon: '💤',
        color: '#A3E4D7',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '22:15'
      }
    ]
  },
  {
    id: 'engineering_routine',
    name: 'Engineering Routine',
    description: 'Deep work + long-term project management',
    category: 'engineering',
    targetGroup: 'Engineering students',
    goal: 'Balance complex projects',
    intensity: 'normal',
    createdAt: new Date().toISOString(),
    habits: [
      {
        name: 'GitHub commit',
        description: 'Make at least one meaningful commit',
        category: 'study',
        icon: '💻',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true,
        reminderTime: '17:00'
      },
      {
        name: 'Solve practice problems',
        description: 'Solve at least 2 practice problems',
        category: 'study',
        icon: '🧠',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '10:00'
      },
      {
        name: 'Lecture review',
        description: 'Review 2 lectures from the day',
        category: 'study',
        icon: '📚',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true,
        reminderTime: '16:00'
      },
      {
        name: 'Sketch system diagram',
        description: 'Practice visualization of systems',
        category: 'study',
        icon: '📝',
        color: '#D4C4FB',
        frequency: 'weekly',
        daysOfWeek: ['wed'],
        notificationsEnabled: true,
        reminderTime: '14:00'
      },
      {
        name: 'Review math notes',
        description: 'Review fundamental math concepts',
        category: 'study',
        icon: '🔢',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: alternatingDays,
        notificationsEnabled: true
      },
      {
        name: 'Group project check',
        description: 'Review progress with project team',
        category: 'social',
        icon: '👥',
        color: '#F9E79F',
        frequency: 'weekly',
        daysOfWeek: ['fri'],
        notificationsEnabled: true,
        reminderTime: '15:00'
      }
    ]
  },
  {
    id: 'cs_programming',
    name: 'CS / Programming Bootcamp',
    description: 'Accelerated learning for coding skills',
    category: 'programming',
    targetGroup: 'CS students / Developers',
    goal: 'Build coding portfolio',
    intensity: 'intense',
    createdAt: new Date().toISOString(),
    habits: [
      {
        name: 'Coding challenge',
        description: 'Solve at least one coding problem',
        category: 'study',
        icon: '👨‍💻',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '09:00'
      },
      {
        name: 'Watch course/tutorial',
        description: 'Learn new concepts or techniques',
        category: 'study',
        icon: '🎥',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '13:00'
      },
      {
        name: 'Build feature/module',
        description: 'Work on a project component',
        category: 'study',
        icon: '🏗️',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: ['mon', 'wed', 'fri'],
        notificationsEnabled: true,
        reminderTime: '15:00'
      },
      {
        name: 'GitHub commit',
        description: 'Push your progress to GitHub',
        category: 'study',
        icon: '💻',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '18:00'
      },
      {
        name: 'Doc reading',
        description: 'Study language/framework documentation',
        category: 'study',
        icon: '📖',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: ['tue', 'thu', 'sat'],
        notificationsEnabled: true,
        reminderTime: '11:00'
      }
    ]
  },
  {
    id: 'daily_study_care',
    name: 'Daily Study + Self-Care',
    description: 'Balance productivity and mental health',
    category: 'self-care',
    targetGroup: 'Burned-out or anxious students',
    goal: 'Sustainable study habits',
    intensity: 'light',
    createdAt: new Date().toISOString(),
    habits: [
      {
        name: 'Morning journaling',
        description: 'Write 3 things you\'re grateful for',
        category: 'personal',
        icon: '📝',
        color: '#F9E79F',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '08:00'
      },
      {
        name: 'Morning study session',
        description: '1 Pomodoro (25 min study, 5 min break)',
        category: 'study',
        icon: '📚',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true,
        reminderTime: '09:00'
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
        name: 'Mindful breathing',
        description: '3 minutes of focused breathing',
        category: 'health',
        icon: '🧘',
        color: '#A3E4D7',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '15:00'
      },
      {
        name: 'Review key points',
        description: 'Summarize 3 important things learned',
        category: 'study',
        icon: '🔍',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true,
        reminderTime: '18:00'
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
      },
      {
        name: 'Read fiction',
        description: '20 minutes of reading for pleasure',
        category: 'personal',
        icon: '📖',
        color: '#F9E79F',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '21:30'
      }
    ]
  },
  {
    id: 'medical_student',
    name: 'Medical Student Template',
    description: 'Optimized for clinical rotations and study',
    category: 'medical',
    targetGroup: 'Medical students',
    goal: 'Balance clinical practice and theory',
    intensity: 'intense',
    createdAt: new Date().toISOString(),
    habits: [
      {
        name: 'Wake up by 6:00 AM',
        description: 'Early start for hospital rounds',
        category: 'personal',
        icon: '⏰',
        color: '#F9E79F',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true,
        reminderTime: '06:00'
      },
      {
        name: 'Morning stretch',
        description: '5-minute stretch to start the day',
        category: 'health',
        icon: '🧘',
        color: '#A3E4D7',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '06:05'
      },
      {
        name: 'Review clinical objectives',
        description: 'Prepare for the day ahead',
        category: 'study',
        icon: '📋',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true,
        reminderTime: '06:15'
      },
      {
        name: 'Observe patient cases',
        description: 'Observe at least 3 cases',
        category: 'study',
        icon: '🏥',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true
      },
      {
        name: 'Practice case presentation',
        description: 'Present at least 1 case',
        category: 'social',
        icon: '🗣️',
        color: '#F9E79F',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true
      },
      {
        name: 'Question Bank practice',
        description: '1 hour of practice questions',
        category: 'study',
        icon: '❓',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '17:00'
      },
      {
        name: 'Flashcard review',
        description: '40 flashcards',
        category: 'study',
        icon: '🗂️',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '19:00'
      },
      {
        name: 'Topic review',
        description: 'Deep dive on one key medical topic',
        category: 'study',
        icon: '📚',
        color: '#D4C4FB',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '20:00'
      },
      {
        name: 'Medical video',
        description: 'Watch educational content',
        category: 'study',
        icon: '🎥',
        color: '#D4C4FB',
        frequency: 'custom',
        daysOfWeek: alternatingDays,
        notificationsEnabled: false
      },
      {
        name: 'Evening journaling',
        description: 'Reflect on patient interactions',
        category: 'personal',
        icon: '📝',
        color: '#F9E79F',
        frequency: 'custom',
        daysOfWeek: weekdays,
        notificationsEnabled: true,
        reminderTime: '21:30'
      },
      {
        name: 'Plan tomorrow',
        description: 'Set priorities for next day',
        category: 'personal',
        icon: '📅',
        color: '#F9E79F',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '22:00'
      },
      {
        name: 'Sleep by 10:30 PM',
        description: 'Get adequate rest',
        category: 'health',
        icon: '💤',
        color: '#A3E4D7',
        frequency: 'daily',
        daysOfWeek: allDays,
        notificationsEnabled: true,
        reminderTime: '22:15'
      }
    ]
  }
];
