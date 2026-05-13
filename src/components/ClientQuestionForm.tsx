import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

// Teks default yang ditanam langsung di URL — tidak ada form, tidak ada JS
const WA_NUMBER  = '6285157578692';
const WA_MESSAGE = encodeURIComponent(
  'Halo FLaz.Dev, saya tertarik dengan layanan Anda dan ingin berkonsultasi lebih lanjut. Boleh saya tahu info lebih detail?'
);
const WA_URL = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${WA_MESSAGE}`;

export default function ClientQuestionForm() {
  return (
    <section id="consultation" style={{ padding: '0 0 clamp(48px, 6vw, 80px)', background: 'var(--bg-base)' }}>
      <div className="container">
        <div style={{ position: 'relative' }}>
          {/* MASKOT MENGINTIP (Di luar kotak agar tidak terpotong) */}
          <img 
            src="/mascot/ok.png" 
            alt="FLaz.Dev Mascot"
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: 'clamp(150px, 28vw, 220px)', /* Diperbesar agar sama besarnya */
              height: 'auto',
              zIndex: 2, /* Di atas card */
              pointerEvents: 'none',
              filter: 'drop-shadow(-5px 10px 15px rgba(0,0,0,0.5))',
              transform: 'translate(10%, 15%)', /* Menggeser sedikit ke luar sudut */
            }}
          />

          <div style={{
            position: 'relative',
            background: 'var(--bg-surface)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '20px',
            padding: 'clamp(32px, 5vw, 52px)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            textAlign: 'center',
            zIndex: 1,
          }}>
            {/* Glow orbs */}
            <div aria-hidden style={{
              position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
              width: '300px', height: '200px',
              background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
              filter: 'blur(30px)', pointerEvents: 'none',
            }} />
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
              color: 'hsl(160,70%,60%)', padding: '6px 16px', borderRadius: '999px',
              fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.5px', marginBottom: '20px',
            }}>
              <Sparkles size={13} /> Konsultasi Gratis
            </div>

            {/* Judul */}
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800,
              color: 'var(--text-main)', marginBottom: '14px',
              lineHeight: 1.25, letterSpacing: '-0.02em',
            }}>
              Siap Membangun Proyek <span style={{ color: 'hsl(160,70%,55%)' }}>Impian Anda?</span>
            </h2>

            {/* Deskripsi */}
            <p style={{
              color: 'var(--text-muted)', fontSize: '0.97rem', lineHeight: 1.7,
              marginBottom: '32px', maxWidth: '520px', margin: '0 auto 32px',
            }}>
              Hubungi langsung via WhatsApp untuk konsultasi gratis seputar pengembangan web, aplikasi mobile, atau sistem digital Anda.
            </p>

            {/* Tombol WA — link statis murni, tidak ada JS, 100% jalan di semua HP */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'linear-gradient(135deg, hsl(160,75%,42%), hsl(160,85%,32%))',
                color: '#fff', textDecoration: 'none',
                padding: '15px 32px', borderRadius: '12px',
                fontWeight: 700, fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(16,185,129,0.4)',
              }}
            >
              <MessageCircle size={20} />
              Chat via WhatsApp Sekarang
            </a>

            {/* Info nomor */}
            <p style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              📞 +62 851-5757-8692 &nbsp;·&nbsp; Respons cepat pada jam kerja
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
