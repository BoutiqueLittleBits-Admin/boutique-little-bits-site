export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-16 watercolor-soft">
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/72 to-white/35" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Helpful and clear</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-brand-plum">Returns & Refunds</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-taupe">
            Because many Little Bits items are curated, personalized, or prepared as gifts, our policy is simple and transparent.
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl space-y-5">
          <div className="rounded-[2rem] border border-brand-lavender bg-white p-7 shadow-soft md:p-10">
            <h2 className="font-display text-4xl text-brand-plum">Our Policy</h2>
            <p className="mt-4 text-lg leading-8 text-brand-taupe">
              Due to the nature of hand-curated gift bags, kits, and personalized items, all sales are final unless an item arrives damaged, incorrect, or there is a fulfillment issue we need to make right.
            </p>
          </div>

          {[
            ["Damaged Items", "If something arrives damaged, take photos of the item and packaging and contact us within 48 hours of delivery. We will review the photos and work with you on a resolution."],
            ["Wrong Item Received", "If we accidentally send the wrong item, contact us right away. We will help correct the issue at no additional cost."],
            ["Lost Packages", "If tracking shows delivered but the package is missing, check with neighbors and your local post office first. If it is still missing, contact us and we will help with next steps."],
            ["Order Cancellations", "Non-personalized orders may be cancelled before shipping. Personalized or custom orders cannot be cancelled once production has started."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[1.5rem] border border-brand-lavender bg-white p-6 shadow-soft">
              <h2 className="font-display text-3xl text-brand-plum">{title}</h2>
              <p className="mt-3 leading-7 text-brand-taupe">{copy}</p>
            </div>
          ))}

          <div className="rounded-[1.5rem] bg-brand-plum p-6 text-center text-white">
            <h2 className="font-display text-3xl">Need help with an order?</h2>
            <p className="mt-3 text-white/75">Send us the order details and photos if needed. We will help as quickly as we can.</p>
            <a href="/contact" className="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-plum transition hover:bg-brand-blush">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
