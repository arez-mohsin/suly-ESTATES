import React from 'react';
import styles from './PrivateConsultation.module.css';
import { Button } from '../components/Button';

export const PrivateConsultation = () => {
  return (
    <section className={styles.section} id="contact" data-header-theme="dark">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`eyebrow ${styles.eyebrow}`}>Let's start a conversation</p>
          
          <h2 className={`display-2 ${styles.title}`}>
            Personal advice.<br />
            Extraordinary opportunities.
          </h2>
          
          <p className={styles.description}>
            Whether you're looking to buy, sell, or simply explore what's possible in Sulaymaniyah, our team is here to help—with discretion and insight.
          </p>
          
          <Button variant="outline" onClick={() => window.dispatchEvent(new Event('open-consultation'))}>
            Request a Private Consultation
          </Button>
        </div>

        <div className={styles.imageWrapper}>
          <img 
            src="/images/consultation-bg.jpg" 
            alt="Private consultation space" 
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
};
