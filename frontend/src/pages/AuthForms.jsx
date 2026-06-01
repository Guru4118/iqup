import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {
  Mail, Lock, User, ArrowRight, CheckCircle,
  Zap, Eye, EyeOff, Brain, Mic, BarChart2,
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api/auth';

const benefits = [
  { icon: <Brain size={16} />, label: 'Resume-personalized question sets' },
  { icon: <Mic size={16} />, label: 'Voice & presence analysis in real time' },
  { icon: <BarChart2 size={16} />, label: 'Detailed AI performance feedback' },
  { icon: <CheckCircle size={16} />, label: 'Built-in multi-language coding IDE' },
];

function LoginForm({ onSwitch }) {
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
      await axios.post(`${API_URL}/login`, formData);
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Incorrect email or password.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={labelStyle}>EMAIL ADDRESS</label>
        <div style={{ position: 'relative' }}>
          <Mail size={15} color="var(--color-ink-4)" style={iconStyle} />
          <input type="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange('email')} className="input" style={{ paddingLeft: '42px' }} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>PASSWORD</label>
        <div style={{ position: 'relative' }}>
          <Lock size={15} color="var(--color-ink-4)" style={iconStyle} />
          <input type={showPassword ? 'text' : 'password'} required placeholder="Your password" value={formData.password} onChange={handleChange('password')} className="input" style={{ paddingLeft: '42px', paddingRight: '42px' }} />
          <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink-4)', display: 'flex' }}>
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {message.text && <AlertBanner message={message} />}

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={16} /></>}
      </button>

      <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-ink-3)' }}>
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer', fontSize: '14px', padding: 0 }}>
          Create one free
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      await axios.post(`${API_URL}/register`, formData);
      setMessage({ text: 'Account created! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Registration failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const strength = (pw) => {
    if (!pw) return null;
    if (pw.length < 6) return { label: 'Weak', color: '#dc2626', pct: '30%' };
    if (pw.length < 10) return { label: 'Fair', color: '#d97706', pct: '65%' };
    return { label: 'Strong', color: 'var(--color-teal)', pct: '100%' };
  };
  const s = strength(formData.password);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={labelStyle}>FULL NAME</label>
        <div style={{ position: 'relative' }}>
          <User size={15} color="var(--color-ink-4)" style={iconStyle} />
          <input type="text" required placeholder="Your full name" value={formData.name} onChange={handleChange('name')} className="input" style={{ paddingLeft: '42px' }} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>EMAIL ADDRESS</label>
        <div style={{ position: 'relative' }}>
          <Mail size={15} color="var(--color-ink-4)" style={iconStyle} />
          <input type="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange('email')} className="input" style={{ paddingLeft: '42px' }} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>PASSWORD</label>
        <div style={{ position: 'relative' }}>
          <Lock size={15} color="var(--color-ink-4)" style={iconStyle} />
          <input type={showPassword ? 'text' : 'password'} required placeholder="Min. 8 characters" value={formData.password} onChange={handleChange('password')} className="input" style={{ paddingLeft: '42px', paddingRight: '42px' }} />
          <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink-4)', display: 'flex' }}>
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {s && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <div style={{ flex: 1, height: '4px', background: 'var(--color-bg-muted)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '2px', background: s.color, width: s.pct, transition: 'width 0.3s ease, background 0.3s ease' }} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: s.color, minWidth: '40px' }}>{s.label}</span>
          </div>
        )}
      </div>

      {message.text && <AlertBanner message={message} />}

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Creating Account...' : <><span>Create Account</span><ArrowRight size={16} /></>}
      </button>

      <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-ink-3)' }}>
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer', fontSize: '14px', padding: 0 }}>
          Sign in
        </button>
      </p>
    </form>
  );
}

function AlertBanner({ message }) {
  return (
    <div style={{
      padding: '12px 16px', borderRadius: 'var(--radius-md)', fontSize: '14px',
      background: message.type === 'success' ? 'var(--color-teal-light)' : '#fef2f2',
      color: message.type === 'success' ? 'var(--color-teal)' : '#dc2626',
      border: `1px solid ${message.type === 'success' ? 'var(--color-teal)' : '#fecaca'}`,
      display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      {message.type === 'success' && <CheckCircle size={14} />}
      {message.text}
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: '12px', fontWeight: 700,
  color: 'var(--color-ink-3)', marginBottom: '8px',
  letterSpacing: '0.06em', textTransform: 'uppercase',
};
const iconStyle = {
  position: 'absolute', left: '14px', top: '50%',
  transform: 'translateY(-50%)', pointerEvents: 'none',
};

export default function AuthForms() {
  const [tab, setTab] = useState('login');

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="auth-split">
        {/* Left — brand panel */}
        <div style={{
          background: 'var(--color-ink)', padding: '120px 56px 64px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,87,42,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,143,124,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={17} color="white" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'white', letterSpacing: '-0.02em' }}>iQup</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
              {tab === 'login'
                ? 'Great to see you again. Let\'s pick up where you left off.'
                : 'Join thousands of candidates who interview with confidence.'}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '40px' }}>
              {tab === 'login'
                ? 'Your personalized AI coach is ready when you are.'
                : 'No credit card needed. Start your first AI mock interview in under 3 minutes.'}
            </p>

            {/* Benefit list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                    {b.icon}
                  </div>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Testimonial snippet */}
            <div style={{ marginTop: '48px', padding: '20px 22px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-accent)' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '12px' }}>
                "I used iQup for two weeks before my Razorpay interview. The personalized questions and instant feedback were game-changing."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 700 }}>SK</div>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Sneha K. — PM at Razorpay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form panel */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 56px 64px' }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            {/* Tab switcher */}
            <div style={{ display: 'flex', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '36px', border: '1px solid var(--color-border)' }}>
              {[
                { id: 'login', label: 'Sign In' },
                { id: 'register', label: 'Create Account' },
              ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: '10px', border: 'none', cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  background: tab === t.id ? 'white' : 'transparent',
                  color: tab === t.id ? 'var(--color-ink)' : 'var(--color-ink-3)',
                  fontWeight: tab === t.id ? 600 : 400,
                  fontSize: '14px', fontFamily: 'var(--font-body)',
                  boxShadow: tab === t.id ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Heading */}
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '6px' }}>
                {tab === 'login' ? 'Welcome back' : 'Get started free'}
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--color-ink-3)' }}>
                {tab === 'login' ? 'Sign in to access your interview history and saved sessions.' : 'Create an account to track progress across sessions.'}
              </p>
            </div>

            {/* Forms with crossfade */}
            <div style={{ position: 'relative' }}>
              {tab === 'login'
                ? <LoginForm onSwitch={() => setTab('register')} />
                : <RegisterForm onSwitch={() => setTab('login')} />
              }
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '28px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              <span style={{ fontSize: '12px', color: 'var(--color-ink-4)' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            </div>

            <Link to="/upload" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              Continue as Guest
            </Link>

            <p style={{ fontSize: '12px', color: 'var(--color-ink-4)', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 }}>
              By continuing, you agree to our Terms of Service. Your data is encrypted and never sold.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-split { grid-template-columns: 1fr !important; }
          .auth-split > div:first-child { display: none !important; }
          .auth-split > div:last-child { padding: 100px 24px 64px !important; }
        }
      `}</style>
    </div>
  );
}
