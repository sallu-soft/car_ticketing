import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
    console.error("bKash Auth Error:", error);
    throw error;
  }
};

const bkash_headers = async () => {
  const authData = await bkash_auth();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: authData.id_token,
    "x-app-key": process.env.NEXT_PUBLIC_BKASH_APP_KEY || "",
  };
};

export async function POST(req) {
  const { ref, totalPrice } = await req.json();
  console.log("Creating bKash payment for", ref, totalPrice);

  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_BKASH_CREATE_PAYMENT_URL,
      {
        mode: "0011",
        payerReference: "Sallu",
        callbackURL: `${process.env.NEXT_PUBLIC_CORS}/api/bkash/payment/callback?referenceID=${ref}`,
        amount: totalPrice,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + ref?.substring(0, 5),
      },
      {
        headers: await bkash_headers(),
      }
    );

    return NextResponse.json(
      { bkashURL: data.bkashURL, referenceID: ref },
      { status: 201 }
    );
  } catch (error) {
    console.error("bKash Create Payment Error:", error?.response?.data || error.message);
    return NextResponse.json({ error: "bKash payment initiation failed" }, { status: 500 });
  }
}
