import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Rely on native browser scroll restoration for POP (back/forward)
    if (navType !== 'POP') {
      if (location.hash) {
        // Wait for potential page transitions and DOM mounting
        setTimeout(() => {
          const id = location.hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location, navType]);

  return null;
}
