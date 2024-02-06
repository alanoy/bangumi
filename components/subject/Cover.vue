<script lang="ts" setup>
const props = defineProps<{
  images: BgmImages
}>()

const { placeholder, target } = useCover(props.images, 'medium')
</script>

<template>
  <div class="bg-cover bg-top bg-no-repeat relative">
    <NuxtImg
      :src="target"
      :placeholder="placeholder"
      loading="lazy"
      fit="contain"
      quality="80"
      class="object-contain h-full"
    />
  </div>
</template>
