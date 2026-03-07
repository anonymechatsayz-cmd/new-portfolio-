import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Star, CheckCircle2, TrendingUp, Settings, Headphones, ShieldCheck, Award, ArrowUpRight, Rocket, Palette, MapPin, Euro, Zap, Users, Clock, BarChart3 } from 'lucide-react';
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
      <span className="absolute -inset-2 bg-gradient-to-r from-sand/20 via-sand/10 to-transparent blur-xl rounded-full" />
      <span className="relative h-[1.2em] overflow-hidden inline-flex flex-col justify-start align-top min-w-[2ch] text-[1.1em] align-middle">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)", scale: 0.9 }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(8px)", scale: 0.9 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-sand via-amber-500 to-sand whitespace-nowrap absolute top-0 left-0 right-0 text-center md:text-left font-bold"
          >
            {words[index]}.
          </motion.span>
        </AnimatePresence>
        <span className="opacity-0">{words.reduce((a, b) => a.length > b.length ? a : b)}.</span>
      </span>
    </span>
  );
};

// Animated counter component for social proof
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const incrementTime = (duration * 1000) / end;
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, incrementTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Magnetic CTA button effect
const MagneticButton = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const socialProofVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-40 md:pb-0 overflow-hidden bg-cream">
      {/* Layered Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveBackground />
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/95 to-cream/90 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sand/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-petrol/5 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto flex flex-col items-center text-center"
        >
          {/* Availability Badge - Enhanced */}
          <motion.a
            href="#contact"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 mb-8 px-4 py-2 md:px-5 md:py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg shadow-black/5 border border-white/50 cursor-pointer transition-all hover:shadow-xl hover:shadow-sand/10 hover:border-sand/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
            </span>
            <span className="text-[11px] md:text-xs font-bold text-anthracite uppercase tracking-[0.15em]">Disponible pour nouveaux projets</span>
            <ArrowRight className="w-3.5 h-3.5 text-sand opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </motion.a>

          {/* Main Headline - Enhanced Typography */}
          <motion.h1
            variants={itemVariants}
            className="text-[2.5rem] md:text-6xl lg:text-7xl xl:text-8xl font-bold font-serif text-anthracite leading-[1.05] mb-6 tracking-[-0.02em] text-balance"
          >
            <span className="block">Transformez vos visiteurs</span>
            <span className="block mt-1 md:mt-2">en <ScrollingWord /></span>
          </motion.h1>

          {/* Subheadline - Enhanced */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mb-8 leading-relaxed"
          >
            Spécialiste Web pour PME locales.{' '}
            <span className="text-anthracite font-semibold">Site livré en 7&nbsp;jours.</span>{' '}
            <span className="text-sand font-semibold">Résultats&nbsp;garantis.</span>
          </motion.p>

          {/* Social Proof Stats - NEW */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
          >
            {[
              { value: 47, suffix: "+", label: "Clients Satisfaits", icon: Users },
              { value: 7, suffix: "j", label: "Délai Moyen", icon: Clock },
              { value: 312, suffix: "%", label: "ROI Moyen", icon: BarChart3 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={socialProofVariants}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm"
              >
                <div className="p-2 bg-sand/10 rounded-xl">
                  <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-sand" />
                </div>
                <div className="text-left">
                  <div className="text-xl md:text-2xl font-bold text-anthracite tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs - Enhanced with Magnetic Effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mb-8"
          >
            <FluidButton href="#contact" className="w-full sm:w-auto px-10 py-5 text-white text-lg font-bold shadow-xl shadow-anthracite/20 hover:shadow-2xl hover:shadow-sand/30 transition-shadow">
              <span className="flex items-center gap-2">
                Réserver un appel gratuit 
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </FluidButton>
            
            <MagneticButton
              href="#services"
              className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-anthracite rounded-full font-bold text-lg flex items-center gap-2 w-full sm:w-auto justify-center hover:border-sand hover:bg-white transition-all shadow-lg shadow-black/5"
            >
              Découvrir mes services
              <ArrowRight className="w-5 h-5 text-sand opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </MagneticButton>
          </motion.div>

          {/* Trust Signals Row - NEW */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-gray-500 mb-12"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Sans engagement</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Appel de 15min</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-medium text-anthracite">5.0</span>
              <span>(32 avis)</span>
            </div>
          </motion.div>

          {/* Scrolling Features Banner - Enhanced */}
          <motion.div
            variants={itemVariants}
            className="w-full overflow-hidden relative hidden md:block"
          >
            {/* Enhanced gradient masks with glassmorphism */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-r from-cream via-cream/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-l from-cream via-cream/80 to-transparent z-10 pointer-events-none" />

            <motion.div 
              className="flex items-center w-max py-4"
              animate={{ x: "-50%" }}
              transition={{ duration: 45, ease: "linear", repeat: Infinity }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-8 md:gap-16 pr-8 md:pr-16 shrink-0">
                  {[
                    { icon: CheckCircle2, text: "Livraison 7 jours" },
                    { icon: Rocket, text: "Performance A+" },
                    { icon: TrendingUp, text: "Conversion +300%" },
                    { icon: Palette, text: "Design Sur-Mesure" },
                    { icon: Headphones, text: "Support Illimité" },
                    { icon: MapPin, text: "SEO Local" },
                    { icon: Euro, text: "ROI Garanti" }
                  ].map((item, i) => (
                    <div 
                      key={`${setIndex}-${i}`}
                      className="flex items-center gap-3 group px-5 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-md hover:bg-white/80 transition-all"
                    >
                      <div className="bg-gradient-to-br from-sand/20 to-sand/5 p-2.5 rounded-xl group-hover:from-sand/30 group-hover:to-sand/10 transition-colors">
                        <item.icon className="w-5 h-5 text-sand" />
                      </div>
                      <span className="font-bold text-anthracite text-base whitespace-nowrap">{item.text}</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile Features - Simplified for smaller screens */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 md:hidden mt-4"
          >
            {[
              { icon: CheckCircle2, text: "7 jours" },
              { icon: TrendingUp, text: "+300%" },
              { icon: Headphones, text: "Support" },
            ].map((item, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm"
              >
                <item.icon className="w-4 h-4 text-sand" />
                <span className="font-semibold text-anthracite text-sm">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - NEW */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-2.5 bg-sand rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
