import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, FileText, Code, Rocket, ArrowRight, Sparkles } from 'lucide-react';
import { FluidButton } from './FluidButton';

const TimelineNode = ({ icon: Icon, title, description, num, isEven }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center 85%", "center 60%"]
  });
  
  // Node scale and glow
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  const borderColor = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["rgba(255,255,255,0.2)", "rgba(212, 165, 116, 1)"] // white/20 to sand
  );
  
  const iconColor = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["rgba(255,255,255,0.5)", "rgba(26, 29, 41, 1)"] // white/50 to anthracite
  );

  const bgColor = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["rgba(26, 29, 41, 1)", "rgba(212, 165, 116, 1)"] // anthracite to sand
  );

  // Card slide in
  const xOffset = isEven ? 50 : -50;
  const cardX = useTransform(scrollYProgress, [0, 1], [xOffset, 0]);
  const springCardX = useSpring(cardX, { stiffness: 200, damping: 25 });
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative flex items-center justify-between md:justify-center w-full mb-24 md:mb-32 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Center Node (Trunk) */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          style={{ scale: springScale, borderColor, backgroundColor: bgColor }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-shadow duration-500"
        >
          <motion.div style={{ color: iconColor }}>
            <Icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={2} />
          </motion.div>
        </motion.div>

        {/* Glowing aura when active */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-sand rounded-full blur-xl -z-10"
        />
      </div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Content Card (Branch) */}
      <motion.div 
        style={{ x: springCardX, opacity: cardOpacity }}
        className={`w-full pl-24 md:pl-0 md:w-5/12 flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
      >
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 hover:border-sand/50 transition-all duration-500 group w-full max-w-lg">
          
          {/* Connecting Branch Line (Desktop only) */}
          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-gradient-to-r ${isEven ? 'from-sand/50 to-transparent -left-12' : 'from-transparent to-sand/50 -right-12'}`} />

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sand font-mono text-sm font-bold tracking-widest">ÉTAPE {num}</span>
            <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-sand/30 transition-colors" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 group-hover:text-sand transition-colors">{title}</h3>
          <p className="text-white/70 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"]
  });

  // The central glowing line (trunk)
  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);
  
  // CTA Micro-animation
  const ctaGlowOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const ctaGlowScale = useTransform(scrollYProgress, [0.85, 0.95, 1], [0.8, 1.15, 1.05]);

  const steps = [
    {
      icon: Search,
      num: "01",
      title: "Audit & Vision",
      description: "On discute de vos besoins et objectifs lors d'un appel de 15 min. Je vérifie si je suis la bonne personne pour vous aider."
    },
    {
      icon: FileText,
      num: "02",
      title: "Stratégie & Devis",
      description: "Je vous envoie un devis détaillé et une maquette conceptuelle. Tout est clair : prix, délais, livrables."
    },
    {
      icon: Code,
      num: "03",
      title: "Construction",
      description: "Je développe votre site sur Webflow pour un rendu pixel-perfect et des animations fluides. Vous suivez l'avancement en temps réel."
    },
    {
      icon: Rocket,
      num: "04",
      title: "Lancement",
      description: "Mise en ligne, configuration SEO, et une session de formation pour que vous soyez autonome."
    }
  ];

  return (
    <section id="process" className="bg-anthracite py-24 md:py-40 relative overflow-hidden">
      {/* Elegant Gradient Separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sand/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-sand/50 to-transparent blur-[2px]" />

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 bg-sand/10 rounded-full mb-6"
          >
            <Sparkles className="w-6 h-6 text-sand" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            De l'idée au <span className="text-sand italic">résultat.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg md:text-xl"
          >
            Un processus organique et transparent, conçu pour transformer votre vision en une expérience digitale mémorable.
          </motion.p>
        </div>

        {/* The Tree / Timeline */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto flex flex-col items-center">
          
          {/* The Trunk (Central Line) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-[100px] md:bottom-[120px] w-[2px] -translate-x-1/2 bg-white/10">
            {/* Glowing Progress Line */}
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-sand to-sand origin-top"
              style={{ 
                height: lineHeight,
                boxShadow: "0 0 20px 2px rgba(212, 165, 116, 0.4)"
              }}
            />
            {/* The Spark at the tip */}
            <motion.div 
              className="absolute left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 shadow-[0_0_20px_rgba(255,255,255,0.8)] z-30"
              style={{ top: lineHeight }}
            >
              <div className="absolute inset-0 bg-sand rounded-full blur-sm animate-pulse" />
            </motion.div>
          </div>

          {/* The Branches (Steps) */}
          <div className="relative z-10 py-12 w-full">
            {steps.map((step, index) => (
              <TimelineNode 
                key={index} 
                {...step} 
                isEven={index % 2 === 1} // 0-indexed, so 1 is the 2nd item (right side)
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-20 relative z-20 w-full px-6 md:px-0 flex justify-center"
          >
            <div className="relative inline-block w-full md:w-auto group">
              {/* Micro-animation: Fluid Aura / Bloom */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-sand/40 blur-xl pointer-events-none transition-colors duration-500 group-hover:bg-white/40"
                style={{
                  opacity: ctaGlowOpacity,
                  scale: ctaGlowScale
                }}
              />
              {/* Subtle rim light connecting the line to the button */}
              <motion.div 
                className="absolute -inset-[2px] rounded-full bg-gradient-to-b from-sand via-sand/20 to-transparent pointer-events-none"
                style={{
                  opacity: ctaGlowOpacity,
                }}
              />
              <FluidButton href="#contact" className="w-full md:w-auto px-10 py-5 text-anthracite font-bold text-lg relative z-10" bgClass="bg-sand group-hover:bg-white transition-colors duration-500">
                Démarrer l'aventure <ArrowRight className="w-6 h-6 ml-2 inline-block" />
              </FluidButton>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
