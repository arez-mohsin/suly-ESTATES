/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { usePerformanceProfile } from '../hooks/usePerformanceProfile';

const SmoothScrollContext = createContext({
  lenis: null,
  isSmooth: false,
});

export const ENABLE_SMOOTH_SCROLL = true;

export const SmoothScrollProvider = ({ children }) => {
  const { reduceMotion, constrainedDevice } = usePerformanceProfile();
  const [lenisInstance, setLenisInstance] = useState(null);
  const isEnabled = ENABLE_SMOOTH_SCROLL && !reduceMotion && !constrainedDevice;

  useEffect(() => {
    if (!isEnabled) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false, // Preserve native mobile touch
      wheelMultiplier: 0.95,
      lerp: 0.1,
      autoRaf: true, // Use built-in RAF loop
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenisInstance(lenis);

    // Provide a global window reference for easy access in non-React files if needed, but Context is preferred.
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      setLenisInstance(null);
      delete window.lenis;
    };
  }, [isEnabled]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, isSmooth: isEnabled }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);
