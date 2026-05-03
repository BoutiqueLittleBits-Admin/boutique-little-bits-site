const giftPaths = [
  {
    title: "Gifts for Kids",
    text: "Creative kits, playful picks, and little surprises that feel fun from the first look.",
    cta: "Shop playful finds",
  },
  {
    title: "Self-Care Surprises",
    text: "Spa-inspired sets, gentle resets, and sweet reminders to slow down for a minute.",
    cta: "Shop self-care gifts",
  },
  {
    title: "Personalized Picks",
    text: "Custom touches and made-for-them details for gifts that feel extra thoughtful.",
    cta: "Shop personalized finds",
  },
  {
    title: "Under $25",
    text: "Easy little gifts that still feel intentional, polished, and ready to give.",
    cta: "Shop small surprises",
  },
  {
    title: "Birthday-Ready",
    text: "Cheerful picks for party tables, care packages, and birthday-week smiles.",
    cta: "Shop birthday gifts",
  },
  {
    title: "Just Because",
    text: "Little joys for no reason at all, because a tiny surprise can change the day.",
    cta: "Shop just-because gifts",
  },
];

export const metadata = {
  title: "Gift Guide | Boutique Little Bits",
  description: "Browse thoughtful gift ideas for kids, self-care, personalized surprises, birthdays, and sweet little finds under $25.",
};

export default function GiftGuidePage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 pt-28 pb-12 watercolor-soft sm:px-6 md:pt-32 md:pb-16">
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl rounded-[2.5rem] px-6 py-12 text-center boutique-surface md:px-12 md:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Gift Guide</p>
            <h1 className="mt-5 font-display text-5xl leading-tight text-brand-plum md:text-7xl">Find the perfect little something.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-taupe">
              Start with the moment, the person, or the budget. Each path points you toward thoughtful finds that feel personal, polished, and easy to give.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 boutique-band sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {giftPaths.map((path) => (
            <a key={path.title} href="/shop" className="group flex min-h-64 flex-col justify-between rounded-[1.5rem] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-boutique boutique-card">
              <span>
                <h2 className="font-display text-3xl leading-tight text-brand-plum transition-colors group-hover:text-brand-coral">{path.title}</h2>
                <p className="mt-4 text-sm leading-7 text-brand-taupe">{path.text}</p>
              </span>
              <span className="mt-8 inline-flex text-sm font-bold uppercase tracking-[0.14em] text-brand-coral">{path.cta}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 boutique-band sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] p-6 text-center watercolor-soft">
          <div className="rounded-[1.5rem] p-8 boutique-surface">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-coral">Still choosing?</p>
            <h2 className="mt-3 font-display text-4xl text-brand-plum">Browse every gift-ready find.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-taupe">
              The full shop has filters for best sellers, new arrivals, personalized picks, gift-ready items, and finds under $25.
            </p>
            <a href="/shop" className="mt-7 inline-flex rounded-full bg-brand-plum px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-coral">
              Shop all gifts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
