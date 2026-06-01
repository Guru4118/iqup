import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Lock, ArrowRight, CheckCircle, Zap, Eye, EyeOff } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/auth';

const benefits = [
  'Resume-personalized interview questions',
  'Voice and webcam presence analysis',
  'Instant AI performance feedback',
  'Built-in multi-language coding IDE',
];

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Incorrect email or password. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
        {/* Left panel */}
        <div style={{
          background: 'var(--color-ink)',
          padding: '140px 64px 80px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }} className="auth-left-panel">
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,87,42,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,143,124,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={18} color="white" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'white', letterSpacing: '-0.02em' }}>iQup</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '20px' }}>
              Your next offer letter<br />is one session away.
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '40px' }}>
              Thousands of candidates have used iQup to walk into interviews with confidence and clarity.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={16} color="var(--color-teal)" />
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel - form */}
        <div style={{ padding: '140px 64px 80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="auth-form-panel">
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '8px' }}>Welcome back</h1>
            <p style={{ fontSize: '15px', color: 'var(--color-ink-3)', marginBottom: '40px' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}>Sign up for free</Link>
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-2)', marginBottom: '8px', letterSpacing: '0.02em' }}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--color-ink-4)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type="email" required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="input"
                    style={{ paddingLeft: '42px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-2)', marginBottom: '8px', letterSpacing: '0.02em' }}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--color-ink-4)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    className="input"
                    style={{ paddingLeft: '42px', paddingRight: '42px' }}
                  />
                  <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-ink-4)' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {message.text && (
                <div style={{
                  padding: '12px 16px', borderRadius: 'var(--radius-md)', fontSize: '14px',
                  background: message.type === 'success' ? 'var(--color-teal-light)' : '#fef2f2',
                  color: message.type === 'success' ? 'var(--color-teal)' : '#dc2626',
                  border: `1px solid ${message.type === 'success' ? 'var(--color-teal)' : '#fecaca'}`,
                }}>
                  {message.text}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={16} /></>}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              <span style={{ fontSize: '13px', color: 'var(--color-ink-4)' }}>or continue without account</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            </div>

            <Link to="/upload" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Start a Session as Guest
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
          .auth-form-panel { padding: 120px 24px 60px !important; grid-column: 1 !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
