import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Link to="/" className={styles.logo}>
            <span>SULY</span>
            <span>ESTATES</span>
          </Link>
          <div className={styles.address}>
            <p>Sulaymaniyah</p>
            <p>Kurdistan Region, Iraq</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <Link to="/properties" className={styles.link}>Properties</Link>
              <Link to="/#neighborhoods" className={styles.link}>Neighborhoods</Link>
              <Link to="/#approach" className={styles.link}>Our Approach</Link>
            </div>
            <div className={styles.linkGroup}>
              <Link to="/#about" className={styles.link}>About</Link>
              <Link to="/#contact" className={styles.link}>Contact</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Suly Estates. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link to="/privacy" className={styles.link}>Privacy</Link>
            <Link to="/terms" className={styles.link}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
