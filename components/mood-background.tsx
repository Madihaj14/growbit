"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Flame, Music, PartyPopper, Smile, Cloud } from "lucide-react";
import type { Mood } from "@/lib/spotify";

interface MoodBackgroundProps {
  mood?: Mood;
}

export function MoodBackground({ mood }: MoodBackgroundProps) {
  const [bgClass, setBgClass] = useState("bg-gradient-to-br from-slate-300 to-slate-400");
  const [darkBgClass, setDarkBgClass] = useState("dark:from-slate-900 dark:to-slate-800");
  
  useEffect(() => {
    switch (mood) {
      case "romantic":
        setBgClass("bg-gradient-to-br from-rose-300 to-pink-300");
        setDarkBgClass("dark:from-rose-950/30 dark:to-pink-950/30");
        break;
      case "happy":
        setBgClass("bg-gradient-to-br from-yellow-300 to-amber-300");
        setDarkBgClass("dark:from-yellow-950/30 dark:to-amber-950/30");
        break;
      case "sad":
        setBgClass("bg-gradient-to-br from-blue-300 to-indigo-300");
        setDarkBgClass("dark:from-blue-950/30 dark:to-indigo-950/30");
        break;
      case "motivational":
        setBgClass("bg-gradient-to-br from-green-300 to-emerald-300");
        setDarkBgClass("dark:from-green-950/30 dark:to-emerald-950/30");
        break;
      case "party":
        setBgClass("bg-gradient-to-br from-purple-300 to-fuchsia-300");
        setDarkBgClass("dark:from-purple-950/30 dark:to-fuchsia-950/30");
        break;
      default:
        setBgClass("bg-gradient-to-br from-slate-300 to-slate-400");
        setDarkBgClass("dark:from-slate-900 dark:to-slate-800");
    }
  }, [mood]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood || "default"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed inset-0 -z-10 transition-all duration-500 overflow-hidden",
          bgClass,
          darkBgClass
        )}
      >
        {/* Floating Musical Notes (Always visible) */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`note-${i}`}
              className="absolute"
              initial={{ scale: 0 }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin((i / 15) * Math.PI * 2) * 50, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${(i % 5) * 20 + 10}%`,
                top: `${Math.floor(i / 5) * 30 + 10}%`,
              }}
            >
              <Music className="w-6 h-6 text-primary/20" />
            </motion.div>
          ))}
        </div>

        {/* Mood-specific animated elements */}
        {mood === "romantic" && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-500/40 dark:text-rose-500/30"
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${(i % 4) * 25}%`,
                  top: `${Math.floor(i / 4) * 30}%`,
                  fontSize: "2rem",
                }}
              >
                ♥
              </motion.div>
            ))}
          </div>
        )}

        {mood === "happy" && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -40, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${(i % 4) * 25}%`,
                  top: `${Math.floor(i / 4) * 30}%`,
                }}
              >
                <Smile className="w-8 h-8 text-yellow-500/40 dark:text-yellow-500/30" />
              </motion.div>
            ))}
          </div>
        )}

        {mood === "sad" && (
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-blue-500/40 dark:text-blue-500/30"
                animate={{
                  y: ["-100%", "100vh"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  left: `${(i % 10) * 10}%`,
                  fontSize: "1.5rem",
                }}
              >
                💧
              </motion.div>
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute"
                animate={{
                  x: ["-10%", "10%"],
                }}
                transition={{
                  duration: 8,
                  delay: i * 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                style={{
                  left: `${i * 20}%`,
                  top: `${(i % 3) * 15}%`,
                }}
              >
                <Cloud className="w-12 h-12 text-blue-400/30 dark:text-blue-400/20" />
              </motion.div>
            ))}
          </div>
        )}

        {mood === "motivational" && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  scale: [1, 1.3, 1],
                  y: [0, -30, 0],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${(i % 4) * 25}%`,
                  top: `${Math.floor(i / 4) * 30}%`,
                }}
              >
                <Flame className="w-8 h-8 text-emerald-500/40 dark:text-emerald-500/30" />
              </motion.div>
            ))}
          </div>
        )}

        {mood === "party" && (
          <div className="absolute inset-0">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -50, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${(i % 5) * 20}%`,
                  top: `${Math.floor(i / 5) * 30}%`,
                }}
              >
                <PartyPopper className="w-8 h-8 text-purple-500/40 dark:text-purple-500/30" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}