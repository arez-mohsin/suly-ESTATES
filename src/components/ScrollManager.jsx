import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useSmoothScroll } from '../providers/SmoothScrollProvider';

export function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const { lenis, isSmooth } = useSmoothScroll();

  useEffect(() => {
    // Rely on native browser scroll restoration for POP (back/forward)
    if (navType !== 'POP') {
      // Stop residual lenis momentum on route change
      if (lenis) {
        lenis.stop();
        lenis.start();
      }

      if (location.hash) {
        // Wait for potential page transitions and DOM mounting
        setTimeout(() => {
          const id = location.hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            if (lenis && isSmooth) {
              lenis.scrollTo(element, { offset: -60 });
            } else {
              const y = element.getBoundingClientRect().top + window.pageYOffset - 60;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }
        }, 100);
      } else {
        if (lenis && isSmooth) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
    }
  }, [location, navType, lenis, isSmooth]);

  return null;
}
