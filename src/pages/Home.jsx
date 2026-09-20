import React from 'react';
import { Hero } from '../sections/Hero';
import { FeaturedListings } from '../sections/FeaturedListings';
import { SignatureResidence } from '../sections/SignatureResidence';
import { OurApproach } from '../sections/OurApproach';
import { Neighborhoods } from '../sections/Neighborhoods';
import { PropertyLocationMap } from '../sections/PropertyLocationMap';
import { About } from '../sections/About';
import { PrivateConsultation } from '../sections/PrivateConsultation';

export function Home() {
  return (
    <main>
      <Hero />
      <FeaturedListings />
      <SignatureResidence />
      <OurApproach />
      <Neighborhoods />
      <PropertyLocationMap />
      <About />
      <PrivateConsultation />
    </main>
  );
}
