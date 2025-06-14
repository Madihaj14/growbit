
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHabits } from "@/contexts/HabitContext";
import { useUser } from "@/contexts/UserContext";
import HabitCard from "@/components/habits/HabitCard";
import { Award, TrendingUp, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { habits } = useHabits();
  const { user } = useUser();

  // Fetch user profile from Supabase
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return null;
      
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', authUser.id)
        .single();
      return data;
    },
  });

  // Use profile username or fallback to email or "User"
  const displayName = profile?.username || user.name || "User";

  // Calculate stats
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const totalHabits = habits.length;
  const todayPercent = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hi {displayName}!</h1>
          <p className="text-growbit-text-secondary">
            {completedToday === 0 ? (
              "You haven't completed any habits today yet."
            ) : (
              `You've completed ${completedToday} of ${totalHabits} habits today. Keep going!`
            )}
          </p>
        </div>
        <Link to="/habits/new">
          <Button className="gap-2">
            <Plus size={16} />
            New Habit
          </Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-12 h-12 rounded-full bg-growbit-primary/10 dark:bg-growbit-primary/20 flex items-center justify-center mb-3">
            <Calendar className="text-growbit-primary" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{completedToday}/{totalHabits}</h3>
          <p className="text-sm text-growbit-text-secondary dark:text-gray-400">Today's Habits</p>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
            <motion.div 
              className="h-full bg-growbit-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${todayPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-12 h-12 rounded-full bg-zen-mint/30 dark:bg-zen-mint/20 flex items-center justify-center mb-3">
            <TrendingUp className="text-growbit-success" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{longestStreak} days</h3>
          <p className="text-sm text-growbit-text-secondary dark:text-gray-400">Longest Streak</p>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-12 h-12 rounded-full bg-zen-blue/30 dark:bg-zen-blue/20 flex items-center justify-center mb-3">
            <Award className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.totalHabitsCompleted}</h3>
          <p className="text-sm text-growbit-text-secondary dark:text-gray-400">Total Completions</p>
        </motion.div>
      </div>

      {/* Today's Habits */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Today's Habits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.length > 0 ? (
            habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))
          ) : (
            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-growbit-text-secondary dark:text-gray-400 mb-4">You don't have any habits set up yet.</p>
              <Link to="/habits/new" className="btn-primary inline-flex">
                <Button className="gap-2">
                  <Plus size={16} />
                  Add your first habit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
