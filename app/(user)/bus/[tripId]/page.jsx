import { getUser } from '@/actions/authenticate';
import { getTripWithTickets } from '@/actions/ticketing';
import TripClient from '@/app/components/TripClient';
import { prisma } from '@/lib/prisma';

export default async function TripPage({ params }) {
  const { tripId } = params;
  const tripIdInt = parseInt(tripId, 10);

  const [trip, currentUser] = await Promise.all([
    getTripWithTickets(tripIdInt),
    getUser(),
  ]);
  const userTickets = await prisma.ticket.findMany({
    where: {
      userId: currentUser?.id,
    },
    include: {
      seat: true,
      trip: {
        include: {
          bus: true,
        },
      },
    },
  });
  return (
    <main className="p-2 md:p-6 max-w-[1000px] mx-auto">
      <h2 className="text-2xl font-bold text-black mb-4 text-center">
    {trip.bus?.name} ({trip.bus?.plate})
  </h2>

  <div className="grid grid-cols-1 text-black md:grid-cols-3 gap-4 text-sm md:text-base mb-6">
    <div className="bg-blue-100 p-4 rounded shadow">
      <p className="font-medium text-black">🛫 রওনা: {trip.from}</p>
    </div>
    <div className="bg-green-100 p-4 rounded shadow">
      <p className="font-medium text-black">🛬 গন্তব্য: {trip.to}</p>
    </div>
    <div className="bg-yellow-100 p-4 rounded shadow">
      <p className="font-medium text-black">
        📅 তারিখ ও সময়:{' '}
        {new Date(trip.date).toLocaleString('bn-BD', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })}
      </p>
    </div>
  </div>

  <div className="text-center bg-orange-700 py-3 rounded text-lg font-semibold text-gray-100">
    🎫 টিকিটের মূল্য: {trip.price.toLocaleString('bn-BD')} টাকা
  </div>


      <TripClient trip={trip} user={currentUser} userTickets={userTickets} />
    </main>
  );
}