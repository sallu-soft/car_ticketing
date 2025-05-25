'use server'
import {cookies} from "next/headers"
import { prisma } from '@/lib/prisma' // update path if needed
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function registerUser(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const password = formData.get('password');

  if (!name || !phone || !password) {
    return { success: false, message: 'All fields are required' };
  }

  const existingUser = await prisma.user.findUnique({ where: { phone } });
  if (existingUser) {
    return { success: false, message: 'Mobile No already exists' };
  }

  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, phone, password: hashedPassword },
  });

  return { success: true, message: 'Registration successful!' };
}

  
export async function loginUser(prevState, formData) {
    const phone = formData.get('phone')
    const password = formData.get('password')
  
    if (!phone || !password) {
      return { success: false, message: 'All fields are required' }
    }
  
    const user = await prisma.user.findUnique({ where: { phone } })
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, message: 'Invalid credentials' }
    }
  
    // ✅ Set cookie
    cookies().set('userId', user.id.toString(), { httpOnly: true })
  
    return { success: true, message: 'Login successful!' }
  }
  export async function logoutUser() {
    const cookieStore = cookies()
    cookieStore.delete("userId")
  }
  export async function getUser() {
    const cookieStore = cookies()
    const userId = cookieStore?.get('userId')?.value
  
    let currentUser = null
  
    if (userId) {
      currentUser = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
        select: { id: true, name: true, email: true, phone: true },
      })
    }
  
    return currentUser
  }