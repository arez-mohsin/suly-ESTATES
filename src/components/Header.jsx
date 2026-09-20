import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { MenuIcon, CloseIcon } from './Icons';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navLinks = [
    { name: 'Properties', href: '#' },
    { name: 'Neighborhoods', href: '#' },
    { name: 'Our Approach', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <a href="/" className={styles.logo}>
          <span>SULY</span>
          <span>ESTATES</span>
        </a>

        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={styles.navLink}>{link.name}</a>
              </li>
            ))}
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
              <a href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                <span>SULY</span>
                <span>ESTATES</span>
              </a>
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
                <motion.a 
                  key={link.name}
                  href={link.href} 
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
