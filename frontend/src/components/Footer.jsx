import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'How it Works', path: '/about' },
    { label: 'Practice IDE', path: '/practice' },
    { label: 'Blog', path: '/blogs' },
    { label: 'Start Interview', path: '/upload' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Sign In', path: '/login' },
    { label: 'Register', path: '/register' },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-ink)',
      color: 'rgba(255,255,255,0.7)',
      padding: '64px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '7px',
                background: 'var(--color-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={15} color="white" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'white', letterSpacing: '-0.02em' }}>iQup</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.7, maxWidth: '260px', marginBottom: '24px' }}>
              AI-powered interview preparation that adapts to your resume and gives real-time performance feedback.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: <Twitter size={16} />, href: '#' },
                { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/guruprasath103/' },
                { icon: <Github size={16} />, href: '#' },
                { icon: <Mail size={16} />, href: 'mailto:hello@iqup.ai' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} style={{
                      fontSize: '14px', color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none', transition: 'color 0.2s ease',
                    }}
                      onMouseEnter={e => e.target.style.color = 'white'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter-style CTA */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Get Ready to Impress
            </h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
              Upload your resume and start a mock interview session in seconds.
            </p>
            <Link to="/upload" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent)',
              color: 'white', fontSize: '14px', fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-accent-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-accent)'}
            >
              Start for Free <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div style={{ paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ fontSize: '13px' }}>© 2025 iQup. Built with care by <a href="https://www.linkedin.com/in/guruprasath103/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Guruprasath</a>.</p>
          <p style={{ fontSize: '13px' }}>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
