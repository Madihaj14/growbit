"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Track, msToMinutesAndSeconds } from "@/lib/spotify";

interface TrackCardProps {
  track: Track;
  delay?: number;
}

export function TrackCard({ track, delay = 0 }: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get the highest quality image available
  const albumImage = track.album.images.reduce((prev, current) => {
    return (prev.width || 0) > (current.width || 0) ? prev : current;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        delay: Math.min(delay * 0.05, 1), // Cap the maximum delay
      }
    },
    hover: { 
      y: -5,
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      <Card className="overflow-hidden border-border group h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {albumImage?.url && (
            <motion.img
              src={albumImage.url}
              alt={track.album.name}
              className="object-cover w-full h-full"
              loading="lazy"
              animate={{ 
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.2 }}
            />
          )}
          <motion.div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {track.preview_url && (
              <AudioPlayer 
                url={track.preview_url} 
                className="bg-black/50 p-2 rounded-lg"
              />
            )}
          </motion.div>
        </div>
        <CardContent className="flex flex-col flex-grow p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{track.name}</h3>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
            {track.artists.map(artist => artist.name).join(", ")}
          </p>
          <div className="text-xs text-muted-foreground mb-4">
            {msToMinutesAndSeconds(track.duration_ms)}
          </div>
          <div className="mt-auto">
            <Button 
              variant="outline"
              size="sm"
              className="w-full gap-2 group/btn"
              asChild
            >
              <a 
                href={track.external_urls.spotify} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span>Open in Spotify</span>
                <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}