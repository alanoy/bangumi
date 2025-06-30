<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="inline-grid">
    <!-- 背后发光层 -->
    <span
      class="pointer-events-none col-start-1 row-start-1 text-transparent bg-clip-text blur-lg [transform:translate3d(0,0,0)] [-webkit-text-fill-color:transparent] bg-[linear-gradient(90deg,_var(--color-secondary)_0%,_var(--color-primary)_30%,_var(--color-error)_60%,_var(--color-accent)_100%)]"
      aria-hidden="true"
    >
      {{ text }}
    </span>

    <!-- 前景主文字层 -->
    <span
      class="relative col-start-1 row-start-1 text-transparent bg-clip-text [-webkit-text-fill-color:transparent] bg-[linear-gradient(90deg,_var(--color-secondary)_0%,_var(--color-primary)_30%,_var(--color-error)_60%,_var(--color-accent)_100%)] [&::selection]:text-base-content [&::selection]:bg-blue-700/20"
    >
      {{ text }}
    </span>
  </span>
</template>
