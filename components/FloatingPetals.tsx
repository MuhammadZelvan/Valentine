import { useEffect, useState } from "react";

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 8 + Math.random() * 16,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-float-petal"
          style={{
            left: `${petal.left}%`,
            top: `-${petal.size}px`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full opacity-60">
            <path
              d="M12 2C12 2 8 6 8 10C8 14 12 16 12 16C12 16 16 14 16 10C16 6 12 2 12 2Z"
              fill="hsl(345, 60%, 30%)"
              opacity="0.7"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingPetals;
