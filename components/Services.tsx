import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Monitor, Rocket, Search, ArrowRight } from 'lucide-react';

const MonitorAnimation = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    {/* Screen Glow */}
    <motion.div
      className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Monitor Icon */}
    <Monitor className="w-24 h-24 text-white relative z-10" strokeWidth={1} />
    
    {/* Scanning Line Effect - Adjusted to fit inside screen */}
    <div className="absolute top-[20%] left-[15%] right-[15%] bottom-[35%] overflow-hidden z-20 rounded-sm opacity-50">
      <motion.div
        className="w-full h-1 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"
        animate={{ y: [0, 45, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </div>
);

const RocketAnimation = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    {/* Engine Glow */}
    <motion.div
      className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl"
      animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Rocket Movement Group - Includes Flame */}
    <motion.div
      className="relative z-10 flex flex-col items-center"
      animate={{ 
        y: [-5, 5, -5], 
        rotate: [-1, 1, -1] 
      }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 0.2, repeat: Infinity, ease: "linear" }
      }}
    >
      {/* Exhaust Flame - Positioned BEHIND rocket */}
      <motion.div
        className="absolute -bottom-6 w-6 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-[4px] z-0"
        animate={{ height: [20, 40, 20], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 transform -rotate-45">
        <Rocket className="w-24 h-24 text-white" strokeWidth={1} />
      </div>
    </motion.div>
  </div>
);

const SearchAnimation = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    <motion.div
      className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"
      animate={{ scale: [0.8, 1.1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], x: [0, 15, -15, 0], y: [0, -10, 10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Search className="w-24 h-24 text-white relative z-10" strokeWidth={1} />
    </motion.div>
  </div>
);

const ServiceIllustration = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center cursor-pointer"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Glass Container */}
      <motion.div
        className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center relative overflow-hidden z-10"
        variants={{
          rest: { scale: 1, borderColor: "rgba(255,255,255,0.1)" },
          hover: { scale: 1.05, borderColor: "rgba(212, 165, 116, 0.3)" }
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Internal Rotating Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Icon Animation Container */}
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = ({ Animation, title, description, features, index, color, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-auto lg:h-[80vh] flex items-center justify-center relative lg:sticky lg:top-10">
      <motion.div 
        style={{ 
          scale: typeof window !== 'undefined' && window.innerWidth >= 1024 ? scale : 1, 
          top: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `calc(-5vh + ${index * 25}px)` : 0 
        }} 
        className={`relative flex flex-col h-auto lg:min-h-[450px] w-full max-w-5xl rounded-[2.5rem] p-6 md:p-12 origin-top shadow-xl lg:shadow-2xl border border-white/10 overflow-hidden ${color} mb-8 lg:mb-0`}
      >
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none mix-blend-overlay"></div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center relative z-10">
          <div className="flex flex-col justify-between h-full py-4 order-2 lg:order-1">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">{title}</h3>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                {features.map((feature: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/20 text-xs md:text-sm text-white/80 bg-white/5 backdrop-blur-sm">
                    {feature}
                  </span>
                ))}
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                {description}
              </p>
            </div>
            
            <div className="pb-2">
              <a 
                href="#contact" 
                className="w-full md:w-fit px-6 py-3 md:px-8 md:py-4 bg-white text-anthracite rounded-full font-bold hover:bg-sand hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group text-sm md:text-base shadow-lg"
              >
                En savoir plus
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="h-64 lg:h-full flex items-center justify-center relative order-1 lg:order-2 mb-8 lg:mb-0">
             <ServiceIllustration>
               <Animation />
             </ServiceIllustration>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Services = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const services = [
    {
      Animation: MonitorAnimation,
      title: "Design & Expérience",
      description: "Une interface qui capte l'attention instantanément. Je conçois des designs uniques qui reflètent votre identité tout en guidant l'utilisateur vers l'achat.",
      features: ["UI/UX Design", "Maquettes", "Mobile First", "Identité Visuelle"],
      color: "bg-gradient-to-br from-[#1E293B] to-[#0F172A]" 
    },
    {
      Animation: RocketAnimation,
      title: "Développement Next.js",
      description: "La technologie utilisée par les leaders (Netflix, TikTok). Votre site sera ultra-rapide, sécurisé et parfaitement fluide. Fini les temps de chargement interminables.",
      features: ["Performance 95+", "Sécurité", "Animations", "Évolutif"],
      color: "bg-gradient-to-br from-[#0F172A] to-[#020617]"
    },
    {
      Animation: SearchAnimation,
      title: "SEO & Croissance",
      description: "Un beau site ne suffit pas, il doit être vu. J'optimise chaque ligne de code pour que Google vous adore et que vos visiteurs deviennent des clients.",
      features: ["Audit SEO", "Mots-clés", "Analytics", "Conversion"],
      color: "bg-gradient-to-br from-[#020617] to-black" 
    }
  ];

  return (
    <section ref={container} id="services" className="bg-anthracite relative">
      <div className="container mx-auto px-6 pt-24 pb-48">
        <div className="mb-16 max-w-3xl mx-auto text-center">
          <span className="px-4 py-2 rounded-full border border-white/20 text-sm text-white/60 uppercase tracking-widest mb-6 inline-block">Mes Services</span>
          <h2 className="text-5xl md:text-7xl font-bold font-serif text-white mb-8 leading-tight">
            Transformer vos idées <br />
            <span className="text-sand">en réalité digitale.</span>
          </h2>
        </div>

        <div className="mt-8">
          {services.map((service, index) => {
            const targetScale = 1 - ((services.length - index) * 0.05);
            return (
              <ServiceCard 
                key={index} 
                {...service} 
                index={index} 
                progress={scrollYProgress}
                range={[index * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
