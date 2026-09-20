import React from 'react';
import styles from './OurApproach.module.css';

export const OurApproach = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={`display-2 ${styles.title}`}>
            Homes for<br />
            a more intentional life.
          </h2>
          <p className={styles.description}>
            A home is more than an address. We focus on considered properties across Sulaymaniyah—places defined by architecture, setting and how they feel to live in.
          </p>
          <blockquote className={styles.quote}>
            "True luxury is not about excess, but the perfect proportion of space, light, and nature."
          </blockquote>
        </div>
        
        <div className={styles.imageWrapper}>
          <img 
            src="/images/approach.jpg" 
            alt="Beautifully composed premium interior in a Sulaymaniyah residence" 
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};
