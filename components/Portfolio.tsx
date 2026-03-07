import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue, useInView, AnimatePresence, useSpring, useMotionValue, animate, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, X, ArrowRight, Layers, Smartphone, Globe } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FluidButton } from './FluidButton';

// --- TYPES ---

interface ProjectResult {
  value: string;
  label: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  image: string;
  video?: string;
  results: ProjectResult[];
  tags: string[];
  link: string;
  color: string;
  textColor: string;
  year: string;
  gallery: string[];
}

// --- DATA ---

const projects: Project[] = [
  {
    id: 'foggia',
    title: "Foggia Ristorante",
    category: "Hospitality",
    year: "2023",
    description: "Une expérience digitale qui se goûte. Immersion totale.",
    longDescription: "Pour Foggia, un restaurant italien authentique, le site web ne devait pas être une simple vitrine, mais un avant-goût de l'expérience culinaire. Il fallait transmettre la chaleur, l'odeur du four à bois et la convivialité italienne à travers un écran.",
    challenge: "Se différencier des milliers de pizzerias génériques. Convaincre les clients potentiels de réserver une table plutôt que de commander sur UberEats.",
    solution: "Une direction artistique centrée sur la photographie culinaire haute définition et des micro-interactions fluides. Le module de réservation est intégré nativement pour réduire la friction au minimum.",
    image: "https://i.postimg.cc/xjMfrnF8/Screenshot-2026-02-27-151317.png",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000"
    ],
    results: [
      { value: "+50%", label: "Réservations Web" },
      { value: "4.8/5", label: "Note Moyenne" },
      { value: "15k", label: "Vues Mensuelles" },
    ],
    tags: ["Immersion", "Booking System", "Photography"],
    link: "#",
    color: "#E8E6E1",
    textColor: "#1A1D29"
  },
  {
    id: 'lc-elagage',
    title: "L.C. Élagage",
    category: "Paysagiste",
    year: "2024",
    description: "Transformation radicale d'une entreprise locale. D'invisible à omniprésent.",
    longDescription: "L.C. Élagage était un expert reconnu localement mais invisible numériquement. Notre mission était de construire une présence digitale capable de capturer la demande locale massive pour l'élagage et l'entretien paysager.",
    challenge: "Le marché local est saturé de petits acteurs. Le client n'avait aucune image de marque et dépendait du bouche-à-oreille. L'objectif était de devenir le leader incontesté sur Google pour la région.",
    solution: "Nous avons créé une identité visuelle robuste et un site web ultra-rapide optimisé pour le SEO local. Chaque page est une landing page conçue pour convertir, avec des appels à l'action contextuels et une preuve sociale omniprésente.",
    image: "https://i.postimg.cc/pXjn1wKS/Screenshot-2026-02-27-at-14-08-17-Copy-of-Copy-of-L-C-Elagage-e-Google-AI-Studio.png",
    gallery: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
    ],
    results: [
      { value: "+300%", label: "Croissance Devis" },
      { value: "#1", label: "Position Google" },
      { value: "98/100", label: "Performance" },
    ],
    tags: ["Next.js", "SEO Local", "UX Design"],
    link: "#",
    color: "#F2F0EB",
    textColor: "#1A1D29"
  },
  {
    id: 'solassol',
    title: "Cabinet Solassol",
    category: "Corporate",
    year: "2023",
    description: "L'élégance de la loi. Confiance et statut.",
    longDescription: "Le Cabinet Solassol avait besoin d'une refonte complète de son image pour correspondre à son expertise de haut niveau. L'ancien site ne reflétait pas le prestige et la rigueur de leurs services juridiques.",
    challenge: "Moderniser l'image d'un cabinet d'avocats sans tomber dans les clichés corporate froids, tout en restant accessible et rassurant pour les clients en difficulté.",
    solution: "Un design minimaliste, utilisant beaucoup d'espace blanc et une typographie serif élégante. La structure de l'information a été repensée pour guider l'utilisateur vers la bonne expertise en moins de 2 clics.",
    image: "https://i.postimg.cc/VksNwp36/Screenshot-2026-02-27-145305.png",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1507537297725-24a1c434e3db?auto=format&fit=crop&q=80&w=1000"
    ],
    results: [
      { value: "+40%", label: "Leads Qualifiés" },
      { value: "x2", label: "Taux Conversion" },
      { value: "-30%", label: "Rebond" },
    ],
    tags: ["Branding", "Corporate", "Identity"],
    link: "#",
    color: "#DEDBD6",
    textColor: "#1A1D29"
  },
  {
    id: 'lumina',
    title: "Lumina Studio",
    category: "Design",
    year: "2024",
    description: "Une identité visuelle lumineuse pour un studio de création.",
    longDescription: "Lumina Studio avait besoin d'un portfolio immersif pour présenter ses créations 3D et ses concepts architecturaux.",
    challenge: "Créer une plateforme qui s'efface derrière le contenu tout en gardant une identité forte.",
    solution: "Un design sombre, des animations fluides et une navigation spatiale innovante.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000"
    ],
    results: [
      { value: "+200%", label: "Engagement" },
      { value: "Awwwards", label: "Site of the Day" },
      { value: "0.8s", label: "Load Time" },
    ],
    tags: ["WebGL", "Three.js", "Art Direction"],
    link: "#",
    color: "#E5E1D8",
    textColor: "#1A1D29"
  },
  {
    id: 'maison-hotes',
    title: "Maison D'Hôtes",
    category: "Hospitality",
    year: "2023",
    description: "L'art de recevoir digitalisé.",
    longDescription: "Une maison d'hôtes de luxe en Provence cherchait à augmenter ses réservations directes pour s'affranchir des plateformes comme Booking.com.",
    challenge: "Transmettre le calme, le luxe et l'exclusivité du lieu à travers l'écran.",
    solution: "Un site web expérientiel avec des vidéos en plein écran, une typographie raffinée et un système de réservation sur-mesure.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000"
    ],
    results: [
      { value: "65%", label: "Réservations Directes" },
      { value: "+120%", label: "Trafic Organique" },
      { value: "4.9/5", label: "Satisfaction" },
    ],
    tags: ["Hospitality", "SEO", "UX Design"],
    link: "#",
    color: "#E8E6E1",
    textColor: "#1A1D29"
  }
];

