import React from 'react';
import styles from './About.module.css';
import { Reveal, TextReveal } from '../components/Motion';

export const About = () => {
  return (
    <section className={styles.section} id="about" data-header-theme="light">
      <div className={styles.container}>
        <div className={styles.content}>
          <TextReveal as="h2" className="display-3" text="A considered approach to property in Sulaymaniyah." />
          <div className={styles.textColumns}>
            <Reveal delay={0.2}>
              <p className={styles.paragraph}>
                We focus on carefully presented residential property across Sulaymaniyah, with attention to architecture, setting and the information buyers actually need.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className={styles.paragraph}>
                Our approach is straightforward: thoughtful presentation, clear property details and private conversations when a home feels worth exploring.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
