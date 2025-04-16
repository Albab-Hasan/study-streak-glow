
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart, PlusCircle, User, LayoutTemplate } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  if (!user && location.pathname !== '/auth') {
    navigate('/auth');
    return null;
  }
  
  if (location.pathname === '/auth') {
    return null;
  }
  
  return (
    <div className="fixed inset-x-0 bottom-6 mx-auto z-50 px-4 sm:px-6">
      <nav className="relative mx-auto max-w-md glass-card rounded-full py-3 px-6 flex items-center justify-between shadow-2xl">
        <NavItem
          icon={<Home className="w-6 h-6" />}
          label="Home"
          active={isActive('/')}
          onClick={() => navigate('/')}
        />
        <NavItem
          icon={<BarChart className="w-6 h-6" />}
          label="Analytics"
          active={isActive('/analytics')}
          onClick={() => navigate('/analytics')}
        />
        <button
          onClick={() => navigate('/add')}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-12 rounded-full bg-accent hover:bg-accent/90 flex items-center justify-center transform transition-all duration-200 hover:scale-105 shadow-lg"
          aria-label="Add new habit"
        >
          <PlusCircle className="w-6 h-6 text-accent-foreground" />
        </button>
        <NavItem
          icon={<LayoutTemplate className="w-6 h-6" />}
          label="Templates"
          active={isActive('/templates')}
          onClick={() => navigate('/templates')}
        />
        <NavItem
          icon={<User className="w-6 h-6" />}
          label="Profile"
          active={isActive('/profile')}
          onClick={() => navigate('/profile')}
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 hover:bg-white/5 ${
        active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <div className={`transform transition-transform duration-200 group-hover:scale-110 ${active ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default NavBar;
