


// import { prisma } from "@/lib/prisma";
// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";

// // Helper to authorize bKash
// const bkash_auth = async () => {
//   try {
//     const { data } = await axios.post(
//       process.env.NEXT_PUBLIC_BKASH_GRANT_TOKEN_URL,
//       {
//         app_key: process.env.NEXT_PUBLIC_BKASH_APP_KEY,
//         app_secret: process.env.NEXT_PUBLIC_BKASH_APP_SECRET,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           username: process.env.NEXT_PUBLIC_BKASH_USERNAME,
//           password: process.env.NEXT_PUBLIC_BKASH_PASSWORD,
//         },
//       }
//     );

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// // bKash request headers with token
// const bkash_headers = async () => {
//   const authData = await bkash_auth();
//   return {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     authorization: authData.id_token,
//     "x-app-key": process.env.NEXT_PUBLIC_BKASH_APP_KEY || "",
//   };
// };

// // Your SMS sending function
// export async function sendSms(to, message) {
//   const smsUrl = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.NEXT_PUBLIC_SMS_API_KEY}&type=text&number=${to}&senderid=${process.env.NEXT_PUBLIC_SMS_SENDER_ID}&message=${encodeURIComponent(message)}`;

//   try {
//     const res = await fetch(smsUrl);
//     const text = await res.text();
//     console.log("SMS API raw response:", text);

//     if (res.ok && text.toLowerCase().includes("sms submitted successfully")) {
//       return { success: true, message: "SMS sent successfully" };
//     } else {
//       return { success: false, message: "Failed to send SMS", debug: text };
//     }
//   } catch (error) {
//     console.error("❌ Failed to send SMS:", error.message);
//     return { success: false, message: "Error sending SMS" };
//   }
// }

// // Main GET handler
// export async function GET(req) {
//   console.log("Callback received");

//   const url = req.url;
//   const urlParams = new URLSearchParams(url.split("?")[1]);
//   const paymentID = urlParams.get("paymentID");
//   const status = urlParams.get("status");
//   const referenceID = urlParams.get("referenceID");

//   if (status === "cancel" || status === "failure") {
//     return NextResponse.redirect(
//       `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message=${status}`
//     );
//   }

//   if (status === "success") {
//     try {
//       const { data } = await axios.post(
//         process.env.NEXT_PUBLIC_BKASH_EXECUTE_PAYMENT_URL,
//         { paymentID },
//         {
//           headers: await bkash_headers(),
//         }
//       );

//       if (
//         data &&
//         data.statusCode === "0000" &&
//         data.transactionStatus === "Completed"
//       ) {
//         // Update ticket as paid/confirmed
//         await prisma.ticket.updateMany({
//           where: { referenceID },
//           data: {
//             paymentStatus: "paid",
//             status: "confirmed",
//           },
//         });

//         // Fetch ticket with all needed details
//         const tickets = await prisma.ticket.findMany({
//           where: { referenceID },
//           include: {
//             seat: true,
//             trip: {
//               include: {
//                 bus: true,
//               },
//             },
//           },
//         });
        
//         for (const ticket of tickets) {
//           const ticketNo = ticket.ticketNo || ticket.id;
//           const seatNumbers = Array.isArray(ticket.seat)
//             ? ticket.seat.map(s => s.number).join(", ")
//             : ticket.seat?.number || "N/A";
        
//           const busName = ticket.trip?.bus?.name || "Unknown";
//           const busPlate = ticket.trip?.bus?.plate || "Unknown";
//           const from = ticket.trip?.from || "Unknown";
//           const to = ticket.trip?.to || "Unknown";
        
//           const date = new Date(ticket.trip.date).toLocaleString("en-BD", {
//             timeZone: "Asia/Dhaka",
//             dateStyle: "medium",
//             timeStyle: "short",
//           });
        
//           const message = `Your ticket #${ticketNo} is confirmed.\nSeat: ${seatNumbers}\nBus: ${busName} (${busPlate})\nRoute: ${from} to ${to}\nDeparture: ${date}`;
        
//           const phone = ticket.phone?.replace(/\s+/g, "");
//           const formattedPhone = phone?.startsWith("0")
//             ? "88" + phone
//             : phone?.startsWith("+88")
//             ? phone.slice(1)
//             : phone;
        
//           if (formattedPhone) {
//             await sendSms(formattedPhone, message);
//           }
//         }

//         return NextResponse.redirect(
//           `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message="success"`
//         );
//       } else {
//         return NextResponse.redirect(
//           `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message="success"`
//         );
//       }
//     } catch (error) {
//       console.error("Error during execution:", error.message);
//       return NextResponse.redirect(
//         `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message=${error.message}`
//       );
//     }
//   }
// }


