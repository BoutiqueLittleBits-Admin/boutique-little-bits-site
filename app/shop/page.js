"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import Toast from '../components/Toast';
import TrustStrip from '../components/TrustStrip';
import ProductBadges from '../components/ProductBadges';
import BrandLogo from '../components/BrandLogo';

const shopperFilters = [
  { label: "Best Sellers", test: (p) => p.featured },
  { label: "New", test: () => true },
  { label: "Gift Ready", test: (p) => !p.hasPersonalization },
  { label: "Personalized", test: (p) => p.hasPersonalization || p.title?.toLowerCase().includes("custom") || p.title?.toLowerCase().includes("personalized") },
  { label: "Under $25", test: (p) => Number(p.basePrice || 0) < 25 },
];

const giftPaths = [
  { title: "Gifts for Kids", text: "Creative kits, playful picks, and tiny treasures." },
  { title: "Self-Care Surprises", text: "Spa finds and gentle little resets." },
  { title: "Personalized Picks", text: "Custom touches made just for them." },
  { title: "Under $25", text: "Thoughtful finds that stay easy." },
  { title: "Birthday-Ready", text: "Sweet surprises for their day." },
  { title: "Just Because", text: "Little joys for no reason at all." },
];

function getDescriptor(item) {
  const title = item.title?.toLowerCase() || "";
  const category = item.category?.title?.toLowerCase() || "";

  if (item.hasPersonalization || title.includes("custom") || title.includes("personalized")) {
    return "Personalized just for them";
  }
  if (category.includes("kids") || title.includes("kid")) {
    return "Playful gifting for little moments";
  }
  if (category.includes("spa") || title.includes("spa")) {
    return "A self-care pick ready to gift";
  }
  if (Number(item.basePrice || 0) < 25) {
    return "A thoughtful little find under $25";
  }
  return "Curated with heart and ready to give";
}

