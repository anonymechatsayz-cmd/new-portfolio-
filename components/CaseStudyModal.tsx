import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Target, Lightbulb, TrendingUp } from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    description: string;
    image: string;
    stats: string;
    challenges: string[];
    solutions: string[];
    results: string[];
  } | null;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-anthracite/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] md:max-h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl pointer-events-auto relative flex flex-col md:flex-row">
              
              {/* Close Button (Floating) */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-gray-100 transition-all shadow-lg border border-gray-100 group"
              >
                <X className="w-6 h-6 text-anthracite group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Left Column: Image & Hero (Desktop) */}
              <div className="w-full md:w-[45%] h-64 md:h-full relative flex-shrink-0">
                <div className="absolute inset-0 bg-anthracite/10 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/90 via-anthracite/40 to-transparent z-20 flex flex-col justify-end p-8 md:p-10">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sand font-bold tracking-widest uppercase text-xs mb-3 inline-block px-3 py-1 bg-anthracite/50 backdrop-blur-sm rounded-full w-fit"
                  >
                    {project.category}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-white leading-tight"
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>

              {/* Right Column: Content (Scrollable) */}
              <div className="w-full md:w-[55%] h-full overflow-y-auto bg-white custom-scrollbar">
                <div className="p-8 md:p-12">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-lg leading-relaxed mb-10 font-medium"
                  >
                    {project.description}
                  </motion.p>

                  <div className="space-y-10">
                    {/* Challenges */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xl font-bold text-anthracite mb-4 flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <Target className="w-5 h-5 text-red-500" />
                        </div>
                        Le Défi
                      </h3>
                      <ul className="space-y-3 pl-2">
                        {project.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start gap-3 text-sm md:text-base">
                            <span className="mt-2 w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-xl font-bold text-anthracite mb-4 flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-blue-500" />
                        </div>
                        La Solution
                      </h3>
                      <ul className="space-y-3 pl-2">
                        {project.solutions.map((solution, idx) => (
                          <li key={idx} className="text-gray-600 flex items-start gap-3 text-sm md:text-base">
                            <span className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Results */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-gradient-to-br from-sand/10 to-transparent p-6 rounded-2xl border border-sand/20"
                    >
                      <h3 className="text-xl font-bold text-anthracite mb-4 flex items-center gap-3">
                        <div className="p-2 bg-sand/20 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-anthracite" />
                        </div>
                        Résultats
                      </h3>
                      <ul className="space-y-3">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="text-anthracite font-medium flex items-start gap-3 text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-sand flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400 font-medium">
                      Projet réalisé en 2024
                    </div>
                    <a 
                      href="#contact"
                      onClick={onClose}
                      className="w-full sm:w-auto px-8 py-3 bg-anthracite text-white rounded-full font-bold hover:bg-sand transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    >
                      Discuter d'un projet similaire
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
