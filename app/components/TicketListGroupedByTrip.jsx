'use client'

import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { useRef } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/formatedDate'

const TicketListGroupedByTrip = ({ trips, currentPage, totalPages }) => {
  const tripRefs = useRef({})
  const downloadTripSectionAsPDF = async (tripId, trip) => {
    const element = tripRefs.current[tripId]
    if (!element) return
  
    const canvas = await html2canvas(element, { scale: 2 }) // Higher scale for better quality
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
  
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`trip_${trip.from}-${trip.to}_${trip.date}.pdf`)
  }
  

  return (
    <div className="p-7 space-y-10 w-[1050px] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tickets Grouped by Trip</h2>
    
      {trips.map((trip) => (
        
        <div key={trip.id}>
            {trip?.tickets?.length > 0 && (
              <div className="space-x-2 mb-3 flex justify-end">
                <button
                  onClick={() => downloadTripSectionAsPDF(trip.id, trip)}
                  className="px-4 py-2 bg-[#1a6b1a] text-[#fff] rounded "
                >
                  Download Single PDF
                </button>
              </div>
            )}
            <div
          
          className="border p-4 rounded shadow"
          ref={(el) => (tripRefs.current[trip.id] = el)}
        >
         
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">
                Trip: {trip.from} → {trip.to}
              </h3>
              <p>Date: {formatDate(trip.date)}</p>
              <p>Bus: {trip.bus?.name}</p>
            </div>

            
          </div>

          {trip.tickets.length === 0 ? (
            <p className="text-[#000000] italic">No tickets booked yet.</p>
          ) : (
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-[#f3f4f6]">
                  <th className="p-2">Ticket No</th>
                  <th className="p-2">Passenger</th>
                  <th className="p-2">Seat</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {trip.tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t">
                    <td className="p-2">{ticket.ticketNo}</td>
                    <td className="p-2">{ticket.name}</td>
                    <td className="p-2">{ticket.seat?.number}</td>
                    <td className="p-2">{ticket.phone}</td>
                    <td className="p-2">{ticket.status || 'pending'}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        </div>
        
      ))}
  
      {/* Pagination Links */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <Link
          href={`?page=${Math.max(currentPage - 1, 1)}`}
          className={`px-3 py-1 bg-gray-300 rounded ${
            currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          Prev
        </Link>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Link
          href={`?page=${Math.min(currentPage + 1, totalPages)}`}
          className={`px-3 py-1 bg-gray-300 rounded ${
            currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  )
}

export default TicketListGroupedByTrip
