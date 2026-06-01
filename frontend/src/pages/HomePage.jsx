import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRevealAll } from '../hooks/useReveal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Upload, Mic, Brain, TrendingUp, Shield, Users,
  CheckCircle, ArrowRight, Star, Zap, Code, FileText,
  BarChart2, Clock, Award, ChevronRight, Play,
} from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: <Upload size={22} />,
    title: 'Upload Your Resume',
    desc: 'Simply drag and drop your PDF resume. Our AI analyzes your experience, skills, and target roles within seconds.',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-light)',
  },
  {
    step: '02',
    icon: <Brain size={22} />,
    title: 'AI Generates Questions',
    desc: 'Personalized interview questions are crafted based on your unique profile — covering technical, behavioral, and role-specific areas.',
    color: 'var(--color-teal)',
    bg: 'var(--color-teal-light)',
  },
  {
    step: '03',
    icon: <Mic size={22} />,
    title: 'Answer with Voice & Webcam',
    desc: 'Simulate a real interview with live audio and video. Practice speaking your answers clearly and confidently under realistic conditions.',
    color: 'var(--color-violet)',
    bg: 'var(--color-violet-light)',
  },
  {
    step: '04',
    icon: <BarChart2 size={22} />,
    title: 'Receive Instant Feedback',
    desc: 'Get detailed scoring on clarity, structure, and relevance. Walk away with actionable insights that accelerate your improvement.',
    color: 'var(--color-amber)',
    bg: 'var(--color-amber-light)',
  },
];

const features = [
  {
    icon: <Brain size={24} />,
    title: 'Resume-Driven Questions',
    desc: 'Every question is tailored to your specific experience and target role — no generic one-size-fits-all quizzes.',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-light)',
  },
  {
    icon: <Mic size={24} />,
    title: 'Voice & Presence Analysis',
    desc: 'Real-time speech recognition captures your responses. Webcam presence analysis helps you improve body language.',
    color: 'var(--color-teal)',
    bg: 'var(--color-teal-light)',
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Detailed Performance Report',
    desc: 'Section-wise scoring, answer quality breakdown, and specific recommendations make your growth measurable.',
    color: 'var(--color-violet)',
    bg: 'var(--color-violet-light)',
  },
  {
    icon: <Shield size={24} />,
    title: 'Privacy-First Architecture',
    desc: 'Your resume and session data are never stored after the interview ends. GDPR-aligned by design, always.',
    color: 'var(--color-amber)',
    bg: 'var(--color-amber-light)',
  },
  {
    icon: <Code size={24} />,
    title: 'Built-in Coding IDE',
    desc: 'Sharpen your technical skills with an in-browser multi-language IDE. Practice coding challenges in Python, JS, Java, and more.',
    color: 'var(--color-teal)',
    bg: 'var(--color-teal-light)',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Track Your Progress',
    desc: 'Compare session scores over time, spot trends in your answers, and see exactly how far you\'ve come.',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-light)',
  },
];

const stats = [
  { number: '50K+', label: 'Mock Interviews Completed', icon: <Users size={20} /> },
  { number: '94%', label: 'Users Reported Confidence Boost', icon: <TrendingUp size={20} /> },
  { number: '3 min', label: 'Average Setup Time', icon: <Clock size={20} /> },
  { number: '12+', label: 'Skills Evaluated Per Session', icon: <Award size={20} /> },
];

const testimonials = [
  {
    name: 'Priya Nair',
    role: 'Software Engineer at Zoho',
    text: 'iQup helped me crack three interviews in a row. The AI-generated questions were eerily similar to what I was actually asked. The feedback on my answers was specific and actionable.',
    rating: 5,
    avatar: 'PN',
    color: '#e8572a',
  },
  {
    name: 'Arjun Mehta',
    role: 'Data Analyst at Infosys',
    text: 'I was terrible at articulating my thought process. After two weeks of daily practice on iQup, I could walk through case studies confidently. Got my dream offer.',
    rating: 5,
    avatar: 'AM',
    color: '#0d8f7c',
  },
  {
    name: 'Sneha Krishnamurthy',
    role: 'Product Manager at Razorpay',
    text: 'The resume-driven questions are what set iQup apart. Every session felt like a real conversation about my actual work experience, not generic textbook stuff.',
    rating: 5,
    avatar: 'SK',
    color: '#6d28d9',
  },
];

