import React, { useState } from 'react';
import styles from './InteractiveMap.module.css';

export const InteractiveMap = ({ src, title, dataQaWrapper, dataQaIframe }) => {
  const [isInteractive, setIsInteractive] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isInteractive) {
      setIsInteractive(false);
    }
  };

  return (
    <div 
      className={styles.mapContainer} 
      data-qa={dataQaWrapper}
      onMouseLeave={() => setIsInteractive(false)}
      onKeyDown={handleKeyDown}
      tabIndex={isInteractive ? -1 : 0}
    >
      {!isInteractive && (
        <div className={styles.overlay}>
          <button 
            className={styles.exploreBtn} 
            onClick={() => setIsInteractive(true)}
            aria-label={`Explore ${title}`}
          >
            Explore Map
          </button>
        </div>
      )}
      <iframe
        src={src}
        className={styles.mapIframe}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        data-qa={dataQaIframe}
        style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
      ></iframe>
      {isInteractive && (
        <div className={styles.hint}>
          Press ESC or move mouse away to exit map
        </div>
      )}
    </div>
  );
};
