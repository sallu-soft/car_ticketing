'use client'

import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { useRef } from 'react'
import Link from 'next/link'

const TicketListGroupedByTrip = ({ trips, currentPage, totalPages }) => {
  const tripRefs = useRef({})

  const downloadTicketPDF = (ticket, trip) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Ticket Details', 20, 20)
    doc.setFontSize(12)
    doc.text(`Ticket No: ${ticket.ticketNo}`, 20, 30)
    doc.text(`Passenger: ${ticket.name}`, 20, 40)
    doc.text(`Phone: ${ticket.phone}`, 20, 50)
    doc.text(`Seat: ${ticket.seat?.number}`, 20, 60)
    doc.text(`Status: ${ticket.status || 'pending'}`, 20, 70)
    doc.text('--- Trip Info ---', 20, 85)
    doc.text(`Trip: ${trip.from} → ${trip.to}`, 20, 95)
    doc.text(`Date: ${new Date(trip.date).toLocaleString()}`, 20, 105)
    doc.text(`Bus: ${trip.bus?.name}`, 20, 115)
    doc.save(`ticket-${ticket.ticketNo}.pdf`)
  }

  const downloadTripSectionAsPDF = async (tripId, trip) => {
    const section = tripRefs.current[tripId]
    if (!section) return

    const canvas = await html2canvas(section, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    })

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save(`trip-${trip.from}-${trip.to}.pdf`)
  }

  return (
    <div className="p-7 space-y-10">
      <h2 className="text-2xl font-bold mb-4">Tickets Grouped by Trip</h2>

      {trips.map((trip) => (
        <div
          key={trip.id}
          className="border p-4 rounded shadow"
          ref={(el) => (tripRefs.current[trip.id] = el)}
        >
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">
                Trip: {trip.from} → {trip.to}
              </h3>
              <p>Date: {new Date(trip.date).toLocaleString()}</p>
              <p>Bus: {trip.bus?.name}</p>
            </div>

            {trip.tickets.length > 0 && (
              <div className="space-x-2">
                <button
                  onClick={() => downloadTripSectionAsPDF(trip.id, trip)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Download Single PDF
                </button>
              </div>
            )}
          </div>

          {trip.tickets.length === 0 ? (
            <p className="text-gray-500 italic">No tickets booked yet.</p>
          ) : (
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Ticket No</th>
                  <th className="p-2">Passenger</th>
                  <th className="p-2">Seat</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
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
                    <td className="p-2">
                      <button
                        onClick={() => downloadTicketPDF(ticket, trip)}
                        className="px-2 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
