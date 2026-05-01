"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';

export default function Header() {
  const { cart = [], cartCount, cartTotal, removeFromCart, isLoaded } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const freeShippingThreshold = 50;
  const amountToFreeShipping = freeShippingThreshold - cartTotal;
  const qualifiesForFreeShipping = cartTotal >= freeShippingThreshold;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-white/16 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-5 md:gap-8 md:px-8">
        <a href="/" className="flex-shrink-0 text-brand-plum" aria-label="Boutique Little Bits home">
          <span className="brand-lockup">
            <span className="brand-lockup-script text-4xl sm:text-5xl md:text-6xl">Litt<span className="inline-block origin-bottom scale-y-[0.86]">l</span>e Bits</span>
            <span className="brand-lockup-label text-brand-plum/70">Boutique</span>
          </span>
        </a>

        <nav className="hidden md:flex flex-1 justify-center min-w-0">
          <div className="inline-flex items-center gap-8 whitespace-nowrap">
            {[
              ['/', 'Home'],
              ['/shop', 'Shop'],
              ['/shop', 'Gift Guide'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => {
              const active = href === '/' ? pathname === '/' : pathname === href && label !== 'Gift Guide';
              const giftActive = false;
              return (
                <a
                  key={label}
                  href={href}
                  className={`relative py-2 text-xs font-bold uppercase tracking-[0.16em] transition whitespace-nowrap ${
                    active || giftActive
                      ? 'text-brand-plum after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-brand-plum'
                      : 'text-brand-ink/55 hover:text-brand-plum'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="flex flex-shrink-0 items-center justify-end gap-2 md:gap-3">
          <a href="/shop" className="hidden lg:inline-flex h-10 items-center rounded-full border border-white/60 bg-white/55 px-4 text-sm font-semibold text-brand-taupe shadow-sm hover:text-brand-plum">
            Search gifts
          </a>
          <div className="relative group">
            <a href="/cart" className="inline-flex h-10 items-center rounded-full border border-brand-plum bg-white/65 px-5 text-sm font-bold text-brand-plum shadow-sm transition hover:bg-brand-plum hover:text-white whitespace-nowrap">
              Cart ({cartCount})
            </a>

            <div className="absolute right-0 top-full pt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="overflow-hidden rounded-[1.25rem] boutique-panel">
                {isLoaded && cartCount > 0 && (
                  <div className="border-b border-brand-lavender bg-brand-cream/80 p-4">
                    {qualifiesForFreeShipping ? (
                      <p className="text-green-700 font-semibold text-sm">You qualify for FREE shipping.</p>
                    ) : (
                      <>
                        <p className="text-sm text-brand-sage mb-2">Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more for free shipping.</p>
                        <div className="w-full bg-white rounded-full h-2">
                          <div className="bg-brand-coral rounded-full h-2 transition-all" style={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}></div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {!isLoaded ? (
                  <div className="p-6 text-center text-brand-taupe">Loading...</div>
                ) : cartCount === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-brand-taupe mb-4">Your cart is empty</p>
                    <a href="/shop" className="inline-block bg-brand-sage text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm">Start Shopping</a>
                  </div>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto">
                      {cart.slice(0, 3).map((item, index) => (
                        <div key={item.cartKey || item.slug || index} className="flex items-center gap-3 p-4 border-b border-brand-lavender last:border-b-0">
                          <div className="w-12 h-12 bg-brand-cream rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-sm font-medium text-brand-sage truncate">{item.name}</h4>
                            <p className="text-sm text-brand-coral font-bold">${item.price} x {item.quantity || 1}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(item.cartKey || item.slug);
                            }}
                            className="text-brand-taupe hover:text-brand-coral transition-colors flex-shrink-0 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {cart.length > 3 && (
                        <p className="text-center text-sm text-brand-taupe py-2">+{cart.length - 3} more item{cart.length - 3 > 1 ? 's' : ''}</p>
                      )}
                    </div>

                    <div className="p-4 bg-brand-cream/70 border-t border-brand-lavender">
                      <div className="flex justify-between mb-3">
                        <span className="font-semibold text-brand-sage">Subtotal:</span>
                        <span className="font-bold text-brand-coral">${cartTotal.toFixed(2)}</span>
                      </div>
                      <a href="/cart" className="block w-full bg-brand-coral text-white py-3 rounded-lg font-semibold text-center hover:bg-brand-sage transition-colors">View Cart & Checkout</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden rounded-full border border-brand-lavender px-3 py-2 text-brand-plum font-bold" aria-label="Toggle menu">
            {menuOpen ? 'x' : 'Menu'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-brand-lavender bg-white/88 px-6 py-4 backdrop-blur-md">
          <div className="flex flex-col gap-4 text-brand-ink font-medium">
            <a href="/" className="hover:text-brand-coral transition-colors py-2">Home</a>
            <a href="/shop" className="hover:text-brand-coral transition-colors py-2">Shop</a>
            <a href="/shop" className="hover:text-brand-coral transition-colors py-2">Gift Guide</a>
            <a href="/about" className="hover:text-brand-coral transition-colors py-2">About</a>
            <a href="/contact" className="hover:text-brand-coral transition-colors py-2">Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}
