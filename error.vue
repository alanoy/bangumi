<script setup lang="ts">
defineProps({
  error: Object,
})
</script>

<template>
  <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-accent">{{ error?.statusCode }}</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {{ error?.message }}
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600">
        {{ error?.description }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <NuxtLink
          class="btn btn-secondary"
          to="/"
        >
          Go back home
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
