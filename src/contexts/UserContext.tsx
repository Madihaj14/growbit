
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: {
    type: 'streak' | 'completion';
    value: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  totalHabitsCompleted: number;
  longestStreak: number;
  badges: Badge[];
  friends: string[];
  joinedAt: string;
  theme: 'light' | 'dark';
  notificationsEnabled?: boolean;
  emailNotifications?: boolean;
  soundEffects?: boolean;
  autoSave?: boolean;
  language?: string;
  timezone?: string;
  weekStartsOn?: 'monday' | 'sunday';
  privacyMode?: boolean;
  dataExport?: boolean;
  accountDeletion?: boolean;
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  unlockBadge: (badgeId: string) => void;
  toggleTheme: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Badge definitions
const defaultBadges: Badge[] = [
  {
    id: 'first-habit',
    name: 'First Steps',
    description: 'Created your first habit',
    icon: '🌱',
    unlocked: false,
    requirement: { type: 'completion', value: 1 }
  },
  {
    id: 'streak-7',
    name: 'Consistency Master',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
    unlocked: false,
    requirement: { type: 'streak', value: 7 }
  },
  {
    id: 'streak-30',
    name: 'Habit Champion',
    description: 'Maintained a 30-day streak',
    icon: '🏆',
    unlocked: false,
    requirement: { type: 'streak', value: 30 }
  },
  {
    id: 'completions-100',
    name: 'Century Club',
    description: 'Completed habits 100 times',
    icon: '💯',
    unlocked: false,
    requirement: { type: 'completion', value: 100 }
  }
];

// Initial user state
const initialUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'user@example.com',
  avatar: '',
  level: 1,
  totalHabitsCompleted: 0,
  longestStreak: 0,
  badges: defaultBadges,
  friends: [],
  joinedAt: new Date().toISOString(),
  theme: 'light',
  notificationsEnabled: true,
  emailNotifications: true,
  soundEffects: true,
  autoSave: true,
  language: 'english',
  timezone: 'UTC',
  weekStartsOn: 'monday',
  privacyMode: false,
  dataExport: false,
  accountDeletion: false
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : initialUser;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    
    document.documentElement.classList.toggle('dark', user.theme === 'dark');
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updates
    }));
  };

  const unlockBadge = (badgeId: string) => {
    setUser((prevUser) => {
      const updatedBadges = prevUser.badges.map(badge => {
        if (badge.id === badgeId && !badge.unlocked) {
          return {
            ...badge,
            unlocked: true,
            unlockedAt: new Date().toISOString()
          };
        }
        return badge;
      });
      
      return {
        ...prevUser,
        badges: updatedBadges
      };
    });
  };

  const toggleTheme = () => {
    setUser((prevUser) => ({
      ...prevUser,
      theme: prevUser.theme === 'light' ? 'dark' : 'light'
    }));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      updateUser, 
      unlockBadge,
      toggleTheme
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
