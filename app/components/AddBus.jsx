'use client';
import { createBus } from '@/actions/ticketing';
import { useState } from 'react';

export default function AddBus() {
  const [form, setForm] = useState({ name: '', plate: '', totalSeats: '' });
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await createBus(form);
    setMessage(result.message);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col w-[400px] mx-auto mt-5 border p-4 rounded">
      <h2 className="text-lg font-bold">Add Bus</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Plate" onChange={e => setForm({ ...form, plate: e.target.value })} />
      <input placeholder="Total Seats" type="number" onChange={e => setForm({ ...form, totalSeats: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Add Bus</button>
      {message && <p>{message}</p>}
    </form>
  );
}