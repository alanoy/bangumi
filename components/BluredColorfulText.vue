<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="inline-grid">
    <span
      class="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,var(--color-error)_0%,var(--color-secondary)_9%,var(--color-secondary)_42%,var(--color-primary)_47%,var(--color-accent)_100%)] bg-clip-text blur-lg [transform:translate3d(0,0,0)] before:content-[attr(data-text)] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
      aria-hidden="true"
      :data-text="text"
    ></span>
    <span
      class="[&::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,var(--color-error)_0%,var(--color-secondary)_9%,var(--color-secondary)_42%,var(--color-primary)_47%,var(--color-accent)_100%)] bg-clip-text [&::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
    >
      {{ text }}
    </span>
  </span>
</template>
