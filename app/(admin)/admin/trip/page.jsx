
import { getBuses, getTripsWithTicketDetail } from "@/actions/ticketing";
import AddTrip from "@/app/components/AddTrip";
import AdminTrips from "@/app/components/AdminTrips";
import Link from "next/link";

const PAGE_SIZE = 10;

export default async function TripPage({ searchParams }) {
  
  const page = parseInt(searchParams?.page || "1", 10);

  const buses = await getBuses();
  const allTrips = await getTripsWithTicketDetail();

  const totalPages = Math.ceil(allTrips?.length / PAGE_SIZE);
  const paginatedTrips = allTrips?.slice(
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
