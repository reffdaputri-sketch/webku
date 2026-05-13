'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { NewsItem } from '@/lib/supabase';

export default function NewsSection({ news }: { news: NewsItem[] }) {
  if (!news || news.length === 0) return null;

  return (
    <section id="news" style={{
      padding: 'clamp(64px, 9vw, 100px) 0',
      background: 'var(--bg-surface)',
    }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <span className="badge" style={{ marginBottom: '14px' }}>Wawasan &amp; Berita</span>
          <h2>
            Artikel &amp; <span className="text-gradient">Pembaruan Terbaru</span>
          </h2>
          <p>
            Mengikuti perkembangan teknologi, pola arsitektur modern, dan wawasan industri digital terkini.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid-2">
          {news.map((item, idx) => (
            <article
              key={item.id}
              className="glass-panel"
              style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}
            >
              {/* Image */}
              <div style={{
                width: '100%', height: 'clamp(180px, 25vw, 240px)',
                overflow: 'hidden', position: 'relative', flexShrink: 0,
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e)  => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Dark overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)',
                }} />

                {/* Date badge overlay */}
                <div style={{
                  position: 'absolute', bottom: '12px', left: '14px',
                  background: 'rgba(13, 15, 22, 0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)',
                  fontWeight: 500,
                }}>
                  <Calendar size={11} style={{ color: 'hsl(217, 91%, 65%)' }} />
                  <span>{item.created_at}</span>
                </div>

                {/* Index badge */}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: 'var(--accent-gradient)',
                  color: '#fff', width: '28px', height: '28px',
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.78rem', fontWeight: 800,
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Content */}
              <div style={{
                padding: 'clamp(20px, 3vw, 28px)',
                display: 'flex', flexDirection: 'column', flexGrow: 1,
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                  fontWeight: 700, color: 'var(--text-main)',
                  marginBottom: '10px', lineHeight: 1.45, letterSpacing: '-0.01em',
                }}>
                  {item.title}
                </h3>

                <p style={{
                  color: 'var(--text-muted)', fontSize: '0.9rem',
                  lineHeight: 1.7, marginBottom: '20px', flexGrow: 1,
                }}>
                  {item.summary}
                </p>

                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <Link
                    href={`/news/${item.id}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      color: 'hsl(217, 91%, 65%)',
                      fontWeight: 600, fontSize: '0.87rem',
                      transition: 'gap 0.2s ease',
                      textDecoration: 'none',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.gap = '10px'}
                    onMouseOut={(e)  => e.currentTarget.style.gap = '6px'}
                  >
                    Baca Artikel <ArrowRight size={14} />
                  </Link>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '0.75rem', color: 'var(--text-dim)',
                  }}>
                    <Clock size={12} />
                    <span>5 min baca</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
