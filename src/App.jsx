import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollManager } from './components/ScrollManager';
import { GlobalConsultationModal } from './components/GlobalConsultationModal';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { LegalPage } from './pages/LegalPage';

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollManager />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/privacy" element={<LegalPage title="Privacy Policy" type="privacy" />} />
          <Route path="/terms" element={<LegalPage title="Terms of Service" type="terms" />} />
          <Route path="*" element={
            <main style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center', minHeight: '80vh' }}>
              <h1 className="display-3" style={{ marginBottom: '1rem' }}>Page not found</h1>
              <p style={{ color: 'var(--color-muted-text)' }}>The page you are looking for does not exist.</p>
            </main>
          } />
        </Routes>
      </AnimatePresence>
      <GlobalConsultationModal />
      <Footer />
    </>
  );
}

export default App;
