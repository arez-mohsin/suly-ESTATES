import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';
import { Button } from '../components/Button';

const slides = [
  {
    id: 1,
    image: '/images/hero-1.jpg',
    location: 'GOIZHA · SULAYMANIYAH',
    alt: 'Contemporary hillside luxury villa in Goizha overlooking Sulaymaniyah at dusk'
  },
  {
    id: 2,
    image: '/images/hero-2.jpg',
    location: 'SARCHINAR · SULAYMANIYAH',
    alt: 'Premium contemporary residential home with a landscaped courtyard in Sarchinar'
  },
  {
    id: 3,
    image: '/images/hero-3.jpg',
    location: 'CITY RESIDENCE · SULAYMANIYAH',
    alt: 'High-end modern penthouse terrace overlooking Sulaymaniyah city'
  }
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef(null);
  
  // Touch swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const startTimer = useCallback(() => {
    if (shouldReduceMotion) return; // Disable auto-advance on reduced motion
    
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500); // 5.5 seconds per user spec
  }, [shouldReduceMotion]);

  useEffect(() => {
    // Page Visibility API to pause carousel when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(timerRef.current);
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startTimer();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Preload next images
  useEffect(() => {
    const nextSlide = (currentSlide + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextSlide].image;
  }, [currentSlide]);

  const handleManualSelect = (index) => {
    setCurrentSlide(index);
    startTimer(); // Reset timer on manual interaction
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50; // minimum distance
    if (touchEndX.current < touchStartX.current - swipeThreshold) {
      // Swipe left -> Next
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      startTimer();
    } else if (touchEndX.current > touchStartX.current + swipeThreshold) {
      // Swipe right -> Prev
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      startTimer();
    }
  };

  // Animation variants
  const backgroundVariants = {
    initial: { 
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.05 
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: { 
        opacity: { duration: 1, ease: "easeInOut" },
        scale: { duration: 6, ease: "easeOut" } // Slow scale during the slide
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <section 
      className={styles.hero}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Properties Carousel"
    >
      <div className={styles.backgroundLayer}>
        <AnimatePresence initial={false}>
          <motion.div 
            key={currentSlide}
            className={styles.background}
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].alt} 
              className={styles.image}
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <motion.div 
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={styles.locationBadge}>
            <AnimatePresence mode="wait">
              <motion.span
                key={slides[currentSlide].location}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {slides[currentSlide].location}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>
        
        <motion.h1 
          className={`display-1 ${styles.title}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Remarkable homes.<br />
          Distinctive living.
        </motion.h1>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Exceptional residences across Sulaymaniyah,
          selected for architecture, location and quality of life.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button variant="primary">Explore Properties</Button>
        </motion.div>
      </div>

      <div className={styles.sliderControls} role="tablist">
        {slides.map((slide, index) => (
          <React.Fragment key={slide.id}>
            <button
              role="tab"
              aria-selected={currentSlide === index}
              aria-label={`View slide ${index + 1}`}
              className={`${styles.sliderButton} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => handleManualSelect(index)}
            >
              0{index + 1}
            </button>
            {index < slides.length - 1 && <span className={styles.sliderDash} aria-hidden="true">—</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