// --- COMPONENTS ---

const AnimatedFog = ({ activeColor }: { activeColor: string }) => {
  const fogRef = useRef<THREE.Fog>(null);
  const targetColor = useMemo(() => new THREE.Color(activeColor), [activeColor]);

  useFrame((state, delta) => {
    if (fogRef.current) {
      fogRef.current.color.lerp(targetColor, delta * 2);
    }
  });

  return <fog ref={fogRef} attach="fog" args={[activeColor, 10, 35]} />;
};

const ParticlesWave = ({ activeTextColor }: { activeTextColor: string }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const targetColor = useMemo(() => new THREE.Color(activeTextColor), [activeTextColor]);

  // Create a denser grid of points for a more fluid, fabric-like feel
  const { positions, initialPositions } = useMemo(() => {
    const gridSize = 120;
    const spacing = 0.4;
    const count = gridSize * gridSize;
    const pos = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);
    let i = 0;
    for (let x = -gridSize/2; x < gridSize/2; x++) {
      for (let z = -gridSize/2; z < gridSize/2; z++) {
        const px = x * spacing;
        const pz = z * spacing;
        pos[i] = px;
        pos[i + 1] = 0; // y
        pos[i + 2] = pz;

        initPos[i] = px;
        initPos[i + 1] = 0;
        initPos[i + 2] = pz;
        i += 3;
      }
    }
    return { positions: pos, initialPositions: initPos };
  }, []);

  // For smooth mouse tracking
  const mousePos = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Smooth mouse interpolation
    mousePos.current.x += (state.pointer.x - mousePos.current.x) * 0.05;
    mousePos.current.y += (state.pointer.y - mousePos.current.y) * 0.05;

    // Map mouse to 3D space (approximate projection to the grid plane)
    const mx = mousePos.current.x * 25;
    const mz = -mousePos.current.y * 25 - 10; 

    let i = 0;
    const gridSize = 120;
    for (let x = -gridSize/2; x < gridSize/2; x++) {
      for (let z = -gridSize/2; z < gridSize/2; z++) {
        const px = initialPositions[i];
        const pz = initialPositions[i + 2];

        // 1. Organic flowing waves (multi-layered sine waves for complexity)
        let y = Math.sin(px * 0.1 + time * 0.3) * 1.2 
              + Math.cos(pz * 0.15 + time * 0.2) * 1.2
              + Math.sin((px + pz) * 0.05 + time * 0.1) * 1.5;

        // 2. Mouse interaction (creates a ripple/repulsion effect)
        const dx = px - mx;
        const dz = pz - mz;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const maxDist = 8;
        
        if (dist < maxDist) {
          // Create a gentle dip or rise around the mouse
          const influence = Math.pow(1 - dist / maxDist, 2); // Smoother falloff
          y += influence * 3 * Math.sin(time * 3 - dist * 2); // Ripple effect
        }

        positions[i + 1] = y;
        i += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Smoothly interpolate color
    if (pointsRef.current.material) {
      (pointsRef.current.material as THREE.PointsMaterial).color.lerp(targetColor, delta * 2);
    }
    
    // Very slow, majestic rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.03) * 0.05;
    pointsRef.current.rotation.z = Math.cos(time * 0.02) * 0.02;
  });

  return (
    <points ref={pointsRef} position={[0, -5, -15]} rotation={[Math.PI / 8, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={activeTextColor}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const WebGLBackground = ({ activeColor, activeTextColor }: { activeColor: string, activeTextColor: string }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <AnimatedFog activeColor={activeColor} />
        <ParticlesWave activeTextColor={activeTextColor} />
      </Canvas>
      {/* Subtle Grain/Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />
    </div>
  );
};

const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const ProjectDetails = ({ 
  project, 
  onClose, 
  onNext 
}: { 
  project: Project, 
  onClose: () => void,
  onNext: () => void
}) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollContainer });
  
  // Keep the layoutId fixed to the project that opened the modal
  const [initialProjectId] = useState(project.id);
  
  // Parallax for Hero Image
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 500], [1.1, 1.2]);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Focus management for accessibility
    modalRef.current?.focus();

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => { 
      document.body.style.overflow = originalBodyOverflow; 
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Reset scroll position when project changes
  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = 0;
    }
  }, [project.id]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-2xl p-0 md:p-6"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Subtle Noise Overlay for the backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />

      <motion.div 
        ref={modalRef}
        tabIndex={-1}
        layoutId={`card-container-${initialProjectId}`}
        initial={{ borderRadius: 32 }}
        animate={{ borderRadius: 32 }}
        exit={{ borderRadius: 32, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        className="w-full max-w-[1400px] h-[95vh] md:h-[90vh] bg-[#FAF9F7] md:rounded-[2rem] rounded-t-[2rem] overflow-hidden relative flex flex-col shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle Indicator */}
        <div className="w-full h-8 absolute top-0 left-0 z-[70] flex items-center justify-center md:hidden pointer-events-none">
          <div className="w-12 h-1.5 bg-white/40 rounded-full" />
        </div>

        {/* Close Button */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[60]">
          <MagneticButton 
            onClick={onClose}
            className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <X className="w-5 h-5" />
          </MagneticButton>
        </div>

        {/* Scrollable Container */}
        <div ref={scrollContainer} className="overflow-y-auto h-full w-full custom-scrollbar relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <div className="relative w-full h-[60vh] md:h-[70vh] bg-black">
                <motion.div 
                  style={{ y: heroY, scale: heroScale, borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
                  className="w-full h-full overflow-hidden"
                >
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                    className="w-full h-full object-cover opacity-80"
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 mb-6"
                  >
                    <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                      {project.category}
                    </span>
                    <span className="text-white/80 font-mono text-sm">{project.year}</span>
                  </motion.div>
                  
                  <motion.h2 
                    id="modal-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-[8vw] font-black text-white tracking-tighter leading-[0.85] mix-blend-overlay opacity-90"
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>

              {/* Content */}
              <div className="bg-[#FAF9F7] p-8 md:p-16 relative z-20" style={{ backgroundColor: project.color }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  
                  {/* Left Column: Context & Stats */}
                  <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-12 h-fit">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4" style={{ color: project.textColor }}>Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 border border-black/10 rounded-full text-xs font-bold opacity-60" style={{ color: project.textColor }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4" style={{ color: project.textColor }}>Impact</h3>
                      <div className="space-y-4">
                        {project.results.map((res, i) => (
                          <div key={i} className="flex items-baseline justify-between border-b border-black/10 pb-3">
                            <span className="text-4xl font-black text-[#C9A56B]">{res.value}</span>
                            <span className="text-xs font-bold uppercase tracking-wide opacity-60" style={{ color: project.textColor }}>{res.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.a 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      href={project.link}
                      className="inline-flex items-center justify-center w-full bg-[#1A1D29] text-white px-8 py-6 rounded-xl group hover:bg-[#C9A56B] transition-colors duration-300 shadow-xl"
                    >
                      <span className="text-lg font-bold tracking-wide mr-4">Visiter le site</span>
                      <Globe className="w-5 h-5" />
                    </motion.a>
                  </div>

                  {/* Right Column: Story */}
                  <div className="lg:col-span-8 space-y-24">
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-4xl font-bold mb-8" style={{ color: project.textColor }}>Le Projet</h3>
                      <p className="text-2xl leading-relaxed font-medium opacity-80" style={{ color: project.textColor }}>
                        {project.longDescription}
                      </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/50 p-10 rounded-3xl border border-black/5"
                      >
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
                          <Layers className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-4" style={{ color: project.textColor }}>Le Challenge</h4>
                        <p className="text-base leading-relaxed opacity-70" style={{ color: project.textColor }}>
                          {project.challenge}
                        </p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/50 p-10 rounded-3xl border border-black/5"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold mb-4" style={{ color: project.textColor }}>La Solution</h4>
                        <p className="text-base leading-relaxed opacity-70" style={{ color: project.textColor }}>
                          {project.solution}
                        </p>
                      </motion.div>
                    </div>

                    {/* Gallery */}
                    <div>
                      <h3 className="text-3xl font-bold mb-12" style={{ color: project.textColor }}>Galerie</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.gallery.map((img, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`rounded-2xl overflow-hidden shadow-lg ${idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
                          >
                            <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Next Project Navigation */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      onClick={onNext}
                      className="border-t border-black/10 pt-16 mt-16 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold uppercase tracking-widest opacity-40 block mb-4" style={{ color: project.textColor }}>
                            Projet Suivant
                          </span>
                          <span className="text-5xl md:text-7xl font-black group-hover:text-[#C9A56B] transition-colors tracking-tighter" style={{ color: project.textColor }}>
                            Découvrir la suite
                          </span>
                        </div>
                        <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#C9A56B] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                          <ArrowRight className="w-10 h-10" />
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Cursor = ({ cursorState, mouseX, mouseY }: { cursorState: string, mouseX: any, mouseY: any }) => {
  const isVisible = cursorState !== 'default';
  
  return (
    <motion.div 
      className="fixed pointer-events-none z-[150] flex items-center justify-center mix-blend-difference"
      variants={{
        initial: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1 }
      }}
      animate={isVisible ? "visible" : "initial"}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ 
        left: mouseX, 
        top: mouseY,
        x: '-50%',
        y: '-50%',
      }}
    >
      <motion.div 
        className="w-24 h-24 rounded-full flex items-center justify-center font-bold text-sm tracking-widest uppercase shadow-2xl"
        animate={{
          scale: cursorState === 'view' ? 1 : 0.85,
          backgroundColor: cursorState === 'view' ? '#C9A56B' : '#ffffff',
          color: cursorState === 'view' ? '#ffffff' : '#000000',
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {cursorState === 'view' && 'VIEW'}
        {cursorState === 'drag' && 'DRAG'}
        {cursorState === 'prev' && <ArrowRight className="w-6 h-6 rotate-180" />}
        {cursorState === 'next' && <ArrowRight className="w-6 h-6" />}
      </motion.div>
    </motion.div>
  );
};

const CarouselCard = ({ 
  project, 
  index, 
  animatedDragX,
  DRAG_FACTOR,
  centerCard,
  onClick,
  setCursorState,
  isDragging,
  isPointerDown,
  totalCards,
  isSectionInView,
}: { 
  project: Project, 
  index: number, 
  animatedDragX: MotionValue<number>,
  DRAG_FACTOR: number,
  centerCard: (idx: number) => void,
  onClick: () => void,
  setCursorState: (state: string) => void,
  isDragging: boolean,
  isPointerDown: boolean,
  totalCards: number,
  isSectionInView: boolean,
}) => {
  const offset = useTransform(animatedDragX, (x) => {
    const factor = DRAG_FACTOR || 1; // Prevent division by zero
    return index + x / factor;
  });
  
  const cardRef = useRef<HTMLDivElement>(null);
  const lastMouseY = useRef<number | null>(null);
  const isHovered = useRef(false);

  // --- ENTRY ANIMATION ---
  const entryProgress = useSpring(0, {
    stiffness: 45,
    damping: 14,
    mass: 0.8,
  });

  useEffect(() => {
    if (isSectionInView) {
      const timeout = setTimeout(() => {
        entryProgress.set(1);
      }, index * 120);
      return () => clearTimeout(timeout);
    }
  }, [isSectionInView, index, entryProgress]);

  // Continuously track offset during spring animation to update cursor instantly
  useMotionValueEvent(offset, "change", (latest) => {
    if (!isPointerDown && !isDragging && isHovered.current && lastMouseY.current !== null && cardRef.current) {
      if (Math.abs(latest) < 0.55) {
        if (lastMouseY.current < cardRef.current.clientHeight * 0.55) {
          setCursorState('view');
        } else {
          setCursorState('drag');
        }
      } else {
        setCursorState('drag');
      }
    }
  });

  // Instantly update cursor when pointer is released
  useEffect(() => {
    if (!isPointerDown && isHovered.current && lastMouseY.current !== null && cardRef.current) {
      const currentOffset = offset.get();
      if (Math.abs(currentOffset) < 0.55) {
        if (lastMouseY.current < cardRef.current.clientHeight * 0.55) {
          setCursorState('view');
        } else {
          setCursorState('drag');
        }
      }
    }
  }, [isPointerDown, offset, setCursorState]);
  
  const RADIUS = DRAG_FACTOR * 1.2;
  const ANGLE = 360 / totalCards;

  const theta = useTransform(offset, (v) => (v || 0) * ANGLE);
  
  // Circular 3D Carousel Effect + Entry Animation
  const rotateY = useMotionValue(0);
  const z = useMotionValue(0);
  const x = useMotionValue(0);
  const scale = useMotionValue(0.3);
  const opacity = useMotionValue(0);
  const zIndex = useMotionValue(0);
  const blur = useMotionValue("blur(20px)");

  const updateTransforms = (t: number, e: number) => {
    // rotateY
    rotateY.set(-t * e);

    // z
    const targetZ = RADIUS * Math.cos(t * Math.PI / 180) - RADIUS;
    const startZ = 400;
    z.set(startZ + (targetZ - startZ) * e);

    // x
    const targetX = RADIUS * Math.sin(t * Math.PI / 180);
    x.set(targetX * e);

    // scale
    const cos = Math.cos(t * Math.PI / 180);
    const targetScale = 0.6 + (cos + 1) * 0.2;
    const startScale = 0.3;
    scale.set(startScale + (targetScale - startScale) * e);

    // opacity
    const targetOpacity = Math.min(1, Math.max(0, 0.3 + (cos + 1) * 0.35));
    opacity.set(targetOpacity * e);

    // zIndex
    const targetZIndex = Math.round(cos * 100);
    const startZIndex = 100 - index;
    zIndex.set(Math.round(startZIndex + (targetZIndex - startZIndex) * e));

    // blur
    const targetBlur = Math.max(0, (1 - cos) * 5);
    const startBlur = 20;
    const currentBlur = Math.max(0, startBlur + (targetBlur - startBlur) * e);
    blur.set(`blur(${currentBlur}px)`);
  };

  useMotionValueEvent(theta, "change", (t) => {
    updateTransforms(t, entryProgress.get());
  });

  useMotionValueEvent(entryProgress, "change", (e) => {
    updateTransforms(theta.get(), e);
  });

  const rotateX = useTransform(entryProgress, (e) => {
    const start = 180; // Face down
    const target = 0;  // Face up
    return start + (target - start) * e;
  });
  
  const rotateZ = useTransform(entryProgress, (e) => {
    const start = (index % 2 === 0 ? -360 : 360) + (index * 15); // Spin
    const target = 0;
    return start + (target - start) * e;
  });

  const y = useTransform(entryProgress, (e) => {
    const start = 1200; // Start offscreen bottom
    const target = 0;
    const arc = Math.sin(e * Math.PI) * -400; // Parabolic arc up
    return start + (target - start) * e + arc;
  });

  // Internal Parallax for text and tags
  const textX = useTransform(theta, (t) => Math.sin(t * Math.PI / 180) * 30);
  const tagsX = useTransform(theta, (t) => Math.sin(t * Math.PI / 180) * 50);

  // Inner Parallax for the image
  const imageX = useTransform(offset, [-1, 0, 1], ['-15%', '0%', '15%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    lastMouseY.current = e.clientY - rect.top;

    if (isDragging || isPointerDown) {
      setCursorState('drag');
      return;
    }
    
    const currentOffset = offset.get();
    if (Math.abs(currentOffset) > 0.55) {
      setCursorState('drag');
      return;
    }
    
    const mouseY = e.clientY - rect.top;
    const height = rect.height;
    
    if (mouseY < height * 0.55) {
      setCursorState('view');
    } else {
      setCursorState('drag');
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    
    const currentOffset = offset.get();
    if (Math.abs(currentOffset) > 0.55) {
      centerCard(index);
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const height = rect.height;
    
    if (mouseY < height * 0.55) {
      onClick();
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      layoutId={`card-container-${project.id}`}
      style={{
        rotateY,
        rotateX,
        rotateZ,
        y,
        z,
        x,
        scale,
        opacity,
        zIndex,
        filter: blur,
        backgroundColor: project.color,
        borderRadius: 32,
        position: 'absolute',
        transformStyle: 'preserve-3d',
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        isHovered.current = true;
        if (isDragging || isPointerDown) {
          setCursorState('drag');
          return;
        }
        const currentOffset = offset.get();
        if (Math.abs(currentOffset) > 0.55) {
          setCursorState('drag');
        }
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        lastMouseY.current = null;
        if (!isDragging && !isPointerDown) {
          setCursorState('drag');
        }
      }}
      className="w-[85vw] md:w-[50vw] lg:w-[40vw] h-[60vh] min-h-[400px] md:h-[75vh] md:min-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col cursor-none select-none group"
    >
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20 mix-blend-multiply" 
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
      />

      {/* Image Section */}
      <div className="w-full h-[55%] relative pointer-events-none">
        <motion.div 
          layoutId={`card-image-${project.id}`}
          className="w-full h-full overflow-hidden"
          style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        {/* Subtle gradient overlay to blend image with content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 z-10" />
        
        {/* Results Overlay */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex flex-col gap-1.5 md:gap-2 items-end">
          {project.results.slice(0, 2).map((result, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-md text-[#1A1D29] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1.5 md:gap-2 shadow-lg">
              <span className="font-black text-xs md:text-sm">{result.value}</span>
              <span className="text-[8px] md:text-[10px] font-semibold uppercase tracking-wider opacity-70">{result.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section - Refined Typography */}
      <div className="w-full h-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between relative z-10 bg-inherit pointer-events-none">
        <motion.div style={{ x: textX }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] opacity-50" style={{ color: project.textColor }}>
              0{index + 1}
            </span>
            <div className="h-[1px] w-8 bg-current opacity-20" style={{ color: project.textColor }} />
            <motion.span layoutId={`card-category-${project.id}`} className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-80" style={{ color: project.textColor }}>
              {project.category}
            </motion.span>
          </div>
          
          <motion.h3 layoutId={`card-title-${project.id}`} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.85] transition-colors duration-300" style={{ color: project.textColor }}>
            {project.title}
          </motion.h3>
        </motion.div>

        <div className="flex items-center justify-between mt-6">
          <motion.div style={{ x: tagsX }} className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] font-semibold opacity-60 border border-current/20 px-3 py-1.5 rounded-full backdrop-blur-sm" style={{ color: project.textColor }}>
                {tag}
              </span>
            ))}
          </motion.div>
          
          <div 
            className="w-14 h-14 rounded-full bg-[#1A1D29] text-white flex items-center justify-center shadow-xl transition-transform duration-500 hover:scale-110 pointer-events-auto cursor-pointer relative overflow-hidden group/btn"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setCursorState('default');
            }}
            onMouseMove={(e) => {
              e.stopPropagation();
              setCursorState('default');
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (isDragging) return;
              const currentOffset = offset.get();
              if (Math.abs(currentOffset) > 0.5) {
                centerCard(index);
              } else {
                onClick();
              }
            }}
          >
            <div className="relative flex items-center justify-center w-full h-full pointer-events-none">
              <ArrowUpRight className="w-6 h-6 absolute transition-transform duration-300 group-hover/btn:translate-x-8 group-hover/btn:-translate-y-8" />
              <ArrowUpRight className="w-6 h-6 absolute -translate-x-8 translate-y-8 transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cursorState, setCursorState] = useState('default');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isDragging, setIsDragging] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, {
    once: true,
    margin: "0px"
  });

  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  const DRAG_FACTOR = windowWidth < 768 ? windowWidth * 0.75 : (windowWidth < 1024 ? windowWidth * 0.5 : windowWidth * 0.35);

  // Initialize at index 0 (Foggia Ristorante)
  const dragX = useMotionValue(0);
  // Use a refined spring for the aesthetic zoom effect
  const animatedDragX = useSpring(dragX, { stiffness: 200, damping: 25, mass: 1 });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = animatedDragX.on("change", (latest) => {
      let idx = Math.round(-latest / DRAG_FACTOR);
      if (isNaN(idx)) idx = 0;
      const wrappedIdx = ((idx % projects.length) + projects.length) % projects.length;
      setActiveIndex(wrappedIdx || 0);
    });
    return () => unsubscribe();
  }, [animatedDragX, DRAG_FACTOR]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      // Recenter on resize to prevent drifting
      const newDragFactor = newWidth < 768 ? newWidth * 0.75 : (newWidth < 1024 ? newWidth * 0.5 : newWidth * 0.35);
      const currentIdx = Math.round(-dragX.get() / DRAG_FACTOR);
      dragX.set(-currentIdx * newDragFactor);
    };
    const handlePointerUp = () => setIsPointerDown(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointerup', handlePointerUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [mouseX, mouseY, dragX, DRAG_FACTOR]);

  const handlePanStart = () => {
    setIsDragging(true);
    setCursorState('drag');
  };

  const handlePan = (e: any, info: PanInfo) => {
    dragX.set(dragX.get() + info.delta.x);
  };

  const handlePanEnd = (e: any, info: PanInfo) => {
    setTimeout(() => setIsDragging(false), 50);
    setIsPointerDown(false);
    const currentX = dragX.get();
    const velocity = info.velocity.x;
    
    // Predict landing position based on velocity
    const predictedX = currentX + velocity * 0.1;
    
    let targetIndex = Math.round(-predictedX / DRAG_FACTOR);
    
    // Directly set the target value. The animatedDragX spring will smoothly transition to it.
    // This fixes the "double spring" bug that caused epileptic/jittery animations.
    dragX.set(-targetIndex * DRAG_FACTOR);
  };

  const centerCard = (idx: number) => {
    dragX.set(-idx * DRAG_FACTOR);
  };

  const next = React.useCallback(() => {
    const currentX = dragX.get();
    let targetIndex = Math.round(-currentX / DRAG_FACTOR) + 1;
    centerCard(targetIndex);
  }, [dragX, DRAG_FACTOR]);

  const prev = React.useCallback(() => {
    const currentX = dragX.get();
    let targetIndex = Math.round(-currentX / DRAG_FACTOR) - 1;
    centerCard(targetIndex);
  }, [dragX, DRAG_FACTOR]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent default scrolling when hovering the carousel to allow smooth horizontal scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      dragX.set(dragX.get() - e.deltaX * 1.5);
    } else {
      dragX.set(dragX.get() - e.deltaY * 1.5);
    }
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIdx = projects.findIndex(p => p.id === selectedProject.id);
    const nextIdx = (currentIdx + 1) % projects.length;
    setSelectedProject(projects[nextIdx]);
    centerCard(nextIdx);
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative overflow-hidden transition-colors duration-700 ease-in-out" 
      id="portfolio"
      style={{ backgroundColor: projects[activeIndex]?.color || '#ffffff' }}
    >
      {/* Subtle overlay to soften the background color */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none mix-blend-overlay z-0" />
      
      <WebGLBackground activeColor={projects[activeIndex]?.color || '#ffffff'} activeTextColor={projects[activeIndex]?.textColor || '#000000'} />

      <Cursor cursorState={cursorState} mouseX={mouseX} mouseY={mouseY} />
      
      {/* Header */}
      <div className="container max-w-[1400px] mx-auto px-6 pt-24 md:pt-32 pb-8 md:pb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12 border-b border-[#1A1D29]/10 pb-8 md:pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#1A1D29] font-mono text-sm tracking-[0.2em] uppercase mb-4 md:mb-6 block font-bold">
              Selected Works
            </span>
            <h2 className="text-[15vw] md:text-[8vw] leading-[0.85] md:leading-[0.8] font-black text-[#1A1D29] tracking-tighter">
              DIGITAL<br/>IMPACT
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start md:items-end gap-6 md:gap-8 w-full md:w-auto"
          >
            <p className="text-[#1A1D29] text-lg md:text-xl font-medium max-w-md leading-relaxed text-left md:text-right opacity-80">
              Une sélection de projets où design, performance et business ne font qu'un.
            </p>
            {/* Progress Indicator */}
            <div className="flex items-center gap-4 font-mono text-sm font-bold opacity-60 w-full md:w-auto justify-between md:justify-end">
              <span>0{activeIndex + 1}</span>
              <div className="w-full md:w-16 h-[2px] bg-[#1A1D29]/20 relative overflow-hidden rounded-full flex-grow md:flex-grow-0">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-[#1A1D29]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span>0{projects.length}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D Carousel */}
      <div className="pb-24 pt-8 md:pb-32 md:pt-16 w-full relative z-10 overflow-hidden" onWheel={handleWheel}>
        <motion.div 
          onPointerDown={() => {
            setIsPointerDown(true);
          }}
          onPointerUp={() => setIsPointerDown(false)}
          onPointerCancel={() => setIsPointerDown(false)}
          onPointerLeave={() => setIsPointerDown(false)}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          onMouseEnter={() => setCursorState('drag')}
          onMouseLeave={() => setCursorState('default')}
          className="relative w-full h-[60vh] min-h-[400px] md:h-[75vh] md:min-h-[600px] flex items-center justify-center cursor-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
        >
          {projects.map((project, index) => (
            <CarouselCard 
              key={project.id} 
              index={index} 
              animatedDragX={animatedDragX}
              DRAG_FACTOR={DRAG_FACTOR}
              centerCard={centerCard}
              project={project} 
              onClick={() => {
                setSelectedProject(project);
                setCursorState('default');
              }}
              setCursorState={setCursorState}
              isDragging={isDragging}
              isPointerDown={isPointerDown}
              totalCards={projects.length}
              isSectionInView={isSectionInView}
            />
          ))}
        </motion.div>
        
        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-16 relative z-10">
          <MagneticButton 
            onClick={prev}
            className="w-14 h-14 rounded-full border border-[#1A1D29] flex items-center justify-center transition-colors duration-300 hover:bg-[#1A1D29] hover:text-white"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </MagneticButton>
          <MagneticButton 
            onClick={next}
            className="w-14 h-14 rounded-full border border-[#1A1D29] flex items-center justify-center transition-colors duration-300 hover:bg-[#1A1D29] hover:text-white"
          >
            <ArrowRight className="w-6 h-6" />
          </MagneticButton>
        </div>
      </div>

      {/* Final CTA */}
      <div className="h-[50vh] md:h-[60vh] flex items-center justify-center bg-[#1A1D29] text-white rounded-t-[2rem] md:rounded-t-[3rem] relative z-20 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-sand/10 to-transparent opacity-50 pointer-events-none" />
        
        <div className="text-center px-6 relative z-10 flex flex-col items-center">
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-12 md:mb-16 tracking-tight text-white">
            Vous avez un{' '}
            <span className="relative inline-block">
              <span className="text-sand relative z-10">projet ?</span>
              {/* Organic Hand-drawn SVG Underline */}
              <svg 
                className="absolute -bottom-3 md:-bottom-4 left-0 w-full h-4 md:h-6 text-sand" 
                viewBox="0 0 100 20" 
                preserveAspectRatio="none"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M 3 15 C 20 8 60 5 97 12" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M 15 18 C 40 12 70 10 90 15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  opacity="0.6"
                />
              </svg>
            </span>
          </h3>

          <FluidButton 
            href="#contact" 
            className="px-10 py-5 md:px-12 md:py-6 text-[#1A1D29] text-xl md:text-2xl font-bold" 
            bgClass="bg-white group-hover:bg-sand transition-colors duration-500"
          >
            Démarrer la discussion <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block ml-2" />
          </FluidButton>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            onNext={handleNextProject}
          />
        )}
      </AnimatePresence>

    </motion.section>
  );
};
