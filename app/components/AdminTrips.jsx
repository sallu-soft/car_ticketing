'use client'
import React, { useState } from 'react'
import EditTripModal from './EditTripModal';
import { deleteTrip } from '@/actions/ticketing';

const AdminTrips = ({paginatedTrips, buses}) => {
    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleEdit = (trip) => {
      setSelectedTrip(trip); // Open modal
    };
    const handleDelete = async (id) => {
        if (confirm("আপনি কি নিশ্চিত?")) {
            console.log("before delete")
          await deleteTrip(id);
          window.location.reload(); // or use router.refresh()
        }
      };
    const handleCloseModal = () => {
      setSelectedTrip(null);
    };
  
    const handleUpdated = () => {
      window.location.reload(); // Or refetch trips
    };
  return (
    <div>
        {selectedTrip && (
        <EditTripModal
          trip={selectedTrip}
          buses={buses}
          onClose={handleCloseModal}
          onUpdated={handleUpdated}
        />
      )}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Bus</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTrips.map((trip) => (
                <tr key={trip.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{trip.id}</td>
                  <td className="p-3">{trip.from}</td>
                  <td className="p-3">{trip.to}</td>
                  <td className="p-3">
                    {new Date(trip.date).toLocaleString()}
                  </td>
                  <td className="p-3">{trip.bus?.name}</td>
                  <td className="p-3">{trip.price} ৳</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(trip)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {paginatedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white shadow rounded-lg p-4 border"
            >
              <div className="text-sm font-medium text-gray-700">
                {trip.from} → {trip.to}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {new Date(trip.date).toLocaleString()}
              </div>
              <div className="text-sm">
                Bus: <span className="font-medium">{trip.bus?.name}</span>
              </div>
              <div className="text-sm">
                Price:{" "}
                <span className="text-green-600 font-semibold">
                  {trip.price} ৳
                </span>
              </div>
              <div className="flex justify-end space-x-3 mt-2">
                <button
                  onClick={() => handleEdit(trip)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default AdminTrips