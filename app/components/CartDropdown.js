"use client";
import { useCart } from './CartContext';

export default function CartDropdown() {
  const { cart = [], removeFromCart, cartCount, cartTotal, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-6 z-50">
        <p className="text-center text-gray-500">Your cart is empty</p>
        <a 
          href="/shop" 
          className="block mt-4 text-center bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
      <h3 className="font-bold text-brand-sage mb-4">Your Cart ({cartCount})</h3>
      
      <div className="max-h-64 overflow-y-auto space-y-3">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-medium text-brand-sage truncate">{item.name}</h4>
              <p className="text-sm text-brand-coral font-bold">${item.price} x {item.quantity || 1}</p>
            </div>
            <button 
              onClick={() => removeFromCart(item.slug)}
              className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-100 mt-4 pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-semibold text-brand-sage">Total:</span>
          <span className="font-bold text-brand-coral">${cartTotal.toFixed(2)}</span>
        </div>
        <a 
          href="/cart" 
          className="block w-full bg-brand-coral text-white py-3 rounded-lg font-semibold text-center hover:bg-brand-sage transition-colors"
        >
          View Cart & Checkout
        </a>
      </div>
    </div>
  );
}
