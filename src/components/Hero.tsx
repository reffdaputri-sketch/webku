'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { ProfileSettings } from '@/lib/supabase';

export default function Hero({ settings }: { settings: ProfileSettings }) {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate numbers on mount
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((counter) => {
      const target = counter.getAttribute('data-target') || '0';
      const numericTarget = parseInt(target.replace(/\D/g, ''));
      const suffix = target.replace(/\d/g, '');
      let current = 0;
      const step = numericTarget / 40;
      const timer = setInterval(() => {
        current += step;
        if (current >= numericTarget) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 30);
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 100px)',
        background: 'var(--bg-base)',
      }}
    >
      {/* ── Background Decorative Elements ── */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
      }}>
        {/* Mesh gradient orbs */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 'clamp(300px, 50vw, 700px)', height: 'clamp(300px, 50vw, 700px)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-8%',
          width: 'clamp(250px, 40vw, 580px)', height: 'clamp(250px, 40vw, 580px)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
        }} />
        {/* Dot grid pattern */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        {/* Top highlight line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* ── 2-Column Hero Layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(48px, 7vw, 96px)',
          alignItems: 'center',
          marginBottom: 'clamp(48px, 7vw, 80px)',
        }}>

          {/* ── Left: Content Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            {/* Available Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              marginBottom: '28px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: 'hsl(160, 70%, 60%)',
              padding: '7px 18px',
              borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600,
              letterSpacing: '0.3px',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'hsl(160, 70%, 50%)',
                display: 'inline-block',
                animation: 'pulseDot 2s ease-in-out infinite',
              }} />
              Tersedia untuk Kontrak Kerja
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              wordBreak: 'break-word',
            }}>
              Membangun Solusi
              <br />
              Digital dengan{' '}
              <span className="text-gradient">Keunggulan</span>{' '}
              <br style={{ display: 'none' }} />
              Visual
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--text-muted)',
              marginBottom: '36px',
              maxWidth: '540px',
              lineHeight: 1.75,
            }}>
              Halo, saya{' '}
              <strong style={{ color: 'var(--text-main)', fontWeight: 700 }}>{settings.fullName}</strong>.
              Seorang{' '}
              <span style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 600,
              }}>{settings.role}</span>{' '}
              yang siap mentransformasi ide bisnis Anda menjadi aplikasi berkinerja tinggi, aman, dan memukau.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                href="#projects"
                className="btn-primary"
                style={{ fontSize: '0.92rem' }}
              >
                Lihat Portofolio <ArrowRight size={17} />
              </Link>
              <a
                href={settings.cvUrl !== '#' ? settings.cvUrl : '#contact'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: '0.92rem' }}
              >
                <Download size={16} /> Unduh CV
              </a>
            </div>

            {/* Social Icons */}
            <div style={{
              display: 'flex', gap: '12px', alignItems: 'center',
              marginTop: '40px',
            }}>
              {/* Divider */}
              <div style={{
                width: '32px', height: '1px',
                background: 'var(--border-color)',
              }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Temukan saya
              </span>

              {[
                {
                  href: settings.github, label: 'GitHub',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  )
                },
                {
                  href: settings.linkedin, label: 'LinkedIn',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '38px', height: '38px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '10px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = 'var(--accent-blue)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.35)';
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.background = 'var(--bg-elevated)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social.icon}
                </a>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                <MapPin size={13} />
                Jakarta, Indonesia
              </div>
            </div>
          </div>

          {/* ── Right: Visual Column ── */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'clamp(320px, 50vw, 480px)',
          }}>
            {/* Rotating outer ring */}
            <div style={{
              position: 'absolute',
              width: 'clamp(280px, 42vw, 440px)', height: 'clamp(280px, 42vw, 440px)',
              borderRadius: '50%',
              border: '1px solid rgba(99, 102, 241, 0.12)',
              animation: 'rotateSlow 30s linear infinite',
            }}>
              {/* Dot on ring */}
              <div style={{
                position: 'absolute', top: '-4px', left: '50%',
                width: '8px', height: '8px',
                background: 'hsl(217, 91%, 60%)',
                borderRadius: '50%',
                boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)',
                transform: 'translateX(-50%)',
              }} />
            </div>

            {/* Main image card */}
            <div style={{
              width: '78%', position: 'relative', zIndex: 2,
              marginLeft: 'auto',
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 32px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.07)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                alt="Development Workspace"
                style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
              />
              {/* Image overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)',
              }} />
            </div>

            {/* Floating badge card */}
            <div style={{
              position: 'absolute', bottom: '8%', left: '0',
              background: 'rgba(17, 20, 29, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '14px 18px',
              zIndex: 3,
              display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              animation: 'float 5s ease-in-out infinite',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(262, 83%, 68%))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '1rem' }}>⚡</span>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1px' }}>Proyek Terbaru</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>Selesai On-Time</div>
              </div>
            </div>

            {/* Overlap small image */}
            <div style={{
              position: 'absolute', top: '5%', right: '-2%',
              width: '42%',
              borderRadius: '12px', overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
              zIndex: 4,
            }}>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
                alt="Code"
                style={{ width: '100%', display: 'block', aspectRatio: '1/1', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(17, 20, 29, 0.3)',
              }} />
            </div>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          overflow: 'hidden',
        }}>
          {[
            { number: '5+', label: 'Tahun Pengalaman', target: '5+', color: 'var(--text-main)' },
            { number: '40+', label: 'Proyek Selesai',   target: '40+', color: 'hsl(217, 91%, 65%)' },
            { number: '99%', label: 'Kepuasan Klien',   target: '99%', color: 'hsl(160, 70%, 55%)' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={idx === 1 ? 'mobile-no-border' : ''}
              style={{
                padding: 'clamp(20px, 3vw, 28px)',
                textAlign: 'center',
                borderRight: idx < 2 ? '1px solid var(--border-color)' : 'none',
                position: 'relative',
              }}
            >
              <div
                className="stat-number"
                data-target={stat.target}
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                fontWeight: 600,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
