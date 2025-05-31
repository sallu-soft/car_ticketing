'use server';

import { cookies } from 'next/headers';

export async function loginAdmin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set('admin-auth', 'true', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 2, // 2 hours
    });
    return { success: true };
  }

  return { success: false, message: 'Invalid credentials' };
}