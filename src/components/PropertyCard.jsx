import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PropertyCard.module.css';
import { Icons } from './Icons';

export const PropertyCard = ({ property }) => {
  return (
    <Link
      to={`/properties/${property.slug}`}
      className={styles.card}
      data-qa="property-card"
      data-qa-slug={property.slug}
    >
      <div className={styles.imageWrapper}>
        <img 
          src={property.heroImage || property.image} 
          alt={property.name} 
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{property.name}</h3>
          <span className={styles.location}>{property.approximateLocation || property.location}</span>
        </div>
        
        <div className={styles.facts}>
          <span>{property.bedrooms} Beds</span>
          <span className={styles.dot}>•</span>
          <span>{property.bathrooms} Baths</span>
          <span className={styles.dot}>•</span>
          <span>{property.interiorArea} m²</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{property.price}</span>
          <span className={styles.arrow}><Icons.ArrowRight /></span>
        </div>
      </div>
    </Link>
  );
};
