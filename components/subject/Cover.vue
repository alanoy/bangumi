<script lang="ts" setup>
const props = defineProps<{
  images: BgmImages
}>()

const { placeholder, target, type } = useCover(props.images, 'medium')
</script>

<template>
  <figure class="bg-cover bg-top bg-no-repeat relative">
    <object
      class="object-contain w-full rounded shadow-lg"
      :data="target"
      :type="type"
    >
      <img
        class="object-contain"
        :src="placeholder"
      />
    </object>
  </figure>
</template>
