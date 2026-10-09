import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignatureResidence.module.css';
import { Button } from '../components/Button';
import { EditorialImageReveal, Stagger, StaggerItem, TextReveal, Divider } from '../components/Motion';

export const SignatureResidence = () => {
  return (
    <section className={styles.section} data-header-theme="dark">
      <Divider className={styles.divider} />
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <EditorialImageReveal theme="dark">
            <img 
              src="/images/goizha-living.jpg" 
              alt="Goizha Residence overlooking Sulaymaniyah" 
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </EditorialImageReveal>
        </div>
        
        <Stagger className={styles.content} staggerDelay={0.06} delay={0.1}>
          <StaggerItem>
            <p className={`eyebrow ${styles.eyebrow}`}>Signature Property</p>
          </StaggerItem>
          <TextReveal as="h2" text="Goizha Residence" className={`display-2 ${styles.title}`} />
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
