'use server';

import axios from 'axios';

const BKASH_BASE_URL = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'; // use live URL for production
const CALLBACK_URL = `${process.env.NEXT_PUBLIC_CORS}/payment-success`;

export async function initiateBkashPayment(amount, reference) {
  try {
    // Step 1: Get Access Token
    const tokenRes = await axios.post(
      `${BKASH_BASE_URL}/checkout/token/grant`,
      {
        app_key: process.env.NEXT_PUBLIC_BKASH_APP_KEY,
        app_secret: process.env.NEXT_PUBLIC_BKASH_APP_SECRET,
        username: process.env.NEXT_PUBLIC_BKASH_USERNAME,
        password: process.env.NEXT_PUBLIC_BKASH_PASSWORD,
      }
    );

    const idToken = tokenRes.data.id_token;

    // Step 2: Create Payment
    const paymentRes = await axios.post(
      `${NEXT_PUBLIC_CORS}/checkout/create`,
      {
        mode: '0011',
        payerReference: ' ',
        merchantInvoiceNumber: reference,
        amount: amount,
        currency: 'BDT',
        intent: 'sale',
        callbackURL: CALLBACK_URL,
      },
      {
        headers: {
          Authorization: idToken,
          'X-APP-Key': process.env.NEXT_PUBLIC_BKASH_APP_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      bkashURL: paymentRes.data.bkashURL,
      paymentID: paymentRes.data.paymentID,
    };
  } catch (error) {
    console.error('bKash error:', error?.response?.data || error.message);
    return { success: false, message: 'Payment initialization failed.' };
  }
}