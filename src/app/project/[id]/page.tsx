import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { getProjectById } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

export const revalidate = 0;

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main style={{ padding: 'clamp(40px, 6vw, 60px) 24px 120px', overflowX: 'hidden' }}>
        <div className="container" style={{ maxWidth: '960px', padding: 0 }}>
          {/* Back Link */}
          <Link href="/#projects" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            marginBottom: '32px',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            <ArrowLeft size={16} /> Kembali ke Katalog Proyek
          </Link>

          {/* Header Info */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="badge">{project.category}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                <Calendar size={14} /> Selesai: {project.created_at}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
              {project.title}
            </h1>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((tag, idx) => (
                <span key={idx} style={{
                  background: 'rgba(0, 229, 255, 0.05)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  color: 'var(--accent-cyan)',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  fontWeight: 500
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Image Banner */}
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '40px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <img 
              src={project.image} 
              alt={project.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Detailed Content grid */}
          <div className="grid-2" style={{ gap: 'clamp(24px, 5vw, 48px)' }}>
            {/* Left Main Overview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px', color: 'var(--accent-cyan)' }}>
                  Ringkasan Eksekutif
                </h2>
                <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {project.description}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>
                  Tantangan & Solusi
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>
                  Setiap sistem berskala tinggi membutuhkan strategi arsitektur yang cermat. Pada proyek ini, optimasi waktu muat, pemrosesan status waktu-nyata, serta keandalan antarmuka pengguna di berbagai kondisi jaringan menjadi fokus utama pengembangan, menghasilkan produk akhir yang stabil dan efisien.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                {/* Tombol Link Proyek */}
                <a
                  href={project.link !== '#' ? project.link : 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ 
                    borderRadius: '10px', /* Kurangi kelengkungan agar lebih tegas */
                    width: '100%', 
                    justifyContent: 'center' 
                  }}
                >
                  <ExternalLink size={18} /> Kunjungi Tautan Proyek
                </a>

                {/* Tombol WA — gaya outline agar berbeda dengan panel kanan */}
                <a
                  href={`https://api.whatsapp.com/send?phone=6285157578692&text=${encodeURIComponent(`Halo FLaz.Dev, saya tertarik ingin memesan atau bertanya seputar proyek "${project.title}". Boleh saya tahu info harga dan estimasi pengerjaannya?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-wa"
                >
                  <MessageCircle size={18} /> Pesan / Tanya via WhatsApp
                </a>
              </div>
            </div>

            {/* Right Highlights & Metrik */}
            <div>
              <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  Pencapaian Utama
                </h3>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} className="text-gradient" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Implementasi kode berbasis praktik terbaik tanpa duplikasi logika.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} className="text-gradient" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Responsivitas 100% pada peramban seluler, tablet, maupun desktop.</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2 size={18} className="text-gradient" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>Keamanan akses API dan integrasi basis data yang tersertifikasi.</span>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-dim)', marginBottom: '10px', textAlign: 'center' }}>
                    Ingin membangun sistem serupa?
                  </p>
                  <a
                    href={`https://api.whatsapp.com/send?phone=6285157578692&text=${encodeURIComponent(`Halo FLaz.Dev, saya ingin membangun sistem serupa dengan proyek "${project.title}". Bisa bantu konsultasi?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      background: 'linear-gradient(135deg, hsl(160,75%,42%), hsl(160,85%,32%))',
                      color: '#fff', textDecoration: 'none',
                      padding: '11px 16px', borderRadius: '9px',
                      fontWeight: 700, fontSize: '0.87rem',
                      boxShadow: '0 4px 14px rgba(16,185,129,0.3)',
                    }}
                  >
                    <MessageCircle size={16} /> Konsultasi Proyek Ini
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
