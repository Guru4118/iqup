import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRevealAll } from '../hooks/useReveal';
import { Clock, ArrowUpRight, BookOpen, TrendingUp, Tag } from 'lucide-react';

const CATEGORIES = ['All', 'Interview Tips', 'AI & Tech', 'Career Growth', 'Coding'];

function BlogCard({ blog, index }) {
  const colors = ['var(--color-accent)', 'var(--color-teal)', 'var(--color-violet)', 'var(--color-amber)'];
  const bgs = ['var(--color-accent-light)', 'var(--color-teal-light)', 'var(--color-violet-light)', 'var(--color-amber-light)'];
  const color = colors[index % colors.length];
  const bg = bgs[index % bgs.length];

  return (
    <Link to={`/blogs/${blog._id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{
        background: 'white', border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        transition: 'all 0.25s ease', height: '100%', display: 'flex', flexDirection: 'column',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = color; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
      >
        {/* Thumbnail placeholder */}
        <div style={{ height: '180px', background: `linear-gradient(135deg, ${bg} 0%, rgba(255,255,255,0) 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9 }}>
            <BookOpen size={24} color="white" />
          </div>
        </div>

        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', background: bg, color: color, borderRadius: '100px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Tag size={9} />
              {CATEGORIES[(index % (CATEGORIES.length - 1)) + 1]}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-ink-4)' }}>
              <Clock size={11} />
              {Math.max(3, Math.floor(blog.content?.length / 600) || 4)} min read
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, lineHeight: 1.3, marginBottom: '10px', color: 'var(--color-ink)' }}>
            {blog.title}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-ink-3)', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>
            {blog.content?.substring(0, 120)}...
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 700 }}>
                {blog.author?.charAt(0) || 'iQ'}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-ink-2)' }}>{blog.author || 'iQup Team'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: color, fontWeight: 600 }}>
              Read <ArrowUpRight size={13} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  useRevealAll('[data-reveal]');

  useEffect(() => {
    fetchBlogs()
      .then(res => { setBlogs(res.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '64px', background: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span data-reveal className="reveal badge badge-teal" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            <TrendingUp size={10} /> iQup Blog
          </span>
          <h1 data-reveal data-delay="100" className="reveal section-title">Insights to sharpen your career edge</h1>
          <p data-reveal data-delay="200" className="reveal section-subtitle" style={{ margin: '16px auto 0', textAlign: 'center' }}>
            Expert perspectives on interview strategies, AI in hiring, career development, and technical preparation.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section style={{ padding: '32px 0', borderBottom: '1px solid var(--color-border)', background: 'white', position: 'sticky', top: '68px', zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '8px 18px', borderRadius: '100px', border: '1.5px solid',
              borderColor: activeCategory === cat ? 'var(--color-accent)' : 'var(--color-border)',
              background: activeCategory === cat ? 'var(--color-accent-light)' : 'white',
              color: activeCategory === cat ? 'var(--color-accent)' : 'var(--color-ink-2)',
              fontSize: '13px', fontWeight: activeCategory === cat ? 600 : 400,
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease',
            }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 0', gap: '16px' }}>
              <div className="spinner" />
              <p style={{ color: 'var(--color-ink-3)', fontSize: '15px' }}>Loading articles...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--color-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid var(--color-border)' }}>
                <BookOpen size={28} color="var(--color-ink-4)" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>No articles yet</h3>
              <p style={{ color: 'var(--color-ink-3)' }}>Check back soon — new content is on the way.</p>
            </div>
          ) : (
            <>
              {/* Featured first article */}
              {blogs[0] && (
                <div data-reveal className="reveal" style={{ marginBottom: '40px' }}>
                  <Link to={`/blogs/${blogs[0]._id}`} style={{ textDecoration: 'none' }}>
                    <article style={{
                      background: 'white', border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      transition: 'all 0.25s ease',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                    >
                      <div style={{ height: '280px', background: 'linear-gradient(135deg, var(--color-accent-light) 0%, var(--color-bg-muted) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BookOpen size={36} color="white" />
                        </div>
                      </div>
                      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                          <span className="badge badge-accent">Featured</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--color-ink-4)' }}>
                            <Clock size={11} />5 min read
                          </span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '14px' }}>{blogs[0].title}</h2>
                        <p style={{ fontSize: '15px', color: 'var(--color-ink-3)', lineHeight: 1.7, marginBottom: '24px' }}>{blogs[0].content?.substring(0, 160)}...</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-accent)', fontWeight: 600, fontSize: '14px' }}>
                          Read Full Article <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              )}

              {/* Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {blogs.slice(1).map((blog, i) => (
                  <div key={blog._id} data-reveal data-delay={i * 60} className="reveal">
                    <BlogCard blog={blog} index={i + 1} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ padding: '80px 0', background: 'var(--color-bg-subtle)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
          <span data-reveal className="reveal badge badge-accent" style={{ display: 'inline-flex', marginBottom: '16px' }}>Stay Sharp</span>
          <h2 data-reveal data-delay="100" className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px' }}>
            Get interview tips in your inbox
          </h2>
          <p data-reveal data-delay="200" className="reveal" style={{ fontSize: '16px', color: 'var(--color-ink-3)', marginBottom: '32px' }}>
            Practical advice on interviews, AI, and career growth — every two weeks.
          </p>
          <div data-reveal data-delay="300" className="reveal" style={{ display: 'flex', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" placeholder="you@example.com" className="input" style={{ flex: 1 }} />
            <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Subscribe</button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          article[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
}
