import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Premium Fallback Mock Data to ensure absolute stunning visuals out-of-the-box
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  category: string;
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon identifier
  price_range: string;
}

export interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  discount: string;
  link: string;
}

export interface ProfileSettings {
  fullName: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

// In-memory fallback state to support local CRUD demonstrations seamlessly
let mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'UndanganKu - Premium SaaS Digital Invitation',
    description: 'Platform pembuatan undangan digital premium berbasis Next.js dan Laravel. Dilengkapi fitur musik otomatis, RSVP real-time, dan integrasi pembayaran gateway otomatis untuk kenyamanan maksimal.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com',
    tags: ['Next.js', 'Laravel', 'Tailwind CSS', 'Supabase'],
    category: 'Web App',
    created_at: '2026-05-01'
  },
  {
    id: 'proj-2',
    title: 'GoHelp Marketplace App - Layanan Jasa Terpadu',
    description: 'Aplikasi seluler Flutter berkinerja tinggi untuk pemesanan jasa profesional on-demand. Mendukung fitur obrolan langsung, pelacakan lokasi, dan dompet digital terintegrasi.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com',
    tags: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    category: 'Mobile App',
    created_at: '2026-04-15'
  },
  {
    id: 'proj-3',
    title: 'HealiFlow UI - Sistem Booking Klinik & Farmasi',
    description: 'Antarmuka pemesanan jadwal dokter dan manajemen inventaris obat dengan tema visual modern yang menenangkan. Mengoptimalkan konversi pasien hingga 45%.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com',
    tags: ['React', 'TypeScript', 'Node.js'],
    category: 'UI/UX Design',
    created_at: '2026-03-20'
  },
  {
    id: 'proj-4',
    title: 'Kistoday - Portal Berita Berkecepatan Tinggi',
    description: 'Sistem portal berita dengan optimasi SEO tingkat lanjut, Server-Side Rendering (SSR), dan panel analitik pembaca waktu nyata.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com',
    tags: ['Next.js', 'GraphQL', 'PostgreSQL'],
    category: 'Web App',
    created_at: '2026-02-10'
  }
];

let mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Masa Depan Pengembangan Web dengan Server Components',
    summary: 'Bagaimana arsitektur modern Next.js mengubah cara kita membangun aplikasi web yang cepat, aman, dan ramah mesin pencari.',
    content: 'Pengembangan web terus berevolusi. Dengan hadirnya React Server Components, kita dapat mengirimkan kode JavaScript yang jauh lebih sedikit ke peramban pengguna, menghasilkan waktu muat halaman yang instan dan performa SEO yang tak tertandingi. Pada artikel ini, saya membagikan pengalaman saya mengimplementasikan pola arsitektur ini pada proyek-proyek skala enterprise.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-05-10'
  },
  {
    id: 'news-2',
    title: 'Tips Membangun Portofolio yang Dipercaya Klien',
    summary: 'Strategi menyusun studi kasus proyek agar calon klien dapat melihat nilai nyata dan solusi yang Anda tawarkan.',
    content: 'Klien tidak hanya ingin melihat tangkapan layar yang indah; mereka ingin memahami masalah yang Anda pecahkan dan hasil bisnis yang dicapai. Sertakan metrik keberhasilan, rintangan teknis yang berhasil diatasi, serta testimoni untuk membangun kepercayaan mutlak sejak detik pertama.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-05-02'
  }
];

let mockServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Pengembangan Web Fullstack',
    description: 'Membangun aplikasi web kustom berkinerja tinggi dari nol menggunakan Next.js, React, Node.js, dan ekosistem modern lainnya.',
    icon: 'Code',
    price_range: 'Mulai dari Rp 5.000.000'
  },
  {
    id: 'srv-2',
    title: 'Pembuatan Aplikasi Seluler (Mobile App)',
    description: 'Merancang dan mengembangkan aplikasi lintas platform (Android & iOS) yang mulus dan responsif menggunakan Flutter.',
    icon: 'Smartphone',
    price_range: 'Mulai dari Rp 8.000.000'
  },
  {
    id: 'srv-3',
    title: 'Konsultasi UI/UX & Desain Sistem',
    description: 'Mentransformasi ide bisnis Anda menjadi antarmuka pengguna yang menawan, intuitif, dan berfokus pada pengalaman pengguna yang luar biasa.',
    icon: 'Layout',
    price_range: 'Mulai dari Rp 3.000.000'
  }
];

