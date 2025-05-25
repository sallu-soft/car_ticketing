import { getBuses, getTripsWithTicketDetails } from "@/actions/ticketing";
import AddTrip from "@/app/components/AddTrip";
import React from "react";

const trip = async () => {
  const buses = await getBuses();
  const trips = await getTripsWithTicketDetails();
  return (
    <div className="flex flex-col justify-center mx-auto w-full">
      <AddTrip buses={buses} />
      <div className="p-7">
        <h2 className="text-xl font-semibold mb-4">All Trips</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Date</th>
              <th className="p-2">Bus</th>
              <th className="p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-t">
                <td className="p-2">{trip.id}</td>
                <td className="p-2">{trip.from}</td>
                <td className="p-2">{trip.to}</td>
                <td className="p-2">{new Date(trip.date).toLocaleString()}</td>
                <td className="p-2">{trip.bus?.name}</td>
                <td className="p-2">{trip.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default trip;
