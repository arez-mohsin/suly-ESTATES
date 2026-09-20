import React from 'react';
import styles from './About.module.css';
import { Reveal, TextReveal } from '../components/Motion';

export const About = () => {
  return (
    <section className={styles.section} id="about" data-header-theme="light">
      <div className={styles.container}>
        <div className={styles.content}>
          <TextReveal as="h2" className="display-3" text="Redefining luxury real estate in Sulaymaniyah." />
          <div className={styles.textColumns}>
            <Reveal delay={0.2}>
              <p className={styles.paragraph}>
                Suly Estates is a specialized agency focused exclusively on exceptional residential properties. We believe that a home is more than a structure—it is a foundation for life, shaped by its architecture and setting.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className={styles.paragraph}>
                By curating only the most distinctive residences in the region, we provide our clients with uncompromising quality and an elevated standard of living.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
