"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Message failed');
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError('Message could not be sent. Please email us directly at holleeann@boutiquelittlebits.com.');
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-16 watercolor-soft">
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/72 to-white/35" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Questions, orders, custom gifts</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-brand-plum sm:text-5xl md:text-6xl">Get in Touch</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-taupe">
            Need help choosing a gift, checking an order, or asking about a custom request? Send us a note.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 boutique-band sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-5">
            <div className="rounded-[2rem] p-7 boutique-card">
              <h2 className="font-display text-3xl text-brand-plum">Contact Info</h2>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-coral">Email</p>
                  <a href="mailto:holleeann@boutiquelittlebits.com" className="mt-2 block font-semibold text-brand-plum hover:text-brand-coral">
                    holleeann@boutiquelittlebits.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-coral">Response Time</p>
                  <p className="mt-2 leading-7 text-brand-taupe">We typically respond within 24-48 hours. For order questions, include your order number if you have one.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] p-7 boutique-card">
              <h2 className="font-display text-3xl text-brand-plum">Find Us Online</h2>
              <p className="mt-3 leading-7 text-brand-taupe">You can also find Boutique Little Bits on Etsy and eBay.</p>
              <div className="mt-5 flex flex-col gap-3">
                <a href="https://www.etsy.com/shop/BoutiqueLittleBits" target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-plum px-5 py-3 text-center text-sm font-bold text-brand-plum transition hover:bg-brand-plum hover:text-white">
                  Visit Etsy Shop
                </a>
                <a href="https://www.ebay.com/usr/littlebitsboutique" target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-sage px-5 py-3 text-center text-sm font-bold text-brand-sage transition hover:bg-brand-sage hover:text-white">
                  Visit eBay Store
                </a>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] p-7 md:p-10 boutique-panel">
            <h2 className="font-display text-4xl text-brand-plum">Send a Message</h2>
            {submitted ? (
              <div className="mt-8 rounded-[1.5rem] bg-brand-cream p-8 text-center">
                <h3 className="font-display text-3xl text-brand-plum">Message sent</h3>
                <p className="mt-3 text-brand-taupe">Thank you for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-brand-plum">Your Name</label>
                  <input type="text" name="name" required className="mt-2 w-full rounded-full border border-brand-lavender bg-brand-cream px-5 py-3 text-brand-ink outline-none focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-plum">Your Email</label>
                  <input type="email" name="email" required className="mt-2 w-full rounded-full border border-brand-lavender bg-brand-cream px-5 py-3 text-brand-ink outline-none focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-plum">Subject</label>
                  <select name="subject" className="mt-2 w-full rounded-full border border-brand-lavender bg-brand-cream px-5 py-3 text-brand-ink outline-none focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender">
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="custom">Custom Order Request</option>
                    <option value="shipping">Shipping Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-plum">Message</label>
                  <textarea name="message" rows="6" required className="mt-2 w-full rounded-[1.5rem] border border-brand-lavender bg-brand-cream px-5 py-4 text-brand-ink outline-none focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender" />
                </div>
                {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <button type="submit" className="w-full rounded-full bg-brand-plum px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-coral">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
