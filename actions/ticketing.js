'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
export async function createBus(data) {
  const { name, plate, totalSeats } = data;
  try {
    const bus = await prisma.bus.create({
      data: {
        name,
        plate,
        totalSeats: parseInt(totalSeats),
      },
    });
    return { success: true, message: 'Bus added successfully', bus };
  } catch (error) {
    return { success: false, message: 'Error adding bus' };
  }
}





// export async function createTrip(data) {
//   const { from, to, date, price, busId } = data;

//   try {
//     const trip = await prisma.trip.create({
//       data: {
//         from,
//         to,
//         date: new Date(date),
//         price: parseFloat(price),
//         busId: parseInt(busId),
//       },
//     });

//     const bus = await prisma.bus.findUnique({ where: { id: parseInt(busId) } });

//     if (bus) {
//       const totalSeats = bus.totalSeats;
//       const seatsPerRow = 4;
//       const rowCount = Math.ceil((totalSeats - 1) / seatsPerRow); // exclude the 'P' seat

//       const seatData = [];

//       // First seat is "P"
//       seatData.push({
//         number: "P",
//         tripId: trip.id,
//       });

//       // Then add the remaining seats starting from A1, A2, ...
//       for (let row = 0; row < rowCount; row++) {
//         const rowLetter = String.fromCharCode(65 + row); // 'A', 'B', ...
//         for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
//           const seatIndex = row * seatsPerRow + seatNum;

//           // We've already added 1 seat ("P"), so offset total check by -1
//           if (seatIndex + 1 > totalSeats) break;

//           seatData.push({
//             number: `${rowLetter}${seatNum}`,
//             tripId: trip.id,
//           });
//         }
//       }

//       await prisma.seat.createMany({ data: seatData });
//     }

//     return { success: true, message: 'Trip created successfully', trip };
//   } catch (error) {
//     return { success: false, message: 'Error creating trip' };
//   }
// }

export async function createTrip(data) {
  const { from, to, date, price, busId } = data;

  try {
    const trip = await prisma.trip.create({
      data: {
        from,
        to,
        date: new Date(date),
        price: parseFloat(price),
        busId: parseInt(busId),
      },
    });

    const bus = await prisma.bus.findUnique({ where: { id: parseInt(busId) } });

    if (bus) {
      const totalSeats = bus.totalSeats;

      const seatLabels = [];

      // Add the "P" seat
      seatLabels.push("P");

      // Define the desired seat layout
      const layout = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3", "C4"],
      ];

      // Flatten and add seat numbers according to the layout
      layout.flat().forEach((seat) => {
        if (seatLabels.length < totalSeats) {
          seatLabels.push(seat);
        }
      });

      // If more seats are needed, continue with D1, D2...
      let rowIndex = 3; // D is the 4th row (index 3)
      let seatNum = 1;
      while (seatLabels.length < totalSeats) {
        const rowLetter = String.fromCharCode(65 + rowIndex); // 'D', 'E', ...
        seatLabels.push(`${rowLetter}${seatNum}`);

        seatNum++;
        if (seatNum > 4) {
          seatNum = 1;
          rowIndex++;
        }
      }

      const seatData = seatLabels.map((label) => ({
        number: label,
        tripId: trip.id,
      }));

      await prisma.seat.createMany({ data: seatData });
    }

    return { success: true, message: "Trip created successfully", trip };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating trip" };
  }
}
export async function getBuses() {
    return await prisma.bus.findMany();  // Or fetch from your database or API
  }
  export async function getTripWithTickets(tripId) {
    return await prisma.trip.findUnique({
      where: { id: Number(tripId) },
      include: {
        bus: true,
        seats: true,
        tickets: true,
      },
    });
  }
  
    export async function getTripsWithTicketDetails() {
    try {
      const trips = await prisma.trip.findMany({
        include: {
          bus: true,
          seats: true,
          tickets: {
            include: {
              seat: true, // Optional: include seat info for each ticket
            },
          },
        },
      });
  
      return trips;
    } catch (error) {
      console.error("Error fetching trips with ticket details:", error);
      return [];
    }
  }

 




