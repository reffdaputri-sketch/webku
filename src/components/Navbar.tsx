'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#hero',         label: 'Beranda' },
  { href: '/about',         label: 'Tentang Kami' },
  { href: '/#consultation', label: 'Konsultasi' },
  { href: '/#services',     label: 'Layanan' },
  { href: '/#projects',     label: 'Katalog' },
  { href: '/#news',         label: 'Berita' },
  { href: '/#tools',        label: 'Keahlian' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        padding: '0',
        background: scrolled
          ? 'rgba(13, 15, 22, 0.88)'
          : 'rgba(13, 15, 22, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.4)' : 'none',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* ── Brand Logo ── */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(262, 83%, 68%))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
              flexShrink: 0,
            }}>
              <Terminal size={19} strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.18rem', letterSpacing: '-0.5px', color: 'hsl(210, 40%, 96%)' }}>
              FLaz<span className="text-gradient">.Dev</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  display: 'inline-block',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Side CTA ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              href="/admin"
              style={{
                background: 'rgba(99, 102, 241, 0.12)',
                color: 'hsl(217, 91%, 70%)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                padding: '7px 18px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                textDecoration: 'none',
                letterSpacing: '0.2px',
              }}
              className="nav-btn-desktop"
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.22)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)';
              }}
            >
              Admin Panel
            </Link>

            {/* ── Tombol Hamburger (Mobile Only) ── */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="mobile-hamburger"
              aria-label="Toggle menu"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                width: '38px', height: '38px',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
                flexShrink: 0,
              }}
            >
              {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* ══ Mobile Dropdown Menu ══ */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px', left: 0, right: 0,
          background: 'rgba(13, 15, 22, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-color)',
          zIndex: 199,
          padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'block',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
                e.currentTarget.style.color = 'var(--text-main)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
