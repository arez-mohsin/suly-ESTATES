import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './OurApproach.module.css';
import { Reveal, TextReveal, EditorialImageReveal } from '../components/Motion';
import { usePerformanceProfile } from '../hooks/usePerformanceProfile';

const EASE_PREMIUM = [0.21, 0.47, 0.32, 0.98];

export const OurApproach = () => {
  const { reduceMotion } = usePerformanceProfile();
  const quoteRef = useRef(null);
  const isQuoteInView = useInView(quoteRef, { once: true, margin: "-10% 0px" });

  return (
    <section className={styles.section} id="approach" data-header-theme="light">
      <div className={styles.container}>
        <div className={styles.content}>
          <TextReveal as="h2" text={"Homes for\na more intentional life."} className={`display-2 ${styles.title}`} />
          
          <Reveal y={14} delay={0.2}>
            <p className={styles.description}>
              A home is more than an address. We focus on considered properties across Sulaymaniyah—places defined by architecture, setting and how they feel to live in.
            </p>
          </Reveal>
          
          <Reveal y={12} delay={0.3}>
            <blockquote className={styles.quote} ref={quoteRef}>
              {!reduceMotion && (
                <motion.div 
                  className={styles.quoteRule}
                  initial={{ scaleY: 0 }}
                  animate={isQuoteInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE_PREMIUM }}
                />
              )}
              "True luxury is not about excess, but the perfect proportion of space, light, and nature."
            </blockquote>
          </Reveal>
        </div>
        
        <div className={styles.imageWrapper}>
          <EditorialImageReveal theme="light">
            <img 
              src="/images/approach.jpg" 
              alt="Beautifully composed premium interior in a Sulaymaniyah residence" 
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
