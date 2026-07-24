import { CartItem } from '../types';

export const DELIVERY_FEE = 30;
export const FREE_DELIVERY_THRESHOLD = 500;

/** Round to 2 decimal places so we never show ₹149.99999999 */
export function roundMoney(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function formatPrice(amount: number): string {
  return `₹${roundMoney(amount).toFixed(2)}`;
}

export function getItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getSubtotal(items: CartItem[]): number {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return roundMoney(total);
}

/** ₹30 delivery, free when subtotal is ₹500 or more */
export function getDeliveryFee(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

export function getGrandTotal(subtotal: number, deliveryFee: number): number {
  return roundMoney(subtotal + deliveryFee);
}
