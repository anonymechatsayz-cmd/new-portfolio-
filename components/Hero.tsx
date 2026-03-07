import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, Headphones, ArrowUpRight, Rocket, Palette, MapPin, Euro } from 'lucide-react';
import { InteractiveBackground } from './InteractiveBackground';
import { FluidButton } from './FluidButton';

const ScrollingWord = () => {
  const words = ["Clients Fidèles", "Leads Qualifiés", "Chiffre d'Affaires", "Ambassadeurs"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <span className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-sand/15 via-sand/10 to-transparent blur-2xl rounded-full" />
      <span className="relative h-[1.2em] overflow-hidden inline-flex flex-col justify-start align-top min-w-[2ch] text-[1.1em] align-middle">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)", scale: 0.95 }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(8px)", scale: 0.95 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-sand via-amber-500 to-sand whitespace-nowrap absolute top-0 left-0 right-0 text-center md:text-left"
          >
            {words[index]}.
          </motion.span>
        </AnimatePresence>
        <span className="opacity-0">{words.reduce((a, b) => a.length > b.length ? a : b)}.</span>
      </span>
    </span>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-10 md:pt-48 md:pb-0 overflow-hidden bg-cream">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <InteractiveBackground />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.a
            href="#contact"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2.5 mb-10 px-4 py-2 cursor-pointer"
          >
            {/* Glassmorphism background */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-full border border-white/80 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] group-hover:bg-white/80 group-hover:shadow-[0_4px_24px_-4px_rgba(194,156,96,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:border-sand/20 transition-all duration-500" />
            
            {/* Content */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.4)]"></span>
            </span>
            <span className="relative text-[11px] md:text-xs font-semibold text-anthracite/70 uppercase tracking-[0.1em] group-hover:text-anthracite/90 transition-colors duration-300">Disponible pour nouveaux projets</span>
            <ArrowRight className="relative w-3.5 h-3.5 text-sand/60 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-sand transition-all duration-300" />
          </motion.a>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-anthracite/90 leading-[1.1] mb-8 tracking-tight text-balance"
          >
            Transformez vos visiteurs <br className="hidden md:block" />
            en <ScrollingWord />
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed"
          >
            Spécialiste Web pour PME. <br />
            <span className="text-anthracite font-semibold">Site livré en 7 jours. Résultats&nbsp;garantis.</span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          >
            <FluidButton href="#contact" className="w-full sm:w-auto px-8 py-4 text-white text-lg">
              Réserver un appel <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </FluidButton>
            
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border border-gray-200 text-anthracite rounded-full font-medium text-lg flex items-center gap-2 w-full sm:w-auto justify-center hover:border-sand hover:text-sand transition-colors shadow-sm"
            >
              Découvrir mes services
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 w-full overflow-hidden relative hidden md:block"
          >
            {/* Gradient Masks for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-cream to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-cream to-transparent z-10"></div>

            <motion.div 
              className="flex items-center w-max"
              animate={{ x: "-50%" }}
              transition={{ duration: 50, ease: "linear", repeat: Infinity }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-10 md:gap-20 pr-10 md:pr-20 shrink-0">
                  {[
                    { icon: CheckCircle2, text: "Livraison 7j" },
                    { icon: Rocket, text: "Site Ultra-Rapide" },
                    { icon: TrendingUp, text: "Conversion Maximisée" },
                    { icon: Palette, text: "Design Unique" },
                    { icon: Headphones, text: "Support Réactif" },
                    { icon: MapPin, text: "Référencement Local" },
                    { icon: Euro, text: "ROI Positif" }
                  ].map((item, i) => (
                    <div 
                      key={`${setIndex}-${i}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-sand/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative bg-gradient-to-br from-sand/15 to-sand/5 p-3 rounded-full border border-sand/10 group-hover:border-sand/25 group-hover:from-sand/25 group-hover:to-sand/10 transition-all duration-300">
                          <item.icon className="w-5 h-5 text-sand" strokeWidth={2} />
                        </div>
                      </div>
                      <span className="font-semibold text-anthracite/80 text-base md:text-lg whitespace-nowrap group-hover:text-anthracite transition-colors duration-300">{item.text}</span>
                    </div>
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
