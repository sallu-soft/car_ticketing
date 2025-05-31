'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/actions/admin';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await loginAdmin(formData);

    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold text-center">Admin Login</h1>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Admin Email"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
}
