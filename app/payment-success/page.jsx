import axios from 'axios';

const BKASH_BASE_URL = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta';

export default async function PaymentSuccess({ searchParams }) {
  const paymentID = searchParams?.paymentID;

  if (!paymentID) return <div>Invalid Payment.</div>;

  try {
    // Get Access Token again
    const tokenRes = await axios.post(`${BKASH_BASE_URL}/checkout/token/grant`, {
      app_key: process.env.BKASH_APP_KEY,
      app_secret: process.env.BKASH_APP_SECRET,
      username: process.env.BKASH_USERNAME,
      password: process.env.BKASH_PASSWORD,
    });

    const idToken = tokenRes.data.id_token;

    // Execute the payment
    const paymentRes = await axios.post(
      `${BKASH_BASE_URL}/checkout/execute`,
      { paymentID },
      {
        headers: {
          Authorization: idToken,
          'X-APP-Key': process.env.BKASH_APP_KEY,
        },
      }
    );

    const payment = paymentRes.data;

    if (payment.transactionStatus === 'Completed') {
      // You can save to DB here
      return <div>✅ Payment successful! Your seat is booked.</div>;
    }

    return <div>❌ Payment failed or cancelled.</div>;
  } catch (error) {
    console.error('Payment Execution Error:', error);
    return <div>❌ An error occurred during payment verification.</div>;
  }
}