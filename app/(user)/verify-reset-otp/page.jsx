// 'use client'

// import { useSearchParams, useRouter } from 'next/navigation'
// import { useState, useTransition } from 'react'
// import { verifyOtp } from '@/actions/verifyOtp'
// import toast from 'react-hot-toast'
// import { resetPassword } from '@/actions/resetPassword'
// import { otpStore } from '@/lib/otpStore'

// export default function VerifyResetOtpPage() {
//   const searchParams = useSearchParams()
//   const phone = searchParams.get('phone') || ''
//   const [otp, setOtp] = useState('')
//   const [password, setPassword] = useState('')
//   const [otpVerified, setOtpVerified] = useState(false)
//   const [pending, startTransition] = useTransition()
//   const router = useRouter()

//   const handleVerifyOtp = () => {
    
//     const formData = new FormData()
//     formData.set('phone', phone)
//     formData.set('otp', otp)
    

//     startTransition(async () => {
//       const res = await verifyOtp(formData)
//       console.log(res)
//       if (res.success) {
//         toast.success('ওটিপি যাচাই হয়েছে')
//         setOtpVerified(true)
//       } else {
//         toast.error(res.message)
//       }
//     })
//   }

//   const handleResetPassword = () => {
//     const formData = new FormData()
//     formData.set('phone', phone)
//     formData.set('password', password)

//     startTransition(async () => {
//       const res = await resetPassword(formData)
//       if (res.success) {
//         toast.success('পাসওয়ার্ড রিসেট হয়েছে')
//         router.push('/login')
//       } else {
//         toast.error(res.message)
//       }
//     })
//   }

//   return (
//     <div className="flex justify-center items-center h-[86vh] max-w-md mx-auto">
//       <div className="p-6 bg-white rounded shadow w-full">
//         <h2 className="text-2xl font-bold mb-4 text-black">ওটিপি যাচাই এবং পাসওয়ার্ড রিসেট</h2>

//         {!otpVerified ? (
//           <>
//             <label className="block text-sm text-black font-medium mb-1">ওটিপি দিন</label>
//             <input
//               type="text"
//               placeholder="ওটিপি"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-2 border rounded text-black mb-4"
//             />
//             <button
//               onClick={handleVerifyOtp}
//               className="w-full bg-green-600 text-white py-2 rounded"
//             >
//               যাচাই করুন
//             </button>
//           </>
//         ) : (
//           <>
//             <label className="block text-sm text-black font-medium mb-1">নতুন পাসওয়ার্ড</label>
//             <input
//               type="password"
//               placeholder="নতুন পাসওয়ার্ড"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded text-black mb-4"
//             />
//             <button
//               onClick={handleResetPassword}
//               className="w-full bg-orange-600 text-white py-2 rounded"
//             >
//               পাসওয়ার্ড রিসেট করুন
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

import VerifyResetOtpPage from '@/app/components/VerifyResetOtpPage';
import { Suspense } from 'react';


export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">লোড হচ্ছে...</div>}>
      <VerifyResetOtpPage />
    </Suspense>
  );
}