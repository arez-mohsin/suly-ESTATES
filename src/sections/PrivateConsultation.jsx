import React, { useState } from 'react';
import styles from './PrivateConsultation.module.css';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export const PrivateConsultation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: reset form state after closing
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`eyebrow ${styles.eyebrow}`}>Let's start a conversation</p>
          
          <h2 className={`display-2 ${styles.title}`}>
            Personal advice.<br />
            Extraordinary opportunities.
          </h2>
          
          <p className={styles.description}>
            Whether you're looking to buy, sell, or simply explore what's possible in Sulaymaniyah, our team is here to help—with discretion and insight.
          </p>
          
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Request a Private Consultation
          </Button>
        </div>

        <div className={styles.imageWrapper}>
          <img 
            src="/images/approach.jpg" 
            alt="Architectural detail" 
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {!isSubmitted ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <h3 className={styles.formTitle}>Request Consultation</h3>
              <p className={styles.formDesc}>Please provide your details below.</p>
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required />
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="interest">Interested In</label>
              <select id="interest" required>
                <option value="">Select an option</option>
                <option value="buy">Buying a property</option>
                <option value="sell">Selling a property</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className={styles.fieldGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" required></textarea>
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
    </section>
  );
};
