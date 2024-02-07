<script lang="ts" setup>
const items = ref<BgmItem[]>([])
const { t } = useI18n()
const offset = ref<number | null>(null)
const total = ref(0)
const limit = 20

useHead({
  title: t('ranking'),
})

definePageMeta({
  keepAlive: true,
})

const { pending, data: response } = await useAsyncData(
  'ranking',
  () =>
    $fetch('/api/ranking', {
      method: 'POST',
      body: {
        offset: offset.value,
        limit,
      },
    }),
  {
    immediate: false,
    watch: [offset],
  },
)

watch(response, (value: any) => {
  const response = value as { items: BgmItem[]; total: number }
  items.value = response.items
  total.value = response.total
  window.scrollTo({ top: 0 })
})

function onPageChange(page: number) {
  offset.value = (page - 1) * limit
}

offset.value = 0
</script>

<template>
  <section>
    <BgmList
      v-if="items.length"
      :items="items"
    />

    <Pagination
      :total="total"
      :limit="limit"
      :pending="pending"
      @change="onPageChange"
    />
  </section>
</template>
