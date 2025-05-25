import { deleteExpiredTickets } from "@/actions/deleteExpiredTickets"

export async function GET() {
  const result = await deleteExpiredTickets()
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  })
}