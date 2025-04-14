
import { HabitCategory } from '@/types/habit';

interface CategoryBadgeProps {
  category: HabitCategory;
  className?: string;
}

const CategoryBadge = ({ category, className = '' }: CategoryBadgeProps) => {
  const getCategoryProps = (cat: HabitCategory) => {
    switch (cat) {
      case 'study':
        return { 
          bg: 'bg-category-green bg-opacity-20',
          text: 'text-green-700 dark:text-green-300',
          label: 'Study'
        };
      case 'health':
        return { 
          bg: 'bg-category-blue bg-opacity-20',
          text: 'text-blue-700 dark:text-blue-300',
          label: 'Health'
        };
      case 'personal':
        return { 
          bg: 'bg-category-purple bg-opacity-20',
          text: 'text-purple-700 dark:text-purple-300',
          label: 'Personal'
        };
      case 'social':
        return { 
          bg: 'bg-category-yellow bg-opacity-20',
          text: 'text-yellow-700 dark:text-yellow-300',
          label: 'Social'
        };
    }
  };
  
  const { bg, text, label } = getCategoryProps(category);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${className}`}>
      {label}
    </span>
  );
};

export default CategoryBadge;
