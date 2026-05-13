import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getNewsById } from '@/lib/supabase';
import Navbar from '@/components/Navbar';

export const revalidate = 0;

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = await getNewsById(resolvedParams.id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <article style={{ padding: '60px 0 120px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Back Link */}
          <Link href="/#news" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            marginBottom: '32px',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            <ArrowLeft size={16} /> Kembali ke Daftar Artikel
          </Link>

          {/* Date info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '16px' }}>
            <Calendar size={16} />
            <span>Dipublikasikan pada: {item.created_at}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2 }}>
            {item.title}
          </h1>

          {/* Banner Image */}
          <div style={{
            width: '100%',
            height: 'clamp(200px, 50vw, 380px)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            marginBottom: '40px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Summary Quote */}
          <div style={{
            padding: '20px 24px',
            borderLeft: '4px solid var(--accent-purple)',
            background: 'var(--bg-surface)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            marginBottom: '40px'
          }}>
            "{item.summary}"
          </div>

          {/* Full content layout */}
          <div style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--text-main)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {item.content.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Footer of article */}
          <div style={{
            marginTop: '60px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Bagikan artikel ini untuk menginspirasi rekan Anda.</span>
            <Link href="/#news" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              Artikel Lainnya
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
