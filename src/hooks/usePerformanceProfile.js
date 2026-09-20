import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export function usePerformanceProfile() {
  const shouldReduceMotion = useReducedMotion();
  const [saveData, setSaveData] = useState(false);
  const [isConstrained, setIsConstrained] = useState(false);

  useEffect(() => {
    // Check if user has requested data savings
    if ('connection' in navigator) {
      if (navigator.connection.saveData) {
        setSaveData(true);
      }
      
      // Check if network is slow
      const effectiveType = navigator.connection.effectiveType;
      if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
        setIsConstrained(true);
      }
    }

    // Check device capability via hardware concurrency and device memory
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    
    if (memory < 4 || cores < 4) {
      setIsConstrained(true);
    }
  }, []);

  return {
    reduceMotion: shouldReduceMotion || isConstrained,
    saveData,
    constrainedDevice: isConstrained
  };
}
