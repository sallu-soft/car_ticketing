'use server'

import { prisma } from "@/lib/prisma"



export async function deleteExpiredTickets() {
  const now = new Date()
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000)

  const deleted = await prisma.ticket.deleteMany({
    where: {
      status: 'booked',
      createdAt: {
        lt: tenMinutesAgo,
      },
    },
  })

  console.log(`Deleted ${deleted.count} expired booked tickets`)
  return { deleted: deleted.count }
}
