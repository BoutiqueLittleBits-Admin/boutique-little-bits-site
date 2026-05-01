"use client";
import { useState } from 'react';
import { useCart } from '../components/CartContext';
import TrustStrip from '../components/TrustStrip';

export default function CartPage() {
  const { cart = [], removeFromCart, updateQuantity, isLoaded } = useCart();
  const [zipCode, setZipCode] = useState('');
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [error, setError] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [showGiftMessage, setShowGiftMessage] = useState(false);

  const GIFT_WRAP_PRICE = 3.50;

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-lavender border-t-brand-plum" />
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
  const giftWrapTotal = giftWrap ? GIFT_WRAP_PRICE : 0;
  const cartSubtotal = subtotal + giftWrapTotal;
  const freeShippingThreshold = 50;
  const qualifiesForFreeShipping = cartSubtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(freeShippingThreshold - cartSubtotal, 0);

  const getShippingProfile = () => {
    const hasLargeItem = cart.some(item => item.shippingProfile === 'large-box');
    return hasLargeItem ? 'large-box' : 'small-envelope';
  };

  const calculateShipping = async () => {
    if (zipCode.length !== 5) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }

    setLoadingRates(true);
    setError('');
    setShippingRates([]);
    setSelectedRate(null);

    try {
      const response = await fetch('/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode, packageType: getShippingProfile() }),
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShippingRates(data.rates);
        if (data.rates.length > 0) setSelectedRate(data.rates[0]);
      }
    } catch (err) {
      setError('Failed to calculate shipping. Please try again.');
    }

    setLoadingRates(false);
  };

  const handleCheckout = async () => {
    if (!qualifiesForFreeShipping && !selectedRate) {
      setError('Please calculate shipping first');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingRate: qualifiesForFreeShipping ? null : selectedRate,
          giftWrap,
          giftMessage: giftMessage.trim() || null,
        }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Checkout failed. Please try again.');
      }
    } catch (err) {
      setError('Checkout failed. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <section className="relative overflow-hidden px-6 pt-28 pb-14 md:pt-32 md:pb-18 watercolor-soft">
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/72 to-white/35" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-white bg-white/78 p-8 text-center shadow-boutique backdrop-blur-md md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Your cart</p>
            <h1 className="mt-4 font-display text-5xl text-brand-plum md:text-6xl">Waiting for a little joy.</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-brand-taupe">
              Looks like you have not added anything yet. Start with gift-ready finds, kids' gifts, self-care surprises, or personalized picks.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/shop" className="rounded-full bg-brand-plum px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-coral">
                Find a Gift
              </a>
              <a href="/shop" className="rounded-full border border-brand-plum bg-white/70 px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-plum transition hover:bg-brand-plum hover:text-white">
                Browse Under $25
              </a>
            </div>
            <div className="mx-auto mt-8 max-w-2xl border-t border-brand-lavender pt-5">
              <TrustStrip />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-14 watercolor-soft">
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/72 to-white/35" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Packed with care</p>
          <h1 className="mt-4 font-display text-5xl text-brand-plum md:text-6xl">Your Cart</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-brand-taupe">
            Review your little finds, add gift details, and choose shipping before secure checkout.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-brand-lavender bg-white shadow-soft">
              {cart.map((item, index) => (
                <div key={item.cartKey || item.slug || index} className="grid gap-4 border-b border-brand-lavender p-5 last:border-b-0 md:grid-cols-[96px_1fr_auto] md:items-center md:p-6">
                  <div className="h-24 w-24 overflow-hidden rounded-[1.25rem] bg-brand-cream">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                  </div>

                  <div>
                    <h2 className="font-display text-2xl leading-tight text-brand-plum">{item.name}</h2>
                    {item.personalization && (
                      <p className="mt-2 rounded-xl bg-brand-cream px-3 py-2 text-sm text-brand-taupe">
                        Personalization: {item.personalization}
                      </p>
                    )}
                    <p className="mt-3 text-sm font-bold text-brand-plum">${item.price}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                    <div className="inline-flex items-center rounded-full border border-brand-lavender bg-brand-cream p-1">
                      <button onClick={() => updateQuantity(item.cartKey || item.slug, Math.max(1, (item.quantity || 1) - 1))} className="h-8 w-8 rounded-full text-brand-plum transition hover:bg-white">-</button>
                      <span className="w-9 text-center text-sm font-bold text-brand-ink">{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item.cartKey || item.slug, (item.quantity || 1) + 1)} className="h-8 w-8 rounded-full text-brand-plum transition hover:bg-white">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.cartKey || item.slug)} className="text-sm font-semibold text-brand-taupe transition hover:text-brand-coral">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-brand-lavender bg-white p-6 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">Gift options</p>
              <h2 className="mt-2 font-display text-3xl text-brand-plum">Make it ready to give.</h2>

              <div className="mt-6 space-y-5">
                <label className="flex cursor-pointer items-start gap-4 rounded-[1.5rem] bg-brand-cream p-4">
                  <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="mt-1 h-5 w-5 rounded border-brand-lavender text-brand-plum focus:ring-brand-plum" />
                  <span className="flex-1">
                    <span className="block font-bold text-brand-plum">Add gift wrapping</span>
                    <span className="mt-1 block text-sm leading-6 text-brand-taupe">Beautifully wrapped and ready to give.</span>
                  </span>
                  <span className="font-bold text-brand-coral">+${GIFT_WRAP_PRICE.toFixed(2)}</span>
                </label>

                <label className="flex cursor-pointer items-start gap-4 rounded-[1.5rem] bg-brand-cream p-4">
                  <input type="checkbox" checked={showGiftMessage} onChange={(e) => { setShowGiftMessage(e.target.checked); if (!e.target.checked) setGiftMessage(''); }} className="mt-1 h-5 w-5 rounded border-brand-lavender text-brand-plum focus:ring-brand-plum" />
                  <span>
                    <span className="block font-bold text-brand-plum">Add a gift message</span>
                    <span className="mt-1 block text-sm leading-6 text-brand-taupe">Include a personalized note for free.</span>
                  </span>
                </label>

                {showGiftMessage && (
                  <div>
                    <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value.slice(0, 200))} placeholder="Write your message here..." rows={3} maxLength={200} className="w-full rounded-[1.5rem] border border-brand-lavender bg-brand-cream px-5 py-4 text-brand-ink outline-none focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender" />
                    <p className="mt-1 text-right text-xs text-brand-taupe">{giftMessage.length}/200 characters</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-[2rem] border border-brand-lavender bg-white p-6 shadow-boutique">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-coral">Order summary</p>
              <h2 className="mt-2 font-display text-3xl text-brand-plum">Ready for checkout</h2>

              <div className="mt-6 space-y-3 border-b border-brand-lavender pb-5">
                <div className="flex justify-between text-brand-taupe">
                  <span>Subtotal</span>
                  <span className="font-bold text-brand-ink">${subtotal.toFixed(2)}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between text-brand-taupe">
                    <span>Gift Wrap</span>
                    <span className="font-bold text-brand-ink">${GIFT_WRAP_PRICE.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {qualifiesForFreeShipping ? (
                <div className="my-6 rounded-[1.25rem] border border-brand-mint bg-brand-mint/30 p-4">
                  <p className="font-bold text-brand-sage">You qualify for free shipping.</p>
                </div>
              ) : (
                <>
                  <div className="my-6 rounded-[1.25rem] bg-brand-cream p-4">
                    <p className="text-sm text-brand-taupe">Add <strong className="text-brand-plum">${amountToFreeShipping.toFixed(2)}</strong> more for free shipping.</p>
                    <div className="mt-3 h-2 w-full rounded-full bg-white">
                      <div className="h-2 rounded-full bg-brand-coral transition-all" style={{ width: `${Math.min((cartSubtotal / freeShippingThreshold) * 100, 100)}%` }} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold text-brand-plum">Shipping Zip Code</label>
                    <div className="mt-2 flex gap-2">
                      <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="Zip code" className="min-w-0 flex-1 rounded-full border border-brand-lavender bg-brand-cream px-4 py-3 text-brand-ink outline-none focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender" />
                      <button onClick={calculateShipping} disabled={loadingRates || zipCode.length !== 5} className="rounded-full bg-brand-sage px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-plum disabled:cursor-not-allowed disabled:opacity-50">{loadingRates ? '...' : 'Calculate'}</button>
                    </div>
                  </div>

                  {shippingRates.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <p className="text-sm font-bold text-brand-plum">Shipping Method</p>
                      {shippingRates.map((rate) => (
                        <label key={rate.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-[1.25rem] border p-3 transition ${selectedRate?.id === rate.id ? 'border-brand-plum bg-brand-cream' : 'border-brand-lavender hover:bg-brand-cream'}`}>
                          <span className="flex items-center gap-3">
                            <input type="radio" name="shipping" checked={selectedRate?.id === rate.id} onChange={() => setSelectedRate(rate)} className="text-brand-plum" />
                            <span>
                              <span className="block text-sm font-bold text-brand-plum">{rate.service}</span>
                              <span className="block text-xs text-brand-taupe">{rate.estimatedDays} business days</span>
                            </span>
                          </span>
                          <span className="font-bold text-brand-coral">${rate.price.toFixed(2)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </>
              )}

              {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

              <div className="space-y-3 border-t border-brand-lavender pt-5">
                <div className="flex justify-between text-brand-taupe">
                  <span>Shipping</span>
                  <span className="font-bold text-brand-ink">{qualifiesForFreeShipping ? <span className="text-brand-sage">Free</span> : selectedRate ? `$${selectedRate.price.toFixed(2)}` : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-brand-plum">Total</span>
                  <span className="text-lg font-bold text-brand-plum">${(cartSubtotal + (qualifiesForFreeShipping ? 0 : (selectedRate?.price || 0))).toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleCheckout} disabled={!qualifiesForFreeShipping && !selectedRate} className="mt-6 w-full rounded-full bg-brand-plum px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-coral disabled:cursor-not-allowed disabled:opacity-50">
                Proceed to Checkout
              </button>
              <p className="mt-4 text-center text-xs leading-5 text-brand-taupe">Secure checkout powered by Stripe. Ships from Boutique Little Bits.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
