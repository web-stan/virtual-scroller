import type { Product } from '@/types'

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data = await response.json()

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const result: Product[] = new Array(10000)
      .fill(null)
      .map((_, index) => data.products[index % 100])

    return result
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
  }
}
