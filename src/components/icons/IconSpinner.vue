<script setup lang="ts">
import type { IconProps } from '@/types'

const { size = 40, color = '#2563eb' } = defineProps<IconProps>()
</script>

<template>
  <div class="icon-spinner" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg
      class="icon-spinner__svg"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ color: color }"
    >
      <circle
        class="icon-spinner__circle"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
      />
    </svg>
  </div>
</template>

<style scoped>
.icon-spinner {
  display: inline-block;
}

.icon-spinner__svg {
  width: 100%;
  height: 100%;
  animation: icon-spinner__spin 1s linear infinite;
}

.icon-spinner__circle {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-linecap: round;
}

@keyframes icon-spinner__spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