function ProductCard({ item, onAdd }) {
  return (
    <div className="group rounded-[1.5rem] p-3 transition duration-300 hover:-translate-y-1 hover:shadow-boutique boutique-card">
      <a href={`/shop/${item.slug?.current}`} className="block aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-brand-cream">
        <img src={item.image} alt={item.title} className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.03]" />
      </a>
      <div className="p-2 pt-4">
        <ProductBadges product={item} />
        <a href={`/shop/${item.slug?.current}`}>
          <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-brand-ink hover:text-brand-plum transition-colors">{item.title}</h3>
        </a>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-brand-taupe">{getDescriptor(item)}</p>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-sm font-bold text-brand-plum">${item.basePrice?.toFixed(2)}</p>
          {item.compareAtPrice && <p className="text-xs text-brand-taupe line-through">${item.compareAtPrice?.toFixed(2)}</p>}
        </div>
        {item.hasVariations || item.hasPersonalization ? (
          <a href={`/shop/${item.slug?.current}`} className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-brand-sage text-sm font-bold text-white transition hover:bg-brand-plum">Choose Options</a>
        ) : (
          <button onClick={() => onAdd(item)} className="mt-4 h-10 w-full rounded-full bg-brand-sage text-sm font-bold text-white transition hover:bg-brand-plum">Add to Cart</button>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeShopperFilter, setActiveShopperFilter] = useState('All Gifts');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await Promise.race([
          fetch('/api/products'),
          new Promise((resolve) => setTimeout(() => resolve([]), 8000)),
        ]);
        const data = response?.json ? await response.json() : { products: [] };
        setProducts(data.products || []);
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
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

  const categories = ['All', ...new Set(products.map(p => p.category?.title).filter(Boolean))];
  const activeFilter = shopperFilters.find((filter) => filter.label === activeShopperFilter);

  let filteredProducts = products
    .filter(p => activeCategory === 'All' || p.category?.title === activeCategory)
    .filter(p => !activeFilter || activeShopperFilter === 'All Gifts' || activeFilter.test(p))
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-lavender border-t-brand-plum mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <Toast message="Added to cart. View it anytime from the cart." isVisible={showToast} />

      <section className="relative overflow-hidden px-4 pt-28 pb-10 sm:px-6 md:pt-32 md:pb-14 watercolor-soft">
        <div className="absolute inset-0 bg-brand-plum/10" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/68 to-white/28" aria-hidden="true"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] bg-white/72 backdrop-blur-md border border-white shadow-boutique px-6 py-10 md:px-12 md:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <BrandLogo className="mx-auto w-full max-w-[620px]" />
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.24em] text-brand-coral">Thoughtful little gifts, curated to spark joy.</p>
              <p className="mt-5 text-lg leading-8 text-brand-taupe">Every item in our collection is carefully chosen to bring back happy memories, celebrate everyday moments, and make gifting feel personal, because the best gifts come in little bits.</p>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {giftPaths.map((path) => (
                <a key={path.title} href="/shop" className="group rounded-2xl bg-white/78 p-4 border border-white/90 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft">
                  <h2 className="font-display text-xl leading-tight text-brand-plum group-hover:text-brand-coral transition-colors">{path.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-brand-taupe">{path.text}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-5xl rounded-full border border-white/80 bg-white/78 px-5 py-3 shadow-soft backdrop-blur-sm">
            <TrustStrip />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 boutique-band sm:px-6">
        <div className="mx-auto max-w-6xl rounded-[2rem] p-5 md:p-7 boutique-panel">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center mb-6">
            <input
              type="text"
              placeholder="Search gifts, kits, spa sets, purses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-brand-lavender bg-brand-cream px-5 py-3 text-brand-ink placeholder:text-brand-taupe/70 focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender outline-none"
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-full border border-brand-lavender bg-white/90 px-5 py-3 text-sm font-semibold text-brand-plum">
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <div className="mb-4 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {['All Gifts', ...shopperFilters.map((filter) => filter.label)].map((filter) => (
                <button key={filter} onClick={() => setActiveShopperFilter(filter)} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${activeShopperFilter === filter ? 'border-brand-plum bg-brand-plum text-white' : 'border-brand-lavender bg-white/80 text-brand-plum hover:bg-white'}`}>{filter}</button>
              ))}
            </div>
          </div>

          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map((cat) => {
                const count = cat === 'All' ? products.length : products.filter((p) => p.category?.title === cat).length;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${activeCategory === cat ? 'border-brand-sage bg-brand-sage text-white' : 'border-brand-mint bg-brand-cream text-brand-sage hover:bg-brand-mint/70'}`}>
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between gap-3 border-t border-brand-lavender pt-5">
            <p className="text-sm font-semibold text-brand-taupe">{filteredProducts.length} gift{filteredProducts.length === 1 ? '' : 's'} shown</p>
            <a href="/contact" className="text-sm font-bold text-brand-plum hover:text-brand-coral">Need help choosing?</a>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="watercolor-soft rounded-[1.5rem] p-8 text-center">
              <div className="mx-auto max-w-md rounded-[1.25rem] bg-white/85 p-8">
                <h2 className="font-display text-3xl text-brand-plum">No little gifts found.</h2>
                <p className="mt-2 text-brand-taupe">Try clearing filters or browsing all gift-ready finds.</p>
                <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveShopperFilter('All Gifts'); }} className="mt-5 rounded-full bg-brand-plum px-5 py-2 text-sm font-bold text-white hover:bg-brand-coral">Clear filters</button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((item, i) => (
                  <ProductCard key={item._id || i} item={item} onAdd={handleAddToCart} />
                ))}
              </div>

              <div className="mt-10 rounded-[1.5rem] p-7 md:flex md:items-center md:justify-between boutique-card">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-coral">Still deciding?</p>
                  <h2 className="mt-2 font-display text-3xl text-brand-plum">Start with the gift-ready favorites.</h2>
                  <p className="mt-2 text-brand-taupe">Small surprises with thoughtful details, packed with care and easy to give.</p>
                </div>
                <a href="/shop" className="mt-5 inline-flex rounded-full border border-brand-plum px-5 py-3 text-sm font-bold text-brand-plum hover:bg-brand-plum hover:text-white md:mt-0">Browse all gifts</a>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
