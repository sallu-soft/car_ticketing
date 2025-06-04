// 'use server'

// import { prisma } from "@/lib/prisma"
// import { revalidatePath } from "next/cache"



// export async function deleteExpiredTickets() {
//   const now = new Date()
//   const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000)

//   const deleted = await prisma.ticket.deleteMany({
//     where: {
//       status: 'booked',
//       createdAt: {
//         lt: tenMinutesAgo,
//       },
//     },
//   })
//   revalidatePath('/bus')
//   console.log(`Deleted ${deleted.count} expired booked tickets`)
//   return { deleted: deleted.count }
// }

'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteExpiredTickets() {
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

  const deleted = await prisma.ticket.deleteMany({
    where: {
      status: 'booked',
      createdAt: { lt: tenMinutesAgo },
    },
  });

  

  // Emit socket event
  

  return { deleted: deleted.count };
}