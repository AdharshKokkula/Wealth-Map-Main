
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data - to replace with actual Supabase auth when integrated
const mockUsers = [
  {
    id: '1',
    email: 'admin@wealthmap.com',
    role: 'admin' as UserRole,
    company_id: '1',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'employee@wealthmap.com',
    role: 'employee' as UserRole,
    company_id: '1',
    created_at: new Date().toISOString(),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session in localStorage (mock)
    const savedUser = localStorage.getItem('wealthmap_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with actual Supabase auth
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        setUser(foundUser);
        localStorage.setItem('wealthmap_user', JSON.stringify(foundUser));
        toast.success('Successfully logged in');
        navigate(foundUser.role === 'admin' ? '/admin/dashboard' : '/properties/map');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('wealthmap_user');
    setUser(null);
    navigate('/');
    toast.success('Successfully logged out');
  };

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
