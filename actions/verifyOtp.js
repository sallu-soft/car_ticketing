'use server'

import { normalizePhone } from "@/lib/normalizePhone"
import { otpStore } from "@/lib/otpStore"



export async function verifyOtp(formData) {
  let phone = normalizePhone(formData.get('phone'))
  const otp = formData.get('otp')
  console.log("verifyOtp" , otp , phone)
  const stored = otpStore.get(phone);
  console.log('Verifying OTP for:', phone, 'Stored:', stored, 'Input:', otp)

  if (stored === otp) {
    otpStore.delete(phone)
    return { success: true }
  }

  return { success: false, message: 'Invalid OTP' }
}
