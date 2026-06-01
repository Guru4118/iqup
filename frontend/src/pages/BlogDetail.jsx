import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Clock, BookOpen, MessageSquare, ArrowUpRight, Share2 } from 'lucide-react';
import { fetchBlogs } from '../api/blogApi';
import { API_BASE_URL } from '../api/config';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
        setBlog(res.data);
        const all = await fetchBlogs();
        setRelated((all.data || []).filter(b => b._id !== id).slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '16px' }}>
        <div className="spinner" />
        <p style={{ color: 'var(--color-ink-3)' }}>Loading article...</p>
      </div>
    </div>
  );

  if (!blog) return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '100px 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', marginBottom: '12px' }}>Article not found</h2>
        <Link to="/blogs" className="btn btn-primary">← Back to Blog</Link>
      </div>
    </div>
  );

  const readTime = Math.max(3, Math.floor(blog.content?.length / 600) || 4);

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '100px', paddingBottom: '48px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '780px', margin: '0 auto' }}>
          <Link to="/blogs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--color-ink-3)', textDecoration: 'none', marginBottom: '28px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-ink)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-ink-3)'}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span className="badge badge-accent">Interview Tips</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--color-ink-4)' }}>
              <Clock size={12} /> {readTime} min read
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--color-ink-4)' }}>
              <BookOpen size={12} /> {blog.content?.split(' ').length || 0} words
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '20px' }}>
            {blog.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: 700 }}>
                {blog.author?.charAt(0) || 'iQ'}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{blog.author || 'iQup Team'}</div>
                <div style={{ fontSize: '12px', color: 'var(--color-ink-4)' }}>{new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'white', cursor: 'pointer', fontSize: '13px', color: 'var(--color-ink-2)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-ink-2)'; }}
            >
              <Share2 size={13} /> Share
            </button>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ padding: '56px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '48px', maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }} className="article-grid">
          <article style={{ maxWidth: '680px' }}>
            <div style={{
              fontSize: '17px', lineHeight: 1.85, color: 'var(--color-ink-2)',
              fontFamily: 'var(--font-body)',
            }}>
              {(blog.content || '').split('\n\n').map((para, i) => (
                para.trim() ? (
                  <p key={i} style={{ marginBottom: '24px' }}>{para.trim()}</p>
                ) : null
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
              {['Interview', 'AI', 'Career', 'Preparation'].map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: '40px', background: 'var(--color-accent-light)', border: '1px solid var(--color-accent-mid)', borderRadius: 'var(--radius-lg)', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>Ready to practice what you've learned?</h3>
              <p style={{ fontSize: '15px', color: 'var(--color-ink-2)', marginBottom: '20px', lineHeight: 1.6 }}>Put your knowledge to the test with a personalized AI mock interview based on your resume.</p>
              <Link to="/upload" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Start Mock Interview <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ position: 'sticky', top: '90px' }}>
              {/* About author */}
              <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-ink-3)', marginBottom: '14px' }}>About the Author</h4>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                    {blog.author?.charAt(0) || 'iQ'}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{blog.author || 'iQup Team'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-ink-4)' }}>Career & Tech Writer</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-ink-3)', lineHeight: 1.6 }}>Passionate about helping candidates navigate the modern hiring landscape with confidence.</p>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div style={{ background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-ink-3)', marginBottom: '16px' }}>Related Articles</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {related.map(r => (
                      <Link key={r._id} to={`/blogs/${r._id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'white'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <BookOpen size={14} color="var(--color-accent)" />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-ink-2)', lineHeight: 1.4 }}>
                            {r.title?.substring(0, 60)}{r.title?.length > 60 ? '...' : ''}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
