import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedListings.module.css';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/Button';
import { properties } from '../data/properties';

export const FeaturedListings = () => {
  return (
    <section className={styles.section} id="properties" data-header-theme="dark">
      <div className={styles.header}>
        <div>
          <p className="eyebrow">Curated for a remarkable life</p>
          <h2 className={`display-3 ${styles.title}`}>Featured Listings</h2>
        </div>
        <Button as={Link} to="/properties" variant="link">View all properties</Button>
      </div>

      <div className={styles.grid}>
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};
