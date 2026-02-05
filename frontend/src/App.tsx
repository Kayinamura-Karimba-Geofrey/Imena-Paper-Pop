import React from 'react';
import Navbar from './components/Navbar';
import InvitationForm from './components/InvitationForm';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <div style={{ textAlign: 'center', margin: '4rem 0 2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="fade-in">
            Craft Beautiful Memories
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }} className="fade-in">
            Create elegant, personalized PDF invitations for your family gatherings and special events in seconds.
          </p>
        </div>
        <InvitationForm />
      </main>
    </>
  );
}

export default App;
