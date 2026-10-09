/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
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
    // Only constrain if the API explicitly reports low resources.
    if ('deviceMemory' in navigator || 'hardwareConcurrency' in navigator) {
      const memory = navigator.deviceMemory || 8;
      const cores = navigator.hardwareConcurrency || 8;
      if (memory < 4 || cores < 4) {
        return true;
      }
    }
  }
  return false;
};

const PerformanceContext = createContext({
  reduceMotion: false,
  saveData: false,
  constrainedDevice: false,
  allowParallax: true,
  allowBackdropBlur: true
});

export const PerformanceProfileProvider = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const [saveData, setSaveData] = useState(getInitialNetworkState);
  const [isConstrained, setIsConstrained] = useState(getInitialConstrainedState);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      const handleChange = () => {
        setSaveData(connection.saveData === true);
        const effectiveType = connection.effectiveType;
        const constrained = effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g';
        
        let memoryConstrained = false;
        if ('deviceMemory' in navigator || 'hardwareConcurrency' in navigator) {
          const memory = navigator.deviceMemory || 8;
          const cores = navigator.hardwareConcurrency || 8;
          memoryConstrained = memory < 4 || cores < 4;
        }

        setIsConstrained(constrained || memoryConstrained);
      };
      connection.addEventListener('change', handleChange);
      return () => connection.removeEventListener('change', handleChange);
    }
  }, []);

  const value = {
    reduceMotion: !!shouldReduceMotion,
    saveData,
    constrainedDevice: isConstrained,
    allowParallax: !shouldReduceMotion && !isConstrained && !saveData,
    allowBackdropBlur: !isConstrained && !saveData
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

export function usePerformanceProfile() {
  return useContext(PerformanceContext);
}
