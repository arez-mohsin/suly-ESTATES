import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { Reveal, Stagger, StaggerItem } from './Motion';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Stagger className={styles.top} staggerDelay={0.05}>
          <StaggerItem y={10}>
            <Link to="/" className={styles.logo}>
              <span>SULY</span>
              <span>ESTATES</span>
            </Link>
          </StaggerItem>
          
          <StaggerItem y={10}>
            <div className={styles.address}>
              <p>Sulaymaniyah</p>
              <p>Kurdistan Region, Iraq</p>
            </div>
          </StaggerItem>
          
          <StaggerItem y={10} className={styles.links}>
            <div className={styles.linkGroup}>
              <Link to="/properties" className={styles.link}>Properties</Link>
              <Link to="/#neighborhoods" className={styles.link}>Neighborhoods</Link>
              <Link to="/#approach" className={styles.link}>Our Approach</Link>
            </div>
            <div className={styles.linkGroup}>
              <Link to="/#about" className={styles.link}>About</Link>
              <Link to="/#contact" className={styles.link}>Contact</Link>
            </div>
          </StaggerItem>
        </Stagger>
        
        <Reveal y={0} duration={0.5} delay={0.2} className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Suly Estates. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link to="/privacy" className={styles.link}>Privacy</Link>
            <Link to="/terms" className={styles.link}>Terms</Link>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};
