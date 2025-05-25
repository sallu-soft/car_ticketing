
import React from 'react'

const BusList = ({buses}) => {
  return (
    <div className="p-7">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Buses</h2>
          
        </div>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Plate</th>
              <th className="p-2">Total Seats</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id} className="border-t">
                <td className="p-2">{bus.id}</td>
                <td className="p-2">{bus.name}</td>
                <td className="p-2">{bus.plate}</td>
                <td className="p-2">{bus.totalSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default BusList