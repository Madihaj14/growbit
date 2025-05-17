
import { motion } from "framer-motion";

const AnimatedBlobs = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Blob 1 - Top left */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 dark:bg-blue-400/20 rounded-full filter blur-3xl"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.4, 0.5],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 - Center right */}
      <motion.div
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-green-200/40 dark:bg-green-400/20 rounded-full filter blur-3xl"
        animate={{
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.5, 0.4],
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
        className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-blue-100/40 dark:bg-amber-400/20 rounded-full filter blur-3xl"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.05, 1],
          opacity: [0.45, 0.35, 0.45],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export default AnimatedBlobs;
