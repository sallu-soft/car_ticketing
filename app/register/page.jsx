

// 'use client'

// import { useState, useTransition } from 'react'
// import { useRouter } from 'next/navigation'
// import { verifyOtp } from '@/actions/verifyOtp'
// import { sendOtp } from '@/actions/sendOtp'
// import { registerUser } from '@/actions/authenticate'

// export default function RegisterPage() {
//   const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })
//   const [otp, setOtp] = useState('')
//   const [otpSent, setOtpSent] = useState(false)
//   const [otpVerified, setOtpVerified] = useState(false)
//   const [pending, startTransition] = useTransition()
//   const router = useRouter()

//   const handleSendOtp = () => {
//     const formData = new FormData()
//     formData.set('phone', form.phone)

//     startTransition(async () => {
//       const res = await sendOtp(formData)
//       if (res.success) {
//         alert('OTP sent')
//         setOtpSent(true)
//       } else {
//         alert(res.message)
//       }
//     })
//   }

//   const handleVerifyOtp = () => {
//     const formData = new FormData()
//     formData.set('phone', form.phone)
//     formData.set('otp', otp)

//     startTransition(async () => {
//       const res = await verifyOtp(formData)
//       if (res.success) {
//         alert('OTP verified')
//         setOtpVerified(true)
//       } else {
//         alert(res.message)
//       }
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!otpVerified) {
//       return alert('Please verify OTP first');
//     }
  
//     const formData = new FormData();
//     formData.append('name', form.name);
//     formData.append('email', form.email);
//     formData.append('phone', form.phone);
//     formData.append('password', form.password);
  
//     const res = await registerUser(null, formData);
  
//     if (res.success) {
//       alert(res.message);
//       router.push('/login');
//     } else {
//       alert(res.message);
//     }
//   };

//   return (
//     <>
//     <div className="max-w-md mx-auto h-[80vh] flex justify-center items-center ">
//       <div className=" p-6  rounded shadow bg-white">
//       <h2 className="text-2xl font-bold mb-4 text-black">রেজিস্টার অ্যাকাউন্ট</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-[500px]">
//   <div>
//     <label className="block text-sm font-medium text-black mb-1">সম্পূর্ণ নাম</label>
//     <input
//       type="text"
//       placeholder="আপনার নাম লিখুন"
//       required
//       value={form.name}
//       onChange={(e) => setForm({ ...form, name: e.target.value })}
//       className="w-full p-2 border rounded text-black"
//     />
//   </div>

//   <div>
//     <label className="block text-sm font-medium text-black mb-1">মোবাইল নম্বর</label>
//     <input
//       type="text"
//       placeholder="মোবাইল নম্বর লিখুন"
//       required
//       value={form.phone}
//       onChange={(e) => setForm({ ...form, phone: e.target.value })}
//       className="w-full p-2 border rounded text-black"
//     />
//   </div>

//   {!otpSent && (
//     <button
//       type="button"
//       onClick={handleSendOtp}
//       className="w-full bg-blue-600 text-white py-2 rounded"
//     >
//       ওটিপি পাঠান
//     </button>
//   )}

//   {otpSent && !otpVerified && (
//     <>
//       <div>
//         <label className="block text-sm font-medium text-black mb-1">ওটিপি</label>
//         <input
//           type="text"
//           placeholder="ওটিপি দিন"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//         />
//       </div>
//       <button
//         type="button"
//         onClick={handleVerifyOtp}
//         className="w-full bg-green-600 text-white py-2 rounded"
//       >
//         ওটিপি যাচাই করুন
//       </button>
//     </>
//   )}

//   <div>
//     <label className="block text-sm font-medium text-black mb-1">পাসওয়ার্ড</label>
//     <input
//       type="password"
//       placeholder="পাসওয়ার্ড দিন"
//       value={form.password}
//       onChange={(e) => setForm({ ...form, password: e.target.value })}
//       className="w-full p-2 border text-black rounded"
//     />
//   </div>

//   <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded">
//     রেজিস্টার
//   </button>
// </form>
//     </div></div></>
//   )
// }


'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { verifyOtp } from '@/actions/verifyOtp'
import { sendOtp } from '@/actions/sendOtp'
import { registerUser } from '@/actions/authenticate'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [verifiedPhone, setVerifiedPhone] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  // Reset OTP verification if phone number changes
  useEffect(() => {
    if (otpVerified && form.phone !== verifiedPhone) {
      setOtpVerified(false)
      setOtpSent(false)
      setOtp('')
    }
  }, [form.phone])

  const handleSendOtp = () => {
    const formData = new FormData()
    formData.set('phone', form.phone)

    startTransition(async () => {
      const res = await sendOtp(formData)
      if (res.success) {
        alert('ওটিপি পাঠানো হয়েছে')
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
        alert('ওটিপি যাচাই সফল হয়েছে')
        setOtpVerified(true)
        setVerifiedPhone(form.phone) // store verified phone
      } else {
        alert(res.message)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!otpVerified || form.phone !== verifiedPhone) {
      return alert('মোবাইল নম্বর যাচাই করুন')
    }

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('password', form.password)

    const res = await registerUser(null, formData)

    if (res.success) {
      alert(res.message)
      router.push('/login')
    } else {
      alert(res.message)
    }
  }

  return (
    <div className="max-w-md mx-auto h-[80vh] flex justify-center items-center">
      <div className="p-6 rounded shadow bg-white">
        <h2 className="text-2xl font-bold mb-4 text-black">রেজিস্টার অ্যাকাউন্ট</h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-[500px]">
          <div>
            <label className="block text-sm font-medium text-black mb-1">সম্পূর্ণ নাম</label>
            <input
              type="text"
              placeholder="আপনার নাম লিখুন"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">মোবাইল নম্বর</label>
            <input
              type="text"
              placeholder="মোবাইল নম্বর লিখুন"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              ওটিপি পাঠান
            </button>
          )}

          {otpSent && !otpVerified && (
            <>
              <div>
                <label className="block text-sm font-medium text-black mb-1">ওটিপি</label>
                <input
                  type="text"
                  placeholder="ওটিপি দিন"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                ওটিপি যাচাই করুন
              </button>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-black mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="পাসওয়ার্ড দিন"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 border text-black rounded"
            />
          </div>

          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded">
            রেজিস্টার
          </button>
        </form>
      </div>
    </div>
  )
}
