"use client";

import { useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Heart, Frown, Smile, Flame, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mood } from "@/lib/spotify";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

interface MoodOption {
  id: Mood;
  label: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  selectedColor: string;
  bgGradient: string;
}

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const rippleAnimation = {
  scale: [0.8, 1.2, 1],
  opacity: [1, 0.8, 0],
  transition: {
    duration: 0.6,
    ease: "easeOut"
  }
};

export function MoodSelector({ onMoodSelect, selectedMood }: MoodSelectorProps) {
  const [hoveredMood, setHoveredMood] = useState<Mood | null>(null);
  const controls = useAnimation();

  const moods: MoodOption[] = [
    {
      id: "romantic",
      label: "Romantic",
      icon: <Heart className="h-6 w-6" />,
      color: "text-rose-500",
      hoverColor: "hover:text-rose-400",
      selectedColor: "bg-rose-500",
      bgGradient: "from-rose-400 to-pink-500",
    },
    {
      id: "sad",
      label: "Sad",
      icon: <Frown className="h-6 w-6" />,
      color: "text-blue-500",
      hoverColor: "hover:text-blue-400",
      selectedColor: "bg-blue-500",
      bgGradient: "from-blue-400 to-indigo-600",
    },
    {
      id: "happy",
      label: "Happy",
      icon: <Smile className="h-6 w-6" />,
      color: "text-yellow-500",
      hoverColor: "hover:text-yellow-400",
      selectedColor: "bg-yellow-500",
      bgGradient: "from-yellow-400 to-amber-500",
    },
    {
      id: "motivational",
      label: "Motivational",
      icon: <Flame className="h-6 w-6" />,
      color: "text-green-500",
      hoverColor: "hover:text-green-400",
      selectedColor: "bg-green-500",
      bgGradient: "from-green-400 to-emerald-600",
    },
    {
      id: "party",
      label: "Party",
      icon: <Music className="h-6 w-6" />,
      color: "text-purple-500",
      hoverColor: "hover:text-purple-400",
      selectedColor: "bg-purple-500",
      bgGradient: "from-purple-500 to-fuchsia-600",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How are you feeling today?
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            onClick={() => {
              onMoodSelect(mood.id);
              controls.start(rippleAnimation);
            }}
            onMouseEnter={() => setHoveredMood(mood.id)}
            onMouseLeave={() => setHoveredMood(null)}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300",
              "border border-border hover:border-transparent",
              "hover:shadow-lg hover:shadow-current/20",
              mood.hoverColor,
              selectedMood === mood.id
                ? `bg-gradient-to-br ${mood.bgGradient} text-white shadow-lg scale-105`
                : "bg-card hover:shadow-md"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={cn(
                "mb-3 relative",
                selectedMood === mood.id ? "text-white" : mood.color
              )}
              animate={pulseAnimation}
            >
              {mood.icon}
              <AnimatePresence>
                {selectedMood === mood.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-current"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={controls}
                    exit={{ scale: 0, opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <span
              className={cn(
                "font-medium",
                selectedMood === mood.id ? "text-white" : "text-foreground"
              )}
            >
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}