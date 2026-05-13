'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, ExternalLink, Image as ImageIcon, Copy } from 'lucide-react';
import { Project, getProjects } from '@/lib/supabase';
import { saveProjectServer, deleteProjectServer, uploadImageServer } from '@/app/actions/admin';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
    link: '',
    category: 'Web App',
    tagsString: ''
  });

  const fetchItems = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
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
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      link: 'https://github.com',
      category: 'Web App',
      tagsString: 'Next.js, React'
    });
    setIsEditing(true);
  };

  const handleEdit = (proj: Project) => {
    setFormData({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      image: proj.image,
      link: proj.link,
      category: proj.category,
      tagsString: proj.tags.join(', ')
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      try {
        await deleteProjectServer(id);
        await fetchItems();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleDuplicate = async (proj: Project) => {
    if (window.confirm('Gandakan proyek ini?')) {
      try {
        await saveProjectServer({
          title: `${proj.title} (Copy)`,
          description: proj.description,
          image: proj.image,
          link: proj.link,
          category: proj.category,
          tags: proj.tags
        });
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
    if (!formData.title || !formData.description) return;

    const tagsArray = formData.tagsString
      .split(',')
      .map(t => t.trim())
      .filter(t => Boolean(t));

    try {
      await saveProjectServer({
        id: formData.id ? formData.id : undefined,
        title: formData.title,
        description: formData.description,
        image: formData.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        link: formData.link || '#',
        category: formData.category,
        tags: tagsArray
      });
      setIsEditing(false);
      await fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Kelola Proyek Portofolio</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Daftar hasil kerja yang ditampilkan pada halaman utama website.</p>
        </div>

        {!isEditing && (
          <button onClick={handleAddNew} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            <Plus size={16} /> Tambah Proyek Baru
          </button>
        )}
      </div>

      {/* Entry / Edit Form Overlay */}
      {isEditing && (
        <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {formData.id ? 'Edit Data Proyek' : 'Entri Proyek Baru'}
            </h2>
            <button onClick={() => setIsEditing(false)} className="btn-icon" title="Batal">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Judul Proyek</label>
                <input 
                  type="text" 
                  className="input-premium" 
                  placeholder="Contoh: UndanganKu - Premium SaaS" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Kategori</label>
                <select 
                  className="input-premium"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  style={{ background: 'var(--bg-surface)' }}
                >
                  <option value="Web App">Web App</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Deskripsi Proyek</label>
              <textarea 
                className="input-premium" 
                rows={3} 
                placeholder="Jelaskan fitur, tujuan, atau pencapaian dari proyek ini..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Gambar Thumbnail</label>
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
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Tautan Proyek / Demo (Opsional)</label>
                <input 
                  type="text" 
                  className="input-premium" 
                  placeholder="https://github.com/..." 
                  value={formData.link} 
                  onChange={e => setFormData({...formData, link: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: 600 }}>Tag / Teknologi (Pisahkan dengan koma)</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="Next.js, Supabase, Tailwind CSS" 
                value={formData.tagsString} 
                onChange={e => setFormData({...formData, tagsString: e.target.value})}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn-primary">
                <Save size={16} /> Simpan Proyek
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Table/Cards */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Memuat data proyek...
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Belum ada proyek yang terdaftar. Klik tombol "Tambah Proyek Baru" di atas.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((proj) => (
            <div key={proj.id} className="glass-panel" style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              {/* Left thumbnail & title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px', flexGrow: 1 }}>
                <div style={{
                  width: '80px', height: '60px', borderRadius: '4px', overflow: 'hidden', background: 'var(--bg-surface)', flexShrink: 0, position: 'relative'
                }}>
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)' }}>
                      <ImageIcon size={20} />
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>{proj.category}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{proj.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Right action controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a href={proj.link !== '#' ? proj.link : '#'} target="_blank" rel="noopener noreferrer" className="btn-icon" title="Lihat Tautan">
                  <ExternalLink size={16} />
                </a>
                <button onClick={() => handleDuplicate(proj)} className="btn-icon" title="Gandakan Proyek">
                  <Copy size={16} />
                </button>
                <button onClick={() => handleEdit(proj)} className="btn-icon" title="Edit Proyek">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(proj.id)} className="btn-icon" style={{ color: 'hsl(0, 90%, 65%)' }} title="Hapus">
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
