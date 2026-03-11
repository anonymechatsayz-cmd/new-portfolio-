import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { Home } from './components/Home';
import { ProjectPage } from './components/ProjectPage';
import { NotFound } from './components/NotFound';

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      <Home />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/projet/:id" element={<ProjectPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <AppRoutes />
    </SmoothScroll>
  );
};

export default App;
