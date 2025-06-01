import { getSearchedTrips } from '@/actions/ticketing';
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

// const trips = await prisma.trip.findMany({
//   where: {
//     from: { contains: from, mode: "insensitive" },
//     to: { contains: to, mode: "insensitive" },
//     date: {
//       gte: inputDate,
//       lt: nextDate,
//     },
//   },
//   include: {
//     bus: true,
//   },
// });
  const trips = await getSearchedTrips(from , to , inputDate )
  return (
    <main className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-black">ট্রিপসমূহ</h1>
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
        const formattedTime = `${period} ${(hour % 12 === 0 ? 12 : hour % 12).toLocaleString('bn-BD')}:${minute
          .toString()
          .padStart(2, '0')
          .replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d])} টা`;

        return (
          <li key={trip.id}>
            <div className="bg-[#fbf5e9] border-orange-400 border text-black p-4 rounded shadow-lg">
            
              <p className="bg-orange-700 mb-2 px-6 text-lg font-bold py-1 rounded-md text-white w-fit">
                {trip.from} - {trip.to}
              </p>
              {/* <p>গাড়িঃ {trip.bus?.name} ({trip.bus?.plate})</p>
              <p>তারিখঃ {formattedDate.toLocaleString('bn-BD')}</p>
              <p>গাড়ি ছাড়ার সময়ঃ {formattedTime}</p>
              <p>সিট অবশিষ্টঃ {trip.availableSeats.toLocaleString('bn-BD')} টি</p> */}
              <div className="grid grid-cols-[auto_1fr] gap-x-2">
<p className="">গাড়ি</p>
<p>ঃ {trip.bus?.name} ({trip.bus?.plate})</p>

<p className="">তারিখ</p>
<p>ঃ {formattedDate.toLocaleString('bn-BD')}</p>

<p className="">গাড়ি ছাড়ার সময়</p>
<p>ঃ {formattedTime}</p>

<p className="">সিট অবশিষ্ট</p>
<p>ঃ {trip.availableSeats.toLocaleString('bn-BD')} টি</p>
</div>
              <div className="bg-[#FFF092] text-black font-bold border border-yellow-300 px-3 py-2 mt-3 rounded text-md  text-center">
                🎫 টিকিটের মূল্যঃ {trip.price.toLocaleString('bn-BD')} টাকা
              </div>
              
              <div className="flex justify-center gap-2 mt-2">
                <Link
                  href={`/bus/${trip?.id}`}
                  className="px-6 py-2 bg-orange-700 text-white rounded"
                >
                  বুকিং করুন
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