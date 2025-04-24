
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
    type: 'streak' | 'completion' | 'xp';
    value: number;
  };
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalHabitsCompleted: number;
  longestStreak: number;
  badges: Badge[];
  friends: string[];
  joinedAt: string;
  theme: 'light' | 'dark';
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  addXp: (amount: number) => void;
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
    id: 'xp-500',
    name: 'Rising Star',
    description: 'Earned 500 XP',
    icon: '⭐',
    unlocked: false,
    requirement: { type: 'xp', value: 500 }
  },
  {
    id: 'xp-1000',
    name: 'Growth Expert',
    description: 'Earned 1000 XP',
    icon: '🌟',
    unlocked: false,
    requirement: { type: 'xp', value: 1000 }
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
  avatar: '',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalHabitsCompleted: 0,
  longestStreak: 0,
  badges: defaultBadges,
  friends: [],
  joinedAt: new Date().toISOString(),
  theme: 'light'
};

// Helper function to calculate level and XP needed for next level
const calculateLevel = (xp: number): { level: number, xpToNextLevel: number } => {
  // Simple leveling formula: each level needs level*100 XP
  let level = 1;
  let xpNeeded = 100;
  let remainingXp = xp;
  
  while (remainingXp >= xpNeeded) {
    remainingXp -= xpNeeded;
    level += 1;
    xpNeeded = level * 100;
  }
  
  return {
    level,
    xpToNextLevel: xpNeeded - remainingXp
  };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    // Load user data from localStorage if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : initialUser;
  });

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    
    // Apply theme from user preferences
    document.documentElement.classList.toggle('dark', user.theme === 'dark');
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updates
    }));
  };

  const addXp = (amount: number) => {
    setUser((prevUser) => {
      const newXp = prevUser.xp + amount;
      const { level, xpToNextLevel } = calculateLevel(newXp);
      
      // Check for XP-based badge unlocks
      const updatedBadges = prevUser.badges.map(badge => {
        if (!badge.unlocked && badge.requirement.type === 'xp' && newXp >= badge.requirement.value) {
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
        xp: newXp,
        level,
        xpToNextLevel,
        badges: updatedBadges
      };
    });
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
      addXp, 
      unlockBadge,
      toggleTheme
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
