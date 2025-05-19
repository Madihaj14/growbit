"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoodSelector } from "@/components/mood-selector";
import { TrackList } from "@/components/track-list";
import { MoodBackground } from "@/components/mood-background";
import { getTracks, type Mood, type Track } from "@/lib/spotify";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>(undefined);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMood) {
      fetchTracks(selectedMood);
    }
  }, [selectedMood]);

  const fetchTracks = async (mood: Mood) => {
    setIsLoading(true);
    try {
      const tracksData = await getTracks(mood);
      setTracks(tracksData);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTracks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  return (
    <>
      <MoodBackground mood={selectedMood} />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 min-h-[calc(100vh-8rem)]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            MoodJukebox
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover Bollywood music that matches exactly how you feel. Select your mood and let us curate the perfect playlist for you.
          </p>
        </motion.div>
        
        <section className="mb-16 max-w-4xl mx-auto">
          <MoodSelector 
            onMoodSelect={handleMoodSelect} 
            selectedMood={selectedMood}
          />
        </section>
        
        {selectedMood && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <TrackList 
              tracks={tracks}
              isLoading={isLoading}
            />
          </motion.section>
        )}
      </div>
    </>
  );
}