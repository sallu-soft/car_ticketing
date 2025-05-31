'use client'

import { useState, useTransition } from 'react'
import { sendOtp } from '@/actions/sendOtp'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleSendOtp = () => {
    const formData = new FormData()
    formData.set('phone', phone)

    startTransition(async () => {
      const res = await sendOtp(formData)
      if (res.success) {
        toast.success('ওটিপি পাঠানো হয়েছে')
        setOtpSent(true)
        // Redirect to OTP verification page with phone in query
        router.push(`/verify-reset-otp?phone=${phone}`)
      } else {
        toast.error(res.message)
      }
    })
  }

  return (
    <div className="flex justify-center items-center h-[86vh] max-w-md mx-auto">
      <div className="p-6 bg-white rounded shadow w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">পাসওয়ার্ড রিসেট</h2>
        <label className="block mb-1 font-medium text-sm text-black">মোবাইল নম্বর</label>
        <input
          type="text"
          placeholder="মোবাইল নম্বর দিন"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded text-black mb-4"
        />
        <button
          onClick={handleSendOtp}
          disabled={pending}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          ওটিপি পাঠান
        </button>
      </div>
    </div>
  )
}
