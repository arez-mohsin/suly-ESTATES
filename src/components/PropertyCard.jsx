import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PropertyCard.module.css';
import { Icons } from './Icons';
import { ImageReveal } from './Motion';

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

export const PropertyCard = ({ property }) => {
  return (
    <MotionLink
      to={`/properties/${property.slug}`}
      className={styles.card}
      data-qa="property-card"
      data-qa-slug={property.slug}
      whileTap={{ scale: 0.995, transition: { duration: 0.1 } }}
    >
      <div className={styles.imageWrapper}>
        <ImageReveal scale={1.025} duration={1.0} className={styles.imageRevealContainer}>
          <img 
            src={property.heroImage || property.image} 
            alt={property.name} 
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
        </ImageReveal>
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
    </MotionLink>
  );
};
