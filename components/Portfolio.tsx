import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';

const projects = [
  {
    title: "L.C. Élagage",
    category: "Paysagiste • Île-de-France",
    description: "Refonte complète de l'identité numérique pour cet artisan paysagiste. L'objectif était clair : générer plus de leads qualifiés et moderniser l'image de marque.",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=1600",
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
    title: "Bistrot Le Marais",
    category: "Restauration • Paris",
    description: "Création d'une expérience digitale immersive pour ce restaurant parisien. Intégration du menu dynamique et système de réservation simplifié.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1600",
    stats: "+40% de réservations en ligne dès la première semaine",
    challenges: [
      "Gestion des réservations téléphoniques chronophage.",
      "Menu PDF difficile à lire sur mobile.",
      "Identité visuelle en ligne ne reflétant pas l'ambiance du lieu."
    ],
    solutions: [
      "Intégration d'un module de réservation en temps réel (Zenchef/TheFork).",
      "Menu digital interactif et appétissant avec photos HD.",
      "Design immersif capturant l'atmosphère chaleureuse du bistrot."
    ],
    results: [
      "Réduction de 50% des appels téléphoniques pendant le service.",
      "Hausse du ticket moyen grâce à la mise en avant des suggestions.",
      "Site élu 'Site du mois' par une communauté de foodies."
    ]
  },
  {
    title: "Cabinet Dr. Rousseau",
    category: "Santé • Dentiste",
    description: "Site vitrine rassurant et professionnel pour un cabinet dentaire. Focus sur la prise de rendez-vous et la présentation de l'équipe.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600",
    stats: "Visibilité locale améliorée • Top 3 Google Maps",
    challenges: [
      "Patientèle vieillissante, difficulté à attirer de nouveaux patients.",
      "Image du cabinet perçue comme 'froide' et 'clinique'.",
      "Manque d'informations claires sur les soins proposés."
    ],
    solutions: [
      "Shooting photo professionnel pour humaniser l'équipe.",
      "Pages dédiées pour chaque type de soin avec explications pédagogiques.",
      "Intégration fluide de Doctolib pour la prise de RDV."
    ],
    results: [
      "Rajeunissement significatif de la patientèle.",
      "Meilleure préparation des patients aux consultations (moins d'anxiété).",
      "Augmentation de la visibilité sur les recherches 'Urgence dentaire'."
    ]
  }
];

interface ProjectProps {
  project: typeof projects[0];
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
          
          <div className="overflow-hidden rounded-2xl shadow-2xl aspect-[16/10] relative cursor-pointer z-10" onClick={onOpen}>
            <motion.img 
              style={{ y }}
              variants={{
                hover: { scale: 1.15 }
              }}
              initial={{ scale: 1.1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
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

        <div className="text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-anthracite text-white rounded-full font-bold shadow-lg hover:bg-petrol hover:shadow-xl transition-all group"
          >
            Obtenir un résultat similaire
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
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
