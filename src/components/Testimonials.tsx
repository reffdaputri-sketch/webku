'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Budi Santoso',
    company: 'PT Maju Bersama',
    role: 'CEO',
    text: 'FLaz.Dev benar-benar mengubah cara kami mengelola bisnis secara digital. Proses pengerjaannya sangat transparan, tepat waktu, dan hasil aplikasi mobile yang diberikan melebihi ekspektasi kami. Kode yang ditulis sangat bersih sehingga mudah dikembangkan di masa depan.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Anita Wijaya',
    company: 'Kreatif Studio',
    role: 'Creative Director',
    text: 'Desain UI/UX yang ditawarkan sangat modern dan elegan. Yang paling saya suka adalah kecepatan respons dan bagaimana mereka selalu memastikan setiap detail pixel sempurna. Sangat direkomendasikan untuk agensi yang butuh website portofolio premium.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  },
  {
    name: 'Hendra Setiawan',
    company: 'TokoLaris',
    role: 'Founder',
    text: 'Sistem e-commerce kami sering down saat traffic tinggi. Setelah dirombak total oleh tim FLaz.Dev menggunakan arsitektur modern, performanya naik drastis dan tidak ada lagi masalah server down. Keamanan berlapisnya juga membuat kami jauh lebih tenang.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: 'clamp(64px, 9vw, 100px) 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{
        position: 'absolute', top: '20%', left: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)',
        borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <span className="badge" style={{ marginBottom: '14px' }}>Testimoni Klien</span>
          <h2>
            Apa Kata <span className="text-gradient">Mereka?</span>
          </h2>
          <p>
            Kepuasan klien adalah prioritas utama kami. Berikut adalah pengalaman mereka bekerja sama dengan FLaz.Dev.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid-3 mobile-swipeable">
          {testimonials.map((review, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: 'clamp(24px, 4vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative'
              }}
            >
              {/* Quote Icon */}
              <div style={{
                position: 'absolute', top: '24px', right: '24px',
                color: 'rgba(255,255,255,0.05)',
              }}>
                <Quote size={60} />
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', gap: '4px', color: 'hsl(43, 96%, 60%)' }}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                flex: 1,
                fontStyle: 'italic',
                position: 'relative', zIndex: 1
              }}>
                "{review.text}"
              </p>

              {/* User Info */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                paddingTop: '20px', borderTop: '1px solid var(--border-color)',
                marginTop: 'auto'
              }}>
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    objectFit: 'cover', border: '2px solid rgba(99, 102, 241, 0.3)'
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
                    {review.name}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                    {review.role}, <span style={{ color: 'var(--accent-blue)' }}>{review.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
