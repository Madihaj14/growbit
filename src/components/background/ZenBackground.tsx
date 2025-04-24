
"use client";
import { motion } from "framer-motion";

const ZenBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#f5f5dc] to-[#d3fce8] dark:from-slate-900 dark:to-slate-800">
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blob 1 - Top left */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/20 dark:bg-blue-400/10 rounded-full filter blur-3xl"
          animate={{
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 - Center right */}
        <motion.div
          className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-green-200/20 dark:bg-green-400/10 rounded-full filter blur-3xl"
          animate={{
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Blob 3 - Bottom */}
        <motion.div
          className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-amber-100/20 dark:bg-amber-400/10 rounded-full filter blur-3xl"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.05, 1],
            opacity: [0.25, 0.15, 0.25],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Ripple effect container */}
      <div id="ripple-container" className="absolute inset-0 pointer-events-none" />
    </div>
  );
};

export default ZenBackground;
