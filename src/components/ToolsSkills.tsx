'use client';

import React from 'react';

const skillsData = [
  {
    category: 'Frontend',
    emoji: '🎨',
    color: 'hsl(217, 91%, 65%)',
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.18)',
    items: ['Next.js (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vanilla CSS', 'Redux / Zustand'],
  },
  {
    category: 'Backend & DB',
    emoji: '⚙️',
    color: 'hsl(262, 83%, 72%)',
    bg: 'rgba(139, 92, 246, 0.08)',
    border: 'rgba(139, 92, 246, 0.18)',
    items: ['Node.js', 'Supabase', 'PostgreSQL', 'RESTful APIs', 'GraphQL', 'Laravel'],
  },
  {
    category: 'Mobile & Lainnya',
    emoji: '📱',
    color: 'hsl(160, 70%, 55%)',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.18)',
    items: ['Flutter', 'Dart', 'Git / GitHub', 'Docker Dasar', 'Figma UI/UX', 'CI/CD Pipelines'],
  },
];

export default function ToolsSkills() {
  return (
    <section id="tools" style={{ padding: 'clamp(64px, 9vw, 100px) 0' }}>
      <div className="container">

        {/* Section Header & Mascot */}
        <div style={{ 
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', 
          gap: '20px', marginBottom: '40px' 
        }}>
          <div className="section-header" style={{ marginBottom: 0, textAlign: 'left', flex: '1 1 300px' }}>
            <span className="badge" style={{ marginBottom: '14px' }}>Tumpukan Teknologi</span>
            <h2 style={{ textAlign: 'left' }}>
              Alat &amp; <span className="text-gradient">Keahlian Teknis</span>
            </h2>
            <p style={{ textAlign: 'left', margin: '0' }}>
              Teknologi pilihan untuk membangun produk digital yang andal, skalabel, dan modern.
            </p>
          </div>
          
          <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', flex: '1 1 200px' }}>
            <img 
              src="/mascot/coding.png" 
              alt="FLaz.Dev Mascot Coding" 
              style={{ 
                width: '100%', maxWidth: '200px', height: 'auto', 
                filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
                animation: 'float 5s ease-in-out infinite' 
              }} 
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid-3 mobile-swipeable">
          {skillsData.map((group, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{ padding: 'clamp(22px, 3vw, 32px)' }}
            >
              {/* Category Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
              }}>
                <div style={{
                  width: '42px', height: '42px',
                  borderRadius: '10px',
                  background: group.bg,
                  border: `1px solid ${group.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', flexShrink: 0,
                }}>
                  {group.emoji}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.8px',
                    textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '2px',
                  }}>
                    Kategori
                  </div>
                  <div style={{
                    fontSize: '1.05rem', fontWeight: 700,
                    color: group.color, lineHeight: 1.2,
                  }}>
                    {group.category}
                  </div>
                </div>
              </div>

              {/* Skill Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="skill-pill"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.83rem',
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
