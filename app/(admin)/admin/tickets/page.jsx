import { getTripsWithTicketDetails } from '@/actions/ticketing'
import TicketListGroupedByTrip from '@/app/components/TicketListGroupedByTrip'

const TicketPage = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1
  const limit = 2

  const { trips, totalCount } = await getTripsWithTicketDetails(page, limit)

  return (
    <div>
      <TicketListGroupedByTrip
        trips={trips}
        currentPage={page}
        totalPages={Math.ceil(totalCount / limit)}
      />
    </div>
  )
}

export default TicketPage