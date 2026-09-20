import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties } from '../data/properties';
import { Button } from '../components/Button';
import { PropertyCard } from '../components/PropertyCard';
import styles from './PropertyDetail.module.css';

export function PropertyDetail() {
  const { slug } = useParams();
  const property = properties.find(p => p.slug === slug);

  if (!property) {
    return (
      <main className={styles.notFound}>
        <h1 className="display-3">Property not found</h1>
        <p>The residence you are looking for does not exist or has been removed.</p>
        <div className={styles.notFoundActions}>
          <Button as={Link} to="/properties">Browse properties</Button>
          <Button as={Link} to="/" variant="transparent">Return home</Button>
        </div>
      </main>
    );
  }

  const relatedProperties = properties.filter(p => p.id !== property.id).slice(0, 3);

  return (
    <main className={styles.detailPage}>
      {/* Property Hero */}
      <section className={styles.hero} data-header-theme="transparent">
        <img src={property.heroImage} alt={property.name} className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link to="/properties" className={styles.backLink}>← Back to properties</Link>
          <h1 className={`display-2 ${styles.title}`}>{property.name}</h1>
          <div className={styles.heroMeta}>
            <span>{property.neighborhood}, {property.city}</span>
            <span className={styles.heroPrice}>{property.price}</span>
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        {/* Main Content */}
        <div className={styles.mainContent}>
          <section className={styles.section} data-header-theme="dark">
            <div className={styles.factsGrid}>
              <div className={styles.fact}>
                <span className="eyebrow">Bedrooms</span>
                <span className={styles.factValue}>{property.bedrooms}</span>
              </div>
              <div className={styles.fact}>
                <span className="eyebrow">Bathrooms</span>
                <span className={styles.factValue}>{property.bathrooms}</span>
              </div>
              <div className={styles.fact}>
                <span className="eyebrow">Interior Area</span>
                <span className={styles.factValue}>{property.interiorArea} m²</span>
              </div>
              <div className={styles.fact}>
                <span className="eyebrow">Plot Area</span>
                <span className={styles.factValue}>{property.plotArea} m²</span>
              </div>
              <div className={styles.fact}>
                <span className="eyebrow">Property Type</span>
                <span className={styles.factValue}>{property.type}</span>
              </div>
            </div>
          </section>

          {/* Asymmetric Gallery */}
          <section className={styles.gallery} data-header-theme="dark">
            {property.gallery.map((img, i) => (
              <div key={i} className={styles.galleryItem}>
                <img src={img} alt={`Gallery ${i}`} loading="lazy" />
              </div>
            ))}
          </section>

          {/* Description */}
          <section className={styles.descriptionSection} data-header-theme="dark">
            <h2 className="display-3">Overview</h2>
            <div className={styles.descriptionText}>
              {property.description.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {/* Amenities & Highlights */}
          <section className={styles.featuresSection} data-header-theme="dark">
            <div className={styles.featuresCol}>
              <h3 className="eyebrow">Highlights</h3>
              <ul className={styles.featureList}>
                {property.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
            <div className={styles.featuresCol}>
              <h3 className="eyebrow">Amenities</h3>
              <ul className={styles.featureList}>
                {property.amenities.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </section>

          {/* Location Map Placeholder */}
          <section className={styles.locationSection} data-header-theme="dark">
            <h2 className="display-3">Approximate location</h2>
            <p className={styles.locationMeta}>{property.approximateLocation}</p>
            <div className={styles.mapPlaceholder}>
              <span className={styles.mapDisclosure}>Approximate locations · Demo properties</span>
            </div>
          </section>
        </div>

        {/* Sticky Inquiry Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.stickyCard}>
            <h3 className={styles.stickyPrice}>{property.price}</h3>
            <Button className={styles.inquireBtn}>Request details</Button>
            <Button variant="transparent" className={styles.viewingBtn}>Arrange a viewing</Button>
          </div>
        </aside>
      </div>
      
      <section className={styles.related} data-header-theme="dark">
        <h2 className="display-3" style={{marginBottom: '24px'}}>You may also like</h2>
        <div className={styles.relatedGrid}>
          {relatedProperties.map(p => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
