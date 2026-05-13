'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { ServiceItem, getServices, saveService, deleteService } from '@/lib/supabase';

export default function AdminServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    icon: 'Code',
    price_range: ''
  });

  const fetchItems = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddNew = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      icon: 'Code',
      price_range: 'Mulai dari Rp 3.000.000'
    });
    setIsEditing(true);
  };

  const handleEdit = (srv: ServiceItem) => {
    setFormData({
      id: srv.id,
      title: srv.title,
      description: srv.description,
      icon: srv.icon,
      price_range: srv.price_range
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus layanan jasa ini?')) {
      await deleteService(id);
      await fetchItems();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    await saveService({
      id: formData.id ? formData.id : undefined,
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      price_range: formData.price_range || 'Hubungi untuk penawaran'
    });

    setIsEditing(false);
    await fetchItems();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Kelola Layanan Jasa</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Penawaran keahlian yang dapat dipesan oleh calon klien.</p>
        </div>

        {!isEditing && (
          <button onClick={handleAddNew} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <Plus size={16} /> Tambah Layanan Baru
          </button>
        )}
      </div>

      {isEditing && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {formData.id ? 'Edit Layanan Jasa' : 'Entri Layanan Baru'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="btn-icon" title="Batal">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Nama Layanan</label>
                <input 
                  type="text" 
                  className="input-premium" 
                  placeholder="Pengembangan Web / Mobile App..." 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Pilih Ikon</label>
                <select 
                  className="input-premium"
                  value={formData.icon}
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                  style={{ background: 'var(--bg-surface)' }}
                >
                  <option value="Code">Code (Pengembangan Web)</option>
                  <option value="Smartphone">Smartphone (Aplikasi Mobile)</option>
                  <option value="Layout">Layout (Desain UI/UX)</option>
                  <option value="Cpu">Cpu (Sistem Backend / AI)</option>
                  <option value="Layers">Layers (Arsitektur / DevOps)</option>
                  <option value="Globe">Globe (Umum / Jaringan)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Deskripsi Detail</label>
              <textarea 
                className="input-premium" 
                rows={3} 
                placeholder="Jelaskan nilai tambah dan keunggulan layanan ini..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Estimasi Biaya / Jangkauan Harga</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="Mulai dari Rp 5.000.000 / Proyek" 
                value={formData.price_range} 
                onChange={e => setFormData({...formData, price_range: e.target.value})}
                required 
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn-primary">
                <Save size={16} /> Simpan Layanan
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Memuat daftar layanan...
        </div>
      ) : services.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Belum ada layanan yang ditawarkan.
        </div>
      ) : (
        <div className="grid-2">
          {services.map((srv) => (
            <div key={srv.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge" style={{ fontSize: '0.65rem' }}>Ikon: {srv.icon}</span>
                  <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>{srv.price_range}</strong>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>{srv.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>{srv.description}</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <button onClick={() => handleEdit(srv)} className="btn-icon" title="Edit">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(srv.id)} className="btn-icon" style={{ color: 'hsl(0, 90%, 65%)' }} title="Hapus">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
