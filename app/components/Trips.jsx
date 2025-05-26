import { getAllTrips } from '@/actions/ticketing';
import Link from 'next/link';

export default async function Trips() {
  const trips = (await getAllTrips()).filter(trip => trip.availableSeats > 0);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Trips</h1>
      <ul className="grid gap-4 md:grid-cols-3 grid-col-1 lg:grid-cols-4">
        {trips.map((trip) => {
          const dateObj = new Date(trip.date);

          // Format date in Bengali
          const formattedDate = dateObj.toLocaleDateString('bn-BD', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          // Get hour and minute
          const hour = dateObj.getHours();
          const minute = dateObj.getMinutes();

          // Custom time period in Bangla
          let period = '';
          if (hour >= 5 && hour < 12) {
            period = 'সকাল';
          } else if (hour >= 12 && hour < 16) {
            period = 'দুপুর';
          } else if (hour >= 16 && hour < 18) {
            period = 'বিকাল';
          } else {
            period = 'রাত';
          }

          // Format time in Bengali with custom period
          const formattedTime = `${period} ${hour % 12 === 0 ? 12 : hour % 12}:${minute
            .toString()
            .padStart(2, '0')} টা`;

          return (
            <li key={trip.id}>
              <div className="bg-blue-50 text-black p-4 rounded shadow">
              
                <p className="bg-orange-600 mb-2 px-3 rounded-md text-white w-fit">
                  {trip.from} - {trip.to}
                </p>
                <p>গাড়ি: {trip.bus?.name} ({trip.bus?.plate})</p>
                <p>তারিখ: {formattedDate}</p>
                <p>গাড়ি ছাড়ার সময়: {formattedTime}</p>
                <p>সিট অবশিষ্ট: {trip.availableSeats} টি</p>
                <div className="bg-yellow-100 text-yellow-900 border border-yellow-300 px-3 py-2 mt-3 rounded text-sm font-semibold text-center">
                  🎫 টিকিটের মূল্য: {trip.price} টাকা
                </div>
                
                <div className="flex justify-center gap-2 mt-2">
                  <Link
                    href={`/bus/${trip?.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    বুকিং
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
