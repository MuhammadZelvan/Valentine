import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import petalsBg from "@/assets/18.jpg";

const FarewellSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative py-32 px-6 overflow-hidden" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${petalsBg})` }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="mb-8">
            <svg className="w-12 h-12 mx-auto text-primary/40 animate-pulse-glow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Sampai Bertemu Lagi Velove
          </h2>

          <p className="font-body text-xl md:text-2xl text-foreground/70 italic leading-relaxed mb-8">
            “Aku mencintaimu dengan cara yang berbeda sekarang — bukan dengan menggenggam, tapi dengan mengikhlaskan.”
          </p>

          <p className="font-handwritten text-warm-gold text-lg">
            — Muhammad Zelvan
          </p>

          <div className="mt-16">
            <div className="w-px h-20 bg-primary/20 mx-auto mb-6" />
            <p className="font-handwritten text-2xl md:text-3xl text-primary">
              I Love You, always ❤️
            </p>
            <p className="font-body text-muted-foreground text-sm mt-4">
              Happy Valentine's Day
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FarewellSection;
