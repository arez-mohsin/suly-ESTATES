import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePerformanceProfile } from '../hooks/usePerformanceProfile';

export const Reveal = ({ children, delay = 0, y = 24, className }) => {
  const { reduceMotion } = usePerformanceProfile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

export const TextReveal = ({ text, delay = 0, className, as: Component = 'div' }) => {
  const { reduceMotion } = usePerformanceProfile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (reduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const lines = text.split('\n');

  return (
    <Component ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{ duration: 0.8, delay: delay + (i * 0.1), ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
