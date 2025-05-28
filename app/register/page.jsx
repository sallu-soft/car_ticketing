// 'use client'

// import { useActionState } from 'react'
// import { useEffect } from 'react'
// import toast from 'react-hot-toast'
// import { useRouter } from 'next/navigation'
// import { registerUser } from '@/actions/authenticate'

// export default function RegisterPage() {
//   const router = useRouter()
//   const [state, formAction] = useActionState(registerUser, null)

//   useEffect(() => {
//     if (state?.success) {
//       toast.success(state.message)
//       setTimeout(() => router.push('/login'), 1000)
//     } else if (state?.message) {
//       toast.error(state.message)
//     }
//   }, [state])

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form action={formAction} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Mobile No"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
          
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   )
// }

'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { verifyOtp } from '@/actions/verifyOtp'
import { sendOtp } from '@/actions/sendOtp'
import { registerUser } from '@/actions/authenticate'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleSendOtp = () => {
    const formData = new FormData()
    formData.set('phone', form.phone)

    startTransition(async () => {
      const res = await sendOtp(formData)
      if (res.success) {
        alert('OTP sent')
        setOtpSent(true)
      } else {
        alert(res.message)
      }
    })
  }

  const handleVerifyOtp = () => {
    const formData = new FormData()
    formData.set('phone', form.phone)
    formData.set('otp', otp)

    startTransition(async () => {
      const res = await verifyOtp(formData)
      if (res.success) {
        alert('OTP verified')
        setOtpVerified(true)
      } else {
        alert(res.message)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!otpVerified) {
      return alert('Please verify OTP first');
    }
  
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('password', form.password);
  
    const res = await registerUser(null, formData);
  
    if (res.success) {
      alert(res.message);
      router.push('/login');
    } else {
      alert(res.message);
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto h-[80vh] flex justify-center items-center ">
      <div className=" p-6  rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-black">রেজিস্টার অ্যাকাউন্ট</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="সম্পুর্ন নাম"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="মোবাইল নাম"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-2 border rounded text-black"
        />
        {!otpSent && (
          <button type="button" onClick={handleSendOtp} className="w-full bg-blue-600 text-white py-2 rounded">
            ওটিপি পাঠান
          </button>
        )}
        {otpSent && !otpVerified && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded text-black"
            />
            <button type="button" onClick={handleVerifyOtp} className="w-full bg-green-600 text-white py-2 rounded">
            ওটিপি যাচাই করুন
            </button>
          </>
        )}
        <input
          type="email"
          placeholder="ইমেইল"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full text-black p-2 border rounded"
        />
        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border text-black rounded"
        />
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded">
          রেজিস্টার
        </button>
      </form>
    </div></div></>
  )
}