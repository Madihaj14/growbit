"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { TrackCard } from "@/components/track-card";
import { type Track } from "@/lib/spotify";

interface TrackListProps {
  tracks: Track[];
  isLoading: boolean;
}

export function TrackList({ tracks, isLoading }: TrackListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <h3 className="text-xl font-medium text-muted-foreground">
          No tracks found for this mood and genre combination.
        </h3>
        <p className="text-muted-foreground mt-2">
          Try a different mood or genre.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      layout
    >
      {tracks.map((track, index) => (
        <TrackCard 
          key={track.id}
          track={track}
          delay={index}
        />
      ))}
    </motion.div>
  );
}