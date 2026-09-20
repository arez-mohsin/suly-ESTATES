import React from 'react';
import styles from './PropertyCard.module.css';
import { Icons } from './Icons';

export const PropertyCard = ({ property }) => {
  return (
    <a href="#" className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={property.image} 
          alt={property.name} 
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{property.name}</h3>
          <span className={styles.location}>{property.location}</span>
        </div>
        
        {property.facts && (
          <div className={styles.facts}>
            <span>{property.facts.beds}</span>
            <span className={styles.dot}>•</span>
            <span>{property.facts.baths}</span>
            <span className={styles.dot}>•</span>
            <span>{property.facts.area}</span>
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.price}>{property.price}</span>
          <span className={styles.arrow}><Icons.ArrowRight /></span>
        </div>
      </div>
    </a>
  );
};
