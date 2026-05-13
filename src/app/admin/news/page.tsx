'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, Calendar } from 'lucide-react';
import { NewsItem, getNews } from '@/lib/supabase';
import { saveNewsServer, deleteNewsServer, uploadImageServer } from '@/app/actions/admin';

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    summary: '',
    content: '',
    image: ''
  });

  const fetchItems = async () => {
    setLoading(true);
    const data = await getNews();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddNew = () => {
    setFormData({
      id: '',
      title: '',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
    });
    setIsEditing(true);
  };

  const handleEdit = (item: NewsItem) => {
    setFormData({
      id: item.id,
      title: item.title,
      summary: item.summary,
      content: item.content,
      image: item.image
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus artikel berita ini?')) {
      try {
        await deleteNewsServer(id);
        await fetchItems();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const url = await uploadImageServer(formDataUpload);
      setFormData({ ...formData, image: url });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.content) return;

    try {
      await saveNewsServer({
        id: formData.id ? formData.id : undefined,
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        image: formData.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
      });
      setIsEditing(false);
      await fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Kelola Berita & Artikel</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Tuliskan wawasan atau pembaruan terbaru untuk pengunjung website Anda.</p>
        </div>

        {!isEditing && (
          <button onClick={handleAddNew} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <Plus size={16} /> Tulis Artikel Baru
          </button>
        )}
      </div>

      {isEditing && (
        <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--accent-purple)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {formData.id ? 'Edit Artikel' : 'Tulis Artikel Baru'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="btn-icon" title="Batal">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Judul Artikel</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="Judul menarik..." 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                required 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Ringkasan Singkat (Summary)</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="Intisari artikel dalam 1-2 kalimat..." 
                value={formData.summary} 
                onChange={e => setFormData({...formData, summary: e.target.value})}
                required 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Gambar Sampul</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input 
                  type="text" 
                  className="input-premium" 
                  placeholder="URL atau Upload..." 
                  value={formData.image} 
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  style={{ flexGrow: 1 }}
                />
                <label className="btn-secondary" style={{ cursor: 'pointer', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                  {uploading ? 'Mengunggah...' : 'Pilih File'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} disabled={uploading} />
                </label>
              </div>
              {formData.image && (
                <img src={formData.image} alt="Preview" style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }} />
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Konten Penuh (Gunakan baris baru ganda untuk paragraf)</label>
              <textarea 
                className="input-premium" 
                rows={8} 
                placeholder="Tuliskan isi lengkap artikel Anda di sini..."
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn-primary" style={{ background: 'var(--accent-purple)', color: '#fff' }}>
                <Save size={16} /> Publikasikan Artikel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Memuat daftar berita...
        </div>
      ) : news.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Belum ada artikel berita yang dipublikasikan.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {news.map((item) => (
            <div key={item.id} className="glass-panel" style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1 }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                    <Calendar size={12} /> {item.created_at}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.summary}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => handleEdit(item)} className="btn-icon" title="Edit">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-icon" style={{ color: 'hsl(0, 90%, 65%)' }} title="Hapus">
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
