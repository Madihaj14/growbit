"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  url?: string;
  className?: string;
}

export function AudioPlayer({ url, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!url) return;
    
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      });
      
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      });
    } else {
      // Update source if URL changes
      audioRef.current.src = url;
      setIsPlaying(false);
      setProgress(0);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [url]);
  
  const togglePlayPause = () => {
    if (!audioRef.current || !url) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };
  
  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newPosition = value[0];
    setProgress(newPosition);
    audioRef.current.currentTime = (newPosition / 100) * audioRef.current.duration;
  };
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={togglePlayPause}
        disabled={!url}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </Button>
      
      <Slider
        value={[progress]}
        max={100}
        step={0.1}
        onValueChange={handleProgressChange}
        className="w-[100px] md:w-[180px] h-1.5"
        disabled={!url}
      />
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={toggleMute}
        disabled={!url}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </Button>
    </div>
  );
}