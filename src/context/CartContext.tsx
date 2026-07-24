import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CartItem, Product } from '../types';
import { getDeliveryFee, getGrandTotal, getItemCount, getSubtotal } from '../utils';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  isDeliveryFree: boolean;
  getQuantity: (productId: number) => number;
  canAddMore: (productId: number, stock: number) => boolean;
  addToCart: (product: Product) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const getQuantity = useCallback(
    (productId: number) =>
      items.find((item) => item.product.id === productId)?.quantity ?? 0,
    [items],
  );

  const canAddMore = useCallback(
    (productId: number, stock: number) => getQuantity(productId) < stock,
    [getQuantity],
  );

  const addToCart = useCallback((product: Product) => {
    if (product.stock < 1) return;

    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) return current;

        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { product, quantity: 1 }];
    });
  }, []);

  const incrementItem = useCallback((productId: number) => {
    setItems((current) =>
      current.map((item) => {
        if (item.product.id !== productId) return item;
        if (item.quantity >= item.product.stock) return item;
        return { ...item, quantity: item.quantity + 1 };
      }),
    );
  }, []);

  const decrementItem = useCallback((productId: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const itemCount = useMemo(() => getItemCount(items), [items]);
  const subtotal = useMemo(() => getSubtotal(items), [items]);
  const deliveryFee = useMemo(() => getDeliveryFee(subtotal), [subtotal]);
  const grandTotal = useMemo(
    () => getGrandTotal(subtotal, deliveryFee),
    [subtotal, deliveryFee],
  );
  const isDeliveryFree = deliveryFee === 0;

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      deliveryFee,
      grandTotal,
      isDeliveryFree,
      getQuantity,
      canAddMore,
      addToCart,
      incrementItem,
      decrementItem,
    }),
    [
      items,
      itemCount,
      subtotal,
      deliveryFee,
      grandTotal,
      isDeliveryFree,
      getQuantity,
      canAddMore,
      addToCart,
      incrementItem,
      decrementItem,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
