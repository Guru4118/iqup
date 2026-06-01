import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { Mail, Lock, User, ArrowRight, CheckCircle, Zap, Eye, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '../api/config';

const API_URL = `${API_BASE_URL}/api/auth`;

export default function Register() {
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
      const res = await axios.post(`${API_URL}/register`, formData);
      setMessage({ text: 'Account created! Redirecting to sign in...', type: 'success' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Registration failed. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (pw) => {
    if (!pw) return { label: '', color: '' };
    if (pw.length < 6) return { label: 'Weak', color: '#dc2626' };
    if (pw.length < 10) return { label: 'Fair', color: '#d97706' };
    return { label: 'Strong', color: 'var(--color-teal)' };
  };
  const strength = passwordStrength(formData.password);

  return (
    <div style={{ background: 'var(--color-bg-subtle)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 64px', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="white" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>iQup</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '8px' }}>Create your account</h1>
            <p style={{ fontSize: '15px', color: 'var(--color-ink-3)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </div>

          <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '40px', boxShadow: 'var(--shadow-md)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-2)', marginBottom: '8px', letterSpacing: '0.02em' }}>FULL NAME</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="var(--color-ink-4)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type="text" required placeholder="Arjun Mehta" value={formData.name} onChange={handleChange('name')} className="input" style={{ paddingLeft: '42px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-2)', marginBottom: '8px', letterSpacing: '0.02em' }}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="var(--color-ink-4)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange('email')} className="input" style={{ paddingLeft: '42px' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-2)', marginBottom: '8px', letterSpacing: '0.02em' }}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="var(--color-ink-4)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type={showPassword ? 'text' : 'password'} required placeholder="Min. 8 characters" value={formData.password} onChange={handleChange('password')} className="input" style={{ paddingLeft: '42px', paddingRight: '42px' }} />
                  <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-ink-4)' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {formData.password && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'var(--color-bg-muted)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '2px', background: strength.color,
                        width: strength.label === 'Weak' ? '33%' : strength.label === 'Fair' ? '66%' : '100%',
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: strength.color }}>{strength.label}</span>
                  </div>
                )}
              </div>

              {message.text && (
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
              )}

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creating Account...' : <><span>Create Account</span><ArrowRight size={16} /></>}
              </button>
            </form>

            <p style={{ fontSize: '12px', color: 'var(--color-ink-4)', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 }}>
              By creating an account, you agree to our Terms of Service and Privacy Policy. Your data is encrypted and never shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
