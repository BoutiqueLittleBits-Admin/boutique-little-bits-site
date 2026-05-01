export async function POST(request) {
  try {
    const { zipCode, packageType } = await request.json();

    if (!zipCode || zipCode.length !== 5) {
      return Response.json({ error: 'Valid 5-digit zip code required' }, { status: 400 });
    }

    if (!process.env.SHIPPO_API_KEY) {
      return Response.json({ error: 'Shipping rates are not configured in this local environment.' }, { status: 400 });
    }

    const packages = {
      'small-envelope': { weight: 10, length: 7, width: 4, height: 1 },
      'jumbo-bracelet': { weight: 10, length: 18, width: 10, height: 6 },
    };

    const selectedPackage = packages[packageType] || packages['small-envelope'];

    const shippoResponse = await fetch('https://api.goshippo.com/shipments/', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${process.env.SHIPPO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address_from: { name: 'Boutique Little Bits', street1: '123 Main St', city: 'Bentonville', state: 'AR', zip: '72714', country: 'US' },
        address_to: { zip: zipCode, country: 'US' },
        parcels: [{ length: selectedPackage.length.toString(), width: selectedPackage.width.toString(), height: selectedPackage.height.toString(), distance_unit: 'in', weight: selectedPackage.weight.toString(), mass_unit: 'oz' }],
        async: false,
      }),
    });

    const shipment = await shippoResponse.json();

    if (!shipment.rates || shipment.rates.length === 0) {
      return Response.json({ error: 'No shipping rates available' }, { status: 400 });
    }

    const roundUpToHalf = (num) => Math.ceil(num * 2) / 2;

    const rates = shipment.rates
      .filter(rate => rate.provider === 'USPS')
      .map(rate => ({
        id: rate.object_id,
        carrier: rate.provider,
        service: rate.servicelevel.name,
        price: roundUpToHalf(parseFloat(rate.amount)),
        estimatedDays: rate.estimated_days || '3-5',
      }))
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);

    if (rates.length === 0) {
      return Response.json({ error: 'No USPS shipping rates available for this destination.' }, { status: 400 });
    }

    return Response.json({ rates });
  } catch (error) {
    console.error('Shipping error:', error);
    return Response.json({ error: 'Failed to calculate shipping' }, { status: 500 });
  }
}
