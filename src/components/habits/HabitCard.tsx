
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, MoreVertical, Trash, Edit, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Habit, useHabits } from "@/contexts/HabitContext";
import { useUser } from "@/contexts/UserContext";

interface HabitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const { completeHabit, uncompleteHabit, deleteHabit, getStreakInfo } = useHabits();
  const { addXp } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { isCurrentlyActive, lastCompletedDate } = getStreakInfo(habit);

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
    } else {
      uncompleteHabit(habit.id);
    }
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
    setShowMenu(false);
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
      className="habit-card relative"
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
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
              {habit.icon || "📝"}
            </div>
            <div>
              <h3 className="font-medium text-growbit-text-primary">{habit.name}</h3>
              {habit.description && (
                <p className="text-sm text-growbit-text-secondary">{habit.description}</p>
              )}
            </div>
          </div>
          
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={18} className="text-growbit-text-secondary" />
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <motion.div 
                className="absolute right-0 top-full mt-1 bg-white shadow-md rounded-md py-1 z-10 w-40 border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                  <Edit size={16} />
                  Edit Habit
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                  <Calendar size={16} />
                  View History
                </button>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
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
        
        {/* Streak info */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`streak-counter ${isCurrentlyActive ? 'text-growbit-accent' : 'text-growbit-text-disabled'}`}>
            🔥 {habit.streak} day{habit.streak !== 1 ? 's' : ''}
          </span>
          
          {habit.bestStreak > 0 && habit.bestStreak > habit.streak && (
            <span className="text-xs text-growbit-text-secondary">
              (Best: {habit.bestStreak})
            </span>
          )}
        </div>
        
        {/* Status and complete button */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-growbit-text-secondary">
            {lastCompletedDate ? (
              <>Last done: {formatDistanceToNow(new Date(lastCompletedDate), { addSuffix: true })}</>
            ) : (
              <>Not completed yet</>
            )}
          </div>

          <motion.button
            className={`w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden ${
              habit.completedToday ? 'bg-growbit-primary/10' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors duration-200`}
            onClick={handleComplete}
            whileTap={{ scale: 0.9 }}
          >
            {habit.completedToday ? (
              <CheckCircle size={24} className="text-growbit-primary" />
            ) : (
              <Circle size={24} className="text-growbit-text-secondary" />
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
            className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-medium mb-2">Delete Habit</h3>
            <p className="text-growbit-text-secondary mb-4">
              Are you sure you want to delete "{habit.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
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
    </motion.div>
  );
};

export default HabitCard;
