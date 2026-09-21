import React, { useState, useEffect, useCallback } from 'react';
import styles from './PropertyCarousel.module.css';

export const PropertyCarousel = ({ images, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isPlaying) return;
    
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setIsPlaying(false);
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        setIsPlaying(false);
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div 
      className={styles.carousel} 
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div 
        className={styles.slidesContainer}
        onClick={() => onImageClick(currentIndex)}
        style={{ cursor: 'zoom-in' }}
      >
        {images.map((img, index) => {
          let className = styles.slide;
          if (index === currentIndex) className += ` ${styles.active}`;
          if (index === (currentIndex - 1 + images.length) % images.length) className += ` ${styles.prev}`;
          if (index === (currentIndex + 1) % images.length) className += ` ${styles.next}`;
          
          // Lazy load current and adjacent
          const shouldLoad = index === currentIndex || 
                            index === (currentIndex + 1) % images.length || 
                            index === (currentIndex - 1 + images.length) % images.length;
                            
          return (
            <div key={index} className={className}>
              {shouldLoad && (
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className={styles.image} 
                  loading={index === 0 ? "eager" : "lazy"} 
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className={styles.overlay} />
      
      <div className={styles.controls}>
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
        <div className={styles.buttons}>
          <button 
            className={styles.navButton} 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); prevSlide(); }}
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            className={styles.navButton} 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(false); nextSlide(); }}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
      
      <div className={styles.affordance} onClick={() => onImageClick(currentIndex)}>
        View gallery
      </div>
    </div>
  );
};
