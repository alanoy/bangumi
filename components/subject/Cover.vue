<script lang="ts" setup>
const props = defineProps<{
  images: BgmImages
}>()

const { target } = useCover(props.images, 'medium')
</script>

<template>
  <figure class="bg-cover bg-top bg-no-repeat relative shadow-lg dark:shadow-2xl">
    <NuxtImg
      :src="target"
      placeholder
      loading="lazy"
      fit="contain"
      quality="80"
      class="object-contain"
    />
  </figure>
</template>
