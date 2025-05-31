

import { getTripsWithTicketDetails } from '@/actions/ticketing';
import TicketListGroupedByTrip from '@/app/components/TicketListGroupedByTrip';
import React from 'react';

const TicketPage =async () => {
    const trips = await getTripsWithTicketDetails();
  return (
    <div>
      <TicketListGroupedByTrip trips={trips} />
    </div>
  );
};

export default TicketPage;