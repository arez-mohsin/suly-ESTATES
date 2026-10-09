import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePerformanceProfile } from '../hooks/usePerformanceProfile';

const EASE_PREMIUM = [0.21, 0.47, 0.32, 0.98];

export const Reveal = ({ children, delay = 0, y = 16, duration = 0.7, className }) => {
  const { reduceMotion, constrainedDevice } = usePerformanceProfile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialY = constrainedDevice ? 8 : y;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: initialY }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: initialY }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
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
            transition={{ duration: 0.8, delay: delay + (i * 0.08), ease: EASE_PREMIUM }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};

export const Stagger = ({ children, staggerDelay = 0.06, delay = 0, className, as: Component = 'div' }) => {
  const { reduceMotion } = usePerformanceProfile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay
            }
          }
        }}
        style={{ display: 'contents' }}
      >
        {children}
      </motion.div>
    </Component>
  );
};

export const StaggerItem = ({ children, y = 14, className, as: Component = 'div' }) => {
  const { reduceMotion, constrainedDevice } = usePerformanceProfile();

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const initialY = constrainedDevice ? 8 : y;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: initialY },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } }
      }}
      className={className}
      as={Component}
    >
      {children}
    </motion.div>
  );
};

export const ImageReveal = ({ children, delay = 0, scale = 1.03, duration = 1.0, className }) => {
  const { reduceMotion, constrainedDevice } = usePerformanceProfile();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initialScale = constrainedDevice ? 1 : scale;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: initialScale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: initialScale }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};
