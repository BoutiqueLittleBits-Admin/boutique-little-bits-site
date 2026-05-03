export default function Footer() {
  return (
    <footer className="bg-brand-plum text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="brand-lockup mb-5 text-white">
              <span className="brand-lockup-script text-5xl">Litt<span className="inline-block origin-bottom scale-y-[0.86]">l</span>e Bits</span>
              <span className="brand-lockup-label text-white/70">Boutique</span>
            </div>
            <p className="text-white/75 text-sm">
              Gift-ready little finds, curated with heart.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop" className="text-white/70 hover:text-white transition-colors">All Products</a></li>
              <li><a href="/gift-guide" className="text-white/70 hover:text-white transition-colors">Gift Guide</a></li>
              <li><a href="/cart" className="text-white/70 hover:text-white transition-colors">Cart</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="text-white/70 hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="/returns" className="text-white/70 hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-white/70 hover:text-white transition-colors">Our Story</a></li>
              <li><a href="https://www.etsy.com/shop/BoutiqueLittleBits" className="text-white/70 hover:text-white transition-colors">Etsy Shop</a></li>
              <li><a href="https://www.ebay.com/usr/littlebitsboutique" className="text-white/70 hover:text-white transition-colors">eBay Store</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            Copyright 2023-{new Date().getFullYear()} Boutique Little Bits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
