'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Terminal, ArrowUp, ExternalLink } from 'lucide-react';
import { ProfileSettings } from '@/lib/supabase';

const quickLinks = [
  { href: '#hero',     label: 'Beranda' },
  { href: '#services', label: 'Layanan' },
  { href: '#projects', label: 'Katalog Proyek' },
  { href: '#tools',    label: 'Keahlian' },
  { href: '#news',     label: 'Berita & Artikel' },
];

export default function Footer({ settings }: { settings: ProfileSettings }) {
  return (
    <footer id="contact" style={{
      background: 'var(--bg-inset)',
      borderTop: '1px solid var(--border-color)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-5%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '-5%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Main Footer Content ── */}
        <div style={{
          paddingTop: 'clamp(48px, 7vw, 80px)',
          paddingBottom: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 'clamp(32px, 5vw, 56px)',
        }}>

          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '18px', textDecoration: 'none' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '9px',
                background: 'linear-gradient(135deg, hsl(217, 91%, 60%), hsl(262, 83%, 68%))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
              }}>
                <Terminal size={18} strokeWidth={2.5} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                FLaz<span className="text-gradient">.Dev</span>
              </span>
            </Link>

            <p style={{
              color: 'var(--text-muted)', fontSize: '0.88rem',
              lineHeight: 1.7, marginBottom: '22px', maxWidth: '280px',
            }}>
              {settings.bio}
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                {
                  href: settings.github, label: 'GitHub',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                },
                {
                  href: settings.linkedin, label: 'LinkedIn',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: '36px', height: '36px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '8px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = 'hsl(217, 91%, 65%)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
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
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1px',
              textTransform: 'uppercase', color: 'var(--text-dim)',
              marginBottom: '18px',
            }}>
              Navigasi Cepat
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                    }}
                    className="contact-link"
                  >
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1px',
              textTransform: 'uppercase', color: 'var(--text-dim)',
              marginBottom: '18px',
            }}>
              Hubungi Saya
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  href: `mailto:${settings.email}`,
                  icon: <Mail size={15} />,
                  label: settings.email,
                  external: false,
                },
                {
                  href: `https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}`,
                  icon: <Phone size={15} />,
                  label: settings.phone,
                  external: true,
                },
                {
                  href: '#',
                  icon: <MapPin size={15} />,
                  label: 'Jakarta, Indonesia',
                  external: false,
                },
              ].map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    color: 'var(--text-muted)', fontSize: '0.88rem',
                    textDecoration: 'none', transition: 'color 0.15s ease',
                  }}
                  className="contact-link"
                >
                  <div style={{
                    width: '30px', height: '30px', flexShrink: 0,
                    background: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                    borderRadius: '7px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'hsl(217, 91%, 65%)',
                  }}>
                    {contact.icon}
                  </div>
                  <span>{contact.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="divider" />

        {/* ── Bottom Bar ── */}
        <div style={{
          padding: '20px 0',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '12px', fontSize: '0.8rem', color: 'var(--text-dim)',
        }}>
          <div>
            © {new Date().getFullYear()}{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{settings.fullName}</span>
            . Hak Cipta Dilindungi.
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a
              href="#hero"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                color: 'var(--text-dim)', fontSize: '0.8rem',
                textDecoration: 'none', transition: 'color 0.15s',
              }}
              className="contact-link"
            >
              <ArrowUp size={13} /> Kembali ke Atas
            </a>
            <Link
              href="/admin"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                color: 'hsl(217, 91%, 60%)', fontSize: '0.8rem',
                fontWeight: 600, textDecoration: 'none',
              }}
            >
              <ExternalLink size={12} /> Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
