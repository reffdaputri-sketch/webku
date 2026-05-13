'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');

  const waNumber = '6285157578692';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !question) return;

    const text = `Halo FLaz.Dev, saya tertarik dan ingin bertanya:\n\n*Nama:* ${name}\n*Pertanyaan:* ${question}`;
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;
    
    window.open(waUrl, '_blank');
    
    setName('');
    setQuestion('');
    setIsOpen(false);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 'clamp(90px, 13vh, 105px)',
        right: 'clamp(16px, 4vw, 32px)',
        zIndex: 99999, // Layer absolut teratas
        /* KUNCI UTAMA: Matikan deteksi pointer di wrapper pembungkus agar tidak memblokir sentuhan HP */
        pointerEvents: 'none', 
      }}
    >
      {/* ── Form Pop-up Dialog ── */}
      {isOpen && (
        <div 
          /* Kembalikan pointer-events ke auto HANYA untuk kotak form ini agar bisa diisi & diklik */
          style={{
            pointerEvents: 'auto',
            position: 'absolute',
            bottom: 'calc(100% + 16px)',
            right: 0,
            width: 'calc(100vw - 32px)',
            maxWidth: '340px',
            background: 'rgba(17, 20, 29, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
            color: 'var(--text-main)',
          }}
        >
          {/* Header Pop-up */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            paddingBottom: '12px',
            borderBottom: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'hsl(160, 70%, 50%)',
                boxShadow: '0 0 8px hsl(160, 70%, 50%)',
              }} />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Tanya via WhatsApp</h4>
            </div>
            
            {/* Tombol Silang (X) Penutup */}
            <button
              type="button"
              /* Di HP, onTouchEnd jauh lebih instan dan responsif daripada sekadar onClick */
              onTouchEnd={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                width: '30px', height: '30px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                /* Kembalikan pointer-events agar tombol ini mutlak bisa disentuh */
                pointerEvents: 'auto',
              }}
              aria-label="Tutup form"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '14px', lineHeight: 1.5 }}>
            Kirim pertanyaan Anda. Kami akan membalas langsung ke nomor WA Anda.
          </p>

          {/* Form Input */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Nama Anda
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Andi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Pertanyaan
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tulis pesan Anda..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, hsl(160, 75%, 42%), hsl(160, 85%, 32%))',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                marginTop: '4px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                width: '100%',
                pointerEvents: 'auto',
              }}
            >
              <Send size={14} /> Kirim Pesan
            </button>
          </form>
        </div>
      )}

      {/* ── Tombol Melayang Utama (Trigger) ── */}
      <button
        type="button"
        /* Dukungan sentuhan HP langsung */
        onTouchEnd={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          /* Kembalikan pointer-events ke auto HANYA untuk tombol ini */
          pointerEvents: 'auto',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, hsl(160, 75%, 45%), hsl(160, 85%, 35%))',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(16, 185, 129, 0.4)',
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label="Toggle WhatsApp Form"
      >
        {isOpen ? <X size={26} strokeWidth={2.5} /> : <MessageCircle size={28} strokeWidth={2.2} />}
      </button>
    </div>
  );
}
