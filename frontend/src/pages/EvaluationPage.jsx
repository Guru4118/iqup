import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Award, TrendingUp, RotateCcw, Home, CheckCircle, AlertCircle, BarChart2, ChevronRight, ArrowRight } from 'lucide-react';

function parseScore(text) {
  if (!text) return null;
  const match = text.match(/(\d+)\s*\/\s*100|score[:\s]+(\d+)/i);
  if (match) return parseInt(match[1] || match[2]);
  return null;
}

function ScoreRing({ score }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = score ? (score / 100) * circ : 0;

  const color = score >= 80 ? 'var(--color-teal)' : score >= 60 ? 'var(--color-amber)' : 'var(--color-accent)';
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: '140px', height: '140px' }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-bg-muted)" strokeWidth="10" />
          <circle
            cx="70" cy="70" r={r} fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1.2s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, color: 'var(--color-ink)', lineHeight: 1, letterSpacing: '-0.04em' }}>
            {score ?? '—'}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--color-ink-3)', fontWeight: 500 }}>/ 100</span>
        </div>
      </div>
      <span style={{ fontSize: '13px', fontWeight: 700, color, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

function MetricBar({ label, value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      <span style={{ width: '100px', fontSize: '13px', color: 'var(--color-ink-2)', fontWeight: 500, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: '8px', background: 'var(--color-bg-muted)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '4px',
          background: color,
          width: `${value}%`,
          transition: 'width 1.2s ease',
        }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink-2)', width: '36px', textAlign: 'right' }}>{value}%</span>
    </div>
  );
}

function parseSections(text) {
  if (!text) return [];
  const lines = text.split('\n').filter(l => l.trim());
  const sections = [];
  let current = null;
  lines.forEach(line => {
    if (/^#{1,3}\s/.test(line) || /^\d+\.\s/.test(line) || line.endsWith(':')) {
      if (current) sections.push(current);
      current = { title: line.replace(/^#+\s|^\d+\.\s/, '').replace(/:$/, ''), body: [] };
    } else if (current) {
      current.body.push(line);
    } else {
      if (!sections.length) sections.push({ title: 'Feedback', body: [line] });
      else sections[sections.length - 1].body.push(line);
    }
  });
  if (current) sections.push(current);
  return sections;
}

const MOCK_METRICS = [
  { label: 'Clarity', value: 78, color: 'var(--color-teal)' },
  { label: 'Structure', value: 72, color: 'var(--color-accent)' },
  { label: 'Relevance', value: 85, color: 'var(--color-violet)' },
  { label: 'Confidence', value: 68, color: 'var(--color-amber)' },
];

export default function EvaluationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const evaluation = location.state?.evaluation;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!evaluation) {
      navigate('/interview');
      return;
    }
    setTimeout(() => setVisible(true), 100);
  }, [evaluation, navigate]);

  const score = parseScore(evaluation);
  const sections = parseSections(evaluation);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero band */}
      <section style={{
        paddingTop: '100px', paddingBottom: '48px',
        background: 'linear-gradient(135deg, var(--color-bg-subtle) 0%, white 100%)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <CheckCircle size={18} color="var(--color-teal)" />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-teal)' }}>Interview Complete</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '12px' }}>
            Your Interview Evaluation Report
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-ink-3)', maxWidth: '540px', lineHeight: 1.6 }}>
            Below is your personalized AI-generated feedback. Review each section carefully and use the recommendations to sharpen your performance.
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {evaluation ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>

              {/* Score + metrics card */}
              <div style={{
                background: 'white', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)', padding: '40px',
                display: 'grid', gridTemplateColumns: 'auto 1fr',
                gap: '48px', alignItems: 'center',
              }} className="score-card">
                <ScoreRing score={score} />
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--color-ink-2)' }}>
                    Performance Breakdown
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {MOCK_METRICS.map(m => <MetricBar key={m.label} {...m} />)}
                  </div>
                </div>
              </div>

              {/* Feedback sections */}
              {sections.length > 0 ? (
                sections.map((section, i) => {
                  const isPositive = /strength|well|good|excellent|great|positive/i.test(section.title);
                  const isImprove = /improve|weak|better|suggest|area|work on/i.test(section.title);
                  const accentColor = isPositive ? 'var(--color-teal)' : isImprove ? 'var(--color-accent)' : 'var(--color-violet)';
                  const accentBg = isPositive ? 'var(--color-teal-light)' : isImprove ? 'var(--color-accent-light)' : 'var(--color-violet-light)';

                  return (
                    <div key={i} style={{
                      background: 'white', border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                    }}>
                      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--color-border)', background: accentBg, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {isPositive ? <CheckCircle size={16} color={accentColor} /> : isImprove ? <TrendingUp size={16} color={accentColor} /> : <BarChart2 size={16} color={accentColor} />}
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: 'var(--color-ink)' }}>{section.title}</h3>
                      </div>
                      <div style={{ padding: '24px 28px' }}>
                        {section.body.map((line, j) => (
                          <p key={j} style={{ fontSize: '15px', color: 'var(--color-ink-2)', lineHeight: 1.75, marginBottom: j < section.body.length - 1 ? '12px' : 0 }}>
                            {line.startsWith('- ') || line.startsWith('• ')
                              ? <span style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, flexShrink: 0, marginTop: '9px' }} />
                                  {line.replace(/^[-•]\s/, '')}
                                </span>
                              : line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '32px' }}>
                  <p style={{ fontSize: '15px', color: 'var(--color-ink-2)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{evaluation}</p>
                </div>
              )}

              {/* Action bar */}
              <div style={{
                background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)', padding: '28px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
              }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Ready to improve further?</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-ink-3)' }}>Practice more sessions or sharpen your coding skills.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link to="/practice" className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BarChart2 size={14} /> Practice Coding
                  </Link>
                  <Link to="/upload" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <RotateCcw size={14} /> Try Again
                  </Link>
                  <Link to="/" className="btn btn-sm" style={{ background: 'var(--color-ink)', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: 'var(--radius-sm)' }}>
                    <Home size={14} /> Home
                  </Link>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="spinner" style={{ margin: '0 auto 16px' }} />
              <p style={{ color: 'var(--color-ink-3)' }}>Loading your evaluation...</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .score-card { grid-template-columns: 1fr !important; justify-items: center; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
