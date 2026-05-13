import React from 'react';
import Link from 'next/link';
import { FolderKanban, FileText, Wrench, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';
import { getProjects, getNews, getServices, hasSupabaseConfig } from '@/lib/supabase';

export const revalidate = 0;

export default async function AdminDashboard() {
  const [projects, news, services] = await Promise.all([
    getProjects(),
    getNews(),
    getServices(),
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>Dasbor Pengelola</h1>
        <p style={{ color: 'var(--text-muted)' }}>Pantau dan kelola seluruh entitas konten portofolio Anda secara real-time.</p>
      </div>

      {/* Supabase Status Alert Card */}
      <div className="glass-panel" style={{
        padding: '24px',
        borderLeft: '4px solid',
        borderLeftColor: hasSupabaseConfig ? 'hsl(150, 90%, 40%)' : 'hsl(35, 90%, 50%)',
        background: hasSupabaseConfig ? 'rgba(0, 255, 136, 0.03)' : 'rgba(255, 170, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          {hasSupabaseConfig ? (
            <CheckCircle2 size={24} color="hsl(150, 90%, 40%)" style={{ flexShrink: 0, marginTop: '2px' }} />
          ) : (
            <AlertTriangle size={24} color="hsl(35, 90%, 50%)" style={{ flexShrink: 0, marginTop: '2px' }} />
          )}

          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
              Status Koneksi Basis Data: {hasSupabaseConfig ? 'Live Cloud Storage (Supabase)' : 'Local / Fallback Mode'}
            </h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '12px' }}>
              {hasSupabaseConfig 
                ? 'Sistem terhubung sepenuhnya ke Supabase. Seluruh perubahan penambahan, pengeditan, atau penghapusan akan disimpan ke cloud secara aman.'
                : 'Kredensial Supabase belum ditemukan. Seluruh operasi penambahan atau modifikasi akan disimpan pada memori peramban/sistem saat ini untuk tujuan demonstrasi instan. Untuk menyimpan secara permanen, tambahkan variabel NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di file .env.local.'}
            </p>

            {!hasSupabaseConfig && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: '4px', display: 'inline-block' }}>
                💡 <strong>Tips:</strong> Skema pembuatan tabel SQL tersedia di file <code>supabase_schema.sql</code> di folder utama proyek.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Counter Cards Grid */}
      <div className="grid-3">
        {/* Total Projects */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Proyek</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800 }} className="text-gradient">{projects.length}</div>
            <Link href="/admin/projects" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>
              Kelola Proyek &rarr;
            </Link>
          </div>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
            <FolderKanban size={24} />
          </div>
        </div>

        {/* Total News */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Artikel Berita</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-purple)' }}>{news.length}</div>
            <Link href="/admin/news" style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>
              Kelola Artikel &rarr;
            </Link>
          </div>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-purple)' }}>
            <FileText size={24} />
          </div>
        </div>

        {/* Total Services */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Layanan Tersedia</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{services.length}</div>
            <Link href="/admin/services" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'inline-block', marginTop: '4px' }}>
              Lihat Daftar &rarr;
            </Link>
          </div>
          <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <Wrench size={24} />
          </div>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>Pintasan Cepat</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/admin/projects?action=new" className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
            <Plus size={16} /> Tambah Proyek Baru
          </Link>
          <Link href="/admin/news?action=new" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
            <Plus size={16} /> Tulis Artikel Berita
          </Link>
          <Link href="/admin/services?action=new" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
            <Plus size={16} /> Tambah Layanan Jasa
          </Link>
        </div>
      </div>
    </div>
  );
}
