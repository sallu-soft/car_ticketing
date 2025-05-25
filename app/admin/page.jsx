// import React from 'react'
// import AddBus from '../components/AddBus';
// import AddTrip from '../components/AddTrip';
// import { getBuses, getTripsWithTicketDetails } from '@/actions/ticketing';
// import AllTicketsInfo from '../components/AllTicketsInfo';
// import Link from 'next/link';


// const AdminPage = async () => {
//     const buses = await getBuses();
//     const trips = await  getTripsWithTicketDetails();
//     console.log(trips)
//   return (
//     <div className="p-7">
//       <div className="flex gap-5">
//     <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
//     <Link href="/admin/bus" className="bg-amber-500 px-3 py-1 h-fit rounded-lg text-white">New Bus</Link>
//     <Link href="/admin/trip" className="bg-orange-500 px-3 py-1 h-fit rounded-lg text-white">New Trip</Link>
//         </div>
//         <AllTicketsInfo trips={trips}/>
//     </div>
     
//   )
// }

// export default AdminPage


import { getBuses, getTripsWithTicketDetails } from '@/actions/ticketing'
import { prisma } from '@/lib/prisma'

const AdminDashboard = async () => {
  const [buses, trips, users] = await Promise.all([
    getBuses(),
    getTripsWithTicketDetails(),
    prisma.user.findMany()
  ])

  const totalTickets = trips.reduce((acc, trip) => acc + trip.tickets.length, 0)
  const totalRevenue = trips.reduce((acc, trip) =>
    acc + trip.tickets.reduce((sum, t) => sum + (t.paymentStatus === 'paid' ? trip.price : 0), 0)
  , 0)

  return (
    <div className="p-7 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 p-4 rounded text-white">
          <h2 className="text-lg font-semibold">Buses</h2>
          <p className="text-2xl">{buses.length}</p>
        </div>
        <div className="bg-green-500 p-4 rounded text-white">
          <h2 className="text-lg font-semibold">Trips</h2>
          <p className="text-2xl">{trips.length}</p>
        </div>
        <div className="bg-yellow-500 p-4 rounded text-white">
          <h2 className="text-lg font-semibold">Tickets</h2>
          <p className="text-2xl">{totalTickets}</p>
        </div>
        <div className="bg-purple-500 p-4 rounded text-white">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl">৳ {totalRevenue}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard