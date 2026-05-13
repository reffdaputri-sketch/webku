'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, FileText, Wrench, Settings, ArrowLeft, Terminal, LogOut } from 'lucide-react';
import { logoutAdmin } from '@/app/actions/auth';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dasbor Utama', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Kelola Proyek', icon: FolderKanban },
    { href: '/admin/news', label: 'Kelola Berita', icon: FileText },
    { href: '/admin/services', label: 'Kelola Layanan', icon: Wrench },
    { href: '/admin/settings', label: 'Pengaturan Profil', icon: Settings },
  ];

  return (
    <aside style={{
      width: '280px',
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0
    }} className="admin-sidebar">
      {/* Top Header Logo */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
          background: 'var(--accent-cyan)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#ffffff', fontWeight: 800
        }}>
          <Terminal size={18} strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Admin Portofolio</span>
      </div>

      {/* Nav Menu */}
      <nav style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '12px', marginBottom: '8px', display: 'block' }}>
          Menu Pengelola
        </span>

        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                transition: 'var(--transition-fast)'
              }}
              className="admin-nav-link"
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
          fontWeight: 600
        }} className="admin-nav-link">
          <ArrowLeft size={16} /> Kembali ke Web
        </Link>
        <button onClick={() => logoutAdmin()} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'hsl(0, 90%, 65%)',
          fontSize: '0.9rem',
          fontWeight: 600,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }} className="admin-nav-link">
          <LogOut size={16} /> Keluar (Logout)
        </button>
      </div>


    </aside>
  );
}
