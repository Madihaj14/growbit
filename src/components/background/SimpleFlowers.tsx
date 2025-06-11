
import { motion } from "framer-motion";
import { Flower } from "lucide-react";

const SimpleFlowers = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Flower 1 - Bottom right */}
      <motion.div
        className="absolute bottom-[10%] right-[15%]"
        animate={{
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.02, 1, 1.02, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flower size={32} className="text-pink-300/40" strokeWidth={1} />
      </motion.div>

      {/* Flower 2 - Top left */}
      <motion.div
        className="absolute top-[15%] left-[10%]"
        animate={{
          rotate: [0, -5, 0, 5, 0],
          scale: [1, 1.05, 1],
          opacity: [0.35, 0.45, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Flower size={24} className="text-purple-300/40" strokeWidth={1} />
      </motion.div>
    </div>
  );
};

export default SimpleFlowers;
