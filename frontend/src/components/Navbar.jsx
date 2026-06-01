import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Practice', path: '/practice' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'var(--color-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(232,87,42,0.3)',
          }}>
            <Zap size={16} color="white" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '20px',
            letterSpacing: '-0.03em',
            color: 'var(--color-ink)',
          }}>iQup</span>
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
            background: 'var(--color-accent-light)', color: 'var(--color-accent)',
            padding: '2px 7px', borderRadius: '100px', textTransform: 'uppercase',
          }}>Beta</span>
        </Link>

        {/* Desktop nav */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                style={{
                  display: 'block', padding: '7px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: isActive(link.path) ? 600 : 400,
                  fontSize: '15px',
                  color: isActive(link.path) ? 'var(--color-accent)' : 'var(--color-ink-2)',
                  background: isActive(link.path) ? 'var(--color-accent-light)' : 'transparent',
                  transition: 'all var(--transition)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { if (!isActive(link.path)) { e.target.style.background = 'var(--color-bg-subtle)'; e.target.style.color = 'var(--color-ink)'; } }}
                onMouseLeave={e => { if (!isActive(link.path)) { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-ink-2)'; } }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/login" className="desktop-nav" style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px', fontWeight: 500,
            color: 'var(--color-ink-2)',
            textDecoration: 'none',
            transition: 'all var(--transition)',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--color-ink)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-ink-2)'}
          >
            Sign in
          </Link>
          <Link to="/upload" className="btn btn-primary btn-sm desktop-nav">
            Start Free
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-nav"
            style={{
              background: 'none', border: 'none', padding: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-ink)',
              cursor: 'pointer',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: '68px', left: 0, right: 0, bottom: 0,
        background: 'white', zIndex: 99, padding: '24px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        borderTop: '1px solid var(--color-border)',
        overflowY: 'auto',
      }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: isActive(link.path) ? 600 : 400,
                  fontSize: '16px',
                  color: isActive(link.path) ? 'var(--color-accent)' : 'var(--color-ink)',
                  background: isActive(link.path) ? 'var(--color-accent-light)' : 'transparent',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
          <Link to="/login" className="btn btn-outline" style={{ justifyContent: 'center' }}>Sign in</Link>
          <Link to="/upload" className="btn btn-primary" style={{ justifyContent: 'center' }}>Start Free →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
