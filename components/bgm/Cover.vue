<script lang="ts" setup>
const props = defineProps<{
  item: BgmItem
}>()

const image = computed(() => {
  const target = props.item.images?.large || '/not-available.png'
  const suffix = target.split('.').pop()

  return {
    default: '/not-available.png',
    target,
    type: `image/${suffix}`,
  }
})
</script>

<template>
  <figure class="cover bg-cover bg-top bg-no-repeat relative bg-white top-0 left-0 bottom-0">
    <object
      class="object-cover h-full"
      :data="image.target"
      :type="image.type"
    >
      <img
        class="object-cover h-full"
        :src="image.default"
      />
    </object>
    <span
      v-if="item.rating && item.rating.score > 0"
      class="absolute w-full left-0 bottom-0 h-6 text-xs text-center bg-black/[0.65] text-white py-1 whitespace-nowrap"
    >
      {{ item.rating.score }}分/{{ item.rating.total }}票
    </span>
  </figure>
</template>

<style scoped>
.cover {
  width: 125px;
  min-width: 125px;
}
</style>
