import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { FluidButton } from './FluidButton';
import { LegalModal } from './LegalModal';

const FooterLink = ({ href, children, onClick }: { href?: string, children: React.ReactNode, onClick?: () => void }) => (
  <motion.a 
    href={href}
    onClick={onClick}
    className="relative inline-block hover:text-sand transition-colors group cursor-pointer"
    whileHover="hover"
  >
    {children}
    <motion.span 
      className="absolute left-0 bottom-0 h-px bg-sand w-full"
      initial={{ scaleX: 0 }}
      variants={{ hover: { scaleX: 1 } }}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
);

export const Footer = () => {
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'mentions' | 'cgv' | null }>({
    isOpen: false,
    type: null
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegal = (type: 'mentions' | 'cgv') => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <footer className="bg-anthracite text-white pt-24 pb-12 border-t border-white/10 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24 text-center md:text-left">
          <div className="max-w-xl mx-auto md:mx-0">
            <h2 className="text-5xl md:text-7xl font-bold font-serif mb-8 tracking-tight">
              Travaillons <br />
              <span className="text-sand">ensemble.</span>
            </h2>
            <a 
              href="mailto:contact@clementfranjou.fr" 
              className="text-2xl md:text-3xl text-gray-400 hover:text-white transition-colors flex items-center justify-center md:justify-start gap-4 group mb-8"
            >
              contact@clementfranjou.fr
              <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            
            <div className="flex justify-center md:justify-start">
              <FluidButton href="#contact">
                Réserver un appel <ArrowRight className="w-5 h-5" />
              </FluidButton>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-16 mx-auto md:mx-0">
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Menu</h3>
              <ul className="space-y-4 text-gray-400">
                <li><FooterLink href="#services">Services</FooterLink></li>
                <li><FooterLink href="#portfolio">Portfolio</FooterLink></li>
                <li><FooterLink href="#process">Process</FooterLink></li>
                <li><FooterLink href="#pricing">Tarifs</FooterLink></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Socials</h3>
              <ul className="space-y-4 text-gray-400">
                <li><FooterLink href="https://www.linkedin.com/in/clement-franjou/">LinkedIn</FooterLink></li>
                <li><FooterLink href="https://twitter.com/clementfranjou">Twitter</FooterLink></li>
                <li><FooterLink href="https://www.instagram.com/clementfranjou/">Instagram</FooterLink></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            © {new Date().getFullYear()} Clément Franjou. Tous droits réservés.
          </div>
          <div className="flex gap-8">
            <FooterLink onClick={() => openLegal('mentions')}>Mentions Légales</FooterLink>
            <FooterLink onClick={() => openLegal('cgv')}>CGV</FooterLink>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5 text-sand group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        type={legalModal.type} 
      />
    </footer>
  );
};