let mockPromos: PromoItem[] = [
  {
    id: 'prm-1',
    title: 'Paket Bundling Web & Aplikasi Seluler',
    subtitle: 'Dapatkan solusi digital menyeluruh untuk bisnis Anda dengan harga khusus bulan ini.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    discount: 'Diskon 20%',
    link: '#contact'
  },
  {
    id: 'prm-2',
    title: 'Gratis Konsultasi Arsitektur Sistem',
    subtitle: 'Diskusikan kebutuhan teknis dan skalabilitas aplikasi Anda tanpa biaya sepeser pun.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    discount: '100% Free',
    link: '#contact'
  }
];

let mockSettings: ProfileSettings = {
  fullName: 'FLazDev',
  role: 'Senior Fullstack Software Engineer',
  bio: 'Saya seorang pengembang perangkat lunak berpengalaman yang berdedikasi menciptakan solusi digital inovatif, elegan, dan terukur. Spesialis dalam arsitektur Next.js dan Flutter.',
  email: 'contact@flaz.dev',
  phone: '+62 812 3456 7890',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  cvUrl: '#'
};

// Data Fetching Helpers with hybrid mode logic
export async function getProjects(): Promise<Project[]> {
  if (supabase) {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) console.error('Supabase getProjects error:', error.message);
    return (data as Project[]) || [];
  }
  return [...mockProjects];
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  if (supabase) {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (error) console.error('Supabase getProjectById error:', error.message);
    return data as Project || undefined;
  }
  return mockProjects.find(p => p.id === id);
}

export async function getNews(): Promise<NewsItem[]> {
  if (supabase) {
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (error) console.error('Supabase getNews error:', error.message);
    return (data as NewsItem[]) || [];
  }
  return [...mockNews];
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  if (supabase) {
    const { data, error } = await supabase.from('news').select('*').eq('id', id).single();
    if (error) console.error('Supabase getNewsById error:', error.message);
    return data as NewsItem || undefined;
  }
  return mockNews.find(n => n.id === id);
}

export async function getServices(): Promise<ServiceItem[]> {
  if (supabase) {
    const { data, error } = await supabase.from('services').select('*');
    if (error) console.error('Supabase getServices error:', error.message);
    return (data as ServiceItem[]) || [];
  }
  return [...mockServices];
}

export async function getPromos(): Promise<PromoItem[]> {
  if (supabase) {
    const { data, error } = await supabase.from('promos').select('*');
    if (error) console.error('Supabase getPromos error:', error.message);
    return (data as PromoItem[]) || [];
  }
  return [...mockPromos];
}

export async function getProfileSettings(): Promise<ProfileSettings> {
  if (supabase) {
    const { data, error } = await supabase.from('settings').select('*');
    if (error) {
      console.error('Supabase getProfileSettings error:', error.message);
      return { ...mockSettings };
    }
    if (data && data.length > 0) {
      const settingsMap: Record<string, string> = {};
      data.forEach((row: any) => { settingsMap[row.key] = row.value; });
      return {
        fullName: settingsMap.fullName || mockSettings.fullName,
        role: settingsMap.role || mockSettings.role,
        bio: settingsMap.bio || mockSettings.bio,
        email: settingsMap.email || mockSettings.email,
        phone: settingsMap.phone || mockSettings.phone,
        github: settingsMap.github || mockSettings.github,
        linkedin: settingsMap.linkedin || mockSettings.linkedin,
        cvUrl: settingsMap.cvUrl || mockSettings.cvUrl,
      };
    }
  }
  return { ...mockSettings };
}

