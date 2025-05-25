'use server'
import { normalizePhone } from "@/lib/normalizePhone"
import { otpStore } from "@/lib/otpStore"


export async function sendOtp(formData) {
  let phone = normalizePhone(formData.get('phone'))

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const message = `Your OTP is ${otp}`

  const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${process.env.NEXT_PUBLIC_SMS_API_KEY}&type=text&number=${phone}&senderid=${process.env.NEXT_PUBLIC_SMS_SENDER_ID}&message=${encodeURIComponent(message)}`

  try {
    const res = await fetch(smsUrl)
    const text = await res.text()
    console.log('SMS API raw response:', text)

    if (res.ok && text.toLowerCase().includes('sms submitted successfully')) {
      otpStore.set(phone, otp)
      return { success: true, message: 'OTP sent successfully' }
    } else {
      return { success: false, message: 'Failed to send OTP', debug: text }
    }
  } catch (err) {
    console.error('Fetch error:', err)
    return { success: false, message: 'Error sending OTP' }
  }
}