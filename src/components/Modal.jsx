import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { Icons } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // showModal provides native backdrop, focus trap, and escape key handling
      dialog.showModal();
    } else {
      document.body.style.overflow = '';
      dialog.close();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle click on backdrop to close
  const handleBackdropClick = (e) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    
    if (!isInDialog) {
      onClose();
    }
  };

  // Close event fired by native Escape key
  const handleNativeClose = () => {
    onClose();
  };

  return createPortal(
    <dialog 
      ref={dialogRef} 
      className={styles.dialog}
      onClick={handleBackdropClick}
      onClose={handleNativeClose}
      aria-modal="true"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent bubbling to backdrop
          >
            <button 
              className={styles.closeButton} 
              onClick={onClose}
              aria-label="Close modal"
            >
              <Icons.Close />
            </button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>,
    document.body
  );
};
