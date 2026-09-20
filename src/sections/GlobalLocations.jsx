import React from 'react';
import styles from './GlobalLocations.module.css';
import { locations } from '../data/locations';

export const GlobalLocations = () => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={`display-3 ${styles.title}`}>A global perspective</h2>
        <p className={styles.description}>
          From the Mediterranean to Asia and beyond, we represent extraordinary homes in the world’s most sought-after destinations.
        </p>
      </header>
      
      <div className={styles.grid}>
        {locations.map(location => (
          <a key={location.id} href="#" className={styles.card}>
            <img 
              src={location.image} 
              alt={location.imageAlt} 
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <h3 className={styles.name}>{location.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
