"use client";
import { useEffect } from 'react';
import { useCart } from '../components/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28 watercolor-soft">
        <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-white bg-white/78 p-8 text-center shadow-boutique backdrop-blur-md md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Order received</p>
          <h1 className="mt-4 font-display text-5xl text-brand-plum md:text-6xl">Thank you</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-brand-taupe">
            Your order has been placed successfully. We are preparing your Little Bits finds with care.
          </p>
          <p className="mt-4 text-sm text-brand-taupe">
            A confirmation email will be sent shortly.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/shop" className="rounded-full bg-brand-plum px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-coral">
              Continue Shopping
            </a>
            <a href="/contact" className="rounded-full border border-brand-plum bg-white/70 px-6 py-3 text-sm font-bold text-brand-plum transition hover:bg-brand-plum hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
