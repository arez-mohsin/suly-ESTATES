import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const getInitialNetworkState = () => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    return navigator.connection.saveData === true;
  }
  return false;
};

const getInitialConstrainedState = () => {
  if (typeof navigator !== 'undefined') {
    if ('connection' in navigator) {
      const effectiveType = navigator.connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        return true;
      }
    }
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    if (memory < 4 || cores < 4) {
      return true;
    }
  }
  return false;
};

export function usePerformanceProfile() {
  const shouldReduceMotion = useReducedMotion();
  const [saveData, setSaveData] = useState(getInitialNetworkState);
  const [isConstrained, setIsConstrained] = useState(getInitialConstrainedState);

  useEffect(() => {
    // Optional: listen to change events if we want dynamic updates
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const handleChange = () => {
        setSaveData(connection.saveData === true);
        const effectiveType = connection.effectiveType;
        const constrained = effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g';
        setIsConstrained(constrained);
      };
      connection.addEventListener('change', handleChange);
      return () => connection.removeEventListener('change', handleChange);
    }
  }, []);

  return {
    reduceMotion: !!shouldReduceMotion,
    saveData,
    constrainedDevice: isConstrained,
    allowParallax: !shouldReduceMotion && !isConstrained,
    allowBackdropBlur: !isConstrained
  };
}
