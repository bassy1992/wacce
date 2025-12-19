import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, User } from '../../shared/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await authAPI.getProfile();
      console.log('AuthContext - Profile response:', response);
      console.log('AuthContext - User data:', response.user);
      console.log('AuthContext - Student data:', response.user?.student);
      console.log('AuthContext - Programme data:', response.user?.student?.programme);
      setUser(response.user);
    } catch (error) {
      console.log('Not authenticated:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.signin({ username, password });
      console.log('AuthContext - Login response:', response);
      console.log('AuthContext - Login user:', response.user);
      
      // Store auth token for iOS/Safari compatibility
      if ((response as any).token) {
        localStorage.setItem('authToken', (response as any).token);
        console.log('AuthContext - Token stored');
      }
      
      setUser(response.user);
    } catch (error) {
      throw error; // Re-throw to let the login component handle the error
    }
  };

  const logout = async () => {
    try {
      await authAPI.signout();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, we should still clear the local state
      // This handles cases where the session might be expired on the server
    } finally {
      // Clear auth token
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const refreshUser = async () => {
    await checkAuth();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};