import React from 'react';
import { Reveal, TextReveal } from '../components/Motion';
import { PageTransition } from '../components/PageTransition';

export const LegalPage = ({ title, type }) => {
  return (
    <PageTransition 
      style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: '80vh', maxWidth: 'var(--max-width-content)', margin: '0 auto', paddingLeft: 'var(--space-desktop)', paddingRight: 'var(--space-desktop)' }}
      data-header-theme="dark"
    >
      <Reveal>
        <TextReveal as="h1" className="display-2" text={title} />
      </Reveal>
      <Reveal delay={0.2}>
        <div style={{ marginTop: '40px', maxWidth: '800px', fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--color-off-white)', opacity: 0.9 }}>
          {type === 'privacy' ? (
            <>
              <p style={{ marginBottom: '24px' }}>
                This website is a demonstration and concept project.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Form submissions are not actually delivered or processed. Any data entered into inquiry forms or elsewhere on this site is entirely local to your session and not stored, transmitted, or used for any production purpose.
              </p>
              <p>
                No production customer data processing occurs in this demo.
              </p>
            </>
          ) : (
            <>
              <p style={{ marginBottom: '24px' }}>
                This website is a demonstration and concept project designed for portfolio purposes.
              </p>
              <p style={{ marginBottom: '24px' }}>
                The properties, listings, prices, and specifications presented here are purely fictional or used for demonstration and do not represent actual real estate offerings.
              </p>
              <p>
                By using this demonstration, you acknowledge that Suly Estates is not a real entity and no real transactions, agreements, or obligations can be formed through this platform.
              </p>
            </>
          )}
        </div>
      </Reveal>
    </PageTransition>
  );
};
