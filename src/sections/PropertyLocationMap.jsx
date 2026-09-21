import React from 'react';
import styles from './PropertyLocationMap.module.css';

export const PropertyLocationMap = () => {
  return (
    <section className={styles.section} id="locations" data-header-theme="dark">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className="eyebrow">Location</p>
          <h2 className="display-3">Based in Sulaymaniyah</h2>
          <p className={styles.description}>
            A focused collection of residential property across Sulaymaniyah and its surrounding neighborhoods.
          </p>
        </div>
        <div className={styles.mapWrapper}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103328.71804598914!2d45.36780373024844!3d35.565403565135116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40002d9bb47e3831%3A0xc36a75f8f845014b!2sSulaymaniyah%2C%20Kurdistan%20Region%2C%20Iraq!5e0!3m2!1sen!2sus!4v1714571987541!5m2!1sen!2sus" 
            className={styles.mapIframe}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Map of Sulaymaniyah, Iraq"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
