'use server';

import { createClient } from '@supabase/supabase-js';
import { Project, NewsItem } from '@/lib/supabase';
import { checkAuth } from './auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Create a singleton Supabase Admin client
const supabaseAdmin = (supabaseUrl && supabaseServiceRoleKey) 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Helper to verify auth before any mutation
async function verifyAdmin() {
  const isAuth = await checkAuth();
  if (!isAuth) throw new Error('Unauthorized');
  if (!supabaseAdmin) throw new Error('Supabase Admin Client not configured');
}

export async function uploadImageServer(formData: FormData): Promise<string> {
  await verifyAdmin();
  
  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabaseAdmin!.storage.from('portfolio-assets').upload(filePath, file);

  if (error) {
    throw new Error(`Gagal mengunggah gambar: ${error.message}`);
  }

  const { data: { publicUrl } } = supabaseAdmin!.storage.from('portfolio-assets').getPublicUrl(filePath);
  return publicUrl;
}

export async function saveProjectServer(project: Omit<Project, 'id' | 'created_at'> & { id?: string }): Promise<boolean> {
  await verifyAdmin();

  const isNew = !project.id;
  const projectData: Project = {
    id: project.id || `proj-${Date.now()}`,
    title: project.title,
    description: project.description,
    image: project.image,
    link: project.link,
    tags: project.tags,
    category: project.category,
    price: project.price,
    created_at: isNew ? new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0] // simplified for fallback
  };

  const { error } = await supabaseAdmin!.from('projects').upsert([projectData]);
  if (error) {
    throw new Error(`Gagal menyimpan proyek ke database: ${error.message}`);
  }
  return true;
}

export async function deleteProjectServer(id: string): Promise<boolean> {
  await verifyAdmin();
  const { error } = await supabaseAdmin!.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}

export async function saveNewsServer(news: Omit<NewsItem, 'id' | 'created_at'> & { id?: string }): Promise<boolean> {
  await verifyAdmin();

  const isNew = !news.id;
  const newsData: NewsItem = {
    id: news.id || `news-${Date.now()}`,
    title: news.title,
    summary: news.summary,
    content: news.content,
    image: news.image,
    created_at: isNew ? new Date().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  };

  const { error } = await supabaseAdmin!.from('news').upsert([newsData]);
  if (error) {
    throw new Error(`Gagal menyimpan artikel ke database: ${error.message}`);
  }
  return true;
}

export async function deleteNewsServer(id: string): Promise<boolean> {
  await verifyAdmin();
  const { error } = await supabaseAdmin!.from('news').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}
