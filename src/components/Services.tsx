'use client';

import React from 'react';
import { Code, Smartphone, Layout, Cpu, Layers, Globe, ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/lib/supabase';

const iconColors: Record<string, { bg: string; border: string; text: string }> = {
  code:       { bg: 'rgba(59, 130, 246, 0.1)',  border: 'rgba(59, 130, 246, 0.2)',  text: 'hsl(217, 91%, 65%)' },
  smartphone: { bg: 'rgba(139, 92, 246, 0.1)',  border: 'rgba(139, 92, 246, 0.2)',  text: 'hsl(262, 83%, 72%)' },
  layout:     { bg: 'rgba(16, 185, 129, 0.1)',  border: 'rgba(16, 185, 129, 0.2)',  text: 'hsl(160, 70%, 55%)' },
  cpu:        { bg: 'rgba(245, 158, 11, 0.1)',  border: 'rgba(245, 158, 11, 0.2)',  text: 'hsl(43, 96%, 60%)' },
  layers:     { bg: 'rgba(239, 68, 68, 0.1)',   border: 'rgba(239, 68, 68, 0.2)',   text: 'hsl(0, 90%, 70%)' },
  default:    { bg: 'rgba(99, 102, 241, 0.1)',  border: 'rgba(99, 102, 241, 0.2)',  text: 'hsl(239, 84%, 70%)' },
};

function renderServiceIcon(iconName: string, color: string) {
  const iconProps = { size: 26, color, strokeWidth: 1.8 };
  switch (iconName.toLowerCase()) {
    case 'code':       return <Code {...iconProps} />;
    case 'smartphone': return <Smartphone {...iconProps} />;
    case 'layout':     return <Layout {...iconProps} />;
    case 'cpu':        return <Cpu {...iconProps} />;
    case 'layers':     return <Layers {...iconProps} />;
    default:           return <Globe {...iconProps} />;
  }
}

export default function Services({ services }: { services: ServiceItem[] }) {
  if (!services || services.length === 0) return null;

  return (
    <section id="services" style={{ padding: 'clamp(64px, 9vw, 100px) 0' }}>
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <span className="badge" style={{ marginBottom: '14px' }}>Layanan Tersedia</span>
          <h2>
            Solusi yang Disesuaikan untuk{' '}
            <span className="text-gradient">Skala Bisnis Anda</span>
          </h2>
          <p>
            Dari arsitektur backend yang kokoh hingga antarmuka pengguna piksel sempurna —
            keahlian yang siap berkontribusi untuk proyek Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid-3 mobile-swipeable">
          {services.map((service, idx) => {
            const scheme = iconColors[service.icon.toLowerCase()] ?? iconColors.default;
            return (
              <div
                key={service.id}
                className="glass-panel"
                style={{ padding: 'clamp(24px, 3vw, 36px)', display: 'flex', flexDirection: 'column', gap: '0' }}
              >
                {/* Icon Container */}
                <div style={{
                  width: '54px', height: '54px',
                  borderRadius: '14px',
                  background: scheme.bg,
                  border: `1px solid ${scheme.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '22px',
                  flexShrink: 0,
                }}>
                  {renderServiceIcon(service.icon, scheme.text)}
                </div>

                <h3 style={{
                  fontSize: '1.15rem', fontWeight: 700,
                  marginBottom: '10px', color: 'var(--text-main)',
                  letterSpacing: '-0.01em',
                }}>
                  {service.title}
                </h3>

                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                  flexGrow: 1,
                }}>
                  {service.description}
                </p>

                {/* Price Footer */}
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Estimasi Biaya
                  </span>
                  <strong style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: scheme.text,
                    background: scheme.bg,
                    padding: '3px 12px',
                    borderRadius: '999px',
                    border: `1px solid ${scheme.border}`,
                  }}>
                    {service.price_range}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
