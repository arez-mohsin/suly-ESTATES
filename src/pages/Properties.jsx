import React from 'react';
import { motion } from 'framer-motion';
import { properties } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { Reveal, TextReveal } from '../components/Motion';
import styles from './Properties.module.css';

export function Properties() {
  return (
    <motion.main 
      className={styles.page} 
      data-header-theme="dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
        
        <div className={styles.grid}>
          {properties.map((property, index) => (
            <Reveal key={property.id} delay={0.1 * (index % 4)}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
