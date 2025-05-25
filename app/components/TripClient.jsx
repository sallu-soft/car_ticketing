"use client";
import { PiSteeringWheelFill } from "react-icons/pi";
import { useState, useEffect, useTransition } from "react";
import { bookSeat, confirmTicketAction } from "@/actions/ticketing";
import { verifyOtp } from "@/actions/verifyOtp";
import { sendOtp } from "@/actions/sendOtp";
import { MdEventSeat } from "react-icons/md";
import { initiateBkashPayment } from "@/actions/bkash";
import { useRouter } from "next/navigation";

export default function TripClient({ trip, user, userTickets }) {
  const router = useRouter();
  console.log(trip);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [passenger, setPassenger] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    boardingPoint: "",
    droppingPoint: "",
  });

  const [error, setError] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const booked = trip.tickets
      .filter((ticket) => ticket.status === "booked")
      .map((ticket) => ticket.seatId);

    const confirmed = trip.tickets
      .filter((ticket) => ticket.status === "confirmed")
      .map((ticket) => ticket.seatId);

    setBookedSeats(booked);
    setConfirmedSeat(confirmed);
  }, [trip]);
  const [confirmedSeat, setConfirmedSeat] = useState([]);
  const handleSeatSelection = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };
  const groupedTickets = Object.values(
    userTickets.reduce((acc, ticket) => {
      const ref = ticket.referenceID;
      if (!acc[ref]) acc[ref] = [];
      acc[ref].push(ticket);
      return acc;
    }, {})
  ).reverse();
  const handleSubmit = async () => {
    const { name, email, phone, boardingPoint, droppingPoint } = passenger;
    if (!user?.id) {
      router.push("/login");
      return;
    }
    if (!name || !phone) {
      setError("Passenger details are incomplete.");
      return;
    }

    if (selectedSeats.length === 0) {
      setError("Please select at least one seat.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("tripId", trip.id);
      formData.append("seatIds", JSON.stringify(selectedSeats));
      formData.append("passenger", JSON.stringify(passenger));
      formData.append("userId", JSON.stringify(user?.id || null));

      await bookSeat(formData);
      alert("Booking successful!");
      setSelectedSeats([]);
      setPassenger({
        name: "",
        email: "",
        phone: "",
        boardingPoint: "",
        droppingPoint: "",
      });
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const totalAmount = selectedSeats.length * (trip.price || 0);
  const handleBkashPayment = async (ref, totalPrice) => {
    setLoading(true);

    try {
      const res = await fetch("/api/bkash/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ref, totalPrice }), // ✅ fixed
      });

      const data = await res.json();

      if (res.ok && data.bkashURL) {
        window.location.href = data.bkashURL; // ✅ redirect to bKash payment page
      } else {
        alert(data.error || "Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Bkash Payment Error:", error);
      alert("Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };
  const renderSeat = (number) => {
    const seat = trip.seats.find((s) => s.number === number);
    if (!seat) return <div key={number} className="invisible"></div>;

    const isSelected = selectedSeats.includes(seat.id);
    const isBooked = bookedSeats.includes(seat.id);
    const isConfirmed = confirmedSeat.includes(seat.id);

    const baseClass =
      "py-4 text-center flex justify-center flex-col items-center rounded font-medium border px-3 transition-all duration-200 text-sm";
    let seatClass =
      "bg-slate-100 hover:bg-slate-200 border-slate-300 text-gray-700";

    if (isSelected) seatClass = "bg-emerald-500 text-white border-emerald-600";
    else if (isBooked)
      seatClass =
        "bg-yellow-600 px-3 text-gray-200 cursor-not-allowed border-gray-400";
    else if (isConfirmed)
      seatClass =
        "bg-gray-800 px-3 text-gray-100 cursor-not-allowed border-gray-400";

    return (
      <button
        key={seat.id}
        onClick={() => handleSeatSelection(seat.id)}
        disabled={isBooked || isConfirmed}
        className={`${baseClass} ${seatClass}`}
      >
        {seat.number}
        <MdEventSeat className="text-orange-700 text-3xl sm:text-4xl" />
      </button>
    );
  };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-7xl mx-auto px-4">
        {/* Seat Selection */}
        <div className="md:w-1/3 justify-center flex flex-col w-full bg-white h-fit p-4 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4 text-gray-600">
            আপনার সিট নির্বাচন করুন
          </h3>
          {/* <div className="grid grid-cols-4 gap-2">
            {trip?.seats?.map((seat) => (
              <button
                key={seat?.id}
                className={`py-4 text-center flex justify-center flex-col items-center rounded font-medium border transition-all duration-200 text-sm ${
                  selectedSeats.includes(seat?.id)
                    ? "bg-emerald-500 text-white border-emerald-600"
                    : bookedSeats.includes(seat?.id)
                    ? "bg-yellow-600 text-gray-200 cursor-not-allowed border-gray-400"
                    : confirmedSeat.includes(seat?.id)
                    ?"bg-gray-800 text-gray-100 cursor-not-allowed border-gray-400" : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-gray-700"
                }`}
                onClick={() => handleSeatSelection(seat.id)}
                disabled={bookedSeats.includes(seat.id) || confirmedSeat.includes(seat?.id)}
              >
                {seat?.number}
                <MdEventSeat className="text-orange-700 text-3xl sm:text-4xl" />
              </button>
            ))}
          </div> */}
          <div className="grid grid-cols-4 gap-2 justify-center items-center w-fit mx-auto">
           
            <div className="col-span-1">{renderSeat("P")}</div>
            <div className="col-span-2"></div>
            <div className="flex items-center py-2 justify-center bg-gray-200 rounded p-4 flex-col">
              D
              <PiSteeringWheelFill className="text-5xl text-[#f57192]" />
            </div>
            <div className="col-span-4 flex justify-center gap-2">
            {["A1", "A2", "A3"].map((seat) => (
              <div key={seat} className="col-span-1">
                {renderSeat(seat)}
              </div>
            ))}</div>
             
             <div className="col-span-4 flex justify-center gap-2">
            {["B1", "B2", "B3"].map((seat) => (
              <div key={seat} className="col-span-1">
                {renderSeat(seat)}
              </div>
            ))}
            </div> 
            
            {["C1", "C2", "C3", "C4"].map((seat) => (
              <div key={seat} className="col-span-1">
                {renderSeat(seat)}
              </div>
            ))}
          </div>
        </div>

        
        <div className="md:w-2/3 w-full space-y-6">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md border">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                যাত্রীর তথ্য
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label
                      className="mb-1 font-medium text-gray-700"
                      htmlFor="fullName"
                    >
                      আপনার নাম
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Full Name"
                      className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={passenger.name}
                      onChange={(e) =>
                        setPassenger({ ...passenger, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      className="mb-1 font-medium text-gray-700"
                      htmlFor="phoneNumber"
                    >
                      মোবাইল নাম্বার
                    </label>
                    <input
                      id="phoneNumber"
                      type="text"
                      placeholder="Mobile Number"
                      className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={passenger.phone}
                      onChange={(e) =>
                        setPassenger({ ...passenger, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Summary Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gray-100 p-4 rounded-md text-center">
                  <p className="text-sm text-gray-600">নির্বাচিত আসন</p>
                  <p className="font-semibold text-lg text-gray-800">
                    {selectedSeats
                      .map((seatId) => {
                        const seat = trip.seats.find((s) => s.id === seatId);
                        return seat?.number;
                      })
                      .join(", ") || "None"}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md text-center">
                  <p className="text-sm text-gray-600">মোট আসন</p>
                  <p className="font-semibold text-lg text-gray-800">
                    {selectedSeats.length}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 rounded-md text-center">
                  <p className="text-sm text-gray-600">মোট টাকা</p>
                  <p className="font-semibold text-lg text-gray-800">
                    {totalAmount} BDT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold transition ${
              isLoading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isLoading ? "Booking..." : "সীট বুক করুন"}
          </button>
        </div>
      </div>

      {/* User Tickets Section */}
      {/* {userTickets?.length > 0 && user?.id && (
        <div className="bg-white p-4 rounded-lg shadow-md border mt-6 mx-4 max-w-7xl overflow-x-auto">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            Your Booked Tickets
          </h4>

          <div className="w-full min-w-[600px]">
            <table className="w-full text-sm text-left text-gray-700 border">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-2 border">Route</th>
                  <th className="px-4 py-2 border">Bus</th>
                  <th className="px-4 py-2 border">Seat Number</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {userTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {ticket.trip?.from} - {ticket.trip?.to}
                    </td>
                    <td className="px-4 py-2 border">
                      {ticket.trip?.bus?.name} ({ticket.trip?.bus?.plate})
                    </td>
                    <td className="px-4 py-2 border">
                      {ticket.seat?.number || "N/A"}
                    </td>
                    <td className="px-4 py-2 border capitalize">
                      {ticket.status}
                    </td>
                    <td className="px-4 py-2 border">
                      {ticket.status === "booked" ? (
                        // <form action={confirmTicketAction}>
                        <>
                          <input
                            type="hidden"
                            name="ticketId"
                            value={ticket.id}
                          />
                          <button
                            onClick={()=>handlePayment(ticket.trip.price)}
                            disabled={isPending}
                            className="bg-pink-600 text-white px-4 py-2 rounded"
                          >
                            {isPending
                              ? "Redirecting to bKash..."
                              : "Pay with bKash"}
                          </button>
                          </>
                      ) : (
                        <span className="text-gray-400 text-xs">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
      {userTickets?.length > 0 && user?.id && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Route</th>
              <th className="border px-4 py-2 text-left">Bus</th>
              <th className="border px-4 py-2 text-left">Seats</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {groupedTickets?.map((group) => {
              const ref = group[0].referenceID;
              const trip = group[0].trip;
              const bus = trip.bus;
              const totalPrice = trip.price * group.length;

              return (
                <tr key={ref} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {trip.from} - {trip.to}
                  </td>
                  <td className="border px-4 py-2">
                    {bus.name} ({bus.plate})
                  </td>
                  <td className="border px-4 py-2">
                    {group.map((t) => t.seat?.number).join(", ")}
                  </td>
                  <td className="border px-4 py-2 capitalize">
                    {group[0].status}
                  </td>
                  <td className="border px-4 py-2">
                    {group[0].status === "booked" ? (
                      <button
                        onClick={() => handleBkashPayment(ref, totalPrice)}
                        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                      >
                        Pay ৳{totalPrice} with bKash
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No action</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
