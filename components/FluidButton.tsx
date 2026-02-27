import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group rounded-full font-bold shadow-lg hover:shadow-sand/20 transition-all duration-300 border border-white/10 ${className || "px-8 py-4 text-white"}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Base Background */}
      <div className={`absolute inset-0 z-0 ${bgClass || "bg-gradient-to-br from-gray-800 to-[#1a1d29]"}`} />
      
      {/* Interactive Fluid Gradient - Depth Effect */}
      <motion.div 
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.8 : 0.3, 
          background: useMotionTemplate`
            radial-gradient(
              100% 100% at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15) 0%, 
              rgba(212, 165, 116, 0.1) 25%,
              rgba(255, 255, 255, 0) 100%
            )
          `
        }}
      />

      {/* Silver Shimmer Wave Effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{
          x: {
            duration: isHovered ? 2.5 : 0,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
      />

      {/* Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 tracking-wide">
        {children}
      </span>
    </Component>
  );
};
