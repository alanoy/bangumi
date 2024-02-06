<script lang="ts" setup>
const props = defineProps<{
  images: BgmImages
}>()

const { target } = useCover(props.images, 'medium')
</script>

<template>
  <figure class="bg-cover bg-top bg-no-repeat relative">
    <NuxtImg
      :src="target"
      placeholder
      loading="lazy"
      fit="contain"
      quality="80"
      class="object-contain h-full"
    />
  </figure>
</template>
