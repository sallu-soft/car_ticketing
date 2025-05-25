import { getAllTrips } from '@/actions/ticketing';
import TripsClientWrapper from './TripsClientWrapper';

export default async function Trips() {
  const trips = (await getAllTrips()).filter(trip => trip.availableSeats > 0);

  return <TripsClientWrapper trips={trips} />;
}