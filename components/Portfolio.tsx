import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';
import { FluidButton } from './FluidButton';

const projects = [
  {
    title: "L.C. Élagage et Paysage",
    category: "Paysagiste • Essonne & Île-de-France",
    description: "Création, aménagement et entretien : l'excellence au service de vos jardins et espaces verts depuis 2011. Une refonte complète pour refléter une expertise d'exception.",
    image: "https://i.postimg.cc/pXjn1wKS/Screenshot-2026-02-27-at-14-08-17-Copy-of-Copy-of-L-C-Elagage-e-Google-AI-Studio.png",
    stats: "12 devis signés le 1er mois • Lighthouse 98/100",
    challenges: [
      "Visibilité quasi-nulle sur les moteurs de recherche locaux.",
      "Site web obsolète et non adapté aux mobiles (perte de trafic).",
      "Processus de demande de devis complexe et décourageant."
    ],
    solutions: [
      "Développement d'un site One-Page ultra-rapide avec Next.js.",
      "Optimisation SEO locale ciblée sur l'Île-de-France.",
      "Mise en place d'un formulaire de contact simplifié et intuitif."
    ],
    results: [
      "Position #1 sur Google Maps pour 'Élagueur [Ville]'.",
      "Augmentation de 300% du taux de conversion visiteurs/devis.",
      "Retour sur investissement positif dès le premier mois."
    ]
  },
  {
    title: "Foggia Ristorante",
    category: "Restauration • Longjumeau (91)",
    description: "Création d'une identité digitale chaleureuse pour cette pizzeria familiale. Mise en avant de l'authenticité italienne et simplification du parcours de réservation.",
    image: "https://i.postimg.cc/xjMfrnF8/Screenshot-2026-02-27-151317.png",
    stats: "+50% de réservations directes • Note Google 4.8/5",
    challenges: [
      "Ancien site peu attractif ne reflétant pas la qualité des produits frais.",
      "Difficulté pour les clients de consulter la carte sur mobile.",
      "Gestion des avis clients dispersée et peu visible."
    ],
    solutions: [
      "Design immersif avec photos HD (four à bois, plats) pour ouvrir l'appétit.",
      "Intégration des avis Google en temps réel pour rassurer les nouveaux clients.",
      "Boutons d'action clairs (Réserver, Commander) pour maximiser la conversion."
    ],
    results: [
      "Augmentation significative du ticket moyen grâce aux visuels alléchants.",
      "Meilleur référencement local sur 'Pizzeria Longjumeau'.",
      "Fidélisation accrue grâce à une expérience utilisateur fluide."
    ]
  },
  {
    title: "Cabinet Julie Solassol",
    category: "Avocat • Épinay-sur-Orge & Essonne",
    description: "Refonte de l'identité numérique d'un cabinet d'avocat historique (2009). Une interface sobre et rassurante mettant en lumière l'expertise en droit de la santé, pénal et dommage corporel.",
    image: "https://i.postimg.cc/VksNwp36/Screenshot-2026-02-27-145305.png",
    stats: "+40% de contacts qualifiés • Image de marque modernisée",
    challenges: [
      "Site web vieillissant ne reflétant plus l'expertise et la passion du cabinet.",
      "Difficulté pour les clients d'identifier clairement les domaines d'intervention (Famille, Pénal, Santé).",
      "Absence de mise en avant de l'approche humaine et de la médiation."
    ],
    solutions: [
      "Design épuré et professionnel inspirant confiance et sérénité.",
      "Architecture de l'information repensée par pôles de compétences.",
      "Intégration d'une section 'Qui suis-je ?' valorisant le parcours et les valeurs."
    ],
    results: [
      "Renforcement immédiat de la crédibilité en ligne.",
      "Meilleure compréhension des services par les prospects.",
      "Positionnement local fort sur Épinay-sur-Orge."
    ]
  }
];

interface ProjectProps {
  project: typeof projects[0] & { component?: React.ReactNode };
  index: number;
  onOpen: () => void;
}

const Project: React.FC<ProjectProps> = ({ project, index, onOpen }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="group relative grid md:grid-cols-2 gap-12 md:gap-24 items-center mb-40 last:mb-0"
    >
      <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-sand/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="overflow-hidden rounded-2xl shadow-2xl aspect-video relative cursor-pointer z-10" onClick={onOpen}>
            {project.component ? (
              <motion.div 
                className="w-full h-full"
                variants={{
                  hover: { scale: 1.02 }
                }}
                initial={{ scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {project.component}
              </motion.div>
            ) : project.image ? (
              <motion.img 
                variants={{
                  hover: { scale: 1.05 }
                }}
                initial={{ scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-top"
              />
            ) : null}
            <div className="absolute inset-0 bg-anthracite/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur-sm text-anthracite px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                Voir le projet
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
        <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">{project.category}</span>
        <h3 className="text-4xl md:text-5xl font-bold text-anthracite mb-6">{project.title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          {project.description}
        </p>
        
        <div className="bg-white border-l-4 border-sand p-6 mb-8 shadow-sm rounded-r-xl">
          <p className="text-anthracite font-medium text-lg italic">"{project.stats}"</p>
        </div>

        <button 
          onClick={onOpen}
          className="flex items-center gap-2 text-[#5D7285] font-bold hover:text-sand hover:gap-4 transition-all group/btn"
        >
          Voir l'étude de cas <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-anthracite">Réalisations sélectionnées</h2>
        </div>

        <div className="max-w-6xl mx-auto mb-24">
          {projects.map((project, index) => (
            <Project 
              key={index}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <FluidButton href="#contact" className="px-8 py-4 text-white" bgClass="bg-anthracite">
            Obtenir un résultat similaire <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </FluidButton>
        </div>
      </div>

      <CaseStudyModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
};
