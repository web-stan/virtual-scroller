<script setup lang="ts">
import type { IconProps } from '@/types'

const { size = 20, color = '#666' } = defineProps<IconProps>()
</script>

<template>
  <svg
    class="icon-close"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ color: color }"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.icon-close {
  display: inline-block;
  cursor: pointer;
  transition: color 0.2s;
}

.icon-close:hover {
  color: #333;
}
</style>
