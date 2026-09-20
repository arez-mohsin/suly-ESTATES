import React from 'react';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { FeaturedListings } from './sections/FeaturedListings';
import { SignatureResidence } from './sections/SignatureResidence';
import { OurApproach } from './sections/OurApproach';
import { Neighborhoods } from './sections/Neighborhoods';
import { PrivateConsultation } from './sections/PrivateConsultation';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedListings />
        <SignatureResidence />
        <OurApproach />
        <Neighborhoods />
        <PrivateConsultation />
      </main>
      <Footer />
    </>
  );
}

export default App;
