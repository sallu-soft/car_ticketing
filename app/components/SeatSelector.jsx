"use client";

import { useState } from "react";

export default function SeatSelector({ seats, bookedSeatIds }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="grid grid-cols-5 gap-2 mt-4">
      {seats.map((seat) => {
        const isBooked = bookedSeatIds.includes(seat.id);
        const isSelected = selectedSeats.includes(seat.id);

        return (
          <label
            key={seat.id}
            onClick={() => !isBooked && toggleSeat(seat.id)}
            className={`border px-4 py-2 rounded text-center cursor-pointer
              ${isBooked ? 'bg-red-400 pointer-events-none' : ''}
              ${isSelected ? 'bg-blue-300' : !isBooked ? 'bg-green-200' : ''}
            `}
          >
            Seat {seat.number}
            {isSelected && (
              <input type="hidden" name="seatIds" value={seat.id} />
            )}
          </label>
        );
      })}
    </div>
  );
}