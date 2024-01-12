<script lang="ts" setup>
defineProps<{
  item: BgmItem
}>()
</script>

<template>
  <figure class="cover bg-cover bg-top bg-no-repeat relative bg-white top-0 left-0 bottom-0">
    <img
      class="object-cover h-full"
      :src="item.images?.large || '/not-available.png'"
    />
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
