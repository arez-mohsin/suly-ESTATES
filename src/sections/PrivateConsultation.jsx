import React from 'react';
import styles from './PrivateConsultation.module.css';
import { Button } from '../components/Button';
import { Stagger, StaggerItem, ImageReveal } from '../components/Motion';

export const PrivateConsultation = () => {
  return (
    <section className={styles.section} id="contact" data-header-theme="dark">
      <div className={styles.container}>
        <Stagger className={styles.content} staggerDelay={0.08}>
          <StaggerItem>
            <p className={`eyebrow ${styles.eyebrow}`}>Let's start a conversation</p>
          </StaggerItem>
          
          <StaggerItem y={16}>
            <h2 className={`display-2 ${styles.title}`}>
              Personal advice.<br />
              Extraordinary opportunities.
            </h2>
          </StaggerItem>
          
          <StaggerItem y={12}>
            <p className={styles.description}>
              Contact us to discuss acquiring or selling a property in Sulaymaniyah. We can provide further details on current listings or arrange a private viewing.
            </p>
          </StaggerItem>
          
          <StaggerItem y={12}>
            <Button variant="outline" onClick={() => window.dispatchEvent(new Event('open-consultation'))}>
              Request a Private Consultation
            </Button>
          </StaggerItem>
        </Stagger>

        <div className={styles.imageWrapper}>
          <ImageReveal scale={1.03} delay={0.1} duration={1.0}>
            <img 
              src="/images/consultation-bg.jpg" 
              alt="Private consultation space" 
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
};
