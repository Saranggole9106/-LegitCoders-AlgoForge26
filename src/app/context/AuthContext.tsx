import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { 
  auth, 
  signInWithGoogle,
  getGoogleRedirectResult 
} from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';

interface User {
  id: string;
  email: string | null;
  fullName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: { email: string; password: string; fullName: string; phone?: string }) => Promise<boolean>;
  logout: () => void;
  loginWithGoogle: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for Google redirect result on mount
  useEffect(() => {
    getGoogleRedirectResult()
      .then((result) => {
        if (result?.user) {
          // Google sign-in successful
          console.log('Google redirect sign-in successful');
        }
      })
      .catch((error) => {
        console.error('Google redirect error:', error.message);
      });
  }, []);
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      console.error('Login error:', error.message);
      return false;
    }
  };

  const signup = async (userData: { email: string; password: string; fullName: string; phone?: string }): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      // Update profile with full name
      await updateProfile(userCredential.user, {
        displayName: userData.fullName
      });
      return true;
    } catch (error: any) {
      console.error('Signup error:', error.message);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      await signInWithGoogle();
      return true;
    } catch (error: any) {
      console.error('Google login error:', error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
