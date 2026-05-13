import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { checkAuth } from '@/app/actions/auth';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Admin Panel | Kelola Portofolio & CV',
  description: 'Antarmuka manajemen data proyek, berita, layanan, dan konfigurasi profil.',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await checkAuth();

  if (!isAuth) {
    return <LoginForm />;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      background: 'var(--bg-base)'
    }} className="admin-layout-wrapper">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main style={{
        flexGrow: 1,
        padding: '36px',
        overflowY: 'auto',
        maxWidth: '100%'
      }} className="admin-main-area">
        {children}
      </main>
    </div>
  );
}
