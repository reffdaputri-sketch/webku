'use client';

import React, { useState } from 'react';
import { loginAdmin } from '@/app/actions/auth';
import { Lock, ArrowRight } from 'lucide-react';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const success = await loginAdmin(password);
      if (success) {
        // Refresh the page to load the admin layout
        window.location.reload();
      } else {
        setError('Kata sandi salah. Silakan coba lagi.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      background: 'var(--bg-base)',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        border: '1px solid var(--accent-cyan)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(0, 255, 136, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: 'var(--accent-cyan)'
        }}>
          <Lock size={32} />
        </div>
        
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Admin Area</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>
          Masukkan kata sandi untuk mengakses panel manajemen portofolio.
        </p>

        {error && (
          <div style={{
            background: 'rgba(255, 50, 50, 0.1)',
            color: 'hsl(0, 90%, 65%)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="password"
            placeholder="Kata Sandi..."
            className="input-premium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            style={{ textAlign: 'center', letterSpacing: '2px' }}
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
            {loading ? 'Memverifikasi...' : 'Masuk Sekarang'} <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
