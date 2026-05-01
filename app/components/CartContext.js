"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const getCartItemKey = (item) => item.cartKey || item.slug;

const saveCart = (nextCart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(nextCart));
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const itemKey = getCartItemKey(item);
      const existingItem = prevCart.find(i => getCartItemKey(i) === itemKey);
      if (existingItem) {
        const nextCart = prevCart.map(i => 
          getCartItemKey(i) === itemKey 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
        saveCart(nextCart);
        return nextCart;
      }
      const nextCart = [...prevCart, { ...item, cartKey: itemKey, quantity: 1 }];
      saveCart(nextCart);
      return nextCart;
    });
  };

  const removeFromCart = (cartKey) => {
    setCart(prevCart => {
      const nextCart = prevCart.filter(item => getCartItemKey(item) !== cartKey);
      saveCart(nextCart);
      return nextCart;
    });
  };

  const updateQuantity = (cartKey, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartKey);
      return;
    }
    setCart(prevCart => {
      const nextCart = prevCart.map(item => 
        getCartItemKey(item) === cartKey 
          ? { ...item, quantity }
          : item
      );
      saveCart(nextCart);
      return nextCart;
    });
  };

  const clearCart = () => {
    saveCart([]);
    setCart([]);
  };

  const cartCount = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  const cartTotal = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0) : 0;

  return (
    <CartContext.Provider value={{ 
      cart: cart || [], 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      cartCount,
      cartTotal,
      isLoaded 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
