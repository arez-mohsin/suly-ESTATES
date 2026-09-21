import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import styles from '../sections/PrivateConsultation.module.css';

export const GlobalConsultationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [intent, setIntent] = useState('');

  useEffect(() => {
    const handleOpen = (e) => {
      if (e.detail && e.detail.intent) {
        setIntent(e.detail.intent);
      } else {
        setIntent('');
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
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {!isSubmitted ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <h3 className={styles.formTitle}>
              {intent === 'viewing' ? 'Arrange a Viewing' : 'Request Consultation'}
            </h3>
            <p className={styles.formDesc}>Please provide your details below.</p>
          </div>
          
          <div className={styles.fieldGroup}>
            <label htmlFor="modal-name">Name</label>
            <input type="text" id="modal-name" required />
          </div>
          
          <div className={styles.fieldGroup}>
            <label htmlFor="modal-email">Email</label>
            <input type="email" id="modal-email" required />
          </div>
          
          <div className={styles.fieldGroup}>
            <label htmlFor="modal-interest">Interested In</label>
            <select id="modal-interest" required defaultValue={intent === 'viewing' ? 'viewing' : 'buy'}>
              <option value="buy">Buying a property</option>
              <option value="sell">Selling a property</option>
              <option value="viewing">Arranging a viewing</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className={styles.fieldGroup}>
            <label htmlFor="modal-message">Message</label>
            <textarea id="modal-message" required></textarea>
          </div>
          
          <Button variant="primary" type="submit">Submit Request</Button>
        </form>
      ) : (
        <div className={styles.successState}>
          <h3 className={styles.formTitle}>Thank You</h3>
          <p className={styles.formDesc}>
            This is a demonstration inquiry experience.<br/>
            No actual message was delivered.
          </p>
          <Button variant="outline" onClick={closeModal}>Close window</Button>
        </div>
      )}
    </Modal>
  );
};
