import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [gracePeriod, setGracePeriod] = useState(true);

  // Wait 2 seconds after mount before allowing redirects
  // This gives Firebase time to restore auth state from persistence
  useEffect(() => {
    const timer = setTimeout(() => {
      setGracePeriod(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || gracePeriod) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
