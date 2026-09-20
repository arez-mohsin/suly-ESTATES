import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignatureResidence.module.css';
import { Button } from '../components/Button';

export const SignatureResidence = () => {
  return (
    <section className={styles.section} data-header-theme="dark">
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <img 
            src="/images/goizha-hero.jpg" 
            alt="Goizha Residence overlooking Sulaymaniyah" 
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
        </div>
        
        <div className={styles.contentCol}>
          <p className={`eyebrow ${styles.eyebrow}`}>Signature Property</p>
          <h2 className={`display-2 ${styles.title}`}>
            Goizha Residence<br />
            Goizha, Sulaymaniyah
          </h2>
          <p className={styles.description}>
            A contemporary hillside residence overlooking Sulaymaniyah, combining private landscaped grounds, expansive living spaces and panoramic mountain and city views.
          </p>
          
          <div className={styles.actions}>
            <Button as={Link} to="/properties/goizha-residence" variant="primary">Explore Residence</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
