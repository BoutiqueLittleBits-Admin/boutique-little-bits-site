const sections = [
  {
    title: "Processing Time",
    body: [
      "Most ready-to-ship orders process within 1-3 business days.",
      "Personalized items may require up to 10 business days depending on the product and customization details.",
      "Holiday and seasonal items may include specific ship dates in the product listing.",
    ],
  },
  {
    title: "Shipping Methods & Rates",
    body: [
      "Shipping rates are calculated at checkout based on package size, destination, and available carrier options.",
      "Orders over $50 qualify for free standard shipping when eligible.",
      "Need something quickly? Contact us before ordering and we will let you know what options are realistic.",
    ],
  },
  {
    title: "Tracking",
    body: [
      "Once your order ships, tracking details will be sent to the email used at checkout.",
      "Carrier timelines are estimates and can be affected by weather, holidays, or local delivery delays.",
    ],
  },
  {
    title: "Address Accuracy",
    body: [
      "Please double-check your shipping address before checkout.",
      "If you notice an address mistake, contact us right away. Once a package has shipped, the destination may not be changeable.",
    ],
  },
];

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-16 watercolor-soft">
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Packed with care</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-brand-plum sm:text-5xl md:text-6xl">Shipping Policy</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-taupe">
            Clear shipping details for gift-ready finds, personalized pieces, and thoughtful little surprises.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 boutique-band sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] p-7 md:p-10 boutique-panel">
          <div className="grid gap-5">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[1.5rem] border border-brand-lavender bg-white/56 p-6 backdrop-blur-sm">
                <h2 className="font-display text-3xl text-brand-plum">{section.title}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((copy) => (
                    <p key={copy} className="leading-7 text-brand-taupe">{copy}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] p-6 text-center boutique-card">
            <h2 className="font-display text-3xl text-brand-plum">Questions about shipping?</h2>
            <p className="mt-3 text-brand-taupe">We are happy to help before you place an order.</p>
            <a href="/contact" className="mt-5 inline-flex rounded-full bg-brand-plum px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-coral">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
