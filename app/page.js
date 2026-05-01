"use client";
import { useState, useEffect } from 'react';
import { useCart } from './components/CartContext';
import Toast from './components/Toast';
import TrustStrip from './components/TrustStrip';
import ProductBadges from './components/ProductBadges';

export default function Home() {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await Promise.race([
          fetch('/api/products?featured=true'),
          new Promise((resolve) => setTimeout(() => resolve([]), 8000)),
        ]);
        const data = response?.json ? await response.json() : { products: [] };
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const handleAddToCart = (item) => {
    if (item.hasVariations || item.hasPersonalization) {
      window.location.href = `/shop/${item.slug?.current}`;
      return;
    }
    addToCart({
      slug: item.slug?.current,
      cartKey: item.slug?.current,
      name: item.title,
      price: item.basePrice?.toFixed(2),
      image: item.image,
      shippingProfile: item.shippingProfile,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart. View it anytime from the cart." isVisible={showToast} />

      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-16 watercolor-soft">
        <div className="absolute inset-0 bg-gradient-to-r from-white/94 via-white/70 to-white/24" aria-hidden="true"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white bg-white/42 px-6 py-12 text-center shadow-boutique backdrop-blur-sm md:px-12 md:py-16">
            <div className="inline-flex flex-col items-center text-brand-plum">
              <p className="font-logo text-8xl md:text-9xl leading-[0.72]">Litt<span className="inline-block origin-bottom scale-y-[0.86]">l</span>e Bits</p>
              <p className="mt-1 pl-[0.82em] text-sm font-bold uppercase tracking-[0.82em] text-brand-plum/70">Boutique</p>
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Thoughtful little gifts, curated to spark joy.</p>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-brand-taupe leading-relaxed">Kids' kits, self-care gifts, personalized finds, and thoughtful little surprises, handpicked to make gifting easy.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/shop" className="inline-block bg-brand-plum text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-brand-coral transition-colors text-center shadow-sm">Shop Gift-Ready Finds</a>
              <a href="/shop" className="inline-block text-brand-plum px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide hover:text-brand-coral transition-colors border border-brand-lavender bg-white/70 text-center">Explore the Gift Guide</a>
            </div>
            <div className="mx-auto mt-9 max-w-3xl border-t border-brand-lavender pt-5">
              <TrustStrip />
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
      <section className="relative overflow-hidden px-6 py-16 watercolor-soft">
        <div className="absolute inset-0 bg-gradient-to-b from-white/72 via-brand-cream/78 to-white/86" aria-hidden="true"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl text-brand-plum mb-4">Best Little Finds</h2>
            <p className="text-lg text-brand-taupe">Gift-ready favorites for kids, self-care, and everyday surprises</p>
          </div>

          {loading ? (
            <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-sage border-t-transparent"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((item, i) => (
                <div key={item._id || i} className="group overflow-hidden rounded-[1.5rem] border border-brand-lavender bg-white/95 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-boutique">
                  <a href={`/shop/${item.slug?.current}`}>
                    <div className="h-52 overflow-hidden bg-brand-cream">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2" />
                    </div>
                  </a>
                  <div className="p-4">
                    <span className="text-xs font-medium text-brand-sage bg-brand-mint/20 px-2 py-1 rounded-full">{item.category?.title || 'Uncategorized'}</span>
                    <div className="mt-2"><ProductBadges product={item} /></div>
                    <a href={`/shop/${item.slug?.current}`}><h3 className="text-md font-semibold text-brand-sage mt-2 mb-1 hover:text-brand-coral transition-colors line-clamp-2">{item.title}</h3></a>
                    <p className="text-lg font-bold text-brand-coral mb-3">${item.basePrice?.toFixed(2)}</p>
                    {item.hasVariations || item.hasPersonalization ? (
                      <a href={`/shop/${item.slug?.current}`} className="block w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm text-center">Select Options</a>
                    ) : (
                      <button onClick={() => handleAddToCart(item)} className="w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm">Add to Cart</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <a href="/shop" className="inline-block border-2 border-brand-sage text-brand-sage px-8 py-3 rounded-full font-bold hover:bg-brand-sage hover:text-white transition-colors">View All Products</a>
          </div>
        </div>
      </section>
      )}

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-brand-plum mb-4 text-center">Find the perfect little something</h2>
          <p className="text-center text-brand-taupe mb-10">Start with the reason you are shopping, then find the right little surprise.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Kids Gifts", note: "Playful kits and creative little surprises" },
              { name: "Self-Care Gifts", note: "Spa sets and pampering picks" },
              { name: "Personalized Finds", note: "Custom pieces made just for them" },
              { name: "Gifts Under $25", note: "Thoughtful finds under $25" },
              { name: "Gift Sets", note: "Ready-to-give bundles" },
              { name: "Party Favors", note: "Small surprises for big moments" },
            ].map((cat, i) => (
              <a key={i} href="/shop" className="group flex min-h-36 flex-col items-start justify-center rounded-2xl border border-brand-lavender bg-brand-cream p-5 transition-all hover:bg-white hover:shadow-md">
                <h3 className="font-display text-2xl leading-tight text-brand-plum transition-colors group-hover:text-brand-coral">{cat.name}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-taupe">{cat.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-brand-cream">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-coral mb-3">Why Little Bits</p>
            <h2 className="font-display text-4xl md:text-5xl text-brand-plum">Curated with heart</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-2xl p-6 border border-brand-lavender">
              <h3 className="font-bold text-brand-plum mb-2">Handpicked Little Finds</h3>
              <p className="text-gray-600 text-sm">Every item is chosen to feel thoughtful, playful, and easy to gift.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-brand-lavender">
              <h3 className="font-bold text-brand-plum mb-2">Packed with Care</h3>
              <p className="text-gray-600 text-sm">Sweet for birthdays, holidays, care packages, and just-because smiles.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-brand-lavender">
              <h3 className="font-bold text-brand-plum mb-2">A Boutique, Not a Marketplace</h3>
              <p className="text-gray-600 text-sm">A warmer way to browse gifts without endless scrolling.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-coral mb-3">Sweet gifting, made simple</p>
              <h2 className="font-display text-4xl md:text-5xl text-brand-plum leading-tight">Ready-to-gift paths for every little moment.</h2>
              <p className="mt-4 text-brand-taupe leading-7">Browse with a little more intention: choose something ready to ship, add a personal touch, or keep it sweet and simple under $25.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ["Ready-to-Gift Finds", "Easy picks packed with care and ready to make their day."],
                ["Personalized Surprises", "Custom touches that make a little gift feel made for them."],
                ["Thoughtful Under $25", "Sweet, simple finds that still feel personal."],
              ].map(([title, copy]) => (
                <a key={title} href="/shop" className="rounded-[1.5rem] border border-brand-lavender bg-brand-cream p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft">
                  <h3 className="font-display text-2xl text-brand-plum">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-taupe">{copy}</p>
                  <span className="mt-5 inline-block text-sm font-bold text-brand-coral">Shop now</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-brand-mint/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-coral mb-3">Customer trust</p>
            <h2 className="font-display text-4xl text-brand-plum mb-3">Also loved across our online shops.</h2>
            <p className="text-brand-taupe leading-7">Prefer shopping on Etsy or eBay? You can find us there too. Shopping here gives you the full Boutique Little Bits collection and supports the boutique directly.</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <a href="https://www.etsy.com/shop/BoutiqueLittleBits" target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-plum bg-white px-6 py-3 text-center font-bold text-brand-plum hover:bg-brand-plum hover:text-white transition-all">Visit Etsy Shop</a>
            <a href="https://www.ebay.com/usr/littlebitsboutique" target="_blank" rel="noopener noreferrer" className="rounded-full border border-brand-sage bg-white px-6 py-3 text-center font-bold text-brand-sage hover:bg-brand-sage hover:text-white transition-all">Visit eBay Store</a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-brand-cream">
        <div className="watercolor-soft max-w-4xl mx-auto rounded-[2rem] p-6">
          <div className="rounded-[1.5rem] bg-white/88 p-8 text-center backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-coral mb-3">Little surprises in your inbox</p>
            <h2 className="font-display text-4xl text-brand-plum">Gift ideas, new arrivals, and sweet finds.</h2>
            <p className="mt-3 text-brand-taupe">Newsletter signup is coming soon. For now, check back often for new little finds.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
