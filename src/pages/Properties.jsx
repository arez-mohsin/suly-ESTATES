import React from 'react';
import { properties } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';

export function Properties() {
  return (
    <main style={{ paddingTop: '160px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: 'var(--color-near-black)' }}>
      <div style={{ maxWidth: '1520px', margin: '0 auto', padding: '0 var(--space-desktop)' }}>
        <div style={{ marginBottom: '64px' }}>
          <h1 className="display-2" style={{ marginBottom: '16px' }}>Exceptional Residences</h1>
          <p style={{ color: 'var(--color-muted-text)', maxWidth: '600px', fontSize: '1.125rem' }}>
            Explore our curated collection of architectural homes across Sulaymaniyah, 
            each selected for its unique design and quality of life.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '40px 24px' 
        }}>
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
