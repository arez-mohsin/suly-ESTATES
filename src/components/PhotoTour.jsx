import React from 'react';
import styles from './PhotoTour.module.css';

export const PhotoTour = ({ images, onImageClick }) => {
  return (
    <div className={styles.photoTour}>
      <div className={styles.header}>
        <h3 className="eyebrow">Photo Tour</h3>
      </div>
      <div className={styles.rail}>
        {images.map((img, index) => (
          <button 
            key={index} 
            className={styles.thumbnailBtn}
            onClick={() => onImageClick(index)}
            aria-label={`View full image of ${img.alt}`}
          >
            <img 
              src={img.src} 
              alt={img.alt} 
              loading="lazy" 
              className={styles.thumbnailImg}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
