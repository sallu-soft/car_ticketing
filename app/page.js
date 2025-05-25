
import AddBus from "./components/AddBus";
import AddTrip from "./components/AddTrip";
import { getBuses } from "@/actions/ticketing";
import SearchBox from "./components/SearchBox";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Trips from "./components/Trips";


// Fetch buses server-side directly in the component
export default async function Home() {
  const fromList = await prisma.trip.findMany({
    where: {
      from: {
        not: "",
      },
    },
    select: {
      from: true,
    },
    distinct: ["from"],
    orderBy: {
      from: "asc",
    },
  });
  
  const toList = await prisma.trip.findMany({
    where: {
      to: {
        not: "",
      },
    },
    select: {
      to: true,
    },
    distinct: ["to"],
    orderBy: {
      to: "asc",
    },
  });
  return (
    <main className="">
      
     <div className="flex flex-col md:flex-row w-full md:w-[80%] gap-10 mx-auto items-center justify-center h-[65vh] px-4">
  <SearchBox toList={toList} fromList={fromList} />
  <div className="hidden md:block">
    <Image
      src="/car.png"
      alt="বাস ব্যানার"
      width={800}
      height={400}
      className=""
    />
  </div>
</div>
      <Trips/>
    </main>
  );
}
