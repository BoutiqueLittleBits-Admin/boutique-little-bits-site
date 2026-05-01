import Stripe from 'stripe';

// Live mode enabled January 2026
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Debug: Log which key type is being used
    const keyType = process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') ? 'LIVE' : 'TEST';
    console.log('Stripe key type:', keyType);
    console.log('Key prefix:', process.env.STRIPE_SECRET_KEY?.substring(0, 12));

    const { items, shippingRate, giftWrap, giftMessage } = await request.json();

    if (!items || items.length === 0) {
      return Response.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Build line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Add gift wrap as a line item if selected
    if (giftWrap) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: '🎁 Gift Wrapping',
            description: 'Beautifully wrapped and ready to give',
          },
          unit_amount: 350,
        },
        quantity: 1,
      });
    }

    // Add shipping as a line item if not free shipping
    if (shippingRate) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping - ${shippingRate.service}`,
            description: `${shippingRate.estimatedDays} business days via ${shippingRate.carrier}`,
          },
          unit_amount: Math.round(shippingRate.price * 100),
        },
        quantity: 1,
      });
    }

    // Build metadata for order processing
    const metadata = {
      giftWrap: giftWrap ? 'yes' : 'no',
    };
    
    if (giftMessage) {
      metadata.giftMessage = giftMessage.substring(0, 500);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://littlebits-hub.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://littlebits-hub.vercel.app'}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'IE', 'NZ', 'SE', 'NO', 'DK', 'FI', 'PT', 'PL', 'MX'],
      },
      metadata: metadata,
      custom_text: {
        shipping_address: {
          message: giftMessage 
            ? `🎁 Gift Message: "${giftMessage.substring(0, 100)}${giftMessage.length > 100 ? '...' : ''}"` 
            : undefined,
        },
      },
    });

    console.log('Session created:', session.id);
    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
