import React from 'react';
import { 
  getProjects, 
  getNews, 
  getServices, 
  getPromos, 
  getProfileSettings,
  hasSupabaseConfig 
} from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientQuestionForm from '@/components/ClientQuestionForm';
import PromoSlider from '@/components/PromoSlider';
import Services from '@/components/Services';
import ProjectCatalog from '@/components/ProjectCatalog';
import Testimonials from '@/components/Testimonials';
import NewsSection from '@/components/NewsSection';
import ToolsSkills from '@/components/ToolsSkills';
import Footer from '@/components/Footer';

// Let's force dynamic or revalidation to pick up fresh items cleanly
export const revalidate = 0;

export default async function Home() {
  // Fetch data concurrently for high performance Server-Side Rendering
  const [projects, news, services, promos, settings] = await Promise.all([
    getProjects(),
    getNews(),
    getServices(),
    getPromos(),
    getProfileSettings(),
  ]);

  return (
    <>
      {/* Configuration Status Banner */}
      {!hasSupabaseConfig && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.08)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
          padding: '9px 24px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'hsl(43, 96%, 70%)',
          position: 'relative',
          zIndex: 200,
          backdropFilter: 'blur(10px)',
        }}>
          ⚡ <strong>Mode Demo Aktif:</strong> Kredensial Supabase belum terdeteksi di <code style={{ background: 'rgba(245,158,11,0.15)', padding: '1px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>.env.local</code>. Data demo ditampilkan. Uji fitur di{' '}
          <a href="/admin" style={{ textDecoration: 'underline', color: 'hsl(217, 91%, 65%)', fontWeight: 700 }}>Admin Panel</a>.
        </div>
      )}

      {/* Main Nav */}
      <Navbar />

      {/* Sequentially ordered sections optimized for WOW factor */}
      <Hero settings={settings} />

      {/* Seksi Formulir Pertanyaan Klien (Langsung di bawah Hero) */}
      <ClientQuestionForm />
      
      <PromoSlider promos={promos} />
      
      <Services services={services} />
      
      <ProjectCatalog projects={projects} />
      
      <Testimonials />
      
      <ToolsSkills />

      <NewsSection news={news} />
      
      <Footer settings={settings} />
    </>
  );
}
