import React from 'react';
import { Link } from 'react-router-dom';
import { useRevealAll } from '../hooks/useReveal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Brain, Shield, BarChart2, Mic, Target, Users, Zap, Heart, Globe,
  ArrowRight, CheckCircle, Code, FileText, Award,
} from 'lucide-react';

const goals = [
  {
    icon: <Target size={24} />,
    badge: 'Core Mission',
    title: 'Realistic Interview Simulation',
    desc: 'We believe that true preparation means practicing under realistic conditions. iQup simulates live interviews by analyzing your resume and crafting questions that a real recruiter would ask — covering technical depth, behavioral competencies, and communication style.',
    extra: 'Sessions include timed responses, adaptive difficulty, and multi-domain coverage so you\'re ready for every curveball.',
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-light)',
  },
  {
    icon: <BarChart2 size={24} />,
    badge: 'Intelligent Feedback',
    title: 'Smart Scoring & Actionable Insights',
    desc: 'Generic feedback doesn\'t improve performance — specificity does. After every response, iQup\'s AI breaks down your answer across clarity, structure, relevance, and confidence, and tells you exactly how to improve.',
    extra: 'A session summary report gives you a numeric score, section-wise breakdown, and a prioritized improvement roadmap.',
    color: 'var(--color-teal)',
    bg: 'var(--color-teal-light)',
  },
  {
    icon: <Shield size={24} />,
    badge: 'Data Privacy',
    title: 'Privacy-First by Design',
    desc: 'Sharing your resume and recording your voice requires trust. We take that seriously. Every session runs over encrypted channels, and all data — your resume, audio, and AI-generated feedback — is permanently deleted the moment your session ends.',
    extra: 'No accounts needed to start. No data retained. GDPR-aligned architecture that puts you in full control.',
    color: 'var(--color-violet)',
    bg: 'var(--color-violet-light)',
  },
];

