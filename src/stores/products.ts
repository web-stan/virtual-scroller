import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const searchQuery = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const filteredProducts = computed(() => {
    if (!searchQuery.value.trim()) {
      return products.value
    }

    const query = searchQuery.value.toLowerCase().trim()
    return products.value.filter((product) => {
      const searchableFields = [
        product.title,
        product.description,
        product.brand,
        product.category,
        product.price != null ? product.price.toString() : '',
        product.rating != null ? product.rating.toString() : '',
      ].filter((field): field is string => field !== null && field !== '' && field !== undefined)

      return searchableFields.some((field) => field.toLowerCase().includes(query))
    })
  })

  function setProducts(newProducts: Product[]) {
    products.value = newProducts
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setError(errorMessage: string | null) {
    error.value = errorMessage
  }

  return {
    products,
    searchQuery,
    filteredProducts,
    isLoading,
    error,
    setProducts,
    setSearchQuery,
    setLoading,
    setError,
  }
})
