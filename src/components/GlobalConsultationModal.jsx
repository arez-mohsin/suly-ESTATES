import React, { useState, useEffect, useRef } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { CustomSelect } from './CustomSelect';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './GlobalConsultationModal.module.css';

const INTEREST_OPTIONS = [
  { value: 'details', label: 'Property details' },
  { value: 'buy', label: 'Buying a property' },
  { value: 'sell', label: 'Selling a property' },
  { value: 'viewing', label: 'Arranging a viewing' },
  { value: 'other', label: 'Other' }
];

const CONTACT_OPTIONS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone' },
  { value: 'email', label: 'Email' }
];

export const GlobalConsultationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [intent, setIntent] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertySlug, setPropertySlug] = useState('');

  const [contactMethod, setContactMethod] = useState('whatsapp');
  const [interest, setInterest] = useState('buy');
  
  const formRef = useRef(null);

  useEffect(() => {
    const handleOpen = (e) => {
      let newIntent = '';
      if (e.detail) {
        newIntent = e.detail.intent || '';
        setPropertyName(e.detail.propertyName || '');
        setPropertySlug(e.detail.propertySlug || '');
      } else {
        setPropertyName('');
        setPropertySlug('');
      }
      
      setIntent(newIntent);
      
      // Reset form state on open
      setIsSubmitted(false);
      setContactMethod('whatsapp');
      
      if (newIntent === 'viewing') {
        setInterest('viewing');
      } else if (newIntent === 'details') {
        setInterest('details');
      } else {
        setInterest('buy');
      }

      if (formRef.current) {
        formRef.current.reset();
      }

      setIsModalOpen(true);
    };
    window.addEventListener('open-consultation', handleOpen);
    return () => window.removeEventListener('open-consultation', handleOpen);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Let the exit animation finish before clearing success state
    setTimeout(() => setIsSubmitted(false), 300);
  };

  // Determine Title & Eyebrow semantics
  let eyebrow = "PRIVATE CONSULTATION";
  let mainTitle = "Request Consultation";
  let subtitle = "Tell us what you're looking for and how you'd prefer to be contacted.";

  if (intent === 'viewing') {
    eyebrow = "PRIVATE VIEWING";
    mainTitle = "Arrange a Viewing";
    if (propertyName) subtitle = propertyName;
  } else if (intent === 'details') {
    eyebrow = "PROPERTY INQUIRY";
    mainTitle = "Request Details";
    if (propertyName) subtitle = propertyName;
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} dataQa="consultation-dialog">
      <div className={styles.modalShell}>
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3 }}
              className={styles.modalShell}
            >
              <div className={styles.header}>
                <p className={styles.eyebrow}>{eyebrow}</p>
                <h3 className={styles.formTitle}>{mainTitle}</h3>
                <p className={styles.formDesc}>{subtitle}</p>
              </div>

              <div className={styles.scrollArea}>
                <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                  <input type="hidden" name="propertySlug" value={propertySlug} />
                  
                  <div className={styles.fieldGroup}>
                    <label htmlFor="modal-name">Name</label>
                    <input type="text" id="modal-name" name="name" autoComplete="name" required />
                  </div>
                  
                  <div className={styles.fieldGroup}>
                    <label htmlFor="modal-email">Email</label>
                    <input type="email" id="modal-email" name="email" autoComplete="email" required />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="modal-phone">Phone</label>
                    <input type="tel" inputMode="tel" id="modal-phone" name="phone" autoComplete="tel" required />
                  </div>

                  <div className={styles.fieldGroup}>
                    <CustomSelect 
                      id="modal-preferred-contact"
                      name="preferredContact"
                      label="Preferred contact"
                      value={contactMethod}
                      onValueChange={setContactMethod}
                      options={CONTACT_OPTIONS}
                      required
                    />
                  </div>
                  
                  <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <CustomSelect 
                      id="modal-interest"
                      name="interest"
                      label="Interested In"
                      value={interest}
                      onValueChange={setInterest}
                      options={INTEREST_OPTIONS}
                      required
                    />
                  </div>
                  
                  <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <label htmlFor="modal-message">Message</label>
                    <textarea id="modal-message" name="message" required></textarea>
                  </div>
                  
                  <div className={styles.footer}>
                    <Button variant="primary" type="submit" className={styles.submitBtn}>
                      Submit Request
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.successState}
            >
              <p className={styles.eyebrow}>REQUEST RECEIVED</p>
              <h3 className={styles.formTitle}>Thank you.</h3>
              <p className={styles.formDesc}>
                This demonstration does not send a real message, but the inquiry flow is complete.
              </p>
              <Button variant="outline" onClick={closeModal} style={{ marginTop: '16px' }}>
                Close window
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};
