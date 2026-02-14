import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Try to autoplay after first user interaction anywhere on page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.volume = 0.3;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        }).catch(() => {
          // Autoplay blocked, user will need to click play
        });
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
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
      setShowPrompt(false);
    }
  };

  return (
    <>
      {/* Audio element - using a placeholder src, user should replace with their own file */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/about-you.mp3" type="audio/mpeg" />
      </audio>

      {/* Initial prompt overlay */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.button
              onClick={togglePlay}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-md border border-soft-rose/20 shadow-warm"
            >
              <Music className="w-4 h-4" />
              <span className="font-handwritten text-lg">Putar &quot;About You&quot; — The 1975</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating player button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
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
