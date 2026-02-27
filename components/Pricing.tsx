import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingCard = ({ title, price, features, description, isPopular }: { title: string, price: string, features: string[], description: string, isPopular?: boolean }) => (
  <motion.div 
    whileHover="hover"
    initial="rest"
    animate="rest"
    variants={{
      rest: { 
        scale: isPopular ? 1.05 : 1,
        y: 0,
        boxShadow: isPopular ? "0 10px 30px -10px rgba(0,0,0,0.1)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
        borderColor: isPopular ? "rgba(212, 165, 116, 0.3)" : "rgba(243, 244, 246, 1)"
      },
      hover: { 
        scale: isPopular ? 1.08 : 1.03, 
        y: -12,
        boxShadow: isPopular 
          ? "0 30px 60px -12px rgba(212, 165, 116, 0.3)" 
          : "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        borderColor: isPopular ? "rgba(212, 165, 116, 0.8)" : "rgba(229, 231, 235, 1)"
      }
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`flex flex-col rounded-[2.5rem] border transition-colors duration-300 h-full relative cursor-default ${
    isPopular 
      ? 'z-10' 
      : 'bg-white border-gray-100'
  }`}
  >
    {/* Background & Shine Container (Clipped) */}
    <div className={`absolute inset-0 rounded-[2.5rem] overflow-hidden ${isPopular ? 'bg-gradient-to-br from-[#F5F5F4] via-[#FFFFFF] to-[#E7E5E4]' : ''} z-0`}>
       {isPopular && (
         <motion.div
           className="absolute inset-0 w-full h-full"
           variants={{
             rest: { x: "-100%" },
             hover: { x: "200%" }
           }}
           transition={{ duration: 1, ease: "easeInOut" }}
         >
           <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12" />
         </motion.div>
       )}
    </div>

    {isPopular && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sand text-white px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-xl shadow-sand/40 z-20">
        Populaire
      </div>
    )}

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full p-6 md:p-10">
      <h3 className="text-2xl font-bold text-anthracite mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-8 min-h-[40px]">{description}</p>
      
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-5xl font-bold text-anthracite tracking-tight">{price}€</span>
        <span className="text-gray-400 font-medium">HT</span>
      </div>
      
      <div className="flex-grow">
        <ul className="space-y-4 mb-10">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPopular ? 'text-anthracite' : 'text-petrol'}`} />
              <span className="text-gray-600 text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <a 
        href="#contact" 
        className={`w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg ${
          isPopular 
            ? 'bg-anthracite text-white hover:bg-petrol hover:scale-[1.02] shadow-anthracite/20' 
            : 'bg-[#5D7285] text-white hover:bg-anthracite hover:scale-[1.02] shadow-gray-200'
        }`}
      >
        Réserver un appel
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  </motion.div>
);

export const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">Tarifs</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-anthracite mb-6">Investissement transparent</h2>
          <p className="text-gray-600 text-lg">Pas de coûts cachés. Garantie satisfait ou remboursé.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          <PricingCard 
            title="Essentiel"
            price="490"
            description="Pour démarrer votre présence en ligne."
            features={[
              "Site One-Page (Vitrine)",
              "Design responsive mobile",
              "Formulaire de contact",
              "Hébergement offert 1 an",
              "Livraison 7 jours"
            ]}
          />
          <PricingCard 
            title="Professionnel"
            price="790"
            isPopular={true}
            description="L'offre la plus complète pour les PME."
            features={[
              "Tout du pack Essentiel",
              "Optimisation SEO avancée",
              "Google My Business setup",
              "Analytics & Reporting",
              "Support prioritaire 30j",
              "Formation administration"
            ]}
          />
          <PricingCard 
            title="Premium"
            price="1290"
            description="Pour aller plus loin avec des fonctionnalités avancées."
            features={[
              "Site Multi-pages (jusqu'à 5)",
              "Blog / Actualités",
              "Système de réservation",
              "SEO Local +++",
              "Maintenance 3 mois offerte",
              "Audit concurrentiel"
            ]}
          />
        </div>
      </div>
    </section>
  );
};
