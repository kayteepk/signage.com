import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../constants/data';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  material: string;
  artworkUri?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, material: string) => void;
  updateQuantity: (productId: string, size: string, material: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const key = (i: CartItem) => `${i.product.id}-${i.size}-${i.material}`;

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => key(i) === key(item));
      if (existing) {
        return prev.map(i => key(i) === key(item) ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string, size: string, material: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size && i.material === material)));
  };

  const updateQuantity = (productId: string, size: string, material: string, qty: number) => {
    if (qty <= 0) { removeItem(productId, size, material); return; }
    setItems(prev => prev.map(i =>
      i.product.id === productId && i.size === size && i.material === material
        ? { ...i, quantity: qty } : i
    ));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.product.basePrice * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
