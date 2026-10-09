import React from 'react';
import styles from './PrivateConsultation.module.css';
import { Button } from '../components/Button';
import { Stagger, StaggerItem, EditorialImageReveal, TextReveal } from '../components/Motion';

export const PrivateConsultation = () => {
  return (
    <section className={styles.section} id="contact" data-header-theme="dark">
      <div className={styles.container}>
        <Stagger className={styles.content} staggerDelay={0.06}>
          <StaggerItem>
            <p className={`eyebrow ${styles.eyebrow}`}>Let's start a conversation</p>
          </StaggerItem>
          
          <TextReveal as="h2" text={"Personal advice.\nExtraordinary opportunities."} className={`display-2 ${styles.title}`} />
          
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
          <EditorialImageReveal delay={0.1} theme="dark">
            <img 
              src="/images/consultation-bg.jpg" 
              alt="Private consultation space" 
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </EditorialImageReveal>
        </div>
      </div>
    </section>
  );
};
