import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SearchPage({ searchParams }) {
  const from = searchParams?.from || "";
  const to = searchParams?.to || "";
  const date = searchParams?.date || "";

  if (!from || !to) {
    redirect("/");
  }

  const inputDate = new Date(date); // from searchParams.date
const nextDate = new Date(inputDate);
nextDate.setDate(nextDate.getDate() + 1); // next calendar day

const trips = await prisma.trip.findMany({
  where: {
    from: { contains: from, mode: "insensitive" },
    to: { contains: to, mode: "insensitive" },
    date: {
      gte: inputDate,
      lt: nextDate,
    },
  },
  include: {
    bus: true,
  },
});

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Available Trips</h1>
      {trips.length === 0 ? (
        <p>No trips found matching your criteria.</p>
      ) : (
       
        <ul className="grid gap-4 grid-cols-4">
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
              <div className="bg-blue-50 p-4 rounded shadow">
                <p>
                  {trip.from} - {trip.to}
                </p>
                <p>তারিখ: {formattedDate}</p>
                <p>গাড়ি ছাড়ার সময়: {formattedTime}</p>
                <p>সিট অবশিষ্ট: {trip.availableSeats} টি</p>
                <div className="bg-yellow-100 text-yellow-900 border border-yellow-300 px-3 py-2 mt-3 rounded text-sm font-semibold text-center">
                  🎫 টিকিটের মূল্য: {trip.price} টাকা
                </div>
                <p>{trip.busId}</p>
                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/bus/${trip.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    বিস্তারিত
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      )}
    </main>
  );
}