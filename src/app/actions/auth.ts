'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_SESSION_COOKIE = 'admin_session';

export async function loginAdmin(password: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD || 'Rahasia2026';
  
  if (password === correctPassword) {
    // Set a session cookie that expires in 1 day
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, 
      path: '/',
    });
    return true;
  }
  
  return false;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect('/admin');
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === 'true';
}
