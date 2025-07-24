import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('clinicconnect_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would call an API
    const mockUsers = [
      {
        id: '1',
        email: 'patient@demo.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'patient' as const,
        phone: '+1-555-0123',
        createdAt: new Date(),
      },
      {
        id: '2',
        email: 'doctor@demo.com',
        firstName: 'Dr. Sarah',
        lastName: 'Johnson',
        role: 'doctor' as const,
        phone: '+1-555-0124',
        createdAt: new Date(),
      },
      {
        id: '3',
        email: 'admin@demo.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin' as const,
        phone: '+1-555-0125',
        createdAt: new Date(),
      },
    ];

    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('clinicconnect_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      phone: userData.phone,
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('clinicconnect_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clinicconnect_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};