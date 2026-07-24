import { Product, ProductsResponse } from '../types';

const GROCERIES_URL = 'https://dummyjson.com/products/category/groceries';

export async function fetchGroceries(): Promise<Product[]> {
  const response = await fetch(GROCERIES_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products (${response.status})`);
  }

  const data = (await response.json()) as ProductsResponse;
  return data.products;
}
