"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { useParams } from 'next/navigation';
import Toast from '../../components/Toast';
import TrustStrip from '../../components/TrustStrip';
import ProductBadges from '../../components/ProductBadges';

function ProductDescription({ description }) {
  if (Array.isArray(description)) {
    return description.map((block, i) => (
      <p key={i} className="mb-4 leading-8 text-brand-taupe">
        {block.children?.map(child => child.text).join('')}
      </p>
    ));
  }
  return <p className="leading-8 text-brand-taupe">{description}</p>;
}

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [personalizationText, setPersonalizationText] = useState('');
  const [personalizationError, setPersonalizationError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await Promise.race([
          fetch(`/api/products/${slug}`),
          new Promise((resolve) => setTimeout(() => resolve(null), 8000)),
        ]);
        const data = response?.json ? await response.json() : { product: null, relatedProducts: [] };
        if (data.product) {
          setProduct(data.product);
          if (data.product.hasVariations && data.product.variations?.length > 0) {
            setSelectedVariation(data.product.variations[0]);
          }
          setRelatedProducts(data.relatedProducts || []);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProduct();
  }, [slug]);

  const getProcessingTimeText = () => {
    const times = {
      '1-3-days': '1-3 business days',
      '3-5-days': '3-5 business days',
      '5-7-days': '5-7 business days (made to order)',
      '3-4-weeks': '3-4 weeks',
      'custom': product?.customProcessingDate || 'Custom',
    };
    return times[product?.processingTime] || '1-3 business days';
  };

  const handleAddToCart = () => {
    if (product.hasPersonalization && product.personalization?.required && !personalizationText.trim()) {
      setPersonalizationError('Please fill in the personalization details');
      return;
    }
    setPersonalizationError('');
    const allImages = product.images?.length > 0 ? product.images : [product.externalImageUrl];
    const variationName = selectedVariation?.name || '';
    const personalization = personalizationText.trim();
    const cartKeyParts = [product.slug?.current, variationName, personalization].filter(Boolean);
    const cartItem = {
      slug: product.slug?.current,
      cartKey: cartKeyParts.join('|'),
      name: variationName ? product.title + ' - ' + variationName : product.title,
      price: selectedVariation ? selectedVariation.price.toFixed(2) : product.basePrice.toFixed(2),
      image: allImages[0],
      shippingProfile: product.shippingProfile,
    };
    if (personalization) {
      cartItem.personalization = personalization;
    }
    addToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const getCurrentPrice = () => {
    if (selectedVariation) return selectedVariation.price.toFixed(2);
    return product.basePrice?.toFixed(2) || "0.00";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-lavender border-t-brand-plum" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28 watercolor-soft">
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/72 to-white/35" aria-hidden="true" />
          <div className="relative rounded-[2rem] border border-white bg-white/78 p-8 text-center shadow-boutique backdrop-blur-md">
            <h1 className="font-display text-4xl text-brand-plum">Product not found</h1>
            <a href="/shop" className="mt-6 inline-flex rounded-full bg-brand-plum px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-coral">Back to Shop</a>
          </div>
        </section>
      </div>
    );
  }

  const allImages = product.images?.length > 0 ? product.images : (product.externalImageUrl ? [product.externalImageUrl] : []);
  const processingTime = getProcessingTimeText();

  return (
    <div className="min-h-screen bg-brand-cream">
      <Toast message="Added to cart. View it anytime from the cart." isVisible={showToast} />

      <section className="relative overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-14 watercolor-soft">
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/72 to-white/35" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <a href="/shop" className="inline-flex text-sm font-bold text-brand-plum transition hover:text-brand-coral">Back to Shop</a>

          <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="rounded-[2rem] border border-white bg-white/72 p-4 shadow-boutique backdrop-blur-md">
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] bg-brand-cream">
                  <img src={allImages[selectedImageIndex] || '/placeholder.png'} alt={product.title} className="h-full w-full object-contain p-6" />
                </div>
              </div>

              {allImages.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-[1rem] border-2 bg-white transition-all ${selectedImageIndex === idx ? 'border-brand-plum' : 'border-white hover:border-brand-lavender'}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-contain p-2" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white bg-white/78 p-6 shadow-boutique backdrop-blur-md md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-lavender px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-plum">{product.category?.title || 'Uncategorized'}</span>
                <ProductBadges product={product} />
              </div>

              <h1 className="mt-5 font-display text-4xl leading-tight text-brand-plum md:text-5xl">{product.title}</h1>
              <div className="mt-4 flex items-center gap-3">
                <p className="text-3xl font-bold text-brand-plum">${getCurrentPrice()}</p>
                {product.compareAtPrice && <p className="text-xl text-brand-taupe line-through">${product.compareAtPrice.toFixed(2)}</p>}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-brand-lavender bg-brand-cream p-4">
                <TrustStrip compact items={[
                  { label: "Ships in " + processingTime, detail: "Packed with care" },
                  { label: "Free shipping over $50", detail: "Automatic at checkout" },
                  { label: "Gift-ready option", detail: "Add wrap or a note in cart" },
                  { label: "Secure checkout", detail: "Powered by Stripe" },
                ]} />
              </div>

              {product.specialNote && (
                <div className="mt-5 rounded-[1.25rem] border border-brand-coral/30 bg-brand-blush p-4">
                  <p className="font-semibold text-brand-plum">{product.specialNote}</p>
                </div>
              )}

              <div className="mt-6 text-lg">
                <ProductDescription description={product.description} />
              </div>

              {product.hasVariations && product.variations?.length > 0 && (
                <div className="mt-7">
                  <label className="block text-sm font-bold uppercase tracking-[0.16em] text-brand-coral">Choose an option</label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.variations.map((v, i) => (
                      <button key={i} onClick={() => setSelectedVariation(v)} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${selectedVariation?.name === v.name ? 'border-brand-plum bg-brand-plum text-white' : 'border-brand-lavender bg-white text-brand-plum hover:bg-brand-cream'}`}>
                        {v.name} - ${v.price.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.hasPersonalization && product.personalization && (
                <div className="mt-7">
                  <label className="block text-sm font-bold uppercase tracking-[0.16em] text-brand-coral">
                    {product.personalization.label || 'Personalization'}{product.personalization.required && <span className="text-brand-coral">*</span>}
                  </label>
                  {product.personalization.instructions && <p className="mt-3 rounded-[1.25rem] bg-brand-cream p-4 text-sm leading-6 text-brand-taupe">{product.personalization.instructions}</p>}
                  <textarea value={personalizationText} onChange={(e) => { if (e.target.value.length <= (product.personalization.characterLimit || 256)) { setPersonalizationText(e.target.value); setPersonalizationError(''); }}} placeholder="Example: Name: Lily, colors: pink/purple, occasion: birthday" rows={4} className={`mt-3 w-full rounded-[1.5rem] border bg-brand-cream px-5 py-4 text-brand-ink outline-none focus:border-brand-plum focus:ring-2 focus:ring-brand-lavender ${personalizationError ? 'border-red-400' : 'border-brand-lavender'}`} />
                  <div className="mt-1 flex justify-between">
                    {personalizationError && <p className="text-sm text-red-500">{personalizationError}</p>}
                    <p className="ml-auto text-sm text-brand-taupe">{personalizationText.length}/{product.personalization.characterLimit || 256}</p>
                  </div>
                </div>
              )}

              <button onClick={handleAddToCart} className="mt-8 w-full rounded-full bg-brand-plum px-10 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition hover:bg-brand-coral">Add to Cart</button>
              <p className="mt-3 text-center text-sm text-brand-taupe">Secure checkout. Need help choosing? Contact us before ordering.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ["What's Included", "See the product description above for contents, selected options, and any custom details."],
            ["Perfect For", "Birthdays, holidays, care packages, party favors, and thoughtful just-because gifts."],
            ["Processing & Shipping", `Processing time is ${processingTime}. Orders over $50 qualify for free shipping.`],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[1.5rem] border border-brand-lavender bg-white p-6 shadow-soft">
              <h2 className="font-display text-3xl text-brand-plum">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-brand-taupe">{copy}</p>
            </div>
          ))}
        </div>

        {relatedProducts.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-coral">More little finds</p>
              <h2 className="mt-2 font-display text-4xl text-brand-plum">You might also like</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item, i) => (
                <a key={i} href={`/shop/${item.slug?.current}`} className="group rounded-[1.5rem] border border-brand-lavender bg-white p-3 shadow-soft transition hover:-translate-y-1 hover:shadow-boutique">
                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.15rem] bg-brand-cream">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-2 pt-4">
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-brand-ink group-hover:text-brand-plum">{item.title}</h3>
                    <p className="mt-3 text-sm font-bold text-brand-plum">${item.basePrice?.toFixed(2)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
