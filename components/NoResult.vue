<script setup lang="ts">
defineProps<{
  error?: IError
}>()
</script>

<template>
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <h2 class="mt-10 text-3xl font-bold tracking-tight sm:text-5xl">
        {{ $t('no-result') }}
      </h2>
      <p class="mt-6 text-base leading-7 text-gray-500">
        {{ error?.message || '' }}
      </p>
    </div>
  </main>
</template>
