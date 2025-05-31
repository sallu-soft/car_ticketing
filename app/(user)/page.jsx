// app/(user)/page.js

import Image from "next/image";
import SearchBox from "../components/SearchBox";
import Trips from "../components/Trips";
import { prisma } from "@/lib/prisma";


export default async function Home() {
  const fromList = await prisma.trip.findMany({
    where: { from: { not: "" } },
    select: { from: true },
    distinct: ["from"],
    orderBy: { from: "asc" },
  });

  const toList = await prisma.trip.findMany({
    where: { to: { not: "" } },
    select: { to: true },
    distinct: ["to"],
    orderBy: { to: "asc" },
  });

  return (
    <main className="bg-gray-50">
      <div className="flex flex-col md:flex-row w-full md:w-[80%] gap-10 mx-auto items-center justify-center h-[65vh] px-4">
        <SearchBox toList={toList} fromList={fromList} />
        <div className="hidden md:block">
          <Image src="/Hiace.png" alt="বাস ব্যানার" width={800} height={400} />
        </div>
      </div>
      <Trips />
    </main>
  );
}