export async function bookSeat(formData) {
  const tripIdRaw = formData.get('tripId');
  const seatIdsRaw = formData.get('seatIds');
  const passengerRaw = formData.get('passenger');
  const userId = formData.get('userId');

  const userIdInt = JSON.parse(userId);

  // Parse tripId
  const tripId = Number(tripIdRaw);
  if (isNaN(tripId) || tripId <= 0) {
    throw new Error('Invalid trip ID.');
  }

  // Parse seatIds
  let seatIds = [];
  try {
    const parsed = JSON.parse(seatIdsRaw);
    seatIds = Array.isArray(parsed) ? parsed.map(Number) : [Number(parsed)];
  } catch {
    throw new Error('Seat IDs are invalid or missing.');
  }

  // Parse single passenger data
  let passenger;
  try {
    passenger = JSON.parse(passengerRaw);
  } catch {
    throw new Error('Invalid passenger data.');
  }

  // Check for existing bookings
  const existingTickets = await prisma.ticket.findMany({
    where: {
      tripId,
      seatId: { in: seatIds }
    }
  });

  if (existingTickets.length > 0) {
    const taken = existingTickets.map(t => t.seatId).join(', ');
    throw new Error(`Seats already booked: ${taken}`);
  }

  const ticketNo = `T-${Date.now().toString().slice(6, 10)}-${Math.floor(Math.random() * 10000)}`;

  // ✅ Generate referenceID to group these tickets
  const referenceID = uuidv4();

  // Build ticket data for each seat
  const ticketsData = seatIds.map(seatId => ({
    tripId,
    seatId,
    userId: userIdInt,
    status: 'booked',
    name: passenger.name,
    phone: passenger.phone,
    email: passenger.email || null,
    boardingPoint: passenger.boardingPoint || null,
    droppingPoint: passenger.droppingPoint || null,
    ticketNo,
    referenceID, // ✅ attach group ID
  }));

  // Create tickets
  await prisma.ticket.createMany({ data: ticketsData });

 

  revalidatePath(`/bus/${tripId}`);
}
  // export async function getAllTrips() {
  //   const trips = await prisma.trip.findMany({
  //     include: {
  //       bus: true,
  //       seats: {
  //         include: {
  //           tickets: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       date: 'asc',
  //     },
  //   });
  
  //   // Add availableSeats count to each trip
  //   return trips.map((trip) => {
  //     const unsoldSeats = trip.seats.filter((seat) => seat.tickets.length === 0).length;
  
  //     return {
  //       ...trip,
  //       availableSeats: unsoldSeats,
  //     };
  //   });
  // }
  
  export async function getAllTrips() {
    const now = new Date();
  
    const trips = await prisma.trip.findMany({
      where: {
        date: {
          gt: now, 
        },
        seats: {
          some: {
            tickets: {
              none: {}, 
            },
          },
        },
      },
      include: {
        bus: true,
        seats: {
          include: {
            tickets: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  
    // Calculate available seats
    return trips.map((trip) => {
      const unsoldSeats = trip.seats.filter((seat) => seat.tickets.length === 0).length;
  
      return {
        ...trip,
        availableSeats: unsoldSeats,
      };
    });
  }

  export async function getSearchedTrips(from, to, inputDate) {
    const now = new Date();
  
    // Optional date filtering logic
    const dateFilter = inputDate
      ? {
          gte: new Date(inputDate),
          lt: new Date(new Date(inputDate).getTime() + 24 * 60 * 60 * 1000), // next day
        }
      : { gt: now }; // fallback to future trips only if no date provided
  
    const trips = await prisma.trip.findMany({
      where: {
        from: from ? { contains: from, mode: "insensitive" } : undefined,
        to: to ? { contains: to, mode: "insensitive" } : undefined,
        date: dateFilter,
        seats: {
          some: {
            tickets: {
              none: {},
            },
          },
        },
      },
      include: {
        bus: true,
        seats: {
          include: {
            tickets: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    });
  
    // Add availableSeats count
    return trips.map((trip) => {
      const availableSeats = trip.seats.filter((seat) => seat.tickets.length === 0).length;
  
      return {
        ...trip,
        availableSeats,
      };
    });
  }