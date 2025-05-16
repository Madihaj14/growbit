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
      
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            MoodJukebox
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover Bollywood music that matches exactly how you feel. Select your mood and let us curate the perfect playlist for you.
          </p>
        </motion.div>
        
        <section className="mb-12">
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