
import { motion } from "framer-motion";
import { useHabits } from "@/contexts/HabitContext";
import { useUser } from "@/contexts/UserContext";
import HabitCard from "@/components/habits/HabitCard";
import { Award, TrendingUp, Calendar, Star } from "lucide-react";

const Dashboard = () => {
  const { habits, getTotalXp } = useHabits();
  const { user } = useUser();

  // Calculate stats
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const totalHabits = habits.length;
  const todayPercent = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);
  const totalXp = getTotalXp();

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hi {user.name}!</h1>
        <p className="text-growbit-text-secondary">
          {completedToday === 0 ? (
            "You haven't completed any habits today yet."
          ) : (
            `You've completed ${completedToday} of ${totalHabits} habits today. Keep going!`
          )}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col items-center"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-12 h-12 rounded-full bg-growbit-primary/10 flex items-center justify-center mb-3">
            <Calendar className="text-growbit-primary" />
          </div>
          <h3 className="text-xl font-bold">{completedToday}/{totalHabits}</h3>
          <p className="text-sm text-growbit-text-secondary">Today's Habits</p>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <motion.div 
              className="h-full bg-growbit-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${todayPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col items-center"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-12 h-12 rounded-full bg-growbit-accent/10 flex items-center justify-center mb-3">
            <Star className="text-growbit-accent" />
          </div>
          <h3 className="text-xl font-bold">Level {user.level}</h3>
          <p className="text-sm text-growbit-text-secondary">Current Level</p>
          
          {/* XP Progress bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
            <motion.div 
              className="h-full bg-growbit-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${100 - (user.xpToNextLevel / (user.level * 100) * 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-growbit-text-secondary mt-2">
            {user.xpToNextLevel} XP to next level
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col items-center"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-12 h-12 rounded-full bg-zen-mint/30 flex items-center justify-center mb-3">
            <TrendingUp className="text-growbit-success" />
          </div>
          <h3 className="text-xl font-bold">{longestStreak} days</h3>
          <p className="text-sm text-growbit-text-secondary">Longest Streak</p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col items-center"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="w-12 h-12 rounded-full bg-zen-blue/30 flex items-center justify-center mb-3">
            <Award className="text-blue-500" />
          </div>
          <h3 className="text-xl font-bold">{totalXp} XP</h3>
          <p className="text-sm text-growbit-text-secondary">Total Experience</p>
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
            <div className="col-span-2 bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <p className="text-growbit-text-secondary mb-4">You don't have any habits set up yet.</p>
              <a href="/habits" className="btn-primary inline-flex">Add your first habit</a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
