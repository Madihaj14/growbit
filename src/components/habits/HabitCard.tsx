import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, Circle, MoreVertical, Trash, Edit, Calendar,
  Star, Clock, CalendarClock
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Habit, useHabits } from "@/contexts/HabitContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/components/ui/use-toast";
import canvasConfetti from "canvas-confetti";

interface HabitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const navigate = useNavigate();
  const { completeHabit, uncompleteHabit, deleteHabit, getStreakInfo } = useHabits();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { isCurrentlyActive, lastCompletedDate } = getStreakInfo(habit);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleComplete = () => {
    if (!habit.completedToday) {
      completeHabit(habit.id);
      
      // Sparkle animation for completion
      const target = document.getElementById(`habit-${habit.id}`);
      if (target) {
        const sparkle = document.createElement("div");
        sparkle.className = "absolute inset-0 animate-sparkle pointer-events-none";
        target.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
      }
      
      // Celebrate milestones with confetti
      if ((habit.streak + 1) % 7 === 0) {
        // For 7-day, 14-day, 21-day streaks etc.
        triggerConfetti();
        toast({
          title: "Milestone reached! 🎉",
          description: `You've completed "${habit.name}" for ${habit.streak + 1} days in a row!`,
          duration: 5000,
        });
      }
    } else {
      uncompleteHabit(habit.id);
    }
  };

  const triggerConfetti = () => {
    canvasConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
    setShowMenu(false);
  };

  // Get frequency text
  const getFrequencyText = () => {
    if (!habit.frequencyType) return "Daily";
    
    switch (habit.frequencyType) {
      case "daily":
        return "Every day";
      case "weekly":
        return `${habit.timesPerWeek}x per week`;
      case "custom":
        if (habit.customDays && habit.customDays.length > 0) {
          return habit.customDays
            .map(day => day.charAt(0).toUpperCase() + day.slice(1, 3))
            .join(", ");
        }
        return "Custom days";
      default:
        return "Daily";
    }
  };

  // Get difficulty
  const getDifficultyStars = () => {
    switch (habit.difficulty) {
      case "easy": return "⭐";
      case "medium": return "⭐⭐";
      case "hard": return "⭐⭐⭐";
      default: return "⭐⭐";
    }
  };

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
    hover: { 
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
    }
  };

  return (
    <motion.div
      id={`habit-${habit.id}`}
      className="habit-card relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.2 }}
    >
      {/* Icon and color indicator */}
      <div 
        className="absolute left-0 top-0 h-full w-2 rounded-l-xl"
        style={{ backgroundColor: habit.color || "#C8E6C9" }}
      />
      
      {/* Card content */}
      <div className="pl-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
              {habit.icon || "📝"}
            </div>
            <div>
              <h3 className="font-medium text-growbit-text-primary dark:text-white">{habit.name}</h3>
              {habit.description && (
                <p className="text-sm text-growbit-text-secondary dark:text-gray-400">{habit.description}</p>
              )}
            </div>
          </div>
          
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={18} className="text-growbit-text-secondary dark:text-gray-400" />
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <motion.div 
                className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 shadow-md rounded-md py-1 z-10 w-40 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white flex items-center gap-2">
                  <Edit size={16} />
                  Edit Habit
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white flex items-center gap-2">
                  <Calendar size={16} />
                  View History
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setShowMenu(false);
                  }}
                >
                  <Trash size={16} />
                  Delete
                </button>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Additional details */}
        <div className="flex flex-wrap gap-2 mb-3">
          {habit.category && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
              {habit.category}
            </span>
          )}
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 flex items-center gap-1">
            <CalendarClock size={12} />
            {getFrequencyText()}
          </span>
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            {getDifficultyStars()}
          </span>
        </div>
        
        {/* Streak info */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`streak-counter ${isCurrentlyActive ? 'text-growbit-accent' : 'text-growbit-text-disabled dark:text-gray-500'}`}>
            🔥 {habit.streak} day{habit.streak !== 1 ? 's' : ''}
          </span>
          
          {habit.bestStreak > 0 && habit.bestStreak > habit.streak && (
            <span className="text-xs text-growbit-text-secondary dark:text-gray-400">
              (Best: {habit.bestStreak})
            </span>
          )}
        </div>
        
        {/* Status and complete button */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-growbit-text-secondary dark:text-gray-400">
            {lastCompletedDate ? (
              <>Last done: {formatDistanceToNow(new Date(lastCompletedDate), { addSuffix: true })}</>
            ) : (
              <>Not completed yet</>
            )}
          </div>

          <motion.button
            className={`w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden ${
              habit.completedToday ? 'bg-growbit-primary/10 dark:bg-growbit-primary/20' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            } transition-colors duration-200`}
            onClick={handleComplete}
            whileTap={{ scale: 0.9 }}
          >
            {habit.completedToday ? (
              <CheckCircle size={24} className="text-growbit-primary" />
            ) : (
              <Circle size={24} className="text-growbit-text-secondary dark:text-gray-400" />
            )}
            
            {/* Ripple effect */}
            <span className="absolute inset-0 rounded-full pointer-events-none" />
          </motion.button>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <motion.div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-sm w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-medium mb-2 dark:text-white">Delete Habit</h3>
            <p className="text-growbit-text-secondary dark:text-gray-400 mb-4">
              Are you sure you want to delete "{habit.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Hidden canvas for confetti */}
      <canvas 
        ref={confettiCanvasRef} 
        className="fixed inset-0 pointer-events-none z-50" 
        style={{ display: 'none' }} 
      />
    </motion.div>
  );
};

export default HabitCard;
