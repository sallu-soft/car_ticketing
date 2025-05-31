'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function resetPassword(formData) {
  const phone = formData.get('phone')?.toString()
  const password = formData.get('password')?.toString()

  if (!phone || !password) {
    return { success: false, message: 'ফোন নম্বর ও পাসওয়ার্ড প্রয়োজন' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const updatedUser = await prisma.user.update({
      where: { phone },
      data: { password: hashedPassword }
    })

    return { success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে', user: updatedUser }
  } catch (error) {
    return { success: false, message: 'পাসওয়ার্ড আপডেট করতে ব্যর্থ', error: error.message }
  }
}
