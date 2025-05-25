'use client';

import React, { useState } from 'react';

const AllTicketsInfo = ({ trips }) => {
  const [openTripId, setOpenTripId] = useState(null);

  const handleToggle = (id) => {
    setOpenTripId(openTripId === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Trips List</h2>
      {trips.map((trip) => {
        const soldSeats = trip.tickets.map(t => t.seat.number);
        const unsoldSeats = trip.seats.filter(seat => !soldSeats.includes(seat.number));

        return (
          <div key={trip.id} className="border p-4 mb-4 w-fit rounded">
            <button onClick={() => handleToggle(trip.id)} className="text-left w-full">
              <h3 className="text-lg font-semibold">
                {trip.from} → {trip.to} ({new Date(trip.date).toLocaleString()})
              </h3>
              <p>Bus: {trip.bus.name} | Plate: {trip.bus.plate}</p>
            </button>

            {openTripId === trip.id && (
              <div className="mt-4">
                <h4 className="font-semibold">Sold Tickets</h4>
                {trip.tickets.length ? (
                  <table className="w-full text-sm mt-2 border">
                    <thead>
                      <tr>
                        <th>Seat</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trip.tickets.map(ticket => (
                        <tr key={ticket.id}>
                          <td>{ticket.seat?.number}</td>
                          <td>{ticket.name || 'N/A'}</td>
                          <td>{ticket.phone || 'N/A'}</td>
                          <td>{ticket.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : <p className="text-gray-600">No sold tickets.</p>}

                <h4 className="font-semibold mt-4">Unsold Seats</h4>
                {unsoldSeats.length ? (
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {unsoldSeats.map(seat => (
                      <li key={seat.id}>Seat {seat.number}</li>
                    ))}
                  </ul>
                ) : <p className="text-gray-600">All seats sold.</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllTicketsInfo;
