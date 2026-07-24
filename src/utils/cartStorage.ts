import AsyncStorage from '@react-native-async-storage/async-storage';

import { CartItem } from '../types';

const CART_KEY = '@grocify/cart';

export async function loadCart(): Promise<CartItem[]> {
  try {
    const raw = await AsyncStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveCart(items: CartItem[]): Promise<void> {
  try {
    if (items.length === 0) {
      await AsyncStorage.removeItem(CART_KEY);
      return;
    }

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Storage failed — cart still works in memory for this session
  }
}
