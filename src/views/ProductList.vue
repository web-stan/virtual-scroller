<script setup lang="ts">
import { onMounted, computed } from 'vue'
import type { Product } from '@/types'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { fetchProducts } from '@/services/productService'
import VirtualScroller from '@/components/VirtualScroller.vue'
import ProductCard from '@/components/ProductCard.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'
import IconClose from '@/components/icons/IconClose.vue'

const {
  searchQuery: storeSearchQuery,
  isLoading,
  error,
  filteredProducts,
  products,
} = storeToRefs(useProductsStore())
const { setSearchQuery, setLoading, setError, setProducts } = useProductsStore()

const ITEM_HEIGHT = 164
const CONTAINER_HEIGHT = 600

const searchQuery = computed({
  get: () => storeSearchQuery.value,
  set: (value: string) => setSearchQuery(value),
})

function clearSearch() {
  setSearchQuery('')
}

const isProductsAmountShown = computed(() => !isLoading.value && filteredProducts.value.length > 0)

onMounted(async () => {
  try {
    setLoading(true)
    setError(null)
    const products = await fetchProducts()
    setProducts(products)
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to load products')
  } finally {
    setLoading(false)
  }
})
</script>

<template>
  <div class="product-list">
    <div class="product-list__header">
      <h1 class="product-list__title">Products</h1>
      <div class="product-list__search-wrapper">
        <input v-model="searchQuery" type="text" placeholder="Search products..." name="search"
          class="product-list__search" :class="{ 'product-list__search--with-icon': searchQuery }" />
        <IconClose v-if="searchQuery" class="product-list__search-clear" @click="clearSearch" />
      </div>
    </div>

    <div v-if="isLoading" class="product-list__loading">
      <IconSpinner />
    </div>

    <div v-else-if="error" class="product-list__error">
      {{ error }}
    </div>

    <div v-else-if="filteredProducts.length === 0" class="product-list__empty">
      No products found
    </div>

    <VirtualScroller v-else :items="filteredProducts" :item-height="ITEM_HEIGHT" :container-height="CONTAINER_HEIGHT">
      <template #default="{ items, startIndex }">
        <ProductCard v-for="(product, index) in items as Product[]" :key="`${startIndex + index}-${product.id}`"
          :product="product" />
      </template>
    </VirtualScroller>

    <div v-if="isProductsAmountShown" class="product-list__info">
      Showing {{ filteredProducts.length }} of {{ products.length }} products
    </div>
  </div>
</template>

<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.product-list__header {
  margin-bottom: 24px;
}

.product-list__title {
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.product-list__search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.product-list__search-clear {
  position: absolute;
  right: 12px;
  z-index: 1;
  color: #666;
}

.product-list__search {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.product-list__search--with-icon {
  padding-right: 44px;
}

.product-list__search:focus {
  border-color: #2563eb;
}

.product-list__loading,
.product-list__error,
.product-list__empty {
  text-align: center;
  padding: 48px;
  font-size: 18px;
  color: #666;
}

.product-list__error {
  color: #dc2626;
}

.product-list__info {
  margin-top: 16px;
  text-align: center;
  color: #555555;
}
</style>
