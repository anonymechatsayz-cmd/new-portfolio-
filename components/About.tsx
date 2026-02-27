import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
         <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sand/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Profile Card (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl pointer-events-none" />
              
              <div className="relative z-20">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-16 h-16 rounded-full bg-anthracite flex items-center justify-center text-sand font-bold text-2xl">CF</div>
                   <div>
                      <h3 className="text-xl font-bold text-anthracite">Clément Franjou</h3>
                      <p className="text-sm text-gray-500">Expert Next.js & Performance</p>
                   </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Mission</span>
                    <p className="text-anthracite font-medium">Éliminer la complexité technique pour vous permettre de vous concentrer sur votre business.</p>
                  </div>
                   <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Approche</span>
                    <p className="text-anthracite font-medium">Pas de jargon, pas de délais à rallonge. Juste des résultats.</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                   {['React', 'Next.js', 'Tailwind', 'TypeScript'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{tech}</span>
                   ))}
                </div>
              </div>
            </div>
            
            {/* Decorative elements behind card */}
            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-sand/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-gray-100 rounded-3xl -z-20" />
          </motion.div>

          {/* Right Column: Copy & Stats */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">À Propos</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-anthracite mb-8 leading-tight">
              Votre partenaire digital, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand to-amber-600">pas juste un exécutant.</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Contrairement aux agences traditionnelles souvent lentes et coûteuses, je propose une approche <strong>agile et directe</strong>.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Je combine l'expertise technique des grands comptes avec la flexibilité nécessaire aux PME. Mon objectif ? Transformer votre site web en votre meilleur commercial, disponible 24/7.
            </p>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
               {[
                 { icon: Zap, label: "Rapidité", value: "7 Jours", desc: "Délai moyen" },
                 { icon: ShieldCheck, label: "Fiabilité", value: "100%", desc: "Respect des délais" },
                 { icon: Clock, label: "Réactivité", value: "< 2h", desc: "Temps de réponse" }
               ].map((stat, i) => (
                 <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-sand/30 transition-colors">
                    <stat.icon className="w-6 h-6 text-sand mb-3" />
                    <div className="text-2xl font-bold text-anthracite mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.desc}</div>
                 </div>
               ))}
            </div>

            <a href="#process" className="inline-flex items-center gap-2 text-anthracite font-bold hover:text-sand transition-colors group">
              Découvrir ma méthode de travail <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
