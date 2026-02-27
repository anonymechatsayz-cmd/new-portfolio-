import React from 'react';
import { Quote, Star, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "J'avais zéro visibilité avant. En un mois avec le nouveau site, j'ai signé 12 devis. Clément est pro, rapide et toujours dispo.",
    author: "Marc L.",
    role: "Gérant, L.C. Élagage"
  },
  {
    quote: "Un site magnifique qui reflète parfaitement l'ambiance de notre restaurant. Le système de réservation est simple et efficace.",
    author: "Sophie D.",
    role: "Propriétaire, Bistrot Le Marais"
  },
  {
    quote: "Le retour sur investissement a été immédiat. Mes clients me trouvent enfin sur Google Maps. Merci pour ce travail de qualité.",
    author: "Thomas B.",
    role: "Architecte d'intérieur"
  },
  {
    quote: "Enfin un développeur qui parle français et pas 'code'. Tout est clair, le site est rapide, et je peux le modifier moi-même.",
    author: "Julie M.",
    role: "Consultante Marketing"
  },
  {
    quote: "Service impeccable. Le site a été livré en avance et le résultat dépasse mes attentes. Je recommande vivement.",
    author: "Pierre A.",
    role: "Artisan Plombier"
  },
  {
    quote: "Une refonte nécessaire qui a boosté notre image de marque. Les retours de nos patients sont excellents.",
    author: "Dr. Rousseau",
    role: "Chirurgien Dentiste"
  }
];

const TestimonialCard: React.FC<{ quote: string, author: string, role: string }> = ({ quote, author, role }) => (
  <motion.div 
    whileHover={{ 
      scale: 1.05, 
      y: -10,
      boxShadow: "0 20px 40px -5px rgba(212, 165, 116, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-sand/40 relative w-[400px] flex-shrink-0 mx-4 h-full flex flex-col justify-between cursor-default transition-colors duration-300"
  >
    <div className="absolute top-6 left-6 text-sand/20">
      <Quote size={40} />
    </div>
    <div className="relative z-10 pt-6">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-sand fill-sand" />
        ))}
      </div>
      <p className="text-lg text-anthracite font-medium leading-relaxed mb-6">
        "{quote}"
      </p>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="font-bold text-anthracite">{author}</div>
          <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
            <BadgeCheck className="w-3 h-3" />
            <span>Vérifié</span>
          </div>
        </div>
        <div className="text-gray-500 text-sm">{role}</div>
      </div>
    </div>
  </motion.div>
);

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-paper overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">Témoignages</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-anthracite">Ce que disent mes clients</h2>
          </div>
        </div>
      </div>

      <div className="relative flex w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-paper to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-paper to-transparent z-10"></div>
        
        <div
          className="flex animate-scroll pause-on-hover"
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