import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Authorize bKash
const bkash_auth = async () => {
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BKASH_GRANT_TOKEN_URL,
      {
        app_key: process.env.NEXT_PUBLIC_BKASH_APP_KEY,
        app_secret: process.env.NEXT_PUBLIC_BKASH_APP_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.NEXT_PUBLIC_BKASH_USERNAME,
          password: process.env.NEXT_PUBLIC_BKASH_PASSWORD,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// Get headers with token
const bkash_headers = async () => {
  const authData = await bkash_auth();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: authData.id_token,
    "x-app-key": process.env.NEXT_PUBLIC_BKASH_APP_KEY || "",
  };
};

// Send SMS
export async function sendSms(to, message) {
  const smsUrl = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.NEXT_PUBLIC_SMS_API_KEY}&type=text&number=${to}&senderid=${process.env.NEXT_PUBLIC_SMS_SENDER_ID}&message=${encodeURIComponent(message)}`;

  try {
    const res = await fetch(smsUrl);
    const text = await res.text();
    console.log("SMS API raw response:", text);

    if (res.ok && text.toLowerCase().includes("sms submitted successfully")) {
      return { success: true, message: "SMS sent successfully" };
    } else {
      return { success: false, message: "Failed to send SMS", debug: text };
    }
  } catch (error) {
    console.error("❌ Failed to send SMS:", error.message);
    return { success: false, message: "Error sending SMS" };
  }
}

// Main GET handler
export async function GET(req) {
  console.log("Callback received");

  const url = req.url;
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const paymentID = urlParams.get("paymentID");
  const status = urlParams.get("status");
  const referenceID = urlParams.get("referenceID");

  if (status === "cancel" || status === "failure") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message=${status}`
    );
  }

  if (status === "success") {
    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BKASH_EXECUTE_PAYMENT_URL,
        { paymentID },
        {
          headers: await bkash_headers(),
        }
      );

      if (
        data &&
        data.statusCode === "0000" &&
        data.transactionStatus === "Completed"
      ) {
        // Update tickets as paid/confirmed
        await prisma.ticket.updateMany({
          where: { referenceID },
          data: {
            paymentStatus: "paid",
            status: "confirmed",
            paymentId:paymentID,
          },
        });

        // Fetch tickets
        const tickets = await prisma.ticket.findMany({
          where: { referenceID },
          include: {
            seat: true,
            trip: {
              include: {
                bus: true,
              },
            },
          },
        });

        // Group tickets by phone
        const grouped = {};

        for (const ticket of tickets) {
          const phoneRaw = ticket.phone?.replace(/\s+/g, "");
          const phone =
            phoneRaw?.startsWith("0")
              ? "88" + phoneRaw
              : phoneRaw?.startsWith("+88")
              ? phoneRaw.slice(1)
              : phoneRaw;

          if (!phone) continue;

          if (!grouped[phone]) {
            grouped[phone] = {
              ticketNo: ticket.ticketNo || ticket.id,
              seatNumbers: [],
              totalPrice: 0,
              busName: ticket.trip?.bus?.name || "Unknown",
              busPlate: ticket.trip?.bus?.plate || "Unknown",
              from: ticket.trip?.from || "Unknown",
              to: ticket.trip?.to || "Unknown",
              date: new Date(ticket.trip.date).toLocaleString("en-BD", {
                timeZone: "Asia/Dhaka",
                dateStyle: "medium",
                timeStyle: "short",
              }),
            };
          }

          if (Array.isArray(ticket.seat)) {
            grouped[phone].seatNumbers.push(...ticket.seat.map((s) => s.number));
          } else if (ticket.seat) {
            grouped[phone].seatNumbers.push(ticket.seat.number);
          }

          grouped[phone].totalPrice += Number(ticket.price || 0);
        }

        // Send 1 SMS per phone
        for (const [phone, info] of Object.entries(grouped)) {
          const seatList = info.seatNumbers.join(", ");
          const message = `✅ টিকিট #${info.ticketNo} নিশ্চিত করা হয়েছে\n🪑 আসন: ${seatList}\n🚌 বাস: ${info.busName} (${info.busPlate})\n📍 রুট: ${info.from} ➜ ${info.to}\n🕓 যাত্রা: ${info.date}\n💳 পেমেন্ট আইডি: ${paymentID}\n💰 মোট: ৳${info.totalPrice}`;


          await sendSms(phone, message);
        }

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message=success`
        );
      } else {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message=failed`
        );
      }
    } catch (error) {
      console.error("Error during execution:", error.message);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_CORS}/bkash_message?message=${error.message}`
      );
    }
  }
}
