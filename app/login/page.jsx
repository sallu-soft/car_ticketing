'use client'

import { useActionState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/actions/authenticate'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [state, formAction] = useActionState(loginUser, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setTimeout(() => router.push('/'), 1000)
    } else if (state?.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className="flex justify-center items-center h-[86vh] max-w-md mx-auto">
    <div className=" p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-black">লগইন করুন</h2>
      <form action={formAction} className="space-y-4">
      <label className="block mb-1 font-medium text-sm text-gray-700" htmlFor="phone">
  মোবাইল নম্বর
</label>
<input
  type="text"
  id="phone"
  name="phone"
  placeholder="মোবাইল নম্বর"
  required
  className="w-full p-2 mb-4 text-black border rounded"
/>

<label className="block mb-1 font-medium text-sm text-gray-700" htmlFor="password">
  পাসওয়ার্ড
</label>
<input
  type="password"
  id="password"
  name="password"
  placeholder="পাসওয়ার্ড"
  required
  className="w-full text-black p-2 border rounded"
/>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded"
        >
          লগইন
        </button>
        
  <p className="text-black">অ্যাকাউন্ট নেই?</p> <Link
          href={"/register"}
          className="w-fit  text-orange-700 py-2 rounded"
        >রেজিস্টার করুন
        </Link>
      </form>
    </div>
    </div>
  )
}
