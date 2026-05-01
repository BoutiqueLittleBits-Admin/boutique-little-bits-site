import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    console.log('New order completed!');
    console.log('Customer email:', session.customer_details?.email);
    console.log('Amount:', session.amount_total / 100, session.currency?.toUpperCase());
    
    try {
      await fetch('https://formspree.io/f/xykkeqpe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: 'New Order on Boutique Little Bits!',
          orderType: 'New Purchase',
          customerEmail: session.customer_details?.email || 'Not provided',
          amount: `$${(session.amount_total / 100).toFixed(2)} ${session.currency?.toUpperCase()}`,
          paymentStatus: session.payment_status,
          message: 'A new order has been placed on your store!',
        }),
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }
  }

  return NextResponse.json({ received: true });
}
