import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => void;
  updateUserTheme: (theme: 'light' | 'dark') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = [
  { id: '1', email: 'demo@sports.com', password: 'demo123', fullName: 'Demo User', theme: 'light' as const, loyaltyPoints: 150 },
];

async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Try backend first
    try {
      const data = await apiPost<{ token: string; user: User }>(`/api/auth/login`, { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      return true;
    } catch {
      // Fallback to mock
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          email: foundUser.email,
          fullName: foundUser.fullName,
          theme: foundUser.theme,
          loyaltyPoints: foundUser.loyaltyPoints,
        };
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return true;
      }
      return false;
    }
  };

  const register = async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
      const data = await apiPost<{ token: string; user: User }>(`/api/auth/register`, { email, password, fullName });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      return true;
    } catch {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        fullName,
        theme: 'light',
        loyaltyPoints: 0,
      };
      mockUsers.push({ ...newUser, password, theme: 'light' });
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  };

  const updateUserTheme = (theme: 'light' | 'dark') => {
    if (user) {
      const updatedUser = { ...user, theme };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserTheme }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
