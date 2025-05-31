'use client';
import { createTrip } from '@/actions/ticketing';
import { useState } from 'react';

export default function AddTrip({buses}) {
  
  const [form, setForm] = useState({ from: '', to: '', date: '', price: '', busId: '' });
  const [message, setMessage] = useState('');

  

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await createTrip(form);
    setMessage(result.message);
  }

  return (
    
    <form onSubmit={handleSubmit} className="w-[400px] flex flex-col space-y-4 border p-6 rounded-lg mt-6 mx-auto shadow bg-white">
  <h2 className="text-xl font-bold text-center text-gray-800">নতুন ট্রিপ যোগ করুন</h2>

  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">যাত্রা শুরুর স্থান</label>
    <input
      placeholder="যেখান থেকে"
      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
      onChange={e => setForm({ ...form, from: e.target.value })}
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">গন্তব্য স্থান</label>
    <input
      placeholder="যেখানে যেতে হবে"
      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
      onChange={e => setForm({ ...form, to: e.target.value })}
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">ভ্রমণের সময়</label>
    <input
      type="datetime-local"
      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
      onChange={e => setForm({ ...form, date: e.target.value })}
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">টিকিট মূল্য (৳)</label>
    <input
      type="number"
      placeholder="মূল্য লিখুন"
      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
      onChange={e => setForm({ ...form, price: e.target.value })}
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">বাস নির্বাচন করুন</label>
    <select
      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
      onChange={e => setForm({ ...form, busId: e.target.value })}
    >
      <option value="">বাস নির্বাচন করুন</option>
      {buses?.map(bus => (
        <option key={bus.id} value={bus.id}>
          {bus.name} ({bus.plate})
        </option>
      ))}
    </select>
  </div>

  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-4 py-2 rounded text-sm"
  >
    যোগ করুন
  </button>

  {message && <p className="text-center text-sm text-green-700 mt-2">{message}</p>}
</form>

  );
}