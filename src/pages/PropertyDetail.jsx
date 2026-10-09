import React, { useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { properties } from '../data/properties';
import { Button } from '../components/Button';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyCarousel } from '../components/PropertyCarousel';
import { PhotoTour } from '../components/PhotoTour';
import { Reveal, TextReveal } from '../components/Motion';
import styles from './PropertyDetail.module.css';

// Lazy load the lightbox wrapper to prevent plugin loading errors
const PropertyLightbox = React.lazy(() => import('../components/PropertyLightbox'));

export function PropertyDetail() {
  const { slug } = useParams();
  const property = properties.find(p => p.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  React.useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { rootMargin: '0px', threshold: 0.01 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
    <motion.main 
      className={styles.detailPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <section className={styles.hero} data-header-theme="transparent">
        <PropertyCarousel images={property.gallery} onImageClick={openLightbox} />
        
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/properties" className={styles.backLink}>← Back to properties</Link>
          </motion.div>
          <TextReveal
            as="h1"
            className={`display-2 ${styles.title}`}
            text={property.name}
          />
          <Reveal delay={0.2}>
            <div className={styles.heroMeta}>
              <span>{property.neighborhood}, {property.city}</span>
              <span className={styles.heroPrice}>{property.price}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <div className={styles.mainContent}>
          <section className={styles.section} data-header-theme="dark">
            <Reveal>
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
            </Reveal>
          </section>

          <section data-header-theme="dark">
            <Reveal delay={0.1}>
              <PhotoTour images={property.gallery} onImageClick={openLightbox} />
            </Reveal>
          </section>

          <section className={styles.descriptionSection} data-header-theme="dark">
            <Reveal>
              <h2 className="display-3">Overview</h2>
              <div className={styles.descriptionText}>
                {property.description.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
          </section>

          <section className={styles.featuresSection} data-header-theme="dark">
            <Reveal>
              <div className={styles.featuresCol}>
                <h3 className="eyebrow">Highlights</h3>
                <ul className={styles.featureList}>
                  {property.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className={styles.featuresCol}>
                <h3 className="eyebrow">Amenities</h3>
                <ul className={styles.featureList}>
                  {property.amenities.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            </Reveal>
          </section>

          <section className={styles.locationSection} data-header-theme="dark">
            <Reveal>
              <h2 className="display-3">Approximate area</h2>
              <p className={styles.locationMeta}>{property.approximateLocation}</p>
              <div className={styles.mapContainer} data-qa="property-map-wrapper">
                <iframe
                  src={property.mapUrl}
                  className={styles.mapIframe}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${property.neighborhood}`}
                  data-qa="property-map-iframe"
                ></iframe>
              </div>
              <div className={styles.mapDisclosure} data-qa="property-map-disclosure">Location shown at neighborhood level for this demonstration listing.</div>
            </Reveal>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <motion.div
            className={`${styles.stickyCard} ${isFooterVisible ? styles.hiddenMobile : ''}`}
            data-qa="property-sticky-inquiry-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className={styles.stickyPrice}>{property.price}</h3>
            <Button 
              className={styles.inquireBtn}
              onClick={() => window.dispatchEvent(new CustomEvent('open-consultation', { detail: { intent: 'details', propertyName: property.name, propertySlug: property.slug } }))}
              data-qa="property-request-details"
            >
              Request details
            </Button>
            <Button 
              variant="transparent" 
              className={styles.viewingBtn}
              onClick={() => window.dispatchEvent(new CustomEvent('open-consultation', { detail: { intent: 'viewing', propertyName: property.name, propertySlug: property.slug } }))}
              data-qa="property-arrange-viewing"
            >
              Arrange a viewing
            </Button>
          </motion.div>
        </aside>
      </div>
      
      <section className={styles.related} data-header-theme="dark">
        <Reveal>
          <h2 className="display-3" style={{marginBottom: '24px'}}>You may also like</h2>
          <div className={styles.relatedGrid}>
            {relatedProperties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Lightbox Portal */}
      {lightboxOpen && (
        <Suspense fallback={null}>
          <PropertyLightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={lightboxIndex}
            slides={property.gallery}
            data-qa="property-lightbox"
          />
        </Suspense>
      )}
    </motion.main>
  );
}
