
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { differenceInDays, format, startOfToday } from 'date-fns';

// Types
export interface Habit {
  id: string;
  name: string;
  description?: string;
  category?: string;
  icon?: string;
  color?: string;
  streak: number;
  bestStreak: number;
  completedDates: string[];
  createdAt: string;
  completedToday: boolean;
  xp: number;
}

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'bestStreak' | 'completedDates' | 'createdAt' | 'completedToday' | 'xp'>) => void;
  completeHabit: (id: string) => void;
  uncompleteHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  getStreakInfo: (habit: Habit) => { isCurrentlyActive: boolean, lastCompletedDate: Date | null };
  getTotalXp: () => number;
  getHabitById: (id: string) => Habit | undefined;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

// Sample habits data
const initialHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: 'Start the day with 10 minutes of mindfulness',
    category: 'Wellness',
    icon: '🧘',
    color: '#C8E6C9',
    streak: 5,
    bestStreak: 8,
    completedDates: [
      format(new Date(new Date().setDate(new Date().getDate() - 5)), 'yyyy-MM-dd'),
      format(new Date(new Date().setDate(new Date().getDate() - 4)), 'yyyy-MM-dd'),
      format(new Date(new Date().setDate(new Date().getDate() - 3)), 'yyyy-MM-dd'),
      format(new Date(new Date().setDate(new Date().getDate() - 2)), 'yyyy-MM-dd'),
      format(new Date(new Date().setDate(new Date().getDate() - 1)), 'yyyy-MM-dd'),
    ],
    createdAt: format(new Date(new Date().setDate(new Date().getDate() - 10)), 'yyyy-MM-dd'),
    completedToday: false,
    xp: 250,
  },
  {
    id: '2',
    name: 'Read 20 pages',
    description: 'Read at least 20 pages of a book',
    category: 'Learning',
    icon: '📚',
    color: '#BBDEFB',
    streak: 3,
    bestStreak: 12,
    completedDates: [
      format(new Date(new Date().setDate(new Date().getDate() - 3)), 'yyyy-MM-dd'),
      format(new Date(new Date().setDate(new Date().getDate() - 2)), 'yyyy-MM-dd'),
      format(new Date(new Date().setDate(new Date().getDate() - 1)), 'yyyy-MM-dd'),
    ],
    createdAt: format(new Date(new Date().setDate(new Date().getDate() - 15)), 'yyyy-MM-dd'),
    completedToday: false,
    xp: 150,
  },
  {
    id: '3',
    name: 'Drink water',
    description: 'Drink at least 8 glasses of water',
    category: 'Health',
    icon: '💧',
    color: '#B3E5FC',
    streak: 10,
    bestStreak: 10,
    completedDates: Array.from({ length: 10 }, (_, i) => 
      format(new Date(new Date().setDate(new Date().getDate() - (10 - i))), 'yyyy-MM-dd')
    ),
    createdAt: format(new Date(new Date().setDate(new Date().getDate() - 20)), 'yyyy-MM-dd'),
    completedToday: false,
    xp: 500,
  },
];

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    // Load habits from localStorage if available
    const storedHabits = localStorage.getItem('habits');
    return storedHabits ? JSON.parse(storedHabits) : initialHabits;
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'streak' | 'bestStreak' | 'completedDates' | 'createdAt' | 'completedToday' | 'xp'>) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substring(2, 9),
      ...habitData,
      streak: 0,
      bestStreak: 0,
      completedDates: [],
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      completedToday: false,
      xp: 0,
    };
    
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const completeHabit = (id: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    setHabits((prevHabits) => 
      prevHabits.map((habit) => {
        if (habit.id !== id) return habit;
        
        // Already completed today
        if (habit.completedDates.includes(today)) return habit;
        
        const updatedCompletedDates = [...habit.completedDates, today];
        
        // Calculate new streak
        let newStreak = habit.streak;
        const yesterday = format(new Date(new Date().setDate(new Date().getDate() - 1)), 'yyyy-MM-dd');
        
        // If yesterday is in the completed dates, increment streak
        if (habit.completedDates.includes(yesterday) || habit.streak === 0) {
          newStreak += 1;
        } else {
          // Streak broken, starting new streak
          newStreak = 1;
        }
        
        // Calculate XP - base 10 XP plus streak bonus
        const streakBonus = Math.min(newStreak * 2, 50); // Cap streak bonus at 50
        const newXp = habit.xp + 10 + streakBonus;
        
        return {
          ...habit,
          completedDates: updatedCompletedDates,
          streak: newStreak,
          bestStreak: Math.max(habit.bestStreak, newStreak),
          completedToday: true,
          xp: newXp,
        };
      })
    );
  };

  const uncompleteHabit = (id: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    setHabits((prevHabits) => 
      prevHabits.map((habit) => {
        if (habit.id !== id || !habit.completedDates.includes(today)) return habit;

        const updatedCompletedDates = habit.completedDates.filter(date => date !== today);
        
        // Recalculate streak
        let newStreak = 0;
        let tempDate = null;
        
        // Count consecutive dates backward from the last completion
        for (let i = updatedCompletedDates.length - 1; i >= 0; i--) {
          const currentDate = new Date(updatedCompletedDates[i]);
          
          if (tempDate === null) {
            tempDate = currentDate;
            newStreak = 1;
          } else {
            const diffDays = differenceInDays(tempDate, currentDate);
            if (diffDays === 1) {
              newStreak += 1;
              tempDate = currentDate;
            } else {
              break;
            }
          }
        }

        // Reduce XP - base + streak bonus
        const streakBonus = Math.min(habit.streak * 2, 50);
        const xpReduction = 10 + streakBonus;
        const newXp = Math.max(0, habit.xp - xpReduction);
        
        return {
          ...habit,
          completedDates: updatedCompletedDates,
          streak: newStreak,
          completedToday: false,
          xp: newXp,
        };
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  const getStreakInfo = (habit: Habit) => {
    let isCurrentlyActive = false;
    let lastCompletedDate = null;

    if (habit.completedDates.length > 0) {
      // Sort dates in ascending order
      const sortedDates = [...habit.completedDates].sort();
      const latestDateStr = sortedDates[sortedDates.length - 1];
      lastCompletedDate = new Date(latestDateStr);
      
      const today = startOfToday();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      // Check if completed today or yesterday
      isCurrentlyActive = 
        format(today, 'yyyy-MM-dd') === latestDateStr || 
        format(yesterday, 'yyyy-MM-dd') === latestDateStr;
    }

    return { isCurrentlyActive, lastCompletedDate };
  };

  const getTotalXp = () => {
    return habits.reduce((sum, habit) => sum + habit.xp, 0);
  };

  const getHabitById = (id: string) => {
    return habits.find((habit) => habit.id === id);
  };

  return (
    <HabitContext.Provider value={{ 
      habits, 
      addHabit, 
      completeHabit, 
      uncompleteHabit, 
      deleteHabit,
      getStreakInfo,
      getTotalXp,
      getHabitById
    }}>
      {children}
    </HabitContext.Provider>
  );
};

// Custom hook to use the habit context
export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
