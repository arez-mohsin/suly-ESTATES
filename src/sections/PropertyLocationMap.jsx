import React from 'react';
import styles from './PropertyLocationMap.module.css';

export const PropertyLocationMap = () => {
  return (
    <section className={styles.section} id="locations" data-header-theme="dark">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="display-3">Selected Locations</h2>
          <p className={styles.description}>
            Our portfolio covers the most desirable neighborhoods in Sulaymaniyah, 
            from the elevation of Goizha to the lush surroundings of Sarchinar.
          </p>
        </div>
        <div className={styles.mapWrapper}>
          <svg viewBox="0 0 800 500" className={styles.mapSvg} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 250 Q300 150 400 300 T700 200" stroke="var(--color-border-dark)" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="200" cy="220" r="8" fill="var(--color-off-white)" />
            <text x="200" y="245" fill="var(--color-off-white)" className={styles.mapText} textAnchor="middle">Tasluja</text>
            
            <circle cx="350" cy="280" r="8" fill="var(--color-off-white)" />
            <text x="350" y="305" fill="var(--color-off-white)" className={styles.mapText} textAnchor="middle">Bakrajo</text>
            
            <circle cx="480" cy="210" r="8" fill="var(--color-off-white)" />
            <text x="480" y="235" fill="var(--color-off-white)" className={styles.mapText} textAnchor="middle">Sarchinar</text>
            
            <circle cx="650" cy="180" r="8" fill="var(--color-off-white)" />
            <text x="650" y="205" fill="var(--color-off-white)" className={styles.mapText} textAnchor="middle">Goizha</text>
          </svg>
        </div>
      </div>
    </section>
  );
};
