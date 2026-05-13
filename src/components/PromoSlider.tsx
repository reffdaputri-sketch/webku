'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { PromoItem } from '@/lib/supabase';

export default function PromoSlider({ promos }: { promos: PromoItem[] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!promos || promos.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [promos, isHovered]);

  if (!promos || promos.length === 0) return null;
  const promo = promos[current];

  return (
    <section id="promo" style={{ padding: 'clamp(32px, 5vw, 56px) 0' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Tag size={16} style={{ color: 'hsl(217, 91%, 65%)' }} />
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Penawaran Spesial
          </h2>
        </div>

        {/* Slider Container */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'clamp(280px, 40vw, 400px)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
            display: 'flex', alignItems: 'center',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Image */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${promo.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
            transition: 'opacity 0.5s ease',
            zIndex: 1,
          }} />

          {/* Dark gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(110deg, var(--bg-surface) 30%, rgba(17, 20, 29, 0.85) 65%, rgba(17, 20, 29, 0.3) 100%)',
            zIndex: 2,
          }} />

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 3,
            padding: 'clamp(28px, 5vw, 56px)',
            maxWidth: 'min(700px, 80%)',
          }}>
            <span style={{
              display: 'inline-block',
              background: 'var(--accent-gradient)',
              color: '#fff',
              padding: '5px 16px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '18px',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
            }}>
              {promo.discount}
            </span>

            <h3 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
              marginBottom: '12px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}>
              {promo.title}
            </h3>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              marginBottom: '28px',
              lineHeight: 1.6,
            }}>
              {promo.subtitle}
            </p>

            <Link href={promo.link} className="btn-primary">
              Klaim Penawaran <ChevronRight size={16} />
            </Link>
          </div>

          {/* Navigation Arrows */}
          {promos.length > 1 && (
            <div style={{
              position: 'absolute', bottom: '20px', right: '20px',
              zIndex: 4, display: 'flex', gap: '8px',
            }}>
              <button
                className="btn-icon"
                onClick={() => setCurrent((prev) => (prev - 1 + promos.length) % promos.length)}
                aria-label="Slide sebelumnya"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="btn-icon"
                onClick={() => setCurrent((prev) => (prev + 1) % promos.length)}
                aria-label="Slide selanjutnya"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Dot Indicators */}
          {promos.length > 1 && (
            <div style={{
              position: 'absolute', bottom: '28px', left: 'clamp(28px, 5vw, 56px)',
              zIndex: 4, display: 'flex', gap: '6px', alignItems: 'center',
            }}>
              {promos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  style={{
                    width: current === idx ? '22px' : '6px',
                    height: '6px',
                    borderRadius: '999px',
                    background: current === idx
                      ? 'hsl(217, 91%, 60%)'
                      : 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
