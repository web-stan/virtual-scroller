<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { VirtualScrollerProps } from '@/types'

const { items, itemHeight = 100, containerHeight = 600 } = defineProps<VirtualScrollerProps>()

const containerRef = ref<HTMLElement | null>(null)
const scrollTop = ref(0)

const totalHeight = computed(() => items.length * itemHeight)

const visibleStartIndex = computed(() => {
  return Math.floor(scrollTop.value / itemHeight)
})

const visibleEndIndex = computed(() => {
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  return Math.min(visibleStartIndex.value + visibleCount + 1, items.length)
})

const visibleItems = computed(() => {
  return items.slice(visibleStartIndex.value, visibleEndIndex.value)
})

const offsetY = computed(() => {
  return visibleStartIndex.value * itemHeight
})

function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
    scrollTop.value = containerRef.value.scrollTop
  }
})

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll)
  }
})

watch(
  () => items,
  () => {
    if (containerRef.value) {
      containerRef.value.scrollTop = 0
      scrollTop.value = 0
    }
  },
)
</script>

<template>
  <div
    ref="containerRef"
    class="virtual-scroller"
    :style="{ height: `${containerHeight}px`, overflowY: 'auto' }"
  >
    <div
      class="virtual-scroller__content"
      :style="{ height: `${totalHeight}px`, position: 'relative' }"
    >
      <div class="virtual-scroller__items" :style="{ transform: `translateY(${offsetY}px)` }">
        <slot :items="visibleItems" :start-index="visibleStartIndex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-scroller {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 11px 4px rgba(0, 0, 0, 0.1);
}

.virtual-scroller__content {
  width: 100%;
}

.virtual-scroller__items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
