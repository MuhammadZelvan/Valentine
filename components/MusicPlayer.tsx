import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Aggressive autoplay strategy
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.3;
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasInteracted(true);
              setShowPrompt(false);
              cleanup();
            })
            .catch(() => {
              // Still blocked, wait for next interaction
            });
        }
      }
    };

    const cleanup = () => {
      window.removeEventListener("mousedown", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("keydown", playAudio);
      window.removeEventListener("mousemove", playAudio);
    };

    // Try immediately (some browsers might allow it if site was visited before)
    playAudio();

    // Listen for any possible interaction
    window.addEventListener("mousedown", playAudio);
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("scroll", playAudio);
    window.addEventListener("keydown", playAudio);
    window.addEventListener("mousemove", playAudio);

    return cleanup;
  }, [isPlaying]);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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
      <audio ref={audioRef} loop preload="auto">
        <source src="/about-you.mp3" type="audio/mpeg" />
      </audio>

      {/* Sleeker Prompt - responsive sizing to avoid "fat" look on mobile */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-auto max-w-[90vw]"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-primary/80 text-primary-foreground backdrop-blur-sm border border-white/10 shadow-lg"
            >
              <Music className="w-3 h-3 md:w-4 md:h-4 text-warm-gold" />
              <span className="font-handwritten text-base md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                &quot;About You&quot; — The 1975
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sleeker Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={togglePlay}
          className="group relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/90 backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
          ) : (
            <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground ml-0.5" />
          )}

          {/* Clean spinning ring */}
          {isPlaying && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-transparent border-t-warm-gold/60"
            />
          )}
        </button>

        {/* Desktop Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          <div className="bg-black/80 backdrop-blur-md rounded-lg px-3 py-2 text-xs border border-white/10 shadow-2xl">
            <p className="font-medium text-white">About You</p>
            <p className="text-gray-400">The 1975</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
