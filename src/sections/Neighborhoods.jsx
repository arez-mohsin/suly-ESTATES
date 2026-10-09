import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Neighborhoods.module.css';
import { locations } from '../data/locations';

export const Neighborhoods = () => {
  return (
    <section className={styles.section} id="neighborhoods" data-header-theme="dark">
      <header className={styles.header}>
        <h2 className={`display-3 ${styles.title}`}>Neighborhoods with character</h2>
        <p className={styles.description}>
          From established residential districts to hillside addresses, discover some of Sulaymaniyah's most distinctive settings.
        </p>
      </header>
      
      <div className={styles.grid}>
        {locations.map(location => (
          <Link key={location.id} to="/#locations" className={styles.card}>
            <img 
              src={location.image} 
              alt={location.imageAlt} 
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
            <div className={styles.overlay}>
              <h3 className={styles.name}>{location.name}</h3>
              <p className={styles.desc}>{location.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
