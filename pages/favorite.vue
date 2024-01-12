<script lang="ts" setup>
useHead({
  title: '收藏',
})

const list = ref<BgmItem[]>([])
const ids = ref('')

const { pending, data: favs } = await useAsyncData(
  'favorite',
  () =>
    $fetch('/api/favorite', {
      params: { ids: ids.value },
    }),
  {
    immediate: false,
    watch: [ids],
  },
)

if (process.client) {
  const favItems = useFavorite()

  if (favItems?.length) {
    ids.value = favItems.map(_ => _.id).join(',')
  } else {
    pending.value = false
  }
}

watch(favs, (data: any) => {
  const { items } = data as { items: BgmItem[] }
  const favItems = useFavorite()
  list.value = items.map(item => {
    const findItem = favItems.find(_ => _.id === item.id)
    return {
      ...item,
      ...findItem,
      rating: null,
    }
  })
})
</script>

<template>
  <section>
    <h3
      v-show="!pending && !list.length"
      class="text-2xl p-5 text-neutral-500"
    >
      暂无收藏数据。
    </h3>

    <BgmList
      v-if="list.length"
      :items="list"
    />
  </section>
</template>
