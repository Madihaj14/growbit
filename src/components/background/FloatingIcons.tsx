
import { motion } from "framer-motion";
import { Star, Leaf, Sparkles, Bug, Flower2 } from "lucide-react";

const FloatingIcons = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Star 1 */}
      <motion.div 
        className="absolute top-[15%] left-[10%]"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star size={24} className="text-amber-400/80" fill="rgba(251, 191, 36, 0.3)" strokeWidth={1.5} />
      </motion.div>

      {/* Bug 1 (replacing Butterfly 1) */}
      <motion.div 
        className="absolute top-[25%] right-[15%]"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Bug size={40} className="text-amber-500/70" strokeWidth={1.5} />
      </motion.div>

      {/* Leaf 1 */}
      <motion.div 
        className="absolute top-[40%] left-[25%]"
        animate={{
          x: [0, 10, 0],
          y: [0, -5, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Leaf size={30} className="text-growbit-primary/70" strokeWidth={1.5} />
      </motion.div>

      {/* Sparkles */}
      <motion.div 
        className="absolute bottom-[30%] right-[25%]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={28} className="text-blue-400/80" strokeWidth={1.5} />
      </motion.div>

      {/* Flower2 (replacing Butterfly 2) */}
      <motion.div 
        className="absolute bottom-[20%] left-[20%]"
        animate={{
          x: [0, 15, 0],
          y: [0, -5, 0],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flower2 size={36} className="text-amber-300/80" strokeWidth={1.5} />
      </motion.div>

      {/* Star 2 */}
      <motion.div 
        className="absolute top-[60%] right-[10%]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star size={20} className="text-amber-300/70" fill="rgba(251, 191, 36, 0.3)" strokeWidth={1.5} />
      </motion.div>

      {/* Bug 2 (replacing Butterfly 3) */}
      <motion.div 
        className="absolute top-[45%] right-[30%]"
        animate={{
          y: [0, -10, 0],
          x: [0, 8, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Bug size={24} className="text-yellow-400/80" strokeWidth={1.5} transform="rotate(180)" />
      </motion.div>
    </div>
  );
};

export default FloatingIcons;
