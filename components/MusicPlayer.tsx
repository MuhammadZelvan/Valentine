import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Try to play immediately and on first user interaction
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Autoplay blocked by browser until interaction
            console.log("Autoplay blocked, waiting for interaction...");
          });
      }
    };

    // Try playing immediately
    playAudio();

    const handleInteraction = () => {
      if (!hasInteracted) {
        playAudio();
      }
    };

    // Listen for any interaction to trigger music
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/about-you.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating player button - minimal version */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={togglePlay}
          className="group relative w-12 h-12 rounded-full bg-primary/80 backdrop-blur-md border border-soft-rose/20 shadow-warm flex items-center justify-center transition-all hover:bg-primary hover:scale-110"
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary-foreground" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
          )}

          {/* Spinning ring when playing */}
          {isPlaying && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-warm-gold/50"
            />
          )}
        </button>

        {/* Song info tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-card/90 backdrop-blur-md rounded-lg px-3 py-2 text-sm whitespace-nowrap border border-border shadow-warm">
            <p className="font-display text-foreground text-xs">About You</p>
            <p className="font-body text-muted-foreground text-xs">The 1975</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
