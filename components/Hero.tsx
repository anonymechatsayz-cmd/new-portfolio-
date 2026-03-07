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
    <div className="h-[1.2em] overflow-hidden inline-flex flex-col justify-start align-top relative min-w-[2ch] text-[1.1em] align-middle px-1">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="block text-sand whitespace-nowrap absolute top-0 left-0 right-0 text-center md:text-left"
        >
          {words[index]}.
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0 px-1">{words.reduce((a, b) => a.length > b.length ? a : b)}.</span>
    </div>
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
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 md:px-4 md:py-2 bg-stone-200/80 backdrop-blur-sm rounded-full shadow-inner cursor-pointer transition-colors"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold text-anthracite uppercase tracking-widest">Disponible pour nouveaux projets</span>
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
                <div key={setIndex} className="flex gap-12 md:gap-24 pr-12 md:pr-24 shrink-0">
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
                      className="flex items-center gap-4 group"
                    >
                      <div className="bg-sand/10 p-3 rounded-full group-hover:bg-sand/20 transition-colors">
                        <item.icon className="w-6 h-6 text-sand" />
                      </div>
                      <span className="font-bold text-anthracite text-lg md:text-xl whitespace-nowrap">{item.text}</span>
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
