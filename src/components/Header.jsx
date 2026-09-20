import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { MenuIcon, CloseIcon } from './Icons';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [headerTheme, setHeaderTheme] = useState('transparent');
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset theme to transparent on top if on home page
    const handleScroll = () => {
      if (window.scrollY < 50 && location.pathname === '/') {
        setHeaderTheme('transparent');
        setActiveSection('');
      }
    };
    
    // Observer for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-header-theme');
          const id = entry.target.id;
          
          if (id) setActiveSection(id);
          
          if (window.scrollY > 50 || location.pathname !== '/') {
            if (theme) {
              setHeaderTheme(theme);
            }
          }
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });

    // Re-query sections after slight delay to ensure DOM is ready on route change
    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll('[data-header-theme]');
      sections.forEach(s => observer.observe(s));
      
      // Initial scroll check
      if (window.scrollY < 50 && location.pathname === '/') {
        setHeaderTheme('transparent');
      } else if (location.pathname !== '/') {
        // Ensure default dark theme on other pages if no theme section is hit
        setHeaderTheme(prev => document.querySelector('[data-header-theme]') ? prev : 'dark');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const navLinks = [
    { name: 'Properties', href: '/#properties', id: 'properties' },
    { name: 'Neighborhoods', href: '/#neighborhoods', id: 'neighborhoods' },
    { name: 'Our Approach', href: '/#approach', id: 'approach' },
    { name: 'About', href: '/#about', id: 'about' },
  ];

  const headerClass = `${styles.header} ${styles[`theme-${headerTheme}`] || styles['theme-dark']}`;

  return (
    <>
      <header className={headerClass}>
        <Link to="/" className={styles.logo}>
          <span>SULY</span>
          <span>ESTATES</span>
        </Link>

        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && location.pathname === '/';
              return (
                <li key={link.name}>
                  <Link to={link.href} className={`${styles.navLink} ${isActive ? styles.active : ''}`}>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button variant="outline" className={styles.inquireBtn} icon={false}>Inquire</Button>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.mobileMenuHeader}>
              <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                <span>SULY</span>
                <span>ESTATES</span>
              </Link>
              <button 
                className={styles.mobileMenuBtn} 
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon size={28} />
              </button>
            </div>
            
            <nav className={styles.mobileNav}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Link 
                    to={link.href} 
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
