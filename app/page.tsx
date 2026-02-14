"use client";

import FloatingPetals from "@/components/FloatingPetals";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import MemoriesSection from "@/components/MemoriesSection";
import LetterSection from "@/components/LetterSection";
import FarewellSection from "@/components/FarewellSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <FloatingPetals />
      <MusicPlayer />
      <HeroSection />
      <MemoriesSection />
      <LetterSection />
      <FarewellSection />
    </div>
  );
}
