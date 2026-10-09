import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Neighborhoods.module.css';
import { locations } from '../data/locations';
import { Reveal, Stagger, StaggerItem, ImageReveal } from '../components/Motion';

export const Neighborhoods = () => {
  return (
    <section className={styles.section} id="neighborhoods" data-header-theme="dark">
      <header className={styles.header}>
        <Reveal>
          <h2 className={`display-3 ${styles.title}`}>Neighborhoods with character</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.description}>
            From established residential districts to hillside addresses, discover some of Sulaymaniyah's most distinctive settings.
          </p>
        </Reveal>
      </header>
      
      <Stagger staggerDelay={0.06} delay={0.2} className={styles.grid}>
        {locations.map(location => (
          <StaggerItem key={location.id} y={16}>
            <Link to="/#locations" className={styles.card}>
              <ImageReveal scale={1.025} duration={1.0} className={styles.imageRevealContainer}>
                <img 
                  src={location.image} 
                  alt={location.imageAlt} 
                  loading="lazy"
                  decoding="async"
                  className={styles.image}
                />
              </ImageReveal>
              <div className={styles.overlay}>
                <h3 className={styles.name}>{location.name}</h3>
                <p className={styles.desc}>{location.description}</p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};
