import React from 'react';
import { motion } from 'framer-motion';
import { usePerformanceProfile } from '../hooks/usePerformanceProfile';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }
};

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const PageTransition = ({ children, className }) => {
  const { reduceMotion } = usePerformanceProfile();

  return (
    <motion.main
      className={className}
      variants={reduceMotion ? reducedMotionVariants : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  );
};