const logos = ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS', 'Wipro', 'Zoho', 'Razorpay', 'PhonePe'];

export default function HomePage() {
  const navigate = useNavigate();
  useRevealAll('[data-reveal]');

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle bg texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,87,42,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '10%', right: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,143,124,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <span className="badge badge-accent">
                  <Zap size={10} />
                  AI-Powered Interview Coach
                </span>
              </div>

              <h1 className="animate-fade-up delay-100" style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: 'var(--color-ink)',
                marginBottom: '24px',
              }}>
                Land Your Dream Job<br />
                <span style={{
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, #f5822a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>With AI by Your Side</span>
              </h1>

              <p className="animate-fade-up delay-200" style={{
                fontSize: '18px', lineHeight: 1.7, color: 'var(--color-ink-3)',
                maxWidth: '480px', marginBottom: '40px',
              }}>
                Upload your resume, get personalized interview questions, practice with live voice & webcam, and receive instant AI feedback — all in one seamless platform.
              </p>

              <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
                <Link to="/upload" className="btn btn-primary btn-lg">
                  Start Your Free Session
                  <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Play size={16} fill="currentColor" style={{ opacity: 0.7 }} />
                  See How It Works
                </Link>
              </div>

              <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[
                  '✓ No credit card required',
                  '✓ Data deleted after session',
                  '✓ Works on any browser',
                ].map((item, i) => (
                  <span key={i} style={{ fontSize: '13px', color: 'var(--color-ink-3)', fontWeight: 500 }}>{item}</span>
                ))}
              </div>
            </div>

            {/* Right — hero card */}
            <div className="animate-slide-right" style={{ position: 'relative' }}>
              <div style={{
                background: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
                zIndex: 1,
              }}>
                {/* Mock interview UI */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Brain size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>Live Mock Interview</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-teal)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-teal)', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
                        In Progress
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '11px' }}>Question 3/7</span>
                </div>

                <div style={{ background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-ink-2)', fontWeight: 500 }}>
                    "Describe a challenging technical problem you encountered in your most recent role. How did you approach debugging and what was your resolution strategy?"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    flex: 1, height: '40px', borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(90deg, var(--color-accent-light) 0%, rgba(232,87,42,0.03) 100%)',
                    border: '1px dashed var(--color-accent-mid)',
                    display: 'flex', alignItems: 'center', paddingLeft: '14px', gap: '8px',
                  }}>
                    <Mic size={14} color="var(--color-accent)" />
                    <span style={{ fontSize: '12px', color: 'var(--color-ink-3)' }}>Listening... speak your answer</span>
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse-ring 2s infinite', flexShrink: 0 }}>
                    <Mic size={16} color="white" />
                  </div>
                </div>

                {/* Score bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Clarity', val: 82, color: 'var(--color-teal)' },
                    { label: 'Structure', val: 74, color: 'var(--color-accent)' },
                    { label: 'Relevance', val: 91, color: 'var(--color-violet)' },
                  ].map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', width: '60px', color: 'var(--color-ink-3)', fontWeight: 500 }}>{s.label}</span>
                      <div style={{ flex: 1, height: '6px', background: 'var(--color-bg-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${s.val}%`, height: '100%', background: s.color, borderRadius: '3px', transition: 'width 1.2s ease' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-ink-2)', width: '32px', textAlign: 'right' }}>{s.val}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent cards */}
              <div style={{
                position: 'absolute', top: '-20px', right: '-24px',
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)', padding: '12px 16px',
                boxShadow: 'var(--shadow-md)', zIndex: 2, animation: 'float 4s ease-in-out infinite',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} color="var(--color-teal)" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>Resume Analyzed</span>
                </div>
              </div>

              <div style={{
                position: 'absolute', bottom: '-16px', left: '-20px',
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)', padding: '12px 16px',
                boxShadow: 'var(--shadow-md)', zIndex: 2, animation: 'float 4s ease-in-out 1s infinite',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} color="var(--color-accent)" />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink)' }}>Score: 83/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section > .container > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── Logo marquee ── */}
      <section style={{ padding: '32px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-subtle)', overflow: 'hidden' }}>
        <div style={{ marginBottom: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--color-ink-4)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Candidates preparing for roles at
          </span>
        </div>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
          {[...logos, ...logos].map((logo, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '0 32px',
              fontSize: '15px', fontWeight: 600,
              color: 'var(--color-ink-4)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.01em',
            }}>
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-sm" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: 'var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            {stats.map((stat, i) => (
              <div key={i} data-reveal data-delay={i * 100} className="reveal" style={{
                background: 'white', padding: '40px 32px', textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: 'var(--color-accent)' }}>{stat.icon}</div>
                <div style={{ fontSize: '42px', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-ink)', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.number}</div>
                <div style={{ fontSize: '14px', color: 'var(--color-ink-3)', marginTop: '8px', lineHeight: 1.4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section" style={{ background: 'var(--color-bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div data-reveal className="reveal" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <span className="badge badge-teal">How It Works</span>
            </div>
            <h2 data-reveal data-delay="100" className="reveal section-title">
              From resume to offer letter<br />in four focused steps
            </h2>
            <p data-reveal data-delay="200" className="reveal section-subtitle" style={{ margin: '16px auto 0' }}>
              iQup strips away the noise so you can focus on what actually matters — showing up prepared and confident.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {steps.map((step, i) => (
              <div key={i} data-reveal data-delay={i * 80} className="reveal" style={{
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)', padding: '32px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = step.color; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                <span style={{
                  position: 'absolute', top: '24px', right: '24px',
                  fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 800,
                  color: 'var(--color-bg-muted)', lineHeight: 1, letterSpacing: '-0.04em',
                }}>{step.step}</span>
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: step.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, marginBottom: '20px' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-ink-3)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <div data-reveal className="reveal">
                <span className="badge badge-accent" style={{ marginBottom: '20px' }}>Platform Features</span>
              </div>
              <h2 data-reveal data-delay="100" className="reveal section-title" style={{ marginBottom: '20px' }}>
                Everything you need to walk in prepared
              </h2>
              <p data-reveal data-delay="200" className="reveal section-subtitle" style={{ marginBottom: '32px' }}>
                iQup is more than a question bank. It's a complete interview readiness system built for the modern job market.
              </p>
              <div data-reveal data-delay="300" className="reveal">
                <Link to="/upload" className="btn btn-primary">
                  Try iQup Free <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {features.map((f, i) => (
                <div key={i} data-reveal data-delay={i * 60} className="reveal" style={{
                  display: 'flex', gap: '20px', padding: '24px',
                  border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)',
                  background: 'white', transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-bg-subtle)'; e.currentTarget.style.borderColor = f.color; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = ''; }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--color-ink-3)', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section .container > div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
            section .container > div > div[style*="position: sticky"] {
              position: static !important;
            }
          }
        `}</style>
      </section>

      {/* ── Testimonials ── */}
      <section className="section" style={{ background: 'var(--color-bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span data-reveal className="reveal badge badge-violet" style={{ display: 'inline-flex', marginBottom: '16px' }}>Success Stories</span>
            <h2 data-reveal data-delay="100" className="reveal section-title">Real results from real candidates</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} data-reveal data-delay={i * 100} className="reveal" style={{
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)', padding: '32px',
                boxShadow: 'var(--shadow-sm)', transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-ink-2)', marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: t.color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px',
                    flexShrink: 0,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-ink-3)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div data-reveal className="reveal" style={{
            background: 'var(--color-ink)',
            borderRadius: 'var(--radius-xl)',
            padding: '64px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-80px', right: '-80px',
              width: '360px', height: '360px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,87,42,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: '-60px', left: '-60px',
              width: '280px', height: '280px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(13,143,124,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <span className="badge badge-accent" style={{ marginBottom: '24px', display: 'inline-flex' }}>Get Started Today</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: '16px', position: 'relative' }}>
              Your next interview just got<br />a whole lot easier.
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.6, position: 'relative' }}>
              Upload your resume in seconds and start your first AI mock interview — completely free, no account required.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', position: 'relative' }}>
              <Link to="/upload" className="btn btn-primary btn-lg">
                Start Interview Now <ArrowRight size={18} />
              </Link>
              <Link to="/practice" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                <Code size={16} /> Practice Coding
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
