import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {
  Mic, MicOff, Video, VideoOff, SkipForward, Send,
  CheckCircle, AlertTriangle, Clock, BarChart2, MessageSquare,
} from 'lucide-react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

export default function InterviewPage() {
  const [question, setQuestion] = useState('');
  const [webcamOn, setWebcamOn] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [evaluationReady, setEvaluationReady] = useState(true);
  const [questionNum, setQuestionNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const sessionId = localStorage.getItem('sessionId');
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/question/${sessionId}`, { withCredentials: true });
      if (res.data.question) {
        setQuestion(res.data.question);
        setInterviewCompleted(res.data.question === 'Interview completed');
      } else {
        setQuestion(res.data.message || '');
      }
      setRecognizedText('');
      setTextAnswer('');
      setRecording(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuestion(); }, []);

  const sendAnswer = async (text) => {
    if (!sessionId || !text.trim()) return;
    try {
      await axios.post(`http://localhost:5000/api/question/${sessionId}`, { answer: text }, { withCredentials: true });
      setQuestionNum(n => n + 1);
      fetchQuestion();
    } catch (err) {
      console.error(err);
    }
  };

  const startRecording = async () => {
    if (!SpeechRecognition) { alert('Speech Recognition not supported in your browser.'); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorderRef.current.start();

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setRecognizedText(text);
        sendAnswer(text);
      };
      recognitionRef.current.onerror = (e) => console.error('Speech error:', e.error);
      recognitionRef.current.start();
      setRecording(true);
    } catch (err) {
      alert('Microphone access required for voice answers.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop();
    setRecording(false);
  };

  const fetchEvaluation = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/evaluate/${sessionId}`, { withCredentials: true });
      navigate('/evaluation', { state: { evaluation: res.data.evaluation } });
    } catch (err) {
      navigate('/evaluation', { state: { evaluation: 'Evaluation could not be loaded. Please try again.' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Top bar */}
      <div style={{ marginTop: '68px', padding: '14px 24px', borderBottom: '1px solid var(--color-border)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: interviewCompleted ? 'var(--color-ink-4)' : 'var(--color-teal)', display: 'inline-block', animation: interviewCompleted ? 'none' : 'pulse-ring 2s infinite' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: interviewCompleted ? 'var(--color-ink-3)' : 'var(--color-teal)' }}>
              {interviewCompleted ? 'Interview Complete' : 'Live Session'}
            </span>
          </div>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <span style={{ fontSize: '13px', color: 'var(--color-ink-3)' }}>Question <strong style={{ color: 'var(--color-ink)' }}>{questionNum}</strong></span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setWebcamOn(p => !p)} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {webcamOn ? <><Video size={13} /> Cam On</> : <><VideoOff size={13} /> Cam Off</>}
          </button>
          {!interviewCompleted && (
            <button onClick={fetchQuestion} className="btn btn-sm" style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', color: 'var(--color-ink-2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SkipForward size={13} /> Skip
            </button>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px', minHeight: 'calc(100vh - 140px)' }} className="interview-grid">

        {/* Left: question + answer */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', borderRight: '1px solid var(--color-border)' }}>
          {/* Question card */}
          <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <MessageSquare size={15} color="var(--color-accent)" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Interview Question</span>
            </div>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="spinner" style={{ width: '24px', height: '24px', borderWidth: '2px' }} />
                <span style={{ fontSize: '15px', color: 'var(--color-ink-3)' }}>Generating your next question...</span>
              </div>
            ) : (
              <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--color-ink)', fontWeight: 500 }}>
                {interviewCompleted ? '🎉 You\'ve completed all interview questions!' : question || 'Loading question...'}
              </p>
            )}
          </div>

          {!interviewCompleted && (
            <>
              {/* Voice answer */}
              <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, marginBottom: '16px', color: 'var(--color-ink-2)' }}>Answer via Voice</h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={recording ? stopRecording : startRecording}
                    className={`btn btn-lg ${recording ? '' : 'btn-primary'}`}
                    style={recording ? { background: '#fef2f2', color: '#dc2626', border: '1.5px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '15px', fontWeight: 500 } : { display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    {recording ? <><MicOff size={18} /> Stop Recording</> : <><Mic size={18} /> Start Recording</>}
                  </button>
                  {recording && (
                    <div style={{ display: 'flex', align: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626', animation: 'pulse-ring 1s infinite', display: 'inline-block', marginTop: '4px' }} />
                      <span style={{ fontSize: '13px', color: '#dc2626', fontWeight: 500 }}>Recording in progress...</span>
                    </div>
                  )}
                </div>

                {recognizedText && (
                  <div style={{ marginTop: '16px', padding: '14px 18px', background: 'var(--color-teal-light)', border: '1px solid var(--color-teal)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <CheckCircle size={14} color="var(--color-teal)" />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-teal)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Answer Captured</span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--color-ink-2)', lineHeight: 1.6 }}>{recognizedText}</p>
                  </div>
                )}
              </div>

              {/* Text answer fallback */}
              <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, marginBottom: '12px', color: 'var(--color-ink-2)' }}>Or type your answer</h3>
                <textarea
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={4}
                  style={{
                    width: '100%', padding: '12px 16px', border: '1.5px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-body)', fontSize: '15px',
                    color: 'var(--color-ink)', resize: 'vertical', outline: 'none',
                    transition: 'border-color 0.2s', boxSizing: 'border-box', lineHeight: 1.6,
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                />
                <button
                  onClick={() => { sendAnswer(textAnswer); setTextAnswer(''); }}
                  disabled={!textAnswer.trim()}
                  className="btn btn-teal btn-sm"
                  style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', opacity: !textAnswer.trim() ? 0.5 : 1 }}
                >
                  <Send size={13} /> Submit Answer
                </button>
              </div>
            </>
          )}

          {interviewCompleted && (
            <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle size={32} color="var(--color-teal)" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Interview Completed!</h2>
              <p style={{ color: 'var(--color-ink-3)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
                Excellent effort! Your responses have been recorded. Click below to see your detailed AI performance evaluation.
              </p>
              <button onClick={fetchEvaluation} disabled={loading} className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {loading ? <><div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} /> Generating Report...</> : <><BarChart2 size={18} /> View My Evaluation</>}
              </button>
            </div>
          )}
        </div>

        {/* Right: webcam + tips */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--color-bg-subtle)' }}>
          {/* Webcam */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)', background: 'var(--color-ink)', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {webcamOn ? (
              <Webcam
                audio={false}
                mirrored
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <VideoOff size={32} color="rgba(255,255,255,0.3)" />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Camera off</span>
              </div>
            )}
            {webcamOn && (
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '100px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-ring 2s infinite' }} />
                <span style={{ fontSize: '11px', color: 'white', fontWeight: 500 }}>Live</span>
              </div>
            )}
          </div>

          {/* Tips */}
          <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: '14px' }}>Interview Tips</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🧠', tip: 'Use the STAR method: Situation, Task, Action, Result.' },
                { icon: '⏱', tip: 'Keep each answer concise — aim for 60–90 seconds.' },
                { icon: '👁', tip: 'Maintain eye contact with the camera, not your notes.' },
                { icon: '🗣', tip: 'Speak clearly and avoid filler words like "um" and "uh".' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '14px', flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ fontSize: '13px', color: 'var(--color-ink-3)', lineHeight: 1.5 }}>{t.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .interview-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
