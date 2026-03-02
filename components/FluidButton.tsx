import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface FluidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  bgClass?: string;
}

export const FluidButton = ({ children, onClick, className = "", href, bgClass }: FluidButtonProps) => {
  const Component = href ? motion.a : motion.button;
  const ref = useRef<any>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the spotlight effect
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group rounded-full font-medium tracking-wide shadow-sm hover:shadow-xl transition-shadow duration-500 ${className || "px-8 py-4 text-white"}`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97, y: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Base Background - Restored to original/theme color */}
      <div className={`absolute inset-0 z-0 ${bgClass || "bg-anthracite"}`} />
      
      {/* Wave Effect - Liquid fill on hover */}
      <motion.div
        className="absolute left-1/2 top-full w-[300%] h-[300%] -translate-x-1/2 bg-petrol rounded-[40%] z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        whileHover={{ top: "-150%" }} // Moves up to fill the button
      />

      {/* Organic Spotlight - Subtle lighting */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${smoothX}px ${smoothY}px,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 80%
            )
          `
        }}
      />

      {/* Content - Kept white for contrast */}
      <span className="relative z-10 flex items-center justify-center gap-3 text-white">
        {children}
      </span>
    </Component>
  );
};
