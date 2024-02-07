<script lang="ts" setup>
const props = defineProps<{
  item: BgmItem
}>()

const { target } = useCover(props.item.images || props.item.image)
const rating = computed(() => {
  const { rating, score, rank } = props.item
  if (rating) {
    return rating
  }

  if (typeof rank === 'number') {
    return { score: score || 0, rank }
  }

  return null
})
</script>

<template>
  <figure class="cover bg-cover bg-top bg-no-repeat relative bg-white top-0 left-0 bottom-0">
    <NuxtImg
      :src="target"
      placeholder
      loading="lazy"
      fit="cover"
      quality="80"
      class="object-cover h-full"
    />
    <span
      v-if="rating && rating?.score > 0"
      class="absolute glass w-full left-0 bottom-0 h-6 text-xs text-center bg-black/[0.1] text-white py-1 whitespace-nowrap"
    >
      <span
        v-if="rating.rank > 0"
        class="italic font-bold mr-2"
      >
        #{{ rating.rank }}
      </span>
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
