
// import React from 'react'

// const BusList = ({buses}) => {
//   return (
//     <div className="p-7">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">All Buses</h2>
          
//         </div>
//         <table className="w-full text-left border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2">ID</th>
//               <th className="p-2">Name</th>
//               <th className="p-2">Plate</th>
//               <th className="p-2">Total Seats</th>
//             </tr>
//           </thead>
//           <tbody>
//             {buses.map((bus) => (
//               <tr key={bus.id} className="border-t">
//                 <td className="p-2">{bus.id}</td>
//                 <td className="p-2">{bus.name}</td>
//                 <td className="p-2">{bus.plate}</td>
//                 <td className="p-2">{bus.totalSeats}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//   )
// }

// export default BusList


'use client';
import { deleteBus, updateBus } from '@/actions/ticketing';
import { useRouter } from 'next/navigation';
import React, { startTransition, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const BusList = ({ buses }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [editingBus, setEditingBus] = useState(null);
  const [form, setForm] = useState({ name: '', plate: '', totalSeats: '' });

  const totalPages = Math.ceil(buses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBuses = buses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const openEditModal = (bus) => {
    setEditingBus(bus);
    setForm({ name: bus.name, plate: bus.plate, totalSeats: bus.totalSeats });
  };

  const closeEditModal = () => {
    setEditingBus(null);
  };

  const handleUpdate = () => {
    startTransition(async () => {
      const res = await updateBus(editingBus.id, {
        name: form.name,
        plate: form.plate,
        totalSeats: Number(form.totalSeats),
      })
  
      if (res.success) {
        toast.success('বাস সফলভাবে হালনাগাদ হয়েছে!')

        closeEditModal()
        router.refresh();
        // Optionally re-fetch or refresh UI
      } else {
        toast.error(res.error || 'কোনো একটি ত্রুটি ঘটেছে')
      }
    })
  }

  const handleDelete = (id) => {
    const confirmDelete = confirm('আপনি কি নিশ্চিতভাবে এই বাসটি মুছে ফেলতে চান?')
    if (!confirmDelete) return
  
    startTransition(async () => {
      const res = await deleteBus(id)
      if (res.success) {
        toast.success('বাস সফলভাবে মুছে ফেলা হয়েছে!')
        router.refresh();
        // Optionally refresh UI or re-fetch list
      } else {
        toast.error(res.error || 'বাস মুছতে সমস্যা হয়েছে')
      }
    })
  }

  return (
    <div className="p-7">
      <h2 className="text-xl font-semibold mb-4">All Buses</h2>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Plate</th>
            <th className="p-2">Total Seats</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBuses.map((bus) => (
            <tr key={bus.id} className="border-t">
              <td className="p-2">{bus.id}</td>
              <td className="p-2">{bus.name}</td>
              <td className="p-2">{bus.plate}</td>
              <td className="p-2">{bus.totalSeats}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => openEditModal(bus)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bus.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editingBus && (
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded w-[400px] space-y-4">
      <h2 className="text-lg font-bold">বাস সম্পাদনা করুন</h2>

      <div>
        <label className="block mb-1 font-medium">নাম</label>
        <input
          className="w-full border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="বাসের নাম লিখুন"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">প্লেট নম্বর</label>
        <input
          className="w-full border p-2"
          value={form.plate}
          onChange={(e) => setForm({ ...form, plate: e.target.value })}
          placeholder="প্লেট নম্বর লিখুন"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">মোট সিট সংখ্যা</label>
        <input
          className="w-full border p-2"
          type="number"
          value={form.totalSeats}
          onChange={(e) => setForm({ ...form, totalSeats: e.target.value })}
          placeholder="মোট সিট সংখ্যা লিখুন"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={closeEditModal}
          className="px-4 py-1 border rounded"
        >
          বাতিল
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          হালনাগাদ
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default BusList;
