
import { Home, BarChart2, PlusSquare, UserCircle, LayoutTemplate } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
    { icon: PlusSquare, label: 'Add', path: '/add' },
    { icon: BarChart2, label: 'Stats', path: '/analytics' },
    { icon: UserCircle, label: 'Profile', path: '/profile' }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-4 transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className={cn('h-5 w-5', active && 'fill-primary')} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
