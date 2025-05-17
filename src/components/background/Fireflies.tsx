
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

// Updated with warm colors only
const COLORS = [
  "bg-amber-300/90", // Classic yellow/gold
  "bg-amber-200/85", // Lighter gold
  "bg-yellow-400/80", // Bright yellow
  "bg-yellow-300/75", // Medium yellow
  "bg-amber-500/70", // Deep amber/mustard
  "bg-yellow-500/70", // Rich yellow/mustard
];

const Fireflies = () => {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate 40 fireflies with varied properties
    const newFireflies = Array.from({ length: 40 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2, // Size between 2px and 7px
      duration: Math.random() * 5 + 3, // Duration between 3s and 8s
      delay: Math.random() * 4, // Delay between 0s and 4s
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    
    setFireflies(newFireflies);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {fireflies.map((firefly) => (
        <motion.div
          key={`firefly-${firefly.id}`}
          className={cn(
            "absolute rounded-full shadow-lg",
            firefly.color
          )}
          style={{
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            filter: `blur(${Math.max(1, firefly.size / 3)}px)`,
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [1, 1.5, 1],
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, 0],
            boxShadow: [
              "0 0 2px 0px rgba(245, 158, 11, 0.5)",
              "0 0 8px 2px rgba(245, 158, 11, 0.6)",
              "0 0 2px 0px rgba(245, 158, 11, 0.5)",
            ],
          }}
          transition={{
            duration: firefly.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: firefly.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Fireflies;