// Upload Image to Supabase Storage Bucket
export async function uploadImage(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase client is not configured.');
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage.from('portfolio-assets').upload(filePath, file);

  if (error) {
    throw new Error(`Gagal mengunggah gambar: ${error.message}`);
  }

  // Get Public URL
  const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
  return publicUrl;
}

// Write / Mutation Operations supporting mock storage updates
export async function saveProject(project: Omit<Project, 'id' | 'created_at'> & { id?: string }): Promise<boolean> {
  const isNew = !project.id;
  const projectData: Project = {
    id: project.id || `proj-${Date.now()}`,
    title: project.title,
    description: project.description,
    image: project.image,
    link: project.link,
    tags: project.tags,
    category: project.category,
    created_at: isNew ? new Date().toISOString().split('T')[0] : (mockProjects.find(p => p.id === project.id)?.created_at || new Date().toISOString().split('T')[0])
  };

  if (supabase) {
    const { error } = await supabase.from('projects').upsert([projectData]);
    if (error) {
      throw new Error(`Gagal menyimpan proyek ke database: ${error.message}`);
    }
    return true;
  }

  // Update fallback state (only if Supabase is not configured)
  if (isNew) {
    mockProjects = [projectData, ...mockProjects];
  } else {
    mockProjects = mockProjects.map(p => p.id === projectData.id ? projectData : p);
  }
  return true;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (e) {
      // continue fallback update
    }
  }
  mockProjects = mockProjects.filter(p => p.id !== id);
  return true;
}

export async function saveNews(news: Omit<NewsItem, 'id' | 'created_at'> & { id?: string }): Promise<boolean> {
  const isNew = !news.id;
  const newsData: NewsItem = {
    id: news.id || `news-${Date.now()}`,
    title: news.title,
    summary: news.summary,
    content: news.content,
    image: news.image,
    created_at: isNew ? new Date().toISOString().split('T')[0] : (mockNews.find(n => n.id === news.id)?.created_at || new Date().toISOString().split('T')[0])
  };

  if (supabase) {
    const { error } = await supabase.from('news').upsert([newsData]);
    if (error) {
      throw new Error(`Gagal menyimpan artikel ke database: ${error.message}`);
    }
    return true;
  }

  if (isNew) {
    mockNews = [newsData, ...mockNews];
  } else {
    mockNews = mockNews.map(n => n.id === newsData.id ? newsData : n);
  }
  return true;
}

export async function deleteNews(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('news').delete().eq('id', id);
    } catch (e) {}
  }
  mockNews = mockNews.filter(n => n.id !== id);
  return true;
}

export async function saveService(service: Omit<ServiceItem, 'id'> & { id?: string }): Promise<boolean> {
  const isNew = !service.id;
  const serviceData: ServiceItem = {
    id: service.id || `srv-${Date.now()}`,
    title: service.title,
    description: service.description,
    icon: service.icon,
    price_range: service.price_range
  };

  if (supabase) {
    try {
      const { error } = await supabase.from('services').upsert([serviceData]);
      if (!error) return true;
    } catch (e) {}
  }

  if (isNew) {
    mockServices = [...mockServices, serviceData];
  } else {
    mockServices = mockServices.map(s => s.id === serviceData.id ? serviceData : s);
  }
  return true;
}

export async function deleteService(id: string): Promise<boolean> {
  if (supabase) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch (e) {}
  }
  mockServices = mockServices.filter(s => s.id !== id);
  return true;
}

export async function saveSettings(settings: ProfileSettings): Promise<boolean> {
  mockSettings = { ...settings };
  if (supabase) {
    try {
      const rows = Object.keys(settings).map(key => ({
        key,
        value: (settings as any)[key]
      }));
      await supabase.from('settings').upsert(rows, { onConflict: 'key' });
    } catch (e) {}
  }
  return true;
}
