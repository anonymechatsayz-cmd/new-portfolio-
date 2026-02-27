import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
import { Portfolio } from './Portfolio';
import { Process } from './Process';
import { About } from './About';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { Contact } from './Contact';
import { Footer } from './Footer';

export const Home: React.FC = () => {
  useEffect(() => {
    const sections = [
      { id: 'hero', title: 'Clément Franjou | Développeur Web Freelance Next.js' },
      { id: 'services', title: 'Services | Clément Franjou' },
      { id: 'portfolio', title: 'Portfolio | Clément Franjou' },
      { id: 'process', title: 'Process | Clément Franjou' },
      { id: 'about', title: 'À Propos | Clément Franjou' },
      { id: 'testimonials', title: 'Témoignages | Clément Franjou' },
      { id: 'pricing', title: 'Tarifs | Clément Franjou' },
      { id: 'faq', title: 'FAQ | Clément Franjou' },
      { id: 'contact', title: 'Contact | Clément Franjou' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) {
              document.title = section.title;
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -20% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans antialiased selection:bg-petrol selection:text-white bg-cream">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <About />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
