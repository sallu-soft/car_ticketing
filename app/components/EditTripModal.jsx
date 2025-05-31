// components/EditTripModal.jsx
'use client';
import { updateTrip } from '@/actions/ticketing';
import { useEffect, useState } from 'react'; //Create this server action

export default function EditTripModal({ trip, buses, onClose, onUpdated }) {
  const [form, setForm] = useState({ ...trip });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTrip(form); // Server action to update trip
    onUpdated(); // Callback to refresh or close modal
    onClose();   // Close modal
  };

  useEffect(() => {
    setForm({ ...trip });
  }, [trip]);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[400px] space-y-4"
      >
        <h2 className="text-xl font-bold text-center">ট্রিপ এডিট করুন</h2>

        <input
          className="w-full border px-3 py-2 rounded"
          value={form.from}
          onChange={e => setForm({ ...form, from: e.target.value })}
          placeholder="From"
        />
        <input
          className="w-full border px-3 py-2 rounded"
          value={form.to}
          onChange={e => setForm({ ...form, to: e.target.value })}
          placeholder="To"
        />
        <input
          type="datetime-local"
          className="w-full border px-3 py-2 rounded"
          value={
            form.date
              ? new Date(form.date).toISOString().slice(0, 16)
              : ''
          }
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={form.busId}
          onChange={e => setForm({ ...form, busId: e.target.value })}
        >
          <option value="">বাস নির্বাচন করুন</option>
          {buses.map(bus => (
            <option key={bus.id} value={bus.id}>
              {bus.name} ({bus.plate})
            </option>
          ))}
        </select>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300"
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
}
