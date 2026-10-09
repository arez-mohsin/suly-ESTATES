import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignatureResidence.module.css';
import { Button } from '../components/Button';
import { ImageReveal, Stagger, StaggerItem } from '../components/Motion';

export const SignatureResidence = () => {
  return (
    <section className={styles.section} data-header-theme="dark">
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <ImageReveal scale={1.035} duration={1.0}>
            <img 
              src="/images/goizha-living.jpg" 
              alt="Goizha Residence overlooking Sulaymaniyah" 
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </ImageReveal>
        </div>
        
        <Stagger className={styles.content} staggerDelay={0.07} delay={0.1}>
          <StaggerItem>
            <p className={`eyebrow ${styles.eyebrow}`}>Signature Property</p>
          </StaggerItem>
          <StaggerItem y={16}>
            <h2 className={`display-2 ${styles.title}`}>
              Goizha Residence
            </h2>
          </StaggerItem>
          <StaggerItem y={12}>
            <p className={styles.location}>Goizha, Sulaymaniyah</p>
          </StaggerItem>
          <StaggerItem y={12}>
            <p className={styles.description}>
              A contemporary hillside residence overlooking Sulaymaniyah, combining private landscaped grounds, expansive living spaces and panoramic mountain and city views.
            </p>
          </StaggerItem>
          
          <StaggerItem y={12}>
            <div className={styles.actions}>
              <Button as={Link} to="/properties/goizha-residence" variant="primary">Explore Residence</Button>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};
