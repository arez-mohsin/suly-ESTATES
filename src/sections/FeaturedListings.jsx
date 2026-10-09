import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedListings.module.css';
import { PropertyCard } from '../components/PropertyCard';
import { Button } from '../components/Button';
import { properties } from '../data/properties';
import { Reveal, Stagger, StaggerItem } from '../components/Motion';

export const FeaturedListings = () => {
  return (
    <section className={styles.section} id="properties" data-header-theme="dark">
      <div className={styles.header}>
        <div>
          <Reveal y={16}>
            <p className="eyebrow">Curated for a remarkable life</p>
          </Reveal>
          <Reveal delay={0.1} y={16}>
            <h2 className={`display-3 ${styles.title}`}>Featured Listings</h2>
          </Reveal>
        </div>
        <Reveal delay={0.2} y={10}>
          <Button as={Link} to="/properties" variant="link">View all properties</Button>
        </Reveal>
      </div>

      <Stagger staggerDelay={0.06} delay={0.2} className={styles.grid}>
        {properties.map(property => (
          <StaggerItem key={property.id} y={14}>
            <PropertyCard property={property} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};
