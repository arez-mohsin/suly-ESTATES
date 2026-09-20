import React from 'react';
import styles from './FeaturedListings.module.css';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/Button';
import { properties } from '../data/properties';

export const FeaturedListings = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className="eyebrow">Curated for a remarkable life</p>
          <h2 className={`display-3 ${styles.title}`}>Featured Listings</h2>
        </div>
        <Button variant="link">View all properties</Button>
      </div>

      <div className={styles.grid}>
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};
