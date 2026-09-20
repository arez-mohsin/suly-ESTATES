import React from 'react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <a href="/" className={styles.logo}>
            <span>SULY</span>
            <span>ESTATES</span>
          </a>
          <div className={styles.address}>
            <p>Sulaymaniyah</p>
            <p>Kurdistan Region, Iraq</p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <a href="#" className={styles.link}>Properties</a>
              <a href="#" className={styles.link}>Neighborhoods</a>
              <a href="#" className={styles.link}>Our Approach</a>
            </div>
            <div className={styles.linkGroup}>
              <a href="#" className={styles.link}>About</a>
              <a href="#" className={styles.link}>Contact</a>
            </div>
            <div className={styles.linkGroup}>
              <a href="#" className={styles.link}>Instagram</a>
              <a href="#" className={styles.link}>LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Suly Estates. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.link}>Privacy</a>
            <a href="#" className={styles.link}>Terms</a>
            <a href="#" className={styles.link}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
