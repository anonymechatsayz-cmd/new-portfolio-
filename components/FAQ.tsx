import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `faq-content-${question.substring(0, 10).replace(/\s+/g, '-')}`;

  return (
    <div className="border-b border-gray-200 last:border-0">
      <motion.button 
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="w-full py-8 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="text-xl font-bold text-anthracite group-hover:text-petrol transition-colors pr-8">{question}</span>
        <div className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-anthracite border-anthracite text-white rotate-180' : 'bg-white text-anthracite'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-600 text-lg leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 text-center lg:text-left">
            <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-anthracite mb-6">Questions Fréquentes</h2>
            <p className="text-gray-600 text-lg mb-8">
              Tout ce que vous devez savoir avant de démarrer.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-petrol font-bold hover:gap-4 transition-all justify-center lg:justify-start">
              Poser une autre question <span className="text-xl">→</span>
            </a>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-paper rounded-3xl p-8 md:p-12">
              <FAQItem 
                question="Pourquoi vos prix sont-ils si accessibles ?"
                answer="Je suis freelance, je n'ai pas les coûts de structure d'une agence (locaux, commerciaux, RH). De plus, j'ai optimisé mon process de création pour être ultra-efficace. Vous payez pour la qualité du site, pas pour mes frais fixes."
              />
              <FAQItem 
                question="7 jours, ce n'est pas trop rapide pour être qualitatif ?"
                answer="Au contraire. La plupart des projets traînent à cause des allers-retours inutiles. Mon process est carré : on valide tout au début, je fonce, on livre. J'utilise des technologies modernes (Next.js) qui me permettent de développer vite et bien."
              />
              <FAQItem 
                question="Est-ce que le site va vraiment m'apporter des clients ?"
                answer="Un site ne fait pas de magie, mais c'est un outil puissant. Je construis votre site avec un seul but : la conversion. Structure claire, appels à l'action visibles, réassurance. Si vous avez du trafic, ce site le transformera en contacts."
              />
              <FAQItem 
                question="Que se passe-t-il après la livraison ?"
                answer="Vous êtes propriétaire de votre site à 100%. Je vous forme pour modifier les textes et images vous-même. Si vous avez un souci technique, le support est inclus pendant 30 jours. Ensuite, je reste disponible si besoin."
              />
              <FAQItem 
                question="Travaillez-vous avec des clients hors Île-de-France ?"
                answer="Oui, absolument ! Tout peut se faire à distance (visio, téléphone). J'ai l'habitude de travailler avec des clients de toute la France."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
