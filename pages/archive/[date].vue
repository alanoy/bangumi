<script lang="ts" setup>
const route = useRoute()
const items = ref<BgmItem[]>([])
const { date } = route.params as { date: string }
const [year, quarterly] = date.split('-')
const { data } = await useFetch(`/api/archive/${date}`)

useHead({
  title: `${year}年${quarterly}月番组`,
})

if (data.value) {
  handleData(data.value as { items: BgmItem[] })
}

function handleData(data: { items: BgmItem[] }) {
  items.value = data.items
}
</script>

<template>
  <section>
    <IndexHeader
      :total="items.length"
      :year="Number(year)"
      :quarterly="Number(quarterly)"
    />

    <BgmList :items="items" />
  </section>
</template>
