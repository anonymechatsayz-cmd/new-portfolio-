import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { scrollY } = useScroll();

  // Parallax / Scroll Transforms
  const headerY = useTransform(scrollY, [0, 100], [0, 20]);
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(26, 29, 41, 0)", "rgba(26, 29, 41, 0.85)"]);
  const headerBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);
  const headerShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 30px rgba(0,0,0,0.2)"]);
  
  const textColor = useTransform(scrollY, [0, 100], ["#1A1D29", "#FFFFFF"]);
  const buttonBg = useTransform(scrollY, [0, 100], ["#334155", "#FFFFFF"]);
  const buttonText = useTransform(scrollY, [0, 100], ["#FFFFFF", "#1A1D29"]);
  const logoText = useTransform(scrollY, [0, 100], ["#1A1D29", "#FFFFFF"]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Tarifs', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.nav
        style={{ y: headerY }}
        className="fixed top-0 left-0 right-0 z-50 py-4"
      >
        <div className="container mx-auto px-6 flex justify-center">
          <motion.div 
            style={{ 
              width: headerWidth, 
              backgroundColor: headerBg, 
              borderColor: headerBorder,
              boxShadow: headerShadow
            }}
            className="backdrop-blur-md rounded-full border px-4 py-2 md:px-6 md:py-3 flex justify-between items-center transition-all duration-300"
          >
            <motion.a 
              href="#" 
              className="text-xl font-bold tracking-tight flex items-center gap-2"
              whileHover="hover"
              initial="initial"
              onHoverStart={() => setIsLogoHovered(true)}
              onHoverEnd={() => setIsLogoHovered(false)}
            >
              <motion.span 
                className="w-8 h-8 bg-sand rounded-full flex items-center justify-center text-anthracite font-bold"
                variants={{ hover: { scale: 1.1, rotate: -10 } }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                C
              </motion.span>
              <motion.span 
                style={{ color: isLogoHovered ? "#D4A574" : logoText }}
                transition={{ duration: 0.2 }}
              >
                Clément Franjou
              </motion.span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  style={{ color: textColor }}
                  className="relative text-sm font-medium transition-colors hover:text-sand"
                  initial="initial"
                  whileHover="hover"
                >
                  {link.name}
                  <motion.span 
                    className="absolute left-0 -bottom-1 w-full h-px bg-sand origin-left"
                    variants={{
                      initial: { scaleX: 0 },
                      hover: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            <div className="hidden md:block">
              <motion.a
                href="#contact"
                style={{ backgroundColor: buttonBg, color: buttonText }}
                className="px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 group relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#D4A574", 
                  color: "#FFFFFF",
                  boxShadow: "0 0 20px rgba(212, 165, 116, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  default: { type: "spring", stiffness: 400, damping: 15 },
                  backgroundColor: { duration: 0.2 },
                  color: { duration: 0.2 }
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sand to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.a>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <motion.div style={{ color: textColor }}>
                <Menu />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="menu-main"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300
            }}
            className="fixed inset-0 z-[60] bg-anthracite text-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold">Menu</span>
              <motion.button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-2 hover:text-sand transition-colors"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X />
              </motion.button>
            </div>
            
            <div className="flex flex-col gap-6 text-2xl font-medium">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-sand transition-colors flex items-center justify-between group"
                >
                  {link.name}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 relative overflow-hidden group bg-gradient-to-r from-sand to-amber-600 text-white p-5 rounded-2xl text-center font-bold shadow-lg hover:shadow-sand/50 transition-all transform hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                  Démarrer un projet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
