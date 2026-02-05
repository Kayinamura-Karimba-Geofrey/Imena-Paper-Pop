import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav style={{
            padding: '1.5rem 0',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
                    <span style={{ color: 'var(--color-primary)' }}>IMENA</span> Paper Pop
                </h1>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    <span>Official Invitation Generator</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
