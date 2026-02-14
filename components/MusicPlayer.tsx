import { useRef, useEffect } from "react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play()
          .then(() => {
            console.log("Music started successfully");
            cleanup();
          })
          .catch(() => {
            // Autoplay blocked, waiting for interaction
          });
      }
    };

    const cleanup = () => {
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("mousedown", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    // Try to play immediately
    playAudio();

    // Browser policy requires a user gesture to play audio. 
    // We attach listeners to the window to play the music on the very first interaction.
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("mousedown", playAudio);
    window.addEventListener("scroll", playAudio);
    window.addEventListener("keydown", playAudio);

    return cleanup;
  }, []);

  return (
    <audio ref={audioRef} loop preload="auto">
      <source src="/about-you.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default MusicPlayer;
