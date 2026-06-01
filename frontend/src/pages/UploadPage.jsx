import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Upload, FileText, CheckCircle, ArrowRight, Brain, Mic, BarChart2, X, Clock } from 'lucide-react';

const steps = [
  { icon: <Brain size={16} />, label: 'AI analyzes your resume' },
  { icon: <Mic size={16} />, label: 'Live voice interview begins' },
  { icon: <BarChart2 size={16} />, label: 'Get instant performance report' },
];

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Please upload a PDF file only.'); return; }
    if (f.size > 5 * 1024 * 1024) { setError('File size should be under 5MB.'); return; }
    setError('');
    setFile(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    handleFile(f);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await axios.post('http://localhost:5000/api/resume/upload', formData, { withCredentials: true });
      if (res.data.sessionId) {
        localStorage.setItem('sessionId', res.data.sessionId);
        navigate('/interview');
      }
    } catch (err) {
      setError('Upload failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />

      <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-accent animate-fade-up" style={{ display: 'inline-flex', marginBottom: '16px' }}>Step 1 of 3</span>
            <h1 className="animate-fade-up delay-100 section-title">
              Upload your resume to begin
            </h1>
            <p className="animate-fade-up delay-200 section-subtitle" style={{ margin: '16px auto 0', textAlign: 'center' }}>
              Our AI reads your resume in seconds and crafts a personalized interview tailored to your experience and target role.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }} className="upload-grid">
            {/* Drop zone */}
            <div>
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => !file && document.getElementById('file-input').click()}
                style={{
                  border: `2px dashed ${dragging ? 'var(--color-accent)' : file ? 'var(--color-teal)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '64px 40px',
                  textAlign: 'center',
                  cursor: file ? 'default' : 'pointer',
                  background: dragging ? 'var(--color-accent-light)' : file ? 'var(--color-teal-light)' : 'var(--color-bg-subtle)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <input
                  id="file-input" type="file" accept=".pdf" style={{ display: 'none' }}
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {file ? (
                  <div>
                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <CheckCircle size={32} color="white" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--color-teal)', marginBottom: '8px' }}>Resume Ready!</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '12px 0' }}>
                      <FileText size={16} color="var(--color-ink-3)" />
                      <span style={{ fontSize: '14px', color: 'var(--color-ink-2)', fontWeight: 500 }}>{file.name}</span>
                      <button onClick={(e) => { e.stopPropagation(); setFile(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-ink-4)', padding: '2px', display: 'flex' }}>
                        <X size={14} />
                      </button>
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--color-ink-3)' }}>{(file.size / 1024).toFixed(0)} KB</span>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '20px',
                      background: dragging ? 'var(--color-accent)' : 'white',
                      border: `1px solid ${dragging ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px', boxShadow: 'var(--shadow-sm)',
                      transition: 'all 0.2s ease',
                    }}>
                      <Upload size={28} color={dragging ? 'white' : 'var(--color-accent)'} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                      {dragging ? 'Drop it here!' : 'Drag & drop your resume'}
                    </h3>
                    <p style={{ fontSize: '15px', color: 'var(--color-ink-3)', marginBottom: '16px' }}>
                      or <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>click to browse files</span>
                    </p>
                    <span style={{ fontSize: '13px', color: 'var(--color-ink-4)' }}>PDF format • Max 5MB</span>
                  </div>
                )}
              </div>

              {error && (
                <div style={{ marginTop: '12px', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', fontSize: '14px', color: '#dc2626' }}>
                  {error}
                </div>
              )}

              {file && (
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '20px', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <>
                      <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                      Analyzing your resume...
                    </>
                  ) : (
                    <>Start My Interview <ArrowRight size={18} /></>
                  )}
                </button>
              )}
            </div>

            {/* Side panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* What happens next */}
              <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '28px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, marginBottom: '20px', color: 'var(--color-ink-2)', letterSpacing: '-0.01em' }}>What happens next</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {steps.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: i === 0 ? 'var(--color-accent-light)' : i === 1 ? 'var(--color-teal-light)' : 'var(--color-violet-light)',
                        color: i === 0 ? 'var(--color-accent)' : i === 1 ? 'var(--color-teal)' : 'var(--color-violet)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {step.icon}
                      </div>
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-ink-4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step {i + 2}</span>
                        <p style={{ fontSize: '14px', color: 'var(--color-ink-2)', marginTop: '2px', fontWeight: 500 }}>{step.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time estimate */}
              <div style={{ background: 'var(--color-accent-light)', border: '1px solid var(--color-accent-mid)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Clock size={16} color="var(--color-accent)" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimated Duration</span>
                </div>
                <p style={{ fontSize: '24px', fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-ink)', marginBottom: '4px' }}>15–20 minutes</p>
                <p style={{ fontSize: '13px', color: 'var(--color-ink-3)' }}>For a focused, comprehensive mock interview with 7 questions.</p>
              </div>

              {/* Privacy note */}
              <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', gap: '12px' }}>
                <CheckCircle size={18} color="var(--color-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-2)', marginBottom: '4px' }}>Privacy guaranteed</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-ink-3)', lineHeight: 1.6 }}>Your resume and session data are permanently deleted when the interview ends. No storage, no sharing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .upload-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
