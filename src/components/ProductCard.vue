<script setup lang="ts">
import { ref } from 'vue'
import type { ProductCardProps } from '@/types'
import IconSpinner from './icons/IconSpinner.vue'

defineProps<ProductCardProps>()

const isLoading = ref(true)

function handleImageLoad() {
  isLoading.value = false
}
</script>

<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <div v-if="isLoading" class="product-card__spinner">
        <IconSpinner />
      </div>
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="product-card__image"
        :class="{ 'product-card__image--loading': isLoading }"
        @load="handleImageLoad"
      />
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__brand">{{ product.brand }}</p>
      <p class="product-card__description">{{ product.description }}</p>
      <div class="product-card__footer">
        <span class="product-card__price">${{ product.price }}</span>
        <span class="product-card__rating">⭐ {{ product.rating }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  height: 152px;
  box-sizing: border-box;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.product-card__image-wrapper {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  position: relative;
}

.product-card__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
}

.product-card__image--loading {
  opacity: 0;
}

.product-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.product-card__brand {
  margin: 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.product-card__description {
  flex: 1;
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-card__price {
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
}

.product-card__rating {
  font-size: 14px;
  color: #666;
}
</style>
