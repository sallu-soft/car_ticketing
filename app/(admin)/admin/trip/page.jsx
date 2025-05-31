// import { getBuses, getTripsWithTicketDetails } from "@/actions/ticketing";
// import AddTrip from "@/app/components/AddTrip";
// import React from "react";

// const trip = async () => {
//   const buses = await getBuses();
//   const trips = await getTripsWithTicketDetails();
//   return (
//     <div className="flex flex-col justify-center mx-auto w-full">
//       <AddTrip buses={buses} />
//       <div className="p-7">
//         <h2 className="text-xl font-semibold mb-4">All Trips</h2>
//         <table className="w-full text-left border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2">ID</th>
//               <th className="p-2">From</th>
//               <th className="p-2">To</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Bus</th>
//               <th className="p-2">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {trips.map((trip) => (
//               <tr key={trip.id} className="border-t">
//                 <td className="p-2">{trip.id}</td>
//                 <td className="p-2">{trip.from}</td>
//                 <td className="p-2">{trip.to}</td>
//                 <td className="p-2">{new Date(trip.date).toLocaleString()}</td>
//                 <td className="p-2">{trip.bus?.name}</td>
//                 <td className="p-2">{trip.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default trip;
// app/(admin)/trip/page.tsx or .js
// app/(admin)/trip/page.tsx
import { getBuses, getTripsWithTicketDetails } from "@/actions/ticketing";
import AddTrip from "@/app/components/AddTrip";
import AdminTrips from "@/app/components/AdminTrips";
import Link from "next/link";

const PAGE_SIZE = 10;

export default async function TripPage({ searchParams }) {
  
  const page = parseInt(searchParams?.page || "1", 10);

  const buses = await getBuses();
  const allTrips = await getTripsWithTicketDetails();

  const totalPages = Math.ceil(allTrips.length / PAGE_SIZE);
  const paginatedTrips = allTrips.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="flex flex-col justify-center mx-auto w-full px-4 md:px-12 py-8">
      <AddTrip buses={buses} />

      <div className="py-6">
        <h2 className="text-2xl font-bold mb-6">All Trips</h2>

        {/* Desktop Table */}
        <AdminTrips paginatedTrips={paginatedTrips} buses={buses}/>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`?page=${p}`}
              className={`px-4 py-2 rounded border ${
                p === page
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
