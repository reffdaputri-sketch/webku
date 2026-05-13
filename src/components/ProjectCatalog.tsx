'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, ExternalLink, Star } from 'lucide-react';
import { Project } from '@/lib/supabase';

const prices      = ['$49', '$99', '$79', '$39', '$129', '$59'];
const reviewCounts = [40, 8, 6, 75, 12, 30];
const salesCounts  = [10, 8, 6, 5, 14, 9];

export default function ProjectCatalog({ projects }: { projects: Project[] }) {
  const [filter, setFilter]       = useState('Semua');
  const [cartToast, setCartToast] = useState<string | null>(null);

  useEffect(() => {
    if (!cartToast) return;
    const timer = setTimeout(() => setCartToast(null), 3500);
    return () => clearTimeout(timer);
  }, [cartToast]);

  if (!projects || projects.length === 0) return null;

  const categories    = ['Semua', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = filter === 'Semua' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ padding: 'clamp(56px, 8vw, 96px) 0', background: 'var(--bg-surface)' }}>
      <div className="container">

        {/* Section Header & Mascot */}
        <div style={{ 
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', 
          gap: '20px', marginBottom: '32px' 
        }}>
          <div style={{ flex: '1 1 400px' }}>
            <span className="badge" style={{ marginBottom: '12px' }}>Portofolio Proyek</span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800, letterSpacing: '-0.02em',
              color: 'var(--text-main)', marginBottom: '10px',
            }}>
              Proyek yang Telah{' '}
              <span className="text-gradient">Diselesaikan</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '580px', lineHeight: 1.7 }}>
              Koleksi hasil karya terbaik: aplikasi mobile, portal web, dan desain UI yang
              memenuhi standar industri digital tertinggi.
            </p>
          </div>

          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', flex: '1 1 200px' }}>
            <img 
              src="/mascot/standing.png" 
              alt="FLaz.Dev Mascot Thumbs Up" 
              style={{ 
                width: '100%', maxWidth: '160px', height: 'auto', 
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
              }} 
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex', gap: '6px', flexWrap: 'wrap',
          alignItems: 'center', marginBottom: '32px',
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: filter === cat ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid var(--border-color)',
                color: filter === cat ? 'hsl(217, 91%, 70%)' : 'var(--text-muted)',
                padding: '7px 18px',
                borderRadius: '999px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: filter === cat ? 700 : 500,
                transition: 'all 0.2s ease',
                letterSpacing: '0.1px',
              }}
              onMouseOver={(e) => {
                if (filter !== cat) {
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseOut={(e) => {
                if (filter !== cat) {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid-3" style={{ alignItems: 'start' }}>
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Thumbnail */}
              <div style={{
                position: 'relative', width: '100%', paddingTop: '56%',
                overflow: 'hidden', background: 'var(--bg-elevated)',
              }} className="project-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                {/* Category chip on image */}
                <div style={{
                  position: 'absolute', top: '10px', left: '10px',
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.85)',
                  padding: '4px 10px', borderRadius: '6px',
                  fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.3px', textTransform: 'uppercase',
                }}>
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

                <h3 style={{
                  fontSize: '0.98rem', fontWeight: 700,
                  color: 'var(--text-main)', marginBottom: '4px',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {project.title}
                </h3>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '14px', fontStyle: 'italic' }}>
                  by <span style={{ color: 'var(--text-muted)' }}>FLaz.Dev</span> &nbsp;·&nbsp; {project.category}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '0.88rem', color: 'var(--text-muted)',
                  lineHeight: 1.6, marginBottom: '16px', flexGrow: 1,
                  display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  textAlign: 'justify'
                }}>
                  {project.description}
                </p>

                {/* Price */}
                <div style={{
                  fontSize: '1.45rem', fontWeight: 800,
                  color: 'var(--text-main)', marginBottom: '8px', letterSpacing: '-0.02em',
                }}>
                  {(() => {
                    const price = project.price || '';
                    if (!price) return 'Rp -';
                    const numStr = price.replace(/[^0-9]/g, '');
                    if (!numStr) return price;
                    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(parseInt(numStr, 10));
                  })()}
                </div>

                {/* Stars & Sales */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i} size={12} fill="hsl(43, 96%, 60%)"
                          color="hsl(43, 96%, 60%)" strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span>({reviewCounts[idx % reviewCounts.length]})</span>
                  </div>
                  <span style={{
                    background: 'var(--bg-elevated)',
                    padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600,
                  }}>
                    {salesCounts[idx % salesCounts.length]} Sales
                  </span>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex', gap: '8px',
                  alignItems: 'center', justifyContent: 'flex-end',
                  marginTop: 'auto', paddingTop: '14px',
                  borderTop: '1px solid var(--border-color)',
                }}>
                  <button
                    onClick={() => setCartToast(`"${project.title}" ditambahkan ke keranjang!`)}
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      width: '34px', height: '34px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: 'var(--text-muted)',
                      transition: 'all 0.15s ease', flexShrink: 0,
                    }}
                    title="Tambahkan ke Keranjang"
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.35)';
                      e.currentTarget.style.color = 'hsl(217, 91%, 65%)';
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'var(--bg-elevated)';
                    }}
                  >
                    <ShoppingCart size={15} />
                  </button>

                  <Link
                    href={`/project/${project.id}`}
                    style={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      borderRadius: '8px',
                      padding: '7px 14px',
                      fontSize: '0.82rem', fontWeight: 600,
                      color: 'hsl(217, 91%, 70%)',
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      transition: 'all 0.15s ease', textDecoration: 'none', flexGrow: 1,
                      justifyContent: 'center',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.18)';
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.45)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
                    }}
                  >
                    Lihat Project <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Toast */}
        {cartToast && (
          <div style={{
            position: 'fixed', bottom: '28px', right: '24px',
            background: 'var(--bg-elevated)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: 'var(--text-main)',
            padding: '14px 20px', borderRadius: '12px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            zIndex: 2000, display: 'flex', alignItems: 'center', gap: '12px',
            fontSize: '0.9rem', fontWeight: 500,
            backdropFilter: 'blur(20px)',
            animation: 'slideUp 0.3s ease',
          }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: '0.9rem',
            }}>🛍️</div>
            <span>{cartToast}</span>
            <button
              onClick={() => setCartToast(null)}
              style={{
                background: 'transparent', border: 'none',
                color: 'var(--text-dim)', cursor: 'pointer',
                fontSize: '1.1rem', lineHeight: 1, marginLeft: '4px', padding: '0 4px',
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
