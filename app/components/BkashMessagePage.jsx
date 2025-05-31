'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function BkashMessagePage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  if (message === 'success') {
    return (
      <div className="text-green-600 flex justify-center items-center h-screen flex-col">
        <h1 className="text-4xl font-bold">✅ Payment Successful!</h1>
        <p className="mt-4">Thank you for your payment. Your ticket is confirmed.</p>
        <Link href="/" className='mt-3 px-5 py-2 text-white text-md bg-orange-600 hover:bg-amber-500 rounded-lg'>Go To Home</Link>
      </div>
    )
  }

  return (
    <div className="text-red-600 flex justify-center items-center h-screen flex-col">
      <h1 className="text-4xl font-bold">❌ Payment Failed</h1>
      <p className="mt-4">Payment failed or was cancelled. Please try again.</p>
    </div>
  )
}