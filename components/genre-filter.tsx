"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GENRES } from "@/lib/spotify";
import { cn } from "@/lib/utils";

interface GenreFilterProps {
  onGenreSelect: (genre: string) => void;
  selectedGenre: string;
}

export function GenreFilter({ onGenreSelect, selectedGenre }: GenreFilterProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {GENRES.map((genre) => (
          <motion.button
            key={genre}
            onClick={() => onGenreSelect(genre)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              selectedGenre === genre
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {genre}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}