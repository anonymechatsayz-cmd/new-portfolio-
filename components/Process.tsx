import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, FileText, Code, Rocket, ArrowRight } from 'lucide-react';

const Step = ({ icon: Icon, number, title, description, isLast }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative pl-16 md:pl-24 pb-16 last:pb-0 group"
    >
      {/* Timeline Node */}
      <div className="absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-gray-100 z-10 flex items-center justify-center shadow-sm group-hover:border-sand group-hover:scale-110 transition-all duration-300">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-sand transition-colors" />
      </div>

      {/* Card Content */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-sand/30 transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
        {/* Large Watermark Number */}
        <span className="absolute -right-4 -bottom-8 text-8xl md:text-9xl font-bold text-gray-50 pointer-events-none select-none">
          {number}
        </span>

        <h3 className="text-xl font-bold text-anthracite mb-3 relative z-10">{title}</h3>
        <p className="text-gray-600 leading-relaxed relative z-10">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const Process = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Audit & Vision",
      description: "On discute de vos besoins et objectifs lors d'un appel de 15 min. Je vérifie si je suis la bonne personne pour vous aider."
    },
    {
      icon: FileText,
      number: "02",
      title: "Stratégie & Devis (24h)",
      description: "Je vous envoie un devis détaillé et une maquette conceptuelle. Tout est clair : prix, délais, livrables."
    },
    {
      icon: Code,
      number: "03",
      title: "Construction Sur-Mesure",
      description: "Je construis votre site avec Next.js pour une performance maximale. Vous suivez l'avancement en temps réel."
    },
    {
      icon: Rocket,
      number: "04",
      title: "Lancement & Autonomie",
      description: "Mise en ligne, configuration SEO, et une session de formation pour que vous soyez autonome."
    }
  ];

  return (
    <section id="process" className="py-24 bg-paper overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Sticky Content */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">Méthodologie</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-anthracite mb-8">Simple. Rapide. Transparent.</h2>
              <p className="text-gray-600 text-lg mb-12 leading-relaxed mx-auto lg:mx-0 max-w-xl lg:max-w-none">
                Pas de jargon technique, pas de délais à rallonge. Je m'occupe de tout pour que vous puissiez vous concentrer sur votre métier.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-anthracite text-white p-8 rounded-2xl relative overflow-hidden inline-block text-left w-full max-w-md lg:max-w-none mx-auto lg:mx-0 cursor-default shadow-xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-petrol rounded-full blur-[50px] opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="text-6xl font-bold text-sand mb-2">7</div>
                  <div className="text-2xl font-bold mb-2">Jours ouvrés</div>
                  <p className="text-gray-400">C'est le temps moyen entre la validation du devis et la mise en ligne de votre site.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Interactive Timeline */}
          <div className="relative" ref={containerRef}>
            {/* Vertical Line Container */}
            <div className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200 h-full">
               {/* Filling Progress Line */}
               <motion.div 
                 className="absolute top-0 left-0 w-full bg-gradient-to-b from-sand to-amber-500 origin-top"
                 style={{ height: lineHeight }}
               />
            </div>

            <div className="space-y-0 relative z-10">
              {steps.map((step, index) => (
                <Step 
                  key={index}
                  {...step}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>

            {/* CTA at the end of timeline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pl-16 md:pl-24 mt-8"
            >
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-sand text-white rounded-full font-bold shadow-lg hover:bg-amber-600 hover:shadow-xl transition-all group"
              >
                Lancer l'étape 1
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
