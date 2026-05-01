export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-16 watercolor-soft">
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-white/30" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Curated with care</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-brand-plum sm:text-5xl md:text-6xl">Our Story</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-brand-taupe">
            Boutique Little Bits is built around small surprises with big meaning: playful kids' kits, self-care treats, personalized finds, and thoughtful gifts chosen to make everyday moments feel special.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 boutique-band sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] p-7 md:p-10 boutique-panel">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="rounded-[1.5rem] bg-brand-plum p-8 text-white">
                <div className="brand-lockup text-white">
                  <p className="brand-lockup-script text-6xl">Litt<span className="inline-block origin-bottom scale-y-[0.86]">l</span>e Bits</p>
                  <p className="brand-lockup-label text-white/70">Boutique</p>
                </div>
                <p className="mt-8 text-sm leading-7 text-white/80">
                  Thoughtful little gifts, curated to spark joy.
                </p>
              </div>

              <div className="space-y-5 text-brand-taupe">
                <p className="text-lg leading-8">
                  Little Bits started with a simple idea: the best gifts do not have to be oversized or overcomplicated. Sometimes the sweetest gift is the small thing that feels personal, nostalgic, useful, or just plain fun.
                </p>
                <p className="text-lg leading-8">
                  Every item in our collection is carefully chosen to bring back happy memories, celebrate everyday moments, and make gifting feel personal, because the best gifts come in little bits.
                </p>
                <p className="text-lg leading-8">
                  Whether you are shopping for a birthday, a care package, a party favor, or a just-because surprise, we want the experience to feel easy, warm, and ready to give.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Handpicked Little Finds", "Every product is chosen for charm, usefulness, and giftable joy."],
              ["Packed with Care", "Orders are prepared with attention so they feel sweet to open."],
              ["Boutique, Not Marketplace", "A smaller, warmer way to browse gifts without endless scrolling."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[1.5rem] p-6 boutique-card">
                <h2 className="font-display text-2xl text-brand-plum">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-brand-taupe">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
