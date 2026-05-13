'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { ProfileSettings, getProfileSettings, saveSettings } from '@/lib/supabase';

export default function AdminSettings() {
  const [formData, setFormData] = useState<ProfileSettings>({
    fullName: '',
    role: '',
    bio: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    cvUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getProfileSettings();
      setFormData(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Pengaturan Profil & Identitas</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Perbarui informasi nama, keahlian utama, biografi, serta tautan kontak Anda.</p>
      </div>

      {saved && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(0, 255, 136, 0.05)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'hsl(150, 90%, 65%)'
        }}>
          <CheckCircle2 size={20} />
          <span>Pengaturan profil berhasil disimpan dan diterapkan pada website.</span>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '40px', color: 'var(--text-dim)' }}>Memuat pengaturan saat ini...</div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Nama Lengkap</label>
              <input 
                type="text" 
                className="input-premium" 
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Peran / Jabatan Profesional</label>
              <input 
                type="text" 
                className="input-premium" 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Biografi Singkat (Bio)</label>
            <textarea 
              className="input-premium" 
              rows={4}
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
              required
            />
          </div>

          <div className="grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Alamat Email Kontak</label>
              <input 
                type="email" 
                className="input-premium" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Nomor WhatsApp / Telepon</label>
              <input 
                type="text" 
                className="input-premium" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Tautan Profil GitHub</label>
              <input 
                type="text" 
                className="input-premium" 
                value={formData.github}
                onChange={e => setFormData({...formData, github: e.target.value})}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Tautan Profil LinkedIn</label>
              <input 
                type="text" 
                className="input-premium" 
                value={formData.linkedin}
                onChange={e => setFormData({...formData, linkedin: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Tautan Dokumen CV (Google Drive / PDF URL)</label>
            <input 
              type="text" 
              className="input-premium" 
              value={formData.cvUrl}
              onChange={e => setFormData({...formData, cvUrl: e.target.value})}
              placeholder="https://..."
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>Kosongkan atau isi '#' jika ingin mengarahkan pengunduh ke formulir kontak.</span>
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
              <Save size={16} /> Simpan Pengaturan
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
