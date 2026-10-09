import React from 'react';
import { properties } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { Reveal, TextReveal, Stagger, StaggerItem } from '../components/Motion';
import { PageTransition } from '../components/PageTransition';
import styles from './Properties.module.css';

export function Properties() {
  return (
    <PageTransition
      className={styles.page}
      data-header-theme="dark"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <TextReveal 
            as="h1" 
            className={`display-2 ${styles.title}`} 
            text="Exceptional Residences" 
          />
          <Reveal delay={0.2}>
            <p className={styles.description}>
              Explore our curated collection of architectural homes across Sulaymaniyah, 
              each selected for its unique design and quality of life.
            </p>
          </Reveal>
        </div>
        
        <Stagger staggerDelay={0.06} delay={0.3} className={styles.grid}>
          {properties.map((property) => (
            <StaggerItem key={property.id} y={16}>
              <PropertyCard property={property} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </PageTransition>
  );
}
