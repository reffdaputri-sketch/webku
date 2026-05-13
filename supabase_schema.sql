-- Skema SQL untuk Website Portfolio & Promosi CV Premium
-- Silakan jalankan skema ini di menu "SQL Editor" pada dasbor Supabase Anda.

-- 1. Tabel Proyek (Projects)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    link TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}'::TEXT[],
    category TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);

-- 2. Tabel Berita/Artikel (News)
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE
);

-- 3. Tabel Layanan (Services)
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    price_range TEXT NOT NULL
);

-- 4. Tabel Promo/Slider (Promos)
CREATE TABLE IF NOT EXISTS public.promos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    image TEXT NOT NULL,
    discount TEXT NOT NULL,
    link TEXT NOT NULL
);

-- 5. Tabel Pengaturan Profil (Settings)
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Mengaktifkan akses baca publik tanpa otentikasi ketat untuk demonstrasi portofolio
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Kebijakan akses baca untuk umum (Public Read Access)
CREATE POLICY "Public profiles are viewable by everyone." ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public news are viewable by everyone." ON public.news FOR SELECT USING (true);
CREATE POLICY "Public services are viewable by everyone." ON public.services FOR SELECT USING (true);
CREATE POLICY "Public promos are viewable by everyone." ON public.promos FOR SELECT USING (true);
CREATE POLICY "Public settings are viewable by everyone." ON public.settings FOR SELECT USING (true);

-- Kebijakan akses ubah/tulis (Bisa disesuaikan dengan autentikasi admin di masa depan)
CREATE POLICY "Allow all mutations for simplicity" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all mutations for simplicity" ON public.news FOR ALL USING (true);
CREATE POLICY "Allow all mutations for simplicity" ON public.services FOR ALL USING (true);
CREATE POLICY "Allow all mutations for simplicity" ON public.promos FOR ALL USING (true);
CREATE POLICY "Allow all mutations for simplicity" ON public.settings FOR ALL USING (true);