const techStack = [
  { label: 'React 18', category: 'Frontend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'MongoDB', category: 'Database' },
  { label: 'OpenAI API', category: 'AI' },
  { label: 'WebSpeech API', category: 'Voice' },
  { label: 'WebRTC', category: 'Video' },
  { label: 'Redis', category: 'Cache' },
  { label: 'Judge0', category: 'Code Exec' },
];

const timeline = [
  { year: '2024 Q1', event: 'Project concept and initial architecture design' },
  { year: '2024 Q2', event: 'Core AI interview engine built and tested' },
  { year: '2024 Q3', event: 'Voice recognition and webcam integration shipped' },
  { year: '2024 Q4', event: 'Coding IDE feature added; public beta launched' },
  { year: '2025', event: 'Continuous improvements based on user feedback' },
];

const values = [
  { icon: <Heart size={20} />, title: 'Built with Empathy', desc: 'We remember what interview anxiety feels like. Every design decision prioritizes reducing stress and building confidence.' },
  { icon: <Globe size={20} />, title: 'Accessible to All', desc: 'No paywalls for core practice. We believe every job seeker deserves quality preparation tools.' },
  { icon: <Zap size={20} />, title: 'Speed & Simplicity', desc: 'Upload a resume, start practicing. No onboarding flows, no tutorials required.' },
  { icon: <Code size={20} />, title: 'Technical Excellence', desc: 'Built with modern tools and best practices — because the quality of your tool reflects the quality of your preparation.' },
];

export default function About() {
  useRevealAll('[data-reveal]');

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', background: 'var(--color-bg-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(232,87,42,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <div data-reveal className="reveal" style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <span className="badge badge-accent">Our Story</span>
          </div>
          <h1 data-reveal data-delay="100" className="reveal section-title">
            We're building the interview<br />
            coach you always needed
          </h1>
          <p data-reveal data-delay="200" className="reveal section-subtitle" style={{ margin: '20px auto 40px', textAlign: 'center' }}>
            iQup was born from a simple frustration: why are smart, talented people failing interviews just because they weren't prepared enough? We set out to fix that with AI.
          </p>
          <div data-reveal data-delay="300" className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/upload" className="btn btn-primary">
              Try iQup Free <ArrowRight size={16} />
            </Link>
            <Link to="/blogs" className="btn btn-outline">Read Our Blog</Link>
          </div>
        </div>
      </section>

      {/* ── Mission section ── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
            <div>
              <span data-reveal className="reveal badge badge-teal" style={{ display: 'inline-flex', marginBottom: '20px' }}>Why iQup Exists</span>
              <h2 data-reveal data-delay="100" className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '20px' }}>
                The gap between talent and opportunity shouldn't be a lack of practice
              </h2>
              <p data-reveal data-delay="200" className="reveal" style={{ fontSize: '16px', color: 'var(--color-ink-3)', lineHeight: 1.8, marginBottom: '16px' }}>
                Every year, thousands of qualified candidates miss great opportunities — not because they lack the skills, but because they weren't practiced enough to articulate them confidently under pressure.
              </p>
              <p data-reveal data-delay="300" className="reveal" style={{ fontSize: '16px', color: 'var(--color-ink-3)', lineHeight: 1.8, marginBottom: '32px' }}>
                iQup is the AI-powered interview coach that adapts to you — analyzing your resume, simulating real recruiter behavior, and giving the kind of honest, specific feedback that turns nervous candidates into confident ones.
              </p>
              <div data-reveal data-delay="400" className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Resume-personalized question sets', 'Real-time voice and presence analysis', 'Instant, actionable performance feedback'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="var(--color-teal)" />
                    <span style={{ fontSize: '15px', color: 'var(--color-ink-2)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal data-delay="100" className="reveal">
              <div style={{
                background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-xl)',
                padding: '40px', border: '1px solid var(--color-border)',
                position: 'relative',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { n: '50K+', l: 'Sessions', c: 'var(--color-accent)' },
                    { n: '94%', l: 'Success Rate', c: 'var(--color-teal)' },
                    { n: '12+', l: 'Skills Assessed', c: 'var(--color-violet)' },
                    { n: '3 min', l: 'To Start', c: 'var(--color-amber)' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '24px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: s.c, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.n}</div>
                      <div style={{ fontSize: '13px', color: 'var(--color-ink-3)', marginTop: '6px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            section .container > div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── Goals ── */}
      <section className="section" style={{ background: 'var(--color-bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span data-reveal className="reveal badge badge-violet" style={{ display: 'inline-flex', marginBottom: '16px' }}>Core Goals</span>
            <h2 data-reveal data-delay="100" className="reveal section-title">Three pillars that guide everything we build</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {goals.map((goal, i) => (
              <div key={i} data-reveal data-delay={i * 100} className="reveal" style={{
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)', padding: '40px',
                display: 'grid', gridTemplateColumns: '1fr 2fr',
                gap: '48px', alignItems: 'center',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = goal.color; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = ''; }}
              >
                <div>
                  <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', background: goal.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: goal.color, marginBottom: '16px' }}>
                    {goal.icon}
                  </div>
                  <span className="badge" style={{ background: goal.bg, color: goal.color, marginBottom: '12px', display: 'inline-flex' }}>{goal.badge}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, lineHeight: 1.3 }}>{goal.title}</h3>
                </div>
                <div>
                  <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--color-ink-2)', marginBottom: '16px' }}>{goal.desc}</p>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-ink-3)', padding: '16px', background: goal.bg, borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${goal.color}` }}>{goal.extra}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            section .container > div > div[style*="grid-template-columns: 1fr 2fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── Values ── */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span data-reveal className="reveal badge badge-amber" style={{ display: 'inline-flex', marginBottom: '16px' }}>Our Values</span>
            <h2 data-reveal data-delay="100" className="reveal section-title">Principles that shape our product</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {values.map((v, i) => (
              <div key={i} data-reveal data-delay={i * 80} className="reveal card-flat" style={{ transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-bg-subtle)'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', marginBottom: '16px' }}>
                  {v.icon}
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, marginBottom: '10px' }}>{v.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-ink-3)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section className="section-sm" style={{ background: 'var(--color-bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span data-reveal className="reveal badge badge-teal" style={{ display: 'inline-flex', marginBottom: '16px' }}>Under the Hood</span>
            <h2 data-reveal data-delay="100" className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700 }}>Built with battle-tested technology</h2>
          </div>
          <div data-reveal className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {techStack.map((t, i) => (
              <div key={i} style={{
                padding: '10px 20px', background: 'white',
                border: '1px solid var(--color-border)', borderRadius: '100px',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.category}</span>
                <span style={{ width: '1px', height: '12px', background: 'var(--color-border)' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-ink)' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div data-reveal className="reveal" style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Ready to walk into your next interview prepared?
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-ink-3)', marginBottom: '32px', lineHeight: 1.6 }}>
              Join thousands of candidates who've used iQup to gain the confidence that converts to offers.
            </p>
            <Link to="/upload" className="btn btn-primary btn-lg">
              Start Your Free Session <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
