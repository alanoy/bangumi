<script setup lang="ts">
defineProps<{
  label: string
  value: string | { v: string }[]
}>()
</script>

<template>
  <p class="text-sm mb-1">
    <span class="text-gray-500">{{ label }}：</span>
    <span>{{ Array.isArray(value) ? value.map(({ v }) => v).join('、') : value }}</span>
  </p>
</template>
