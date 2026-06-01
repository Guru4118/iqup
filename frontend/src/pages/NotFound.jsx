import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Home, ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', maxWidth: '520px' }}>
          {/* Big 404 */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(96px, 16vw, 180px)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            color: 'var(--color-bg-muted)',
            marginBottom: '-16px',
            userSelect: 'none',
          }}>
            404
          </div>

          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'var(--color-accent-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            border: '1px solid var(--color-accent-mid)',
          }}>
            <Search size={28} color="var(--color-accent)" />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '28px',
            fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px',
          }}>
            Page not found
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-ink-3)', lineHeight: 1.7, marginBottom: '36px' }}>
            The page you're looking for doesn't exist or may have moved. Let's get you back on track.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Home size={16} /> Go Home
            </Link>
            <Link to="/upload" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Start Interview <ArrowRight size={16} />
            </Link>
          </div>

          {/* Quick links */}
          <div style={{ marginTop: '48px', padding: '24px', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>Quick links</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Practice IDE', path: '/practice' },
                { label: 'Blog', path: '/blogs' },
                { label: 'About', path: '/about' },
                { label: 'Sign In', path: '/login' },
              ].map(link => (
                <Link key={link.path} to={link.path} className="tag" style={{ textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-ink-2)'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
