
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wealth-background">
        <div className="animate-pulse-opacity text-3xl font-semibold text-wealth-primary">
          Loading...
        </div>
      </div>
    );
  }
  
  if (user) {
    // Redirect based on user role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/properties/map" />;
    }
  }
  
  // If not logged in, redirect to login page
  return <Navigate to="/login" />;
};

export default Index;
