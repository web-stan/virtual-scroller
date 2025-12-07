import type { Product } from './product'

export interface VirtualScrollerProps {
  items: Product[]
  itemHeight?: number
  containerHeight?: number
}
