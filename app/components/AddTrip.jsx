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
    <form onSubmit={handleSubmit} className="w-[400px] flex flex-col space-y-4 border p-4 rounded mt-6 mx-auto">
      <h2 className="text-lg font-bold">Add Trip</h2>
      <input placeholder="From" onChange={e => setForm({ ...form, from: e.target.value })} />
      <input placeholder="To" onChange={e => setForm({ ...form, to: e.target.value })} />
      <input type="datetime-local" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Price" type="number" onChange={e => setForm({ ...form, price: e.target.value })} />
      <select onChange={e => setForm({ ...form, busId: e.target.value })}>
        <option value="">Select Bus</option>
        {buses?.map(bus => (
          <option key={bus.id} value={bus.id}>{bus.name} ({bus.plate})</option>
        ))}
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Add Trip</button>
      {message && <p>{message}</p>}
    </form>
  );
}