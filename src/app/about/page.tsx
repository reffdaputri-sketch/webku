import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfileSettings } from '@/lib/supabase';
import { Target, Zap, Shield, Users, CheckCircle2, MessageCircle } from 'lucide-react';

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await getProfileSettings();

  return (
    <>
      <Navbar />

      <main style={{ overflowX: 'hidden' }}>
        {/* ── ABOUT HERO ── */}
        <section style={{
          position: 'relative',
          padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 80px)',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.08) 0%, var(--bg-base) 70%)',
        }}>
          {/* Background Elements */}
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '400px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
            filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)',
              color: 'var(--accent-blue)', padding: '6px 16px', borderRadius: '999px',
              fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.5px', marginBottom: '24px',
            }}>
              Mengenal FLaz.Dev
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
              lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em',
              color: 'var(--text-main)',
            }}>
              Membangun Inovasi Digital<br />
              <span className="text-gradient">Tanpa Kompromi.</span>
            </h1>

            <p style={{
              color: 'var(--text-muted)', fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.7, maxWidth: '700px', margin: '0 auto',
            }}>
              Kami adalah tim pengembang perangkat lunak yang berdedikasi untuk mentransformasi ide kompleks menjadi solusi digital yang elegan, cepat, dan dapat diandalkan untuk bisnis Anda.
            </p>
          </div>
        </section>

        {/* ── VISI & MISI ── */}
        <section style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
          <div className="container">
            <div className="grid-2" style={{ gap: 'clamp(32px, 6vw, 64px)', alignItems: 'center' }}>
              
              {/* Gambar/Visual Kiri */}
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                  alt="FLaz.Dev Team Coding"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(13,15,22,0.8), transparent)',
                }} />
              </div>

              {/* Teks Kanan */}
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
                  Visi & Misi Kami
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  Di FLaz.Dev, visi kami sederhana: menjadi katalisator bagi kesuksesan digital klien kami. Kami percaya bahwa teknologi yang hebat haruslah transparan, mulus, dan terfokus pada pengguna.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-blue)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <Target size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>Fokus pada Kualitas</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6 }}>Tidak sekadar berfungsi, kami memastikan setiap baris kode optimal, aman, dan mudah dikembangkan di masa depan.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(16, 185, 129, 0.1)', color: 'hsl(160, 70%, 55%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>Kemitraan Jangka Panjang</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6 }}>Kami memposisikan diri sebagai mitra teknologi Anda, bukan sekadar vendor. Kesuksesan proyek Anda adalah kesuksesan kami.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CORE VALUES / MENGAPA KAMI ── */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="section-header">
              <h2>Mengapa Memilih Kami?</h2>
              <p>Pendekatan teknis kami membedakan kami dari agensi konvensional lainnya.</p>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px' 
            }}>
              {[
                { icon: Zap, color: 'hsl(43, 96%, 60%)', title: 'Performa Tinggi', desc: 'Sistem dirancang dengan arsitektur modern (Next.js, Edge Computing) untuk kecepatan muat milidetik.' },
                { icon: Shield, color: 'hsl(160, 70%, 55%)', title: 'Keamanan Berlapis', desc: 'Implementasi best-practices keamanan, enkripsi data, dan proteksi dari kerentanan web standar.' },
                { icon: CheckCircle2, color: 'var(--accent-cyan)', title: 'Kode Bersih', desc: 'Prinsip Clean Code & SOLID diterapkan untuk memastikan sistem mudah dipelihara dan di-scale.' },
              ].map((val, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '32px', borderTop: `2px solid ${val.color}` }}>
                  <div style={{ 
                    width: '48px', height: '48px', borderRadius: '12px', marginBottom: '20px',
                    background: `color-mix(in srgb, ${val.color} 15%, transparent)`, color: val.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <val.icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>{val.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA AKHIR (WHATSAPP STATIS) ── */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-base)' }}>
          <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
              Mari Bicarakan Proyek Anda
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
              Apakah Anda memiliki pertanyaan atau ide yang ingin diwujudkan? Tim ahli kami siap mendengarkan dan memberikan solusi terbaik.
            </p>
            
            <a
              href={`https://api.whatsapp.com/send?phone=6285157578692&text=${encodeURIComponent('Halo FLaz.Dev, saya sudah melihat halaman Tentang Kami dan tertarik untuk mendiskusikan potensi kerja sama. Kapan ada waktu untuk mengobrol?')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyItems: 'center', gap: '10px',
                background: 'linear-gradient(135deg, hsl(160,75%,42%), hsl(160,85%,32%))',
                color: '#fff', textDecoration: 'none',
                padding: '16px 36px', borderRadius: '12px',
                fontWeight: 700, fontSize: '1.05rem',
                boxShadow: '0 8px 24px rgba(16,185,129,0.4)',
                transition: 'transform 0.2s',
              }}
            >
              <MessageCircle size={22} />
              Hubungi via WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
