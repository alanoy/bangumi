<script lang="ts" setup>
const props = defineProps<{
  item: BgmItem
}>()

const { placeholder, target, type } = useCover(props.item.images)
const rating = computed(() => props.item.rating)
</script>

<template>
  <figure class="cover bg-cover bg-top bg-no-repeat relative bg-white top-0 left-0 bottom-0">
    <object
      class="object-cover h-full"
      :data="target"
      :type="type"
    >
      <img
        class="object-cover h-full"
        :src="placeholder"
      />
    </object>
    <span
      v-if="rating && rating.score > 0"
      class="absolute glass w-full left-0 bottom-0 h-6 text-xs text-center bg-black/[0.65] text-white py-1 whitespace-nowrap"
    >
      {{ rating.score }}
      <template v-if="rating.total">/{{ rating.total }} {{ $t('votes') }}</template>
    </span>
  </figure>
</template>

<style scoped>
.cover {
  width: 125px;
  min-width: 125px;
}
</style>
