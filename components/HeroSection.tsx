import { motion } from "framer-motion";
import heroBg from "@/assets/12.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
      >
        <img
          src={heroBg.src}
          alt="Hero Background"
          className="w-full h-full object-cover filter brightness-[0.4]"
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-warm-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="font-handwritten text-warm-gold text-xl md:text-2xl mb-4"
        >
          Happy Valentine's Day
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          A Letter I Shouldn't Have Sent
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-32 h-px bg-warm-gold mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="font-body text-lg md:text-xl text-primary-foreground/80 italic leading-relaxed"
        >
          "Beberapa orang datang ke dalam hidupku sebagai anugerah. Beberapa datang sebagai pelajaran.
          Kamu adalah keduanya."
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-16"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 mx-auto text-warm-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
