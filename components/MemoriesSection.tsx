import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";
import img9 from "@/assets/9.jpg";
import img10 from "@/assets/10.jpg";
import img11 from "@/assets/11.jpg";
import img12 from "@/assets/12.jpg";
import img13 from "@/assets/13.jpg";
import img14 from "@/assets/14.jpg";
import img15 from "@/assets/15.jpg";
import img16 from "@/assets/16.jpg";
import img17 from "@/assets/17.jpg";
import img18 from "@/assets/18.jpg";
import img19 from "@/assets/19.jpg";
import img20 from "@/assets/20.jpg";
import img21 from "@/assets/21.jpg";
import img22 from "@/assets/22.jpg";
import img23 from "@/assets/23.jpg";

const memories = [
  { src: img1, id: 1 },
  { src: img2, id: 2 },
  { src: img3, id: 3 },
  { src: img4, id: 4 },
  { src: img5, id: 5 },
  { src: img6, id: 6 },
  { src: img7, id: 7 },
  { src: img8, id: 8 },
  { src: img9, id: 9 },
  { src: img10, id: 10 },
  { src: img11, id: 11 },
  { src: img12, id: 12 },
  { src: img13, id: 13 },
  { src: img14, id: 14 },
  { src: img15, id: 15 },
  { src: img16, id: 16 },
  { src: img17, id: 17 },
  { src: img18, id: 18 },
  { src: img19, id: 19 },
  { src: img20, id: 20 },
  { src: img21, id: 21 },
  { src: img22, id: 22 },
  { src: img23, id: 23 },
];

const MemoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  // We only render 3 cards at a time directly to keep DOM light and visuals clean
  // The visibleStack indices are: currentIndex, currentIndex+1, currentIndex+2
  const visibleCount = 3;

  return (
    <section className="py-24 px-4 bg-section-fade min-h-screen flex flex-col items-center justify-center overflow-hidden">

      <div className="text-center mb-12">
        <p className="font-handwritten text-warm-gold text-lg mb-3">Setiap detik bersamamu</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Galeri Velove
        </h2>
        <div className="w-24 h-px bg-primary/30 mx-auto" />
      </div>

      <div
        className="relative w-full max-w-md aspect-square flex items-center justify-center cursor-pointer perspective-1000"
        onClick={handleNext}
      >
        <AnimatePresence mode="popLayout">
          {Array.from({ length: visibleCount }).map((_, i) => {
            // We render the cards from back to front (reverse order visually)
            // But logic-wise:
            // i=0 is front (active)
            // i=1 is behind
            // i=2 is behind that
            // To ensure proper z-index stacking context without fighting simpler Framer motion, 
            // we can just map and key them by their actual memory ID.

            // Actual index in the memories array
            const itemIndex = (currentIndex + i) % memories.length;
            const item = memories[itemIndex];

            // Re-calc z-index: i=0 (front) -> z=3, i=1 -> z=2, etc.
            const zIndex = visibleCount - i;

            // Adjust scale and position for a bigger, cleaner stack effect
            const scale = 1 - i * 0.05;
            const yOffset = -i * 20;
            const opacity = 1 - i * 0.2;

            return (
              <motion.div
                key={item.id}
                layoutId={`card-${item.id}`}
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{
                  scale,
                  y: yOffset,
                  opacity,
                  zIndex,
                  filter: i === 0 ? "blur(0px)" : "blur(2px)",
                  rotate: i % 2 === 0 ? i * 2 : i * -2 // Subtle rotation for natural stack look
                }}
                exit={{
                  x: 300, // Slide out to side instead of down for better flow
                  opacity: 0,
                  rotate: 20,
                  transition: { duration: 0.4 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border-[6px] border-white bg-background origin-center"
              >
                <img
                  src={item.src.src}
                  alt="Memory"
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Floating Hint/Instruction */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-muted-foreground/60 text-base font-handwritten flex flex-col items-center gap-2">
          <span>(Ketuk foto untuk ganti)</span>
        </div>
      </div>

    </section>
  );
};

export default MemoriesSection;
