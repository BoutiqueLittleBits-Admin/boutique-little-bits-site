// app/api/shipping/route.js
// Calculates shipping rates using Shippo API

export async function POST(request) {
  try {
    const { zipCode, packageType } = await request.json();

    // Validate zip code
    if (!zipCode || zipCode.length !== 5) {
      return Response.json({ error: 'Valid 5-digit zip code required' }, { status: 400 });
    }

    // Package presets (matching Etsy profiles)
    const packages = {
      'small-envelope': {
        name: 'Small Envelope',
        weight: 10, // oz
        length: 7,
        width: 4,
        height: 1,
      },
      'jumbo-bracelet': {
        name: 'Jumbo Bracelet',
        weight: 10, // oz
        length: 18,
        width: 10,
        height: 6,
      },
    };

    const selectedPackage = packages[packageType] || packages['small-envelope'];

    // Ship from address (your location)
    const fromAddress = {
      name: 'Boutique Little Bits',
      street1: '123 Main St', // Update with your actual address
      city: 'Bentonville',
      state: 'AR',
      zip: '72714',
      country: 'US',
    };

    // Ship to address (customer)
    const toAddress = {
      zip: zipCode,
      country: 'US',
    };

    // Create shipment and get rates from Shippo
    const shippoResponse = await fetch('https://api.goshippo.com/shipments/', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${process.env.SHIPPO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address_from: fromAddress,
        address_to: toAddress,
        parcels: [{
          length: selectedPackage.length.toString(),
          width: selectedPackage.width.toString(),
          height: selectedPackage.height.toString(),
          distance_unit: 'in',
          weight: selectedPackage.weight.toString(),
          mass_unit: 'oz',
        }],
        async: false,
      }),
    });

    const shipment = await shippoResponse.json();

    if (!shipment.rates || shipment.rates.length === 0) {
      return Response.json({ error: 'No shipping rates available' }, { status: 400 });
    }

    // Filter and format rates (USPS only, round up to nearest $0.50)
    const roundUpToHalf = (num) => Math.ceil(num * 2) / 2;

    const rates = shipment.rates
      .filter(rate => rate.provider === 'USPS')
      .map(rate => ({
        id: rate.object_id,
        carrier: rate.provider,
        service: rate.servicelevel.name,
        price: roundUpToHalf(parseFloat(rate.amount)),
        originalPrice: parseFloat(rate.amount),
        estimatedDays: rate.estimated_days || '3-5',
        token: rate.servicelevel.token,
      }))
      .sort((a, b) => a.price - b.price)
      .slice(0, 3); // Top 3 cheapest options

    return Response.json({ 
      rates,
      packageType: selectedPackage.name,
    });

  } catch (error) {
    console.error('Shipping calculation error:', error);
    return Response.json({ error: 'Failed to calculate shipping' }, { status: 500 });
  }
}
