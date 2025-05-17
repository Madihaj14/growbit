
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const FloatingLeaves = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 10 }).map((_, idx) => (
        <motion.div
          key={`leaf-${idx}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 60, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, Math.random() * 90 - 45, 0],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 25 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          <Leaf 
            size={Math.floor(20 + Math.random() * 28)} 
            className="text-green-500/40 transform rotate-45"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
