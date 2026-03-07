import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, Headphones, ArrowUpRight, Rocket, Palette, MapPin, Euro } from 'lucide-react';
import { InteractiveBackground } from './InteractiveBackground';
import { FluidButton } from './FluidButton';

// Apple-style glassmorphism
const glassStyles = {
  base: "bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(255,255,255,0.6)_inset]",
  hover: "hover:bg-white/65 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(255,255,255,0.8)_inset]",
};

const ScrollingWord = () => {
  const words = ["Clients Fidèles", "Leads Qualifiés", "Chiffre d'Affaires", "Ambassadeurs"];
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <span className="relative inline-block">
      <span className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-sand/15 via-sand/10 to-transparent blur-2xl rounded-full motion-reduce:hidden" aria-hidden="true" />
      <span className="relative h-[1.2em] overflow-hidden inline-flex flex-col justify-start align-top min-w-[2ch] text-[1.1em] align-middle">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={prefersReducedMotion ? false : { y: "100%", opacity: 0, filter: "blur(8px)", scale: 0.95 }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={prefersReducedMotion ? undefined : { y: "-100%", opacity: 0, filter: "blur(8px)", scale: 0.95 }}
            transition={{ 
              duration: prefersReducedMotion ? 0 : 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-sand via-amber-500 to-sand whitespace-nowrap absolute top-0 left-0 right-0 text-center md:text-left will-change-transform"
          >
            {words[index]}.
          </motion.span>
        </AnimatePresence>
        <span className="opacity-0" aria-hidden="true">{words.reduce((a, b) => a.length > b.length ? a : b)}.</span>
      </span>
    </span>
  );
};

// Feature items data
const featureItems = [
  { icon: CheckCircle2, text: "Livraison 7j" },
  { icon: Rocket, text: "Site Ultra-Rapide" },
  { icon: TrendingUp, text: "Conversion Maximisée" },
  { icon: Palette, text: "Design Unique" },
  { icon: Headphones, text: "Support Réactif" },
  { icon: MapPin, text: "Référencement Local" },
  { icon: Euro, text: "ROI Positif" }
];

// Feature item component with glassmorphism
const FeatureItem = ({ icon: Icon, text, className = "" }: { icon: React.ElementType; text: string; className?: string }) => (
  <div className={`flex items-center gap-2.5 group ${className}`}>
    <div className="relative will-change-transform">
      <div className="absolute inset-0 bg-sand/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none" aria-hidden="true" />
      <div className={`relative p-2.5 md:p-3 rounded-full ${glassStyles.base} ${glassStyles.hover} transition-all duration-300 motion-reduce:transition-none`}>
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-sand" strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
    <span className="font-semibold text-anthracite/75 text-sm md:text-base whitespace-nowrap group-hover:text-anthracite transition-colors duration-300 motion-reduce:transition-none">{text}</span>
  </div>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, prefersReducedMotion ? 1 : 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, filter: prefersReducedMotion ? "none" : "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: prefersReducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-32 pb-10 md:pt-48 md:pb-0 overflow-hidden bg-cream"
      aria-label="Section principale"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <InteractiveBackground />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10 text-center will-change-transform"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Availability Badge with Glassmorphism */}
          <motion.a
            href="#contact"
            variants={itemVariants}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            className={`group relative inline-flex items-center gap-2.5 mb-10 px-5 py-2.5 rounded-full cursor-pointer ${glassStyles.base} ${glassStyles.hover} transition-all duration-500 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-cream`}
            aria-label="Prendre contact - disponible pour nouveaux projets"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.4)]"></span>
            </span>
            <span className="text-[11px] md:text-xs font-semibold text-anthracite/70 uppercase tracking-[0.1em] group-hover:text-anthracite/90 transition-colors duration-300 motion-reduce:transition-none">Disponible pour nouveaux projets</span>
            <ArrowRight className="w-3.5 h-3.5 text-sand/60 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-sand transition-all duration-300 motion-reduce:opacity-100 motion-reduce:translate-x-0" aria-hidden="true" />
          </motion.a>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-anthracite/90 leading-[1.1] mb-8 tracking-tight text-balance"
          >
            Transformez vos visiteurs <br className="hidden md:block" />
            en <ScrollingWord />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-anthracite/60 max-w-2xl mb-10 leading-relaxed"
          >
            Specialiste Web pour PME. <br />
            <span className="text-anthracite/90 font-semibold">Site livre en 7 jours. Resultats&nbsp;garantis.</span>
          </motion.p>

          {/* CTAs with Glassmorphism on secondary */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
            role="group"
            aria-label="Actions principales"
          >
            <FluidButton 
              href="#contact" 
              className="w-full sm:w-auto px-8 py-4 text-white text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Reserver un appel <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform motion-reduce:transition-none" aria-hidden="true" />
            </FluidButton>
            
            <motion.a
              href="#services"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="group relative px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 w-full sm:w-auto justify-center text-anthracite/80 bg-white/40 backdrop-blur-2xl border border-white/50 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(255,255,255,0.5)_inset] hover:bg-white/55 hover:text-anthracite hover:shadow-[0_4px_32px_-4px_rgba(0,0,0,0.1),0_0_0_0.5px_rgba(255,255,255,0.7)_inset] hover:border-white/70 transition-all duration-500 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              Decouvrir mes services
            </motion.a>
          </motion.div>

          {/* Mobile Feature Banner */}
          <motion.div
            variants={itemVariants}
            className="mt-12 w-full md:hidden"
            role="list"
            aria-label="Avantages cles"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {featureItems.slice(0, 4).map((item, i) => (
                <div key={i} role="listitem">
                  <FeatureItem {...item} className="px-1" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Desktop Scrolling Feature Banner */}
          <motion.div
            variants={itemVariants}
            className="mt-16 w-full overflow-hidden relative hidden md:block"
            role="marquee"
            aria-label="Avantages et services"
          >
            {/* Gradient Masks for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

            <motion.div 
              className="flex items-center w-max will-change-transform"
              animate={prefersReducedMotion ? undefined : { x: "-50%" }}
              transition={{ duration: 50, ease: "linear", repeat: Infinity }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-8 md:gap-16 pr-8 md:pr-16 shrink-0">
                  {featureItems.map((item, i) => (
                    <FeatureItem key={`${setIndex}-${i}`} {...item} />
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};
