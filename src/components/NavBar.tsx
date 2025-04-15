import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart, PlusCircle, User, Layout } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';

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
    return null; // Don't show navbar on the auth page
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card glass-card rounded-t-xl p-2 z-50">
      <div className="flex justify-around items-center">
        <NavItem
          icon={<Home />}
          label="Home"
          active={isActive('/')}
          onClick={() => navigate('/')}
        />
        <NavItem
          icon={<Layout />}
          label="Templates"
          active={isActive('/templates')}
          onClick={() => navigate('/templates')}
        />
        <NavItem
          icon={<BarChart />}
          label="Analytics"
          active={isActive('/analytics')}
          onClick={() => navigate('/analytics')}
        />
        <NavItem
          icon={<PlusCircle />}
          label="Add"
          active={isActive('/add')}
          onClick={() => navigate('/add')}
          className="text-accent"
        />
        <NavItem
          icon={<User />}
          label="Profile"
          active={isActive('/profile')}
          onClick={() => navigate('/profile')}
        />
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

const NavItem = ({ icon, label, active, onClick, className = '' }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
        active
          ? 'text-accent font-medium'
          : 'text-muted-foreground hover:text-foreground'
      } ${className}`}
    >
      <div className="text-current">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default NavBar;
