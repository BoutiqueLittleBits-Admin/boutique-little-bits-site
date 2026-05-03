"use client";
import { useState } from 'react';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      ["How long until my order ships?", "Most ready-to-ship orders process within 1-3 business days. Personalized items may take up to 10 business days depending on the product."],
      ["Do you offer free shipping?", "Orders over $50 qualify for free standard shipping when eligible."],
      ["How do I track my order?", "When your order ships, tracking details will be sent to the email used at checkout."],
      ["Can I request expedited shipping?", "Contact us before ordering if you need rush delivery. We will let you know what options are realistic."],
    ],
  },
  {
    category: "Products & Personalization",
    questions: [
      ["Are your products handmade?", "Some personalized items are handmade or customized. Gift sets, kits, and collections are hand-curated and packed with care."],
      ["Do you offer personalized items?", "Yes. Products with personalization options will show those fields on the product page before adding to cart."],
      ["Can I add a gift message?", "Yes. Gift messages can be added in the cart when available."],
      ["Do you offer gift wrapping?", "Gift wrap can be added in the cart when available for the selected items."],
    ],
  },
  {
    category: "Returns & Issues",
    questions: [
      ["What is your return policy?", "Because many items are curated, personalized, or prepared as gifts, all sales are final unless an item arrives damaged, incorrect, or there is a fulfillment issue."],
      ["What if my item arrives damaged?", "Please photograph the item and packaging and contact us within 48 hours of delivery. We will review and help with next steps."],
      ["What if I received the wrong item?", "Contact us right away and we will help correct the issue."],
      ["What if tracking says delivered but I do not have it?", "Please check with neighbors and your local post office first. If it is still missing, contact us and we will help with next steps."],
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      ["What payment methods do you accept?", "We accept major credit cards through Stripe checkout. Apple Pay may also be available through Stripe on supported devices."],
      ["Is my payment information secure?", "Yes. Payments are processed through Stripe. Boutique Little Bits does not store full credit card information."],
    ],
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-lavender last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-brand-ink">{question}</span>
        <span className="text-2xl leading-none text-brand-plum">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pb-5 pr-8">
          <p className="leading-7 text-brand-taupe">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-16 watercolor-soft">
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Helpful answers</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-brand-plum sm:text-5xl md:text-6xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-taupe">
            Quick answers about orders, shipping, personalization, returns, and checkout.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 boutique-band sm:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {faqs.map((section) => (
            <div key={section.category} className="overflow-hidden rounded-[2rem] boutique-panel">
              <div className="bg-brand-plum px-7 py-5 text-white">
                <h2 className="font-display text-3xl">{section.category}</h2>
              </div>
              <div className="px-7">
                {section.questions.map(([question, answer]) => (
                  <FAQItem key={question} question={question} answer={answer} />
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-[2rem] p-8 text-center boutique-panel">
            <h2 className="font-display text-4xl text-brand-plum">Still have questions?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-taupe">Send us a message and we will help with order questions, custom requests, and gift details.</p>
            <a href="/contact" className="mt-6 inline-flex rounded-full bg-brand-plum px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-coral">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